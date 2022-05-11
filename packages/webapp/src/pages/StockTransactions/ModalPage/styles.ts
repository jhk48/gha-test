import styled, { css } from 'styled-components';
import { buttonMixin } from '@styles/Mixins';

interface SubmitButtonProps {
	backgroundColor: string;
}

export const Form = styled.form`
	padding: 10px 3px;
`;

export const MemoSubmitButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 3px 0 0 auto;
`;

export const MemoSubmitButton = styled.button`
	${buttonMixin};
	background-color: var(--deepOrange);
	color: var(--white);
	border-radius: 4px;
	padding: 0.3em 0.6em;
`;

export const EditTransactionHeader = styled.header`
	font-size: 24px;
	text-align: center;
	padding-bottom: 1em;
`;

export const EditTransactionContainer = styled.div`
	padding: 0 1em;
`;

export const EditTransactionForm = styled.form`
	width: 450px;
	& input {
		margin-bottom: 16px;
		width: 100%;
	}

	& > div {
		width: 100%;
	}
`;

export const EditTransactionRadioInputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0;
`;

export const EditTransactionRadioInput = styled.input`
	display: none;
`;

export const EditTransactionRadioInputLabel = styled.label`
	cursor: pointer;
	width: 45%;
	padding: 0.4em 0.8em;
	border: 1px solid var(--baseBorderColor);
	border-radius: 4px;
	text-align: center;

	${EditTransactionRadioInput}:checked + & {
		background-color: var(--lightBlue);
		color: var(--white);
		border: 1px solid var(--lightBlue);
	}
`;

export const EditTransactionSubmitButton = styled.button<SubmitButtonProps>`
	${buttonMixin};
	background-color: ${({ backgroundColor }) => backgroundColor};
	color: var(--white);
	width: 100%;
	border-radius: 4px;
	padding: 0.4em 0;
`;

export const DeleteConfirmHeader = styled.header`
	font-size: 24px;
	text-align: center;
	padding-bottom: 1em;
`;

export const DeleteConfirmMessage = styled.p`
	text-align: center;
	margin-bottom: 20px;
`;

export const DeleteConfirmButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

const DeleteConfirmButtonStyle = css`
	padding: 0.4em 0.6em;
	border-radius: 4px;
	color: var(--white);
`;

export const DeleteCancelButton = styled.button`
	${buttonMixin};
	${DeleteConfirmButtonStyle};
	background-color: var(--gray);
`;

export const DeletePortfolioButton = styled.button`
	${buttonMixin};
	${DeleteConfirmButtonStyle};
	background-color: var(--deepRed);
`;
