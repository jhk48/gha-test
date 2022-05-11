import { useState } from 'react';
import { useAvatarUrl } from '@hooks/ReactQuery';
import * as Style from './styles';

interface Props {
	onDelete: any;
	newAvatarFile: null | File;
}

export default function DeleteConfirmTriggerButton({ newAvatarFile, onDelete }: Props) {
	const avatarUrl = useAvatarUrl();
	const [isOpenImageDeleteConfirm, setIsOpenImageDeleteConfirm] = useState(false);
	const isButtonDisabled = (!avatarUrl.isLoading && !avatarUrl.data) || !!newAvatarFile;

	function openDeleteImageConfirm() {
		setIsOpenImageDeleteConfirm(true);
	}

	function closeDeleteImageConfirm() {
		setIsOpenImageDeleteConfirm(false);
	}

	async function handleOnDelete() {
		await onDelete();
		closeDeleteImageConfirm();
	}

	return (
		<>
			{isOpenImageDeleteConfirm ? (
				<Style.DeleteConfirmContainer>
					<Style.DeleteConfirmMessage>정말 이미지를 삭제하시겠습니까?</Style.DeleteConfirmMessage>
					<Style.DeleteConfirmButtons>
						<Style.DeleteConfirmCancelButton type="button" onClick={closeDeleteImageConfirm}>
							취소
						</Style.DeleteConfirmCancelButton>
						<Style.DeleteConfirmButton type="button" onClick={handleOnDelete}>
							삭제
						</Style.DeleteConfirmButton>
					</Style.DeleteConfirmButtons>
				</Style.DeleteConfirmContainer>
			) : (
				<Style.ImageDeleteButton
					type="button"
					disabled={isButtonDisabled}
					onClick={openDeleteImageConfirm}
				>
					이미지 삭제
				</Style.ImageDeleteButton>
			)}
		</>
	);
}
