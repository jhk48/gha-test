import { SyntheticEvent } from 'react';
import * as Icon from '@components/Icon';
import * as ListPage from '@components/ListPage';
import { PortfolioSelect, ListQueryErrorBoundary, useSelectedPortfolioId } from '@components/index';
import { useModal, useTitle, useHoldingsList } from '@hooks/index';
import { formatNum } from '@utils';
import toast from '@lib/toast';
import * as Style from './styles';
import HoldingsList from './HoldingsList';
import AddNewStockTransaction from '../ModalPage/AddNewStockTransaction';

export default function Holdings() {
	useTitle('Portbullio - 내 종목');
	const portfolioId = useSelectedPortfolioId();
	const holdingsList = useHoldingsList(portfolioId);
	const { openModal } = useModal();

	function openAddNewStockTransactionModal(e: SyntheticEvent) {
		if (portfolioId === -1) {
			toast.error({ message: '선택된 포트폴리오가 없습니다.' });
			return;
		}
		openModal(e, <AddNewStockTransaction portfolioId={portfolioId} />);
	}

	return (
		<>
			<ListPage.UpperSection maxWidth="1500px">
				<ListPage.MainHeader>보유종목</ListPage.MainHeader>
				<ListPage.NumOfItems data-testid="num-of-holdings">
					{formatNum(holdingsList.data?.length ?? 0)}개
				</ListPage.NumOfItems>
				<ListPage.UpperSectionButtonContainer>
					<PortfolioSelect />
					<ListPage.SearchFilterButton type="button">
						<Icon.Filter width={20} height={20} />
						필터
					</ListPage.SearchFilterButton>
					<ListPage.AddItemButton type="button" onClick={openAddNewStockTransactionModal}>
						<Icon.Plus width={20} height={20} />새 거래내역 추가
					</ListPage.AddItemButton>
				</ListPage.UpperSectionButtonContainer>
				<ListPage.SearchInputContainer>
					<ListPage.SearchInput placeholder="보유종목 검색..." />
					<Icon.Search width={26} height={26} />
				</ListPage.SearchInputContainer>
			</ListPage.UpperSection>
			<ListPage.LowerSection maxWidth="1500px">
				<ListPage.ListContainer>
					<ListPage.ListHeaderContainer>
						<Style.HoldingTickerSection>티커</Style.HoldingTickerSection>
						<Style.HoldingDetailsSection />
						<Style.HoldingCurrentPriceSection>현재가</Style.HoldingCurrentPriceSection>
						<Style.HoldingAvgPriceSection>평단가</Style.HoldingAvgPriceSection>
						<Style.HoldingQuantitySection>보유수량</Style.HoldingQuantitySection>
						<Style.HoldingTotalValueSection>평가금액</Style.HoldingTotalValueSection>
						<Style.HoldingDailyGainSection>일일 손익</Style.HoldingDailyGainSection>
						<Style.HoldingTotalGainSection>총 손익</Style.HoldingTotalGainSection>
					</ListPage.ListHeaderContainer>
					<ListQueryErrorBoundary
						errorMessage="에러가 발생했습니다."
						isError={holdingsList.isError}
						refetch={holdingsList.refetch}
					>
						<HoldingsList holdingsList={holdingsList.data} isLoading={holdingsList.isLoading} />
					</ListQueryErrorBoundary>
				</ListPage.ListContainer>
			</ListPage.LowerSection>
		</>
	);
}
