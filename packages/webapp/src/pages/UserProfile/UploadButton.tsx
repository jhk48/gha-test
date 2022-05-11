import * as Style from './styles';

interface Props {
	shouldRenderButtons: boolean;
	onCancel: any;
	onUpload: any;
}

export default function UploadButton({ shouldRenderButtons, onCancel, onUpload }: Props) {
	return (
		<>
			{shouldRenderButtons && (
				<div>
					<Style.ImageUploadCancelButton type="button" onClick={onCancel}>
						취소
					</Style.ImageUploadCancelButton>
					<Style.ImageUploadButton type="button" onClick={onUpload}>
						이미지 수정
					</Style.ImageUploadButton>
				</div>
			)}
		</>
	);
}
