import { ReactNode, useRef } from 'react';
import { useVerticalScrollBar } from '@hooks/index';
import * as Style from './styles';

interface Props {
	isListEmpty: boolean;
	emptyListNoticeMessage: string;
	maxHeight?: string;
	children: ReactNode;
}

export default function ListItems({
	isListEmpty,
	emptyListNoticeMessage,
	maxHeight,
	children
}: Props) {
	const outerContainerRef = useRef<HTMLDivElement>(null);
	const innerContainerRef = useRef<HTMLUListElement>(null);
	const { VerticalScrollBarThumb, calculateThumbY, verticalThumbH, verticalThumbRef } =
		useVerticalScrollBar({
			innerContainerRef,
			outerContainerRef,
			outerContainerBorderWidth: 1
		});
	return (
		<Style.ListItemsContainer
			ref={outerContainerRef}
			onScroll={calculateThumbY}
			maxHeight={maxHeight}
		>
			<VerticalScrollBarThumb ref={verticalThumbRef} height={verticalThumbH} />
			<Style.ListItemUl ref={innerContainerRef}>
				{isListEmpty ? (
					<Style.EmptyListNotice>{emptyListNoticeMessage}</Style.EmptyListNotice>
				) : (
					children
				)}
			</Style.ListItemUl>
		</Style.ListItemsContainer>
	);
}
