import { SyntheticEvent, useState } from 'react';
import { CashTransactionType } from '@prisma/client';
import { TextInput } from '@components/index';
import { CloseModalFn } from '@types';
import { isValidRealNumber, datetimeLocalFormat } from '@utils';
import toast from '@lib/toast';
import * as Style from './styles';
import { useAddCashTransaction } from '../queries';

interface Props {
	portfolioId: number;
	closeFunction?: CloseModalFn;
}

export default function AddCashTransaction({ portfolioId, closeFunction }: Props) {
	const addCashTransactionMutation = useAddCashTransaction();
	const [transactionTypeInput, setTransactionTypeInput] = useState<CashTransactionType>('deposit');
	const [amountInput, setAmountInput] = useState('');
	const [dateInput, setDateInput] = useState(datetimeLocalFormat());

	function handleChangeTransactionType(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setTransactionTypeInput(target.value as CashTransactionType);
	}

	function handleChangeAmount(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		if (!isValidRealNumber(target.value)) return;
		setAmountInput(target.value);
	}

	function handleChangeDate(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setDateInput(target.value);
	}

	function validateInputs() {
		if (amountInput === '') {
			toast.error({ message: '수량을 입력해 주세요.' });
			return false;
		}

		return true;
	}

	async function handleSubmitNewCashTransaction(e: SyntheticEvent) {
		e.preventDefault();
		if (!validateInputs()) return;

		addCashTransactionMutation.mutate(
			{
				portfolioId,
				amount: Number(amountInput),
				type: transactionTypeInput,
				date: dateInput
			},
			{
				onSuccess: () => {
					toast.success({ message: '성공적으로 거래내역을 추가했습니다.' });
					closeFunction!(e, false);
				},
				onError: () => toast.error({ message: '오류가 발생했습니다. 다시 시도해 주세요.' })
			}
		);
	}

	return (
		<Style.Container>
			<Style.Header>현금 거래내역 추가</Style.Header>
			<Style.Form onSubmit={handleSubmitNewCashTransaction}>
				<Style.RadioInputContainer>
					<Style.RadioInput
						id="radio-deposit-cash"
						type="radio"
						name="cash-transaction-type"
						value="deposit"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'deposit'}
					/>
					<Style.RadioInputLabel htmlFor="radio-deposit-cash">입금</Style.RadioInputLabel>
					<Style.RadioInput
						id="radio-withdraw-cash"
						type="radio"
						name="cash-transaction-type"
						value="withdraw"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'withdraw'}
					/>
					<Style.RadioInputLabel htmlFor="radio-withdraw-cash">출금</Style.RadioInputLabel>
				</Style.RadioInputContainer>
				<TextInput
					htmlFor="new-cash-transaction-amount"
					labelName="금액"
					value={amountInput}
					handleChange={handleChangeAmount}
				/>
				<TextInput
					type="datetime-local"
					htmlFor="new-cash-transaction-date"
					labelName="날짜"
					value={dateInput}
					handleChange={handleChangeDate}
				/>
				<Style.SubmitButton type="submit" backgroundColor="var(--primary)">
					추가하기
				</Style.SubmitButton>
			</Style.Form>
		</Style.Container>
	);
}
