import axios from 'axios';
import envConfig from '@configs/env';
import { CashTransactionLog } from '@prisma/client';

interface DeleteCashTransactionRes {
	data: {
		deletedCashTransaction: CashTransactionLog;
	};
}

export default async function deleteCashTransaction(cashTransactionId: number) {
	const { apiServerUrl } = envConfig;

	const { data }: DeleteCashTransactionRes = await axios.delete(
		`${apiServerUrl}/portfolios/cash/${cashTransactionId}`,
		{ withCredentials: true }
	);
	return data.deletedCashTransaction;
}
