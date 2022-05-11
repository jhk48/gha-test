import styled from 'styled-components';
import buttonMixin from '@styles/Mixins/buttonMixin';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { listActionButtonStyle } from '@components/ListPage';

interface SetDefaultButtonProps {
	isDefault: boolean;
	isError: boolean;
}

export const PortfolioNameSection = styled.div`
	min-width: 310px;
`;

export const PortfolioPrivacySection = styled.div`
	display: flex;
	align-items: center;
	min-width: 190px;
`;

export const PortfolioActionSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	min-width: 300px;

	& > div {
		display: flex;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		justify-content: space-between;
	}
`;

export const DefaultPortfolioButton = styled.button<SetDefaultButtonProps>`
	${listActionButtonStyle};
	color: ${({ isDefault }) => (isDefault ? 'var(--primary)' : 'var(--gray)')};
	color: ${({ isError }) => isError && 'var(--deepRed)'};
	text-decoration: ${({ isError }) => (isError ? 'underline' : '')};
	min-width: 220px;
`;

export const DefaultPortfolioRetryButton = styled.button`
	${buttonMixin};
	color: inherit;
	text-decoration: underline;
`;

export const EditNameButton = styled.button`
	${listActionButtonStyle};
	color: var(--deepOrange);
	margin-right: 14px;
`;

export const DeletePortfolioButton = styled.button`
	${listActionButtonStyle};
	color: var(--deepRed);
`;

export const TogglePrivacyButton = styled.button`
	${buttonMixin};
	text-decoration: underline;
	font-size: 0.8em;
	color: var(--stockPageTextSubColor);
`;
