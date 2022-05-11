import styled from 'styled-components';

export interface CardStyleProps {
	width?: string | number;
	height?: string | number;
	bgColorOnHover?: boolean;
}

const Card = styled.div<CardStyleProps>`
	position: relative;
	background-color: var(--cardBgColor);
	color: var(--baseTextColor);
	border-radius: 4px;
	box-shadow: var(--cardBoxShadow);
	width: ${({ width }) => width ?? '100%'};
	height: ${({ height }) => height ?? '100%'};

	&:hover {
		${({ bgColorOnHover }) => bgColorOnHover && 'background-color: var(--cardHoverBgColor)'};
	}
`;

export default Card;
