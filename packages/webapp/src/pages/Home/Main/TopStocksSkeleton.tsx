import styled from 'styled-components';
import LoadingSkeleton from '@components/LoadingSkeleton';
import * as Style from './styles';

export default function TopStocksSkeleton() {
	return (
		<>
			{[0, 1, 2, 3, 4].map(key => (
				<Style.TopStocksListItem key={key} as="li">
					<SkeletonWrapper>
						<LoadingSkeleton width="25%" height="20px" />
						<LoadingSkeleton width="25%" height="20px" />
						<LoadingSkeleton width="25%" height="20px" />
					</SkeletonWrapper>
				</Style.TopStocksListItem>
			))}
		</>
	);
}

const SkeletonWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
	padding: 0.9em 0;
`;
