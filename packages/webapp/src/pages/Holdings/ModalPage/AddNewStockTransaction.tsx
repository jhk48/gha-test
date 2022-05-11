import { SyntheticEvent, useState } from 'react';
import { StockTransactionType } from '@prisma/client';
import { SearchStocks, TextInput } from '@components/index';
import { CloseModalFn } from '@types';
import toast from '@lib/toast';
import { useHoldingsList, useCashTransactionList } from '@hooks/ReactQuery';
import {
	isValidRealNumber,
	isValidInteger,
	datetimeLocalFormat,
	getHoldingOfTicker,
	calcTotalCashAmount,
	formatCurrency
} from '@utils';
import * as Style from './styles';
import { useAddStockTransaction } from '../queries';

interface Props {
	portfolioId: number;
	closeFunction?: CloseModalFn;
}

export default function AddNewStockTransaction({ portfolioId, closeFunction }: Props) {
	const holdingsList = useHoldingsList(portfolioId);
	const cashList = useCashTransactionList(portfolioId);
	const addStockTransactionMutation = useAddStockTransaction();
	const [transactionTypeInput, setTransactionTypeInput] = useState<StockTransactionType>('buy');
	const [relateCashInput, setRelateCashInput] = useState(false);
	const [tickerInput, setTickerInput] = useState('');
	const [priceInput, setPriceInput] = useState('');
	const [quantityInput, setQuantityInput] = useState('');
	const [dateInput, setDateInput] = useState(datetimeLocalFormat());

	function handleChangeTransactionType(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setTransactionTypeInput(target.value as StockTransactionType);
	}

	function handleRelateCash() {
		setRelateCashInput(prev => !prev);
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

	function handleClickSearchStockItem(ticker: string) {
		setTickerInput(ticker);
	}

	function isValidSellQuantity(ticker: string, sellQuantity: number) {
		const holdingInfo = getHoldingOfTicker(holdingsList.data, ticker);
		if (!holdingInfo) return false;
		return holdingInfo.buyQuantity - holdingInfo.sellQuantity >= sellQuantity;
	}

	function isCashAmountEnough() {
		const totalCashAmount = calcTotalCashAmount(cashList.data);
		return totalCashAmount >= Number(priceInput) * Number(quantityInput);
	}

	function validateInputs() {
		if (tickerInput === '') {
			toast.error({ message: '티커를 입력해 주세요.' });
			return false;
		}

		if (priceInput === '') {
			toast.error({ message: '가격을 입력해 주세요.' });
			return false;
		}

		if (quantityInput === '') {
			toast.error({ message: '수량을 입력해 주세요.' });
			return false;
		}

		if (
			transactionTypeInput === 'sell' &&
			!isValidSellQuantity(tickerInput, Number(quantityInput))
		) {
			toast.error({ message: '매도 수량이 현재 보유 수량보다 많습니다.' });
			return false;
		}

		if (relateCashInput && transactionTypeInput === 'buy' && !isCashAmountEnough()) {
			toast.error({ message: '현금 보유량이 부족합니다.' });
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
				: getHoldingOfTicker(holdingsList.data, tickerInput)?.avgCost!;

		addStockTransactionMutation.mutate(
			{
				portfolioId,
				ticker: tickerInput,
				price: Number(priceInput),
				quantity: Number(quantityInput),
				type: transactionTypeInput,
				relateCash: relateCashInput,
				avgBuyCost,
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
			<Style.Header>주식 거래내역 추가</Style.Header>
			<SearchStocks onResultClick={handleClickSearchStockItem} />
			<Style.Form onSubmit={handleSubmitNewStockTransaction}>
				<Style.RadioInputContainer>
					<Style.RadioInput
						id="radio-buy-stock"
						type="radio"
						name="stock-transaction-type"
						value="buy"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'buy'}
					/>
					<Style.RadioInputLabel htmlFor="radio-buy-stock">매수</Style.RadioInputLabel>
					<Style.RadioInput
						id="radio-sell-stock"
						type="radio"
						name="stock-transaction-type"
						value="sell"
						onChange={handleChangeTransactionType}
						checked={transactionTypeInput === 'sell'}
					/>
					<Style.RadioInputLabel htmlFor="radio-sell-stock">매도</Style.RadioInputLabel>
				</Style.RadioInputContainer>
				<Style.RelateCashSection>
					<input
						id="relate-cash"
						type="checkbox"
						checked={relateCashInput}
						onChange={handleRelateCash}
					/>
					<label htmlFor="relate-cash">
						{transactionTypeInput === 'buy'
							? '보유현금에서 금액만큼 차감하기'
							: '보유현금에 금액만큼 예치하기'}
					</label>
				</Style.RelateCashSection>
				<Style.CurrentTotalCashSection>
					<span>현재 보유현금: </span>
					{formatCurrency(calcTotalCashAmount(cashList.data), 'usd')}
				</Style.CurrentTotalCashSection>
				<TextInput
					htmlFor="new-stock-transaction-ticker"
					labelName="종목 티커"
					readOnly
					value={tickerInput}
				/>
				<TextInput
					htmlFor="new-stock-transaction-price"
					labelName="가격"
					value={priceInput}
					handleChange={handleChangePrice}
				/>
				<TextInput
					htmlFor="new-stock-transaction-quantity"
					labelName="수량"
					value={quantityInput}
					handleChange={handleChangeQuantity}
				/>
				<TextInput
					type="datetime-local"
					htmlFor="new-stock-transaction-date"
					labelName="날짜"
					value={dateInput}
					handleChange={handleChangeDate}
				/>
				<Style.TotalCostSection>
					총 합계: {formatCurrency(Number(priceInput) * Number(quantityInput), 'usd')}
				</Style.TotalCostSection>
				<Style.SubmitButton type="submit" backgroundColor="var(--primary)">
					추가하기
				</Style.SubmitButton>
			</Style.Form>
		</Style.Container>
	);
}
