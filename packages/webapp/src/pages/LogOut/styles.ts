import styled, { css } from 'styled-components';
import { buttonMixin } from '@styles/Mixins';

export const PageContainer = styled.div`
	width: 300px;
	height: 90px;
`;

export const Header = styled.header`
	color: var(--baseTextColor);
	text-align: center;
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 1em;
`;

const logOutButtonStyle = css`
	${buttonMixin};
	border-radius: 4px;
	padding: 0.2em 0.6em;
	color: var(--white); ;
`;

export const CancelButton = styled.button`
	${logOutButtonStyle};
	background-color: var(--gray);
`;

export const LogOutButton = styled.button`
	${logOutButtonStyle};
	background-color: var(--deepRed);
`;
