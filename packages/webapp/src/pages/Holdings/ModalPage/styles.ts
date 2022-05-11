import { buttonMixin } from '@src/styles';
import styled from 'styled-components';

interface SubmitButtonProps {
	backgroundColor: string;
}

export const Header = styled.header`
	font-size: 24px;
	text-align: center;
	padding-bottom: 1em;
`;

export const Container = styled.div`
	padding: 0 1em;
`;

export const Form = styled.form`
	width: 450px;

	& input {
		margin-bottom: 16px;
		width: 100%;
		padding: 1.5em 0.5em 0.25em;
	}

	& > div {
		width: 100%;
	}
`;

export const RadioInputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 12px 0;
`;

export const RadioInput = styled.input`
	display: none;
`;

export const RadioInputLabel = styled.label`
	cursor: pointer;
	width: 45%;
	padding: 0.4em 0.8em;
	border: 1px solid var(--baseBorderColor);
	border-radius: 4px;
	text-align: center;

	${RadioInput}:checked + & {
		background-color: var(--lightBlue);
		color: var(--white);
		border: 1px solid var(--lightBlue);
	}
`;

export const SubmitButton = styled.button<SubmitButtonProps>`
	${buttonMixin};
	background-color: ${({ backgroundColor }) => backgroundColor};
	color: var(--white);
	width: 100%;
	border-radius: 4px;
	padding: 0.4em 0;
`;

export const RelateCashSection = styled.div`
	display: flex;
	align-items: center;

	& > input[type='checkbox'] {
		width: fit-content;
		margin: 3px 6px 0 0;
		transform: scale(1.3);
	}
`;

export const CurrentTotalCashSection = styled.div`
	font-size: 14px;
	margin-bottom: 16px;
`;

export const TotalCostSection = styled.div`
	margin-bottom: 2px;
`;
