import styled, { css } from 'styled-components';
import { buttonMixin, flexCenter } from '@styles/index';

export const Container = styled.div`
	${flexCenter};
	flex-direction: column;
	padding: 1em;
`;

export const AvatarImageSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const AvatarImageAddInput = styled.input`
	display: none;
`;

export const ImageContainer = styled.div`
	${flexCenter};
	cursor: pointer;
	position: relative;
	width: 100px;
	height: 100px;
	box-shadow: 0 0 0 1px var(--baseBorderColor);
	background-color: var(--cardBgColor);
	border-radius: 50%;

	& > svg {
		fill: var(--gray);
	}
`;

export const Image = styled.img`
	border-radius: 50%;
`;

export const AddImageIconContainer = styled.div`
	${flexCenter};
	position: absolute;
	z-index: 1;
	width: 36px;
	height: 36px;
	background-color: var(--cardBgColor);
	border: 1px solid var(--baseBorderColor);
	border-radius: 50%;
	right: -12px;
	bottom: 6px;

	& > svg {
		fill: var(--gray);
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin: 30px 10px 10px;

	& div {
		width: 100%;
	}

	& input {
		width: 100%;
		margin-top: 3px;
	}
`;

export const ModifyProfileButton = styled.button`
	${buttonMixin};
	font-size: 14px;
	margin-left: auto;
	padding: 0.4em 0.9em;
	border-radius: 4px;
	background-color: var(--primary);
	color: var(--white);
`;

export const UploadButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 20px;

	& > div {
		display: flex;
	}
`;

export const UploadConfirmButtons = styled.div`
	margin-top: 10px;
`;

const ImageButtonStyle = css`
	${buttonMixin};
	font-size: 14px;
	padding: 0.4em 0.9em;
	border-radius: 4px;
	color: var(--white);
`;

export const ImageUploadCancelButton = styled.button`
	${ImageButtonStyle};
	background-color: var(--darkGray);
`;

export const ImageUploadButton = styled.button`
	${ImageButtonStyle};
	background-color: var(--primary);
	margin-left: 12px;
`;

export const ImageDeleteButton = styled.button`
	${ImageButtonStyle};
	background-color: var(--deepRed);

	&:disabled {
		cursor: not-allowed;
		color: var(--deepDarkGray);
		background-color: var(--darkGray);
	}
`;

export const NoticeNotSupportedImageType = styled.p`
	color: var(--deepRed);
	margin: 0.5em 0 0 0;
`;

export const DeleteConfirmContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const DeleteConfirmButtons = styled.div`
	margin-top: 16px;
	display: flex;
	justify-content: center;
`;

export const DeleteConfirmMessage = styled.p`
	text-align: center;
`;

const DeleteConfirmButtonStyle = css`
	${buttonMixin};
	font-size: 14px;
	padding: 0.4em 0.8em;
	margin: 0 8px;
	border-radius: 4px;
	color: var(--white);
`;

export const DeleteConfirmCancelButton = styled.button`
	${DeleteConfirmButtonStyle};
	background-color: var(--gray);
`;

export const DeleteConfirmButton = styled.button`
	${DeleteConfirmButtonStyle};
	background-color: var(--deepRed);
`;
