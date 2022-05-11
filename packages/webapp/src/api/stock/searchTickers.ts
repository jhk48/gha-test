import axios from 'axios';
import envConfig from '@configs/env';
import { SearchSymbolItem } from '@types';

interface ResponseType {
	data: SearchSymbolItem[];
}

export default async function searchTickers(query: string): Promise<SearchSymbolItem[]> {
	const { apiServerUrl } = envConfig;

	if (query === '') return [];
	try {
		const { data } = (await axios.get(
			`${apiServerUrl}/stock/query?search=${query}`
		)) as ResponseType;
		return data;
	} catch (error) {
		return [];
	}
}
