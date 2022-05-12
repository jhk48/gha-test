import styled from 'styled-components';
import { buttonMixin } from '@styles/Mixins';

export const Container = styled.div`
	position: relative;
	width: 100%;
`;

export const Input = styled.input`
	width: 100%;
	font-size: 14px;
	background-color: var(--inputBgColor);
	color: var(--baseTextColor);
	border: 1px solid var(--baseBorderColor);
	border-radius: 4px;
	outline: none;
	padding: 5px 5px 5px 30px;

	& + svg {
		position: absolute;
		top: 7px;
		left: 7px;
		stroke: var(--gray);
		fill: none;
	}

	&:focus {
		border-color: var(--lightBlue);
		box-shadow: 0 0 5px var(--lightBlue);
		outline: 1px solid var(--lightBlue);

		& + svg {
			stroke: var(--lightBlue);
		}
	}
`;

export const SearchResultContainer = styled.ul`
	position: absolute;
	z-index: 2;
	top: 34px;
	left: 0px;
	width: 100%;
	list-style-type: none;
	margin: 0;
	padding: 0;
	max-height: 300px;
	overflow-y: scroll;
	background-color: var(--navbarBgColor);

	scrollbar-width: none;
	::-webkit-scrollbar {
		width: 0;
	}
`;

export const SearchListItem = styled.li`
	display: flex;
	flex-direction: column;
	padding: 8px 3px;
	cursor: pointer;
	color: var(--stockPageTextSubColor);

	& + & {
		border-top: 1px solid var(--searchStockItemBorderColor);
	}

	&:hover {
		background-color: var(--searchStockHoverBgColor);
	}
`;

export const SearchResultName = styled.div``;

export const SearchResultLowerSection = styled.div`
	display: flex;
	font-size: 14px;
	margin-top: 4px;
`;

export const SearchResultTicker = styled.div`
	margin-right: 8px;
`;

export const SearchResultExchange = styled.div``;

export const SearchResultType = styled.div``;

export const MatchedWord = styled.span`
	font-weight: 700;
	color: var(--deepBlue);
`;

export const ClearQueryBtn = styled.button`
	${buttonMixin};
	position: absolute;
	top: 10px;
	right: 3px;

	& > svg {
		fill: var(--gray);
	}
`;
