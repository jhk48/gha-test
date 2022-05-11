import * as Style from './styles';

interface Props {
	type: 'name' | 'ticker';
	word: string;
	query: string;
}

export default function MatchWord({ type, word, query }: Props) {
	const { length } = query;
	const WordContainer = type === 'name' ? Style.SearchResultName : Style.SearchResultTicker;
	return (
		<>
			{word.slice(0, length).toLowerCase() === query.toLowerCase() ? (
				<WordContainer>
					<Style.MatchedWord>{word.slice(0, length)}</Style.MatchedWord>
					<span>{word.slice(length)}</span>
				</WordContainer>
			) : (
				<WordContainer>{word}</WordContainer>
			)}
		</>
	);
}
