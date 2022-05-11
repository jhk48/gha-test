import { Dispatch, SetStateAction } from 'react';
import { Times as TimesIcon } from '@components/Icon';
import { ClearQueryBtn } from './styles';

interface Props {
	query: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
}

export default function ClearQueryButton({ query, setSearchQuery }: Props) {
	function resetQuery() {
		setSearchQuery('');
	}

	if (query === '') return null;

	return (
		<ClearQueryBtn type="button" onClick={resetQuery}>
			<TimesIcon width={10} height={10} />
		</ClearQueryBtn>
	);
}
