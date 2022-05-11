import { css } from 'styled-components';

type FlexDirectionOptions = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type AlginItemsOptions =
	| 'baseline'
	| 'center'
	| 'end'
	| 'flex-end'
	| 'flex-start'
	| 'inherit'
	| 'initial'
	| 'normal'
	| 'revert'
	| 'self-end'
	| 'self-start'
	| 'start'
	| 'stretch'
	| 'unset';

type JustifyContentOptions =
	| 'center'
	| 'end'
	| 'flex-end'
	| 'flex-start'
	| 'inherit'
	| 'initial'
	| 'left'
	| 'normal'
	| 'revert'
	| 'right'
	| 'space-around'
	| 'space-between'
	| 'space-evenly'
	| 'start'
	| 'stretch'
	| 'unset';

export interface FlexProps {
	flexDirection?: FlexDirectionOptions;
	alignItems?: AlginItemsOptions;
	justifyContent?: JustifyContentOptions;
}

export const flexMixin = css<FlexProps>`
	display: flex;
	flex-direction: ${({ flexDirection }) => flexDirection ?? 'row'};
	align-items: ${({ alignItems }) => alignItems ?? 'normal'};
	justify-content: ${({ justifyContent }) => justifyContent ?? 'normal'};
`;

export const flexCenter = css`
	display: flex;
	align-items: center;
	justify-content: center;
`;
