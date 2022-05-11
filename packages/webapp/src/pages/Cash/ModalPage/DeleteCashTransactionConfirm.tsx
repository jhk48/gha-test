import { SyntheticEvent } from 'react';
import { CloseModalFn } from '@src/types';
import toast from '@lib/toast';
import * as Style from './styles';
import { useDeleteCashTransaction } from '../queries';

interface Props {
	cashTransactionId: number;
	portfolioId: number;
	closeFunction?: CloseModalFn;
}

export default function DeleteCashTransactionConfirm({
	cashTransactionId,
	portfolioId,
	closeFunction
}: Props) {
	const deleteCashTransactionMutation = useDeleteCashTransaction(portfolioId);

	function handleDeleteTransaction(e: SyntheticEvent) {
		deleteCashTransactionMutation.mutate(cashTransactionId, {
			onSuccess: () => {
				toast.success({ message: '거래내역을 성공적으로 삭제했습니다.' });
				closeFunction!(e, false);
			},
			onError: () => toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요.' })
		});
	}

	return (
		<>
			<Style.DeleteConfirmHeader>현금 거래내역 삭제</Style.DeleteConfirmHeader>
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
