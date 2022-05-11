import { ReactNode, MouseEvent, useRef } from 'react';
import { useHorizontalScrollBar } from '@hooks/ScrollBar';
import styled from 'styled-components';

interface Props {
	children: ReactNode;
}

export default function ListContainer({ children }: Props) {
	const outerContainerRef = useRef<HTMLDivElement>(null);
	const innerContainerRef = useRef<HTMLDivElement>(null);
	const { HorizontalScrollBarThumb, calculateThumbX, horizontalThumbW, horizontalThumbRef } =
		useHorizontalScrollBar({
			innerContainerRef,
			outerContainerRef,
			outerContainerBorderWidth: 1
		});

	const startPos = useRef({ left: 0, x: 0 });
	const isScrollBarGrabbed = useRef(false);
	function enableGrabbedState(e: MouseEvent) {
		if (!outerContainerRef.current) return;

		isScrollBarGrabbed.current = true;
		startPos.current = { left: outerContainerRef.current.scrollLeft, x: e.clientX };
	}

	function disableGrabbedState() {
		if (!isScrollBarGrabbed.current) return;
		if (!outerContainerRef.current) return;

		isScrollBarGrabbed.current = false;
		startPos.current = { left: 0, x: 0 };
		outerContainerRef.current.style.cursor = 'default';
	}

	function mouseMove(e: MouseEvent) {
		if (!isScrollBarGrabbed.current) return;
		if (!outerContainerRef.current) return;

		e.preventDefault();
		outerContainerRef.current.style.cursor = 'grabbing';
		const dx = startPos.current.x - e.clientX;
		outerContainerRef.current.scrollLeft = startPos.current.left + dx;
	}

	return (
		<OuterContainer
			ref={outerContainerRef}
			onScroll={calculateThumbX}
			onMouseDown={enableGrabbedState}
			onMouseUp={disableGrabbedState}
			onMouseMove={mouseMove}
			onMouseLeave={disableGrabbedState}
		>
			<HorizontalScrollBarThumb ref={horizontalThumbRef} width={horizontalThumbW} />
			<InnerContainer ref={innerContainerRef}>{children}</InnerContainer>
		</OuterContainer>
	);
}

const OuterContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 100%;
	overflow-x: scroll;

	::-webkit-scrollbar {
		width: 0;
	}
`;

const InnerContainer = styled.div`
	width: fit-content;
	min-width: 100%;
`;
