import { SyntheticEvent, useState } from 'react';
import { CashTransactionType } from '@prisma/client';
import { TextInput } from '@components/index';
import { CloseModalFn } from '@types';
import { isValidRealNumber, datetimeLocalFormat } from '@utils';
import toast from '@lib/toast';
import { useEditCashTransaction } from '../queries';
import * as Style from './styles';

interface InitialInputValues {
	amount: number;
	type: CashTransactionType;
	date: string;
}

interface Props {
	cashTransactionId: number;
	portfolioId: number;
	initialInputs: InitialInputValues;
	closeFunction?: CloseModalFn;
}

export default function EditCashTransaction({
	cashTransactionId,
	portfolioId,
	initialInputs,
	closeFunction
}: Props) {
	const editCashTransactionMutation = useEditCashTransaction(portfolioId);
	const [transactionTypeInput, setTransactionTypeInput] = useState<CashTransactionType>(
		initialInputs.type
	);
	const [amountInput, setAmountInput] = useState(initialInputs.amount.toString());
	const [dateInput, setDateInput] = useState(initialInputs.date);

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

	async function handleSubmitNewStockTransaction(e: SyntheticEvent) {
		e.preventDefault();
		if (!validateInputs()) return;

		editCashTransactionMutation.mutate(
			{
				cashTransactionId,
				amount: Number(amountInput),
				type: transactionTypeInput,
				date: dateInput
			},
			{
				onSuccess: () => {
					toast.success({ message: '성공적으로 거래내역을 수정했습니다.' });
					closeFunction!(e, false);
				},
				onError: () => toast.error({ message: '오류가 발생했습니다. 다시 시도해 주세요.' })
			}
		);
	}

	return (
		<Style.EditTransactionContainer>
			<Style.EditTransactionHeader>현금 거래내역 수정</Style.EditTransactionHeader>
			<Style.EditTransactionForm onSubmit={handleSubmitNewStockTransaction}>
				<Style.EditTransactionRadioInputContainer>
					<Style.EditTransactionRadioInput
						id="radio-deposit-cash"
						type="radio"
						name="cash-transaction-type"
						value="deposit"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'deposit'}
					/>
					<Style.EditTransactionRadioInputLabel htmlFor="radio-deposit-cash">
						입금
					</Style.EditTransactionRadioInputLabel>
					<Style.EditTransactionRadioInput
						id="radio-withdraw-cash"
						type="radio"
						name="cash-transaction-type"
						value="withdraw"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'withdraw'}
					/>
					<Style.EditTransactionRadioInputLabel htmlFor="radio-withdraw-cash">
						출금
					</Style.EditTransactionRadioInputLabel>
					<Style.EditTransactionRadioInput
						id="radio-purchased-cash"
						type="radio"
						name="cash-transaction-type"
						value="purchased"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'purchased'}
					/>
					<Style.EditTransactionRadioInputLabel htmlFor="radio-purchased-cash">
						매수
					</Style.EditTransactionRadioInputLabel>
					<Style.EditTransactionRadioInput
						id="radio-sold-cash"
						type="radio"
						name="cash-transaction-type"
						value="sold"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'sold'}
					/>
					<Style.EditTransactionRadioInputLabel htmlFor="radio-sold-cash">
						매도
					</Style.EditTransactionRadioInputLabel>
					<Style.EditTransactionRadioInput
						id="radio-dividend-cash"
						type="radio"
						name="cash-transaction-type"
						value="dividend"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'dividend'}
					/>
					<Style.EditTransactionRadioInputLabel htmlFor="radio-dividend-cash">
						배당
					</Style.EditTransactionRadioInputLabel>
				</Style.EditTransactionRadioInputContainer>

				<TextInput
					htmlFor="edit-stock-transaction-quantity"
					labelName="금액"
					value={amountInput}
					handleChange={handleChangeAmount}
				/>
				<TextInput
					type="datetime-local"
					htmlFor="edit-stock-transaction-date"
					labelName="날짜"
					value={datetimeLocalFormat(dateInput)}
					handleChange={handleChangeDate}
				/>
				<Style.EditTransactionSubmitButton type="submit" backgroundColor="var(--deepOrange)">
					수정하기
				</Style.EditTransactionSubmitButton>
			</Style.EditTransactionForm>
		</Style.EditTransactionContainer>
	);
}
