import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from 'react-query';
import toast from '@lib/toast';
import { CircleCheck as CircleCheckIcon, CircleCross as CircleCrossIcon } from '@components/Icon';
import { DefaultPortfolioButton } from './styles';
import { useEditDefaultPortfolio } from '../queries';

interface Props {
	defaultPortfolioId: number | undefined;
	portfolioId: number;
	portfolioName: string;
	isLoading: boolean;
	isError: boolean;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<number | undefined, unknown>>;
}

export default function SetDefaultButton({
	defaultPortfolioId,
	portfolioId,
	portfolioName,
	isLoading,
	isError,
	refetch
}: Props) {
	const editDefaultPortfolioMutation = useEditDefaultPortfolio();

	async function handleEditDefaultPortfolio() {
		if (portfolioId === defaultPortfolioId) return;
		if (defaultPortfolioId === undefined) {
			toast.error({ message: '기본으로 설정된 포트폴리오가 없습니다.' });
			return;
		}

		editDefaultPortfolioMutation.mutate(
			{
				prevPortfolioId: defaultPortfolioId,
				newPortfolioId: portfolioId
			},
			{
				onSuccess: () =>
					toast.success({ message: `${portfolioName}을(를) 기본 포트폴리오로 설정했습니다.` }),
				onError: () => toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요' })
			}
		);
	}

	function buttonText() {
		if (isError) return '재시도';
		return portfolioId === defaultPortfolioId ? '기본 포트폴리오' : '기본으로 설정하기';
	}

	return (
		<>
			{isLoading ? (
				<div>로딩중...</div>
			) : (
				<DefaultPortfolioButton
					type="button"
					isDefault={portfolioId === defaultPortfolioId}
					isError={isError}
					onClick={() => (isError ? refetch() : handleEditDefaultPortfolio())}
				>
					{isError ? (
						<CircleCrossIcon width={20} height={20} />
					) : (
						<CircleCheckIcon width={20} height={20} />
					)}

					{buttonText()}
				</DefaultPortfolioButton>
			)}
		</>
	);
}
