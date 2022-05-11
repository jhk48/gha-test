import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { buttonMixin } from '@styles/Mixins';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 500px;
	margin: auto;
`;

export const Header = styled.h1`
	text-align: center;
	font-size: 130px;
	font-weight: 700;
	color: var(--primary);
`;

export const Notice = styled.p`
	font-size: 20px;
	margin: 12px 0;
`;

export const BackToHomeButton = styled(Link)`
	${buttonMixin};
	text-decoration: none;
	padding: 0.3em 0.5em;
	border-radius: 4px;
	color: var(--white);
	background-color: var(--primary);
`;
