import { css } from 'styled-components';
import buttonMixin from './buttonMixin';

export interface MemoButtonMixinProps {
	isMemoExist: boolean;
}

export const memoButtonMixin = css<MemoButtonMixinProps>`
	${buttonMixin}
	padding: 0;
	cursor: pointer;

	& > svg {
		fill: ${({ isMemoExist }) => (isMemoExist ? 'var(--baseTextColor)' : 'var(--gray)')};
	}
`;
