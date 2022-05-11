import { CashTransactionLog } from '@prisma/client';

export default function calcTotalAmount(cashList: CashTransactionLog[] | undefined) {
	if (!cashList || cashList.length === 0) return 0;

	return cashList.reduce((acc, { transactionType, amount }) => {
		if (transactionType === 'withdraw' || transactionType === 'purchased') {
			return acc - amount;
		}
		return acc + amount;
	}, 0);
}
