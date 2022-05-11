import { css } from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

export const navbarIconMixin = css`
	& > p {
		margin-top: 0.4em;
		font-size: 13px;
		color: var(--baseTextColor);
	}

	& > svg {
		fill: var(--navbarIconBgColor);
		stroke: var(--navbarIconBgColor);
	}

	&.active {
		& > p {
			color: var(--primary);
		}
		& > svg {
			fill: var(--primary);
			stroke: var(--primary);
		}
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		& > svg {
			transform: scale(0.85);
		}
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		& > p {
			font-size: 12px;
		}
		& > svg {
			transform: scale(0.8);
		}
	}
`;
