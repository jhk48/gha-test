import { SyntheticEvent, useState } from 'react';
import { StockTransactionType } from '@prisma/client';
import { TextInput } from '@components/index';
import { CloseModalFn } from '@types';
import { isValidRealNumber, isValidInteger, getHoldingOfTicker, datetimeLocalFormat } from '@utils';
import toast from '@lib/toast';
import { useHoldingsList } from '@hooks/ReactQuery';
import { useEditStockTransaction } from '../queries';
import * as Style from './styles';

interface InitialInputValues {
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	date: string;
}

interface Props {
	stockTransactionId: number;
	portfolioId: number;
	initialInputs: InitialInputValues;
	closeFunction?: CloseModalFn;
}

export default function EditStockTransaction({
	stockTransactionId,
	portfolioId,
	initialInputs,
	closeFunction
}: Props) {
	const holdingsList = useHoldingsList(portfolioId);
	const editStockTransactionMutation = useEditStockTransaction();
	const [transactionTypeInput, setTransactionTypeInput] = useState<StockTransactionType>(
		initialInputs.type
	);
	const [priceInput, setPriceInput] = useState(initialInputs.price.toString());
	const [quantityInput, setQuantityInput] = useState(initialInputs.quantity.toString());
	const [dateInput, setDateInput] = useState(initialInputs.date);

	function handleChangeTransactionType(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setTransactionTypeInput(target.value as StockTransactionType);
	}

	function handleChangePrice(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		if (!isValidRealNumber(target.value)) return;
		setPriceInput(target.value);
	}

	function handleChangeQuantity(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		if (!isValidInteger(target.value)) return;
		setQuantityInput(target.value);
	}

	function handleChangeDate(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setDateInput(target.value);
	}

	function isValidSellQuantity(sellQuantity: number) {
		const holdingInfo = getHoldingOfTicker(holdingsList.data, initialInputs.ticker);
		if (!holdingInfo) return false;
		return holdingInfo.buyQuantity - holdingInfo.sellQuantity >= sellQuantity;
	}

	function validateInputs() {
		if (priceInput === '') {
			toast.error({ message: '가격을 입력해 주세요.' });
			return false;
		}

		if (quantityInput === '') {
			toast.error({ message: '수량을 입력해 주세요.' });
			return false;
		}

		if (transactionTypeInput === 'sell' && !isValidSellQuantity(Number(quantityInput))) {
			toast.error({ message: '매도 수량이 현재 보유 수량보다 많습니다.' });
			return false;
		}
		return true;
	}

	async function handleSubmitNewStockTransaction(e: SyntheticEvent) {
		e.preventDefault();
		if (!validateInputs()) return;

		const avgBuyCost =
			transactionTypeInput === 'buy'
				? undefined
				: getHoldingOfTicker(holdingsList.data, initialInputs.ticker)?.avgCost!;

		editStockTransactionMutation.mutate(
			{
				portfolioId,
				stockTransactionId,
				ticker: initialInputs.ticker,
				price: Number(priceInput),
				quantity: Number(quantityInput),
				type: transactionTypeInput,
				avgBuyCost,
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
			<Style.EditTransactionHeader>거래내역 수정</Style.EditTransactionHeader>
			<Style.EditTransactionForm onSubmit={handleSubmitNewStockTransaction}>
				<Style.EditTransactionRadioInputContainer>
					<Style.EditTransactionRadioInput
						id="radio-buy-stock"
						type="radio"
						name="stock-transaction-type"
						value="buy"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'buy'}
					/>
					<Style.EditTransactionRadioInputLabel htmlFor="radio-buy-stock">
						매수
					</Style.EditTransactionRadioInputLabel>
					<Style.EditTransactionRadioInput
						id="radio-sell-stock"
						type="radio"
						name="stock-transaction-type"
						value="sell"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'sell'}
					/>
					<Style.EditTransactionRadioInputLabel htmlFor="radio-sell-stock">
						매도
					</Style.EditTransactionRadioInputLabel>
				</Style.EditTransactionRadioInputContainer>
				<TextInput
					htmlFor="edit-stock-transaction-ticker"
					labelName="종목 티커"
					readOnly
					value={initialInputs.ticker}
				/>
				<TextInput
					htmlFor="edit-stock-transaction-price"
					labelName="가격"
					value={priceInput}
					handleChange={handleChangePrice}
				/>
				<TextInput
					htmlFor="edit-stock-transaction-quantity"
					labelName="수량"
					value={quantityInput}
					handleChange={handleChangeQuantity}
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
