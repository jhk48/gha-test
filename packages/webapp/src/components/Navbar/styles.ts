import styled, { css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { NAVBAR_WIDTH } from '@constants/index';
import { flexMixin, flexCenter, navbarIconMixin, buttonMixin } from '@styles/Mixins';

export const Container = styled.aside`
	display: flex;
	flex-direction: column;
	position: sticky;
	top: 0;
	background-color: var(--navbarBgColor);
	width: ${NAVBAR_WIDTH}px;
	height: 100vh;
	z-index: 2;
`;

export const Top = styled.div`
	position: relative;
	${flexMixin}
	height: 13%;

	& > img {
		position: absolute;
		top: 24px;
	}
`;

export const Middle = styled.div`
	${flexMixin}
	height: 85%;
`;

export const Bottom = styled.div`
	${flexMixin}
	height: 12%;
`;

export const NavbarLink = styled(NavLink)`
	${flexMixin}
	flex-direction: column;
	align-items: center;
	transform: scale(0.9);
	text-decoration: none;
	${navbarIconMixin};
`;

export const Button = styled.button`
	${buttonMixin};
	${navbarIconMixin};
	${flexCenter};
	flex-direction: column;
`;

export const DropdownContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--navbarBgColor);
	border: 1px solid var(--navbarDropdownBorderColor);
	border-radius: 4px;
	left: ${NAVBAR_WIDTH - 8}px;
	bottom: 34px;

	&::after {
		content: '◀';
		position: absolute;
		left: -13px;
		bottom: 6px;
		z-index: 1;
		color: var(--navbarDropdownBorderColor);
	}
`;

const dropdownButtonStyle = css`
	color: var(--baseTextColor);
	${buttonMixin};
	padding: 10px 16px;
	width: 120px;

	&:hover {
		background-color: var(--primary);
		color: var(--white);
	}
`;

export const DropdownButton = styled.button`
	${dropdownButtonStyle};
`;

export const ProfilePageLink = styled(Link)`
	${dropdownButtonStyle};
	text-align: center;
	text-decoration: none;
`;

export const ProfileImageContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--cardBgColor);
	width: 50px;
	height: 50px;
	box-shadow: 0 0 0 1px var(--baseBorderColor);
	border-radius: 50%;

	& > svg {
		fill: var(--gray);
	}
`;
