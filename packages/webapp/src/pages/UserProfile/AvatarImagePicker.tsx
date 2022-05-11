import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { AddImage as AddImageIcon, AvatarImage } from '@components/index';
import { AVATAR_MIME_TYPES } from '@portbullio/shared/src/constants/index';
import toast from '@lib/toast';
import * as Style from './styles';
import DeleteConfirmTriggerButton from './DeleteConfirmTriggerButton';
import UploadButton from './UploadButton';
import { useUpdateAvatar, useDeleteAvatar } from './queries';

export default function AvatarImagePicker() {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [newAvatarImage, setNewAvatarImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isValidMIMEType, setIsValidMIMEType] = useState(true);
	const [isDeletingImage, setIsDeletingImage] = useState(false);
	const uploadAvatarMutation = useUpdateAvatar();
	const deleteAvatarMutation = useDeleteAvatar();

	useEffect(() => {
		let shouldCancel = false;

		if (newAvatarImage) {
			const fileReader = new FileReader();
			fileReader.onload = () => {
				if (shouldCancel) return;
				setPreviewUrl(fileReader.result as string);
			};
			fileReader.readAsDataURL(newAvatarImage);
		}

		return () => {
			shouldCancel = true;
		};
	}, [newAvatarImage]);

	function openFilePicker() {
		if (!imageInputRef.current) return;
		imageInputRef.current.click();
	}

	function checkIsValidMIMEType(type: string) {
		if (type in AVATAR_MIME_TYPES) return;
		setIsValidMIMEType(false);
	}

	function resetImageStates() {
		setNewAvatarImage(null);
		setPreviewUrl(null);
		setIsValidMIMEType(true);
	}

	function cancelUpload() {
		if (!imageInputRef.current) return;
		setPreviewUrl(null);
		setNewAvatarImage(null);
		imageInputRef.current.value = '';
	}

	function handleImagePicking(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		if (!target.files || target.files.length !== 1) {
			setPreviewUrl(null);
			return;
		}

		setIsValidMIMEType(true);
		const [pickedImage] = target.files;
		checkIsValidMIMEType(pickedImage.type);
		setNewAvatarImage(pickedImage);
	}

	async function handleUploadAvatar() {
		if (!imageInputRef.current) return;
		if (!newAvatarImage) {
			toast.error({ message: '새 아바타 이미지가 없습니다.' });
			return;
		}

		setIsUploadingImage(true);
		uploadAvatarMutation.mutate(newAvatarImage, {
			onSuccess: () => {
				toast.success({ message: '아바타 이미지가 업데이트 되었습니다.' });
				resetImageStates();
				if (!imageInputRef.current) return;
				imageInputRef.current.value = '';
			},
			onError: () =>
				toast.error({ message: '아바타 이미지 업데이트에 실패했습니다. 다시 시도해 주세요.' }),
			onSettled: () => setIsUploadingImage(false)
		});
	}

	async function handleDeleteAvatar() {
		setIsDeletingImage(true);
		deleteAvatarMutation.mutate(undefined, {
			onSuccess: () => {
				toast.success({ message: '아바타 이미지를 성공적으로 삭제했습니다.' });
				setIsDeletingImage(false);
			},
			onError: () => {
				toast.error({ message: '아바타 이미지 삭제에 실패했습니다. 다시 시도해 주세요.' });
				setIsDeletingImage(false);
			}
		});
	}

	function renderImage() {
		if (isUploadingImage) return <div>업로드 중...</div>;
		if (previewUrl) return <Style.Image src={previewUrl} alt="New avatar preview" />;
		return <AvatarImage userIconWidth={60} userIconHeight={60} />;
	}

	return (
		<Style.AvatarImageSection>
			<Style.AvatarImageAddInput
				ref={imageInputRef}
				type="file"
				accept=".jpg,.jpeg,.png,.webp"
				onChange={handleImagePicking}
			/>
			<Style.ImageContainer data-testid="user-profile-image" onClick={openFilePicker}>
				{renderImage()}
				<Style.AddImageIconContainer>
					<AddImageIcon width={22} height={22} />
				</Style.AddImageIconContainer>
			</Style.ImageContainer>
			{!isValidMIMEType && (
				<Style.NoticeNotSupportedImageType>
					지원하지 않는 이미지 형식입니다.
				</Style.NoticeNotSupportedImageType>
			)}
			<Style.UploadButtonContainer>
				{isDeletingImage ? (
					<div>이미지 삭제 중...</div>
				) : (
					<>
						{!(isValidMIMEType && newAvatarImage) && (
							<DeleteConfirmTriggerButton
								newAvatarFile={newAvatarImage}
								onDelete={handleDeleteAvatar}
							/>
						)}
					</>
				)}
				<UploadButton
					shouldRenderButtons={!!(isValidMIMEType && newAvatarImage)}
					onCancel={cancelUpload}
					onUpload={handleUploadAvatar}
				/>
			</Style.UploadButtonContainer>
		</Style.AvatarImageSection>
	);
}
