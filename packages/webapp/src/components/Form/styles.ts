import styled, { css } from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/index';

interface InputStyleProps {
	isError?: boolean;
}

export const InputStyle = css<InputStyleProps>`
	background-color: var(--inputBgColor);
	border: 1px solid ${({ isError }) => (isError ? 'var(--deepRed)' : 'var(--baseBorderColor)')};
	border-radius: 4px;
	color: var(--baseTextColor);
	padding: 1.8em 0.5em 0.25em;

	&:not(:read-only):focus {
		border-color: var(--lightBlue);
		box-shadow: 0 0 ${({ theme }) => (theme.currentTheme === 'light' ? '3' : '5')}px
			var(--lightBlue);
		outline: 1px solid var(--lightBlue);
	}

	&:read-only {
		cursor: not-allowed;
		color: var(--dark);
		background-color: var(--lightGray);
	}

	&:read-only:focus {
		outline: none;
	}
`;

export const LabelStyle = css<InputStyleProps>`
	position: absolute;
	color: ${({ isError }) => (isError ? 'var(--deepRed)' : 'var(--inputLabelColor)')};
	top: 0.2em;
	left: 0.5em;
`;

export const InputContainer = styled.div`
	position: relative;
	width: fit-content;

	& > svg {
		position: absolute;
		top: 0.48em;
		right: 0.3em;
		fill: var(--deepRed);
	}
`;

export const TextInput = styled.input<InputStyleProps>`
	${InputStyle};
`;

export const Textarea = styled.textarea<InputStyleProps>`
	${InputStyle};
`;

export const TextInputLabel = styled.label<InputStyleProps>`
	${LabelStyle};

	${TextInput}:read-only + & {
		color: var(--darkGray);
	}

	${TextInput}:not(:read-only)focus + & {
		color: var(--lightBlue);
	}
`;

export const TextareaLabel = styled.label<InputStyleProps>`
	${LabelStyle};

	${Textarea}:focus + & {
		color: var(--lightBlue);
	}
`;

export const ErrorLabel = styled.small<InputStyleProps>`
	position: absolute;
	color: var(--deepRed);
	left: 3px;
	bottom: -22px;
	font-size: 14px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 12px;
		bottom: -20px;
	}
`;
