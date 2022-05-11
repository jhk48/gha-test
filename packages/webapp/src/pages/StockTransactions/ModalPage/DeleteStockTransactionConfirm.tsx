import { SyntheticEvent } from 'react';
import { useSelectedPortfolioId } from '@components/SelectPortfolio';
import { StockTransactionType } from '@prisma/client';
import { CloseModalFn } from '@src/types';
import { useHoldingsList } from '@hooks/ReactQuery';
import { getHoldingOfTicker } from '@utils';
import toast from '@lib/toast';
import * as Style from './styles';
import { useDeleteStockTransaction } from '../queries';

interface Props {
	stockTransactionId: number;
	ticker: string;
	type: StockTransactionType;
	quantityToDelete: number;
	closeFunction?: CloseModalFn;
}

export default function DeleteStockTransactionConfirm({
	stockTransactionId,
	ticker,
	type,
	quantityToDelete,
	closeFunction
}: Props) {
	const portfolioId = useSelectedPortfolioId();
	const holdingsList = useHoldingsList(portfolioId);
	const deleteStockTransactionMutation = useDeleteStockTransaction();

	function canDeleteBuyTransaction() {
		const holdingInfo = getHoldingOfTicker(holdingsList.data, ticker);
		if (!holdingInfo) return false;
		return holdingInfo.buyQuantity - quantityToDelete - holdingInfo.sellQuantity >= 0;
	}

	function handleDeleteTransaction(e: SyntheticEvent) {
		if (type === 'buy' && !canDeleteBuyTransaction()) {
			toast.error({ message: '보유 수량이 음수가 될 수 없습니다.', duration: 5000 });
			return;
		}
		deleteStockTransactionMutation.mutate(
			{ portfolioId, stockTransactionId, ticker },
			{
				onSuccess: () => {
					toast.success({ message: '거래내역을 성공적으로 삭제했습니다.' });
					closeFunction!(e, false);
				},
				onError: () => toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요.' })
			}
		);
	}

	return (
		<>
			<Style.DeleteConfirmHeader>{ticker} 거래내역 삭제</Style.DeleteConfirmHeader>
			<Style.DeleteConfirmMessage>정말로 거래내역을 삭제하시겠습니까?</Style.DeleteConfirmMessage>
			<Style.DeleteConfirmButtonContainer>
				<Style.DeleteCancelButton type="button" onClick={closeFunction}>
					취소
				</Style.DeleteCancelButton>
				<Style.DeletePortfolioButton type="button" onClick={handleDeleteTransaction}>
					삭제
				</Style.DeletePortfolioButton>
			</Style.DeleteConfirmButtonContainer>
		</>
	);
}
