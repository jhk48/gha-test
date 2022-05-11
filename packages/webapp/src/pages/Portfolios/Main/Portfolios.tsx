import { SyntheticEvent } from 'react';
import * as Icon from '@components/Icon';
import * as ListPage from '@components/ListPage';
import { ListQueryErrorBoundary } from '@components/index';
import { useModal, useTitle, usePortfolioList } from '@hooks/index';
import * as Style from './styles';
import PortfolioList from './PortfolioList';
import AddPortfolio from '../ModalPage/AddPortfolio';

export default function Portfolios() {
	useTitle('Portbullio - 내 포트폴리오');
	const portfolios = usePortfolioList();

	const { openModal } = useModal();

	function openAddPortfolioModal(e: SyntheticEvent) {
		openModal(e, <AddPortfolio />);
	}

	return (
		<>
			<ListPage.UpperSection maxWidth="1440px">
				<ListPage.MainHeader>내 포트폴리오</ListPage.MainHeader>
				<ListPage.NumOfItems data-testid="num-of-my-portfolios">
					{portfolios.data?.length ?? 0}개
				</ListPage.NumOfItems>
				<ListPage.UpperSectionButtonContainer>
					<ListPage.SearchFilterButton type="button">
						<Icon.Filter width={20} height={20} />
						필터
					</ListPage.SearchFilterButton>
					<ListPage.AddItemButton type="button" onClick={openAddPortfolioModal}>
						<Icon.Plus width={20} height={20} />새 포트폴리오 추가
					</ListPage.AddItemButton>
				</ListPage.UpperSectionButtonContainer>
				<ListPage.SearchInputContainer>
					<ListPage.SearchInput placeholder="포트폴리오 검색..." />
					<Icon.Search width={26} height={26} />
				</ListPage.SearchInputContainer>
			</ListPage.UpperSection>
			<ListPage.LowerSection maxWidth="1050px">
				<ListPage.ListContainer>
					<ListPage.ListHeaderContainer>
						<Style.PortfolioNameSection>이름</Style.PortfolioNameSection>
						<Style.PortfolioPrivacySection>공개 여부</Style.PortfolioPrivacySection>
					</ListPage.ListHeaderContainer>
					<ListQueryErrorBoundary
						errorMessage="에러가 발생했습니다."
						isError={portfolios.isError}
						refetch={portfolios.refetch}
					>
						<PortfolioList portfolioList={portfolios.data} isLoading={portfolios.isLoading} />
					</ListQueryErrorBoundary>
				</ListPage.ListContainer>
			</ListPage.LowerSection>
		</>
	);
}
