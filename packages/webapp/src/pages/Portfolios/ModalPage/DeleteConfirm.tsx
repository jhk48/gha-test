import { SyntheticEvent } from 'react';
import { CloseModalFn } from '@src/types';
import toast from '@lib/toast';
import * as Style from './styles';
import { useDeletePortfolio } from '../queries';

interface Props {
	closeFunction?: CloseModalFn;
	portfolioId: number;
	portfolioName: string;
	isDefaultPortfolio: boolean;
}

export default function DeleteConfirm({
	closeFunction,
	portfolioId,
	portfolioName,
	isDefaultPortfolio
}: Props) {
	const deletePortfolioMutation = useDeletePortfolio();

	async function handleDeletePortfolio(e: SyntheticEvent) {
		deletePortfolioMutation.mutate(
			{ portfolioId, isDefaultPortfolio },
			{
				onSuccess: () => {
					toast.success({ message: `${portfolioName}을(를) 삭제했습니다.` });
					closeFunction!(e, false);
				},
				onError: () => toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요' })
			}
		);
	}

	return (
		<div>
			<Style.Header>포트폴리오 삭제</Style.Header>
			<Style.ConfirmMessage>
				정말로 <strong>{portfolioName}</strong>을(를) 삭제하시겠습니까?
			</Style.ConfirmMessage>
			<Style.ButtonContainer>
				<Style.DeleteCancelButton type="button" onClick={closeFunction}>
					취소
				</Style.DeleteCancelButton>
				<Style.DeletePortfolioButton type="button" onClick={handleDeletePortfolio}>
					삭제
				</Style.DeletePortfolioButton>
			</Style.ButtonContainer>
		</div>
	);
}
