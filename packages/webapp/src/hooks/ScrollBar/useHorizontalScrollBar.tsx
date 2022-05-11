import { useRef, useState, useEffect, MutableRefObject, useCallback } from 'react';
import styled, { StyledComponent, DefaultTheme } from 'styled-components';
import { scrollBarMixin } from '@styles/Mixins';
import { HorizontalScrollBarThumbProps } from '@types';

const MIN_THUMB_W = 60;

interface Props {
	outerContainerRef: MutableRefObject<any>;
	innerContainerRef: MutableRefObject<any>;
	outerContainerBorderWidth: number;
}

interface ReturnType {
	calculateThumbX: () => void;
	HorizontalScrollBarThumb: StyledComponent<
		'div',
		DefaultTheme,
		HorizontalScrollBarThumbProps,
		never
	>;
	horizontalThumbW: number;
	horizontalThumbRef: MutableRefObject<HTMLDivElement | null>;
}

interface CalculateRevisedThumbProps {
	outerLeft: number;
	innerLeft: number;
	outerW: number;
	innerW: number;
	thumbW: number;
	outerContainerBorderWidth: number;
	isRevisedToMinW?: boolean;
}

const ScrollBarThumb = styled.div<HorizontalScrollBarThumbProps>`
	${scrollBarMixin};
	width: ${({ width }) => width}px;
	height: 8px;
	bottom: 0px;
	left: 1px;
	background-color: var(--scrollBarThumbBgColor);
`;

function calculateRevisedThumbW({
	outerLeft,
	innerLeft,
	outerW,
	innerW,
	thumbW,
	outerContainerBorderWidth,
	isRevisedToMinW = false
}: CalculateRevisedThumbProps) {
	const maxThumbScrollX = innerW - thumbW;
	const innerContainerX = outerLeft - innerLeft;
	const scrollYFactor = (innerW - thumbW) / (innerW - outerW);
	const minWFactor = isRevisedToMinW
		? (maxThumbScrollX - (MIN_THUMB_W - thumbW)) / maxThumbScrollX
		: 1;
	const thumbScrollYTmp = innerContainerX * scrollYFactor * minWFactor;
	const revisedMaxThumbScrollY = maxThumbScrollX - (isRevisedToMinW ? MIN_THUMB_W - thumbW : 0);
	const thumbScrollY =
		thumbScrollYTmp < outerContainerBorderWidth ? outerContainerBorderWidth : thumbScrollYTmp;
	return thumbScrollY > revisedMaxThumbScrollY ? revisedMaxThumbScrollY : thumbScrollY;
}

export default function useHorizontalScrollBar({
	outerContainerRef,
	innerContainerRef,
	outerContainerBorderWidth = 1
}: Props): ReturnType {
	const thumbRef = useRef<HTMLDivElement | null>(null);
	const originalThumbW = useRef(-1);
	const [thumbW, setThumbWidth] = useState(0);

	useEffect(() => {
		let intervalId: NodeJS.Timer;
		function initThumbWidth() {
			if (!outerContainerRef.current || !innerContainerRef.current || !thumbRef.current) return;
			clearInterval(intervalId);
			const { clientWidth: outerW } = outerContainerRef.current;
			const { clientWidth: innerW } = innerContainerRef.current;
			if (innerW <= outerW) {
				setThumbWidth(0);
				return;
			}

			const thumbWCandidate = outerW ** 2 / innerW;
			if (thumbWCandidate < MIN_THUMB_W) originalThumbW.current = thumbWCandidate;
			setThumbWidth(thumbWCandidate < MIN_THUMB_W ? MIN_THUMB_W : thumbWCandidate);
		}

		if (!outerContainerRef.current || !innerContainerRef.current || !thumbRef.current) {
			intervalId = setInterval(initThumbWidth, 1);
		} else initThumbWidth();
	});

	useEffect(() => {
		let intervalId: NodeJS.Timer;
		function initThumbX() {
			if (!thumbRef.current) return;
			if (!outerContainerRef.current) return;
			if (!innerContainerRef.current) return;

			const { clientWidth: outerW } = outerContainerRef.current;
			const { clientWidth: innerW } = innerContainerRef.current;
			const { left: outerLeft } = outerContainerRef.current.getBoundingClientRect();
			const { left: innerLeft } = innerContainerRef.current.getBoundingClientRect();

			const revisedThumbScrollX =
				originalThumbW.current === -1
					? calculateRevisedThumbW({
							outerLeft,
							innerLeft,
							outerW,
							innerW,
							outerContainerBorderWidth,
							thumbW
					  })
					: calculateRevisedThumbW({
							outerLeft,
							innerLeft,
							outerW,
							innerW,
							thumbW: originalThumbW.current,
							outerContainerBorderWidth,
							isRevisedToMinW: true
					  });
			thumbRef.current.style.transform = `translateX(${revisedThumbScrollX}px)`;
			clearInterval(intervalId);
		}

		if (!outerContainerRef.current || !innerContainerRef.current || !thumbRef.current) {
			intervalId = setInterval(initThumbX, 1);
		} else initThumbX();
	}, [thumbW, innerContainerRef, outerContainerRef, outerContainerBorderWidth]);

	const calculateThumbX = useCallback(() => {
		if (!thumbRef.current) return;
		if (!outerContainerRef.current) return;
		if (!innerContainerRef.current) return;

		const { clientWidth: outerW } = outerContainerRef.current;
		const { clientWidth: innerW } = innerContainerRef.current;
		const { left: outerLeft } = outerContainerRef.current.getBoundingClientRect();
		const { left: innerLeft } = innerContainerRef.current.getBoundingClientRect();

		const revisedThumbScrollX =
			originalThumbW.current === -1
				? calculateRevisedThumbW({
						outerLeft,
						innerLeft,
						outerW,
						innerW,
						outerContainerBorderWidth,
						thumbW
				  })
				: calculateRevisedThumbW({
						outerLeft,
						innerLeft,
						outerW,
						innerW,
						thumbW: originalThumbW.current,
						outerContainerBorderWidth,
						isRevisedToMinW: true
				  });
		thumbRef.current.style.transform = `translateX(${revisedThumbScrollX}px)`;
	}, [thumbW, innerContainerRef, outerContainerRef, outerContainerBorderWidth]);

	return {
		calculateThumbX,
		HorizontalScrollBarThumb: ScrollBarThumb,
		horizontalThumbW: thumbW,
		horizontalThumbRef: thumbRef
	};
}
