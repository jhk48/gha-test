import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { useVerticalScrollBar } from '@hooks/ScrollBar';
import { SearchSymbolItem } from '@types';
import * as Style from './styles';
import MatchWord from './MatchWord';

interface Props {
	searchQuery: string;
	searchResults: SearchSymbolItem[];
	onResultClick: any;
}

export default function SearchResultList({ searchQuery, searchResults, onResultClick }: Props) {
	const outerContainerRef = useRef<HTMLUListElement>(null);
	const innerContainerRef = useRef<HTMLDivElement>(null);
	const { VerticalScrollBarThumb, calculateThumbY, verticalThumbH, verticalThumbRef } =
		useVerticalScrollBar({
			innerContainerRef,
			outerContainerRef,
			outerContainerBorderWidth: 1
		});

	return (
		<Style.SearchResultContainer ref={outerContainerRef} onScroll={calculateThumbY}>
			<VerticalScrollBarThumb ref={verticalThumbRef} height={verticalThumbH} />
			<div ref={innerContainerRef}>
				{searchResults.map(({ ticker, name, exchange, type }) => (
					<Style.SearchListItem
						id="search-list-item"
						key={`${ticker}${uuid()}`}
						onClick={() => onResultClick(ticker, name)}
					>
						<MatchWord type="name" word={name} query={searchQuery} />
						<Style.SearchResultLowerSection>
							<MatchWord type="ticker" word={ticker} query={searchQuery} />
							<Style.SearchResultType>{stockTypeKor[type]}-</Style.SearchResultType>
							<Style.SearchResultExchange>{exchange}</Style.SearchResultExchange>
						</Style.SearchResultLowerSection>
					</Style.SearchListItem>
				))}
			</div>
		</Style.SearchResultContainer>
	);
}

const stockTypeKor = {
	ad: 'ADR',
	cs: '보통주',
	et: 'ETF',
	ps: '우선주',
	rt: '신주인수권',
	struct: '구조화 상품',
	ut: '유닛',
	wt: '워런트'
} as const;
