import { css } from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

export const BASE_FONT_SIZE_PX = {
	desktop: 16,
	laptop: 14
};

export const stockPageBaseFontStyle = css`
	font-size: ${BASE_FONT_SIZE_PX.desktop}px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		font-size: ${BASE_FONT_SIZE_PX.laptop}px;
	}
`;
