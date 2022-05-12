import styled, { css } from 'styled-components';
import buttonMixin from '@styles/Mixins/buttonMixin';

interface ListItemsContainerProps {
	maxHeight?: string;
}

interface MaxWidthProps {
	maxWidth?: string;
}

const LIST_ITEM_LEFT_RIGHT_PADDING_PX = 6;

const sectionStyle = css`
	max-width: 1680px;
	padding: 0 40px;
`;

export const UpperSection = styled.section<MaxWidthProps>`
	${sectionStyle};
	margin: 0 auto;
	max-width: ${({ maxWidth }) => maxWidth ?? 'none'};
`;

export const LowerSection = styled.section<MaxWidthProps>`
	${sectionStyle};
	margin: 40px auto 20px;
	max-width: ${({ maxWidth }) => maxWidth ?? 'none'};
`;

export const MainHeader = styled.h1`
	font-size: 48px;
	font-weight: 700;
	line-height: 1.2;
`;

export const NumOfItems = styled.p`
	margin: 0;
	color: var(--stockPageTextSubColor);
`;

export const UpperSectionButtonContainer = styled.div`
	display: flex;
	justify-content: end;
	margin-bottom: 12px;
`;

const listPageButtonStyle = css`
	${buttonMixin};
	display: flex;
	align-items: center;
	color: var(--white);
	padding: 0.25em 0.45em;
	border-radius: 4px;
`;

export const SearchFilterButton = styled.button`
	${listPageButtonStyle};
	background-color: var(--filterButtonBgColor);
	margin-right: 10px;

	& > svg {
		margin: 2px 6px 0 0;
		fill: var(--white);
	}
`;

export const AddItemButton = styled.button`
	${listPageButtonStyle};
	background-color: var(--primary);

	& > svg {
		margin-right: 6px;
		stroke: var(--white);
	}
`;

export const SearchInputContainer = styled.div`
	position: relative;
	width: 100%;

	& > svg {
		position: absolute;
		top: 10px;
		left: 7px;
		stroke: var(--gray);
		fill: none;
	}
`;

export const SearchInput = styled.input`
	color: var(--baseTextColor);
	padding: 0.6em 0.5em 0.6em 2.5em;
	background-color: var(--inputBgColor);
	border: 1px solid var(--baseBorderColor);
	border-radius: 4px;
	outline: none;
	width: 100%;

	&:focus {
		border-color: var(--lightBlue);
		box-shadow: 0 0 5px var(--lightBlue);
		outline: 1px solid var(--lightBlue);

		& + svg {
			stroke: var(--lightBlue);
		}
	}
`;

export const ListHeaderContainer = styled.div`
	display: flex;
	width: fit-content;
	min-width: 100%;
	font-size: 18px;
	font-weight: 700;
	color: var(--stockPageTextSubColor);
	border-bottom: 1px solid var(--darkGray);
	padding: 0 ${LIST_ITEM_LEFT_RIGHT_PADDING_PX}px 0.5em;
`;

export const ListItemsContainer = styled.div<ListItemsContainerProps>`
	position: relative;
	width: fit-content;
	min-width: 100%;
	margin: 0;
	padding: 0;
	max-height: ${({ maxHeight }) => maxHeight ?? '50vh'};
	overflow-y: scroll;

	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0;
	}
`;

export const ListItemUl = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

export const ListItem = styled.li`
	display: flex;
	padding: 1em ${LIST_ITEM_LEFT_RIGHT_PADDING_PX}px;

	& + & {
		border-top: 1px solid var(--baseBorderColor);
	}
`;

export const EmptyListNotice = styled.p`
	margin-top: 20px;
	text-align: center;
`;

export const listActionButtonStyle = css`
	background: none;
	outline: none;
	border: none;
	display: flex;
	align-items: center;
	cursor: pointer;

	& > svg {
		margin: 2px 2px 0 0;
	}
`;
