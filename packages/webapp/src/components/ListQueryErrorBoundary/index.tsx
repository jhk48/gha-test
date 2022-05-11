import { ReactNode } from 'react';
import { RefetchOptions, RefetchQueryFilters, QueryObserverResult } from 'react-query';
import styled from 'styled-components';
import { Reset as ResetIcon } from '@components/Icon';
import { buttonMixin } from '@styles/Mixins';

interface Props {
	errorMessage: string;
	children: ReactNode;
	isError: boolean;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<any[], unknown>>;
}

export default function ListQueryErrorBoundary({
	errorMessage,
	children,
	isError,
	refetch
}: Props) {
	return (
		<>
			{isError ? (
				<Container>
					<ErrorMessage>{errorMessage}</ErrorMessage>
					<RefetchRequestButton type="button" onClick={() => refetch()}>
						<ResetIcon width={18} height={18} />
						재요청
					</RefetchRequestButton>
				</Container>
			) : (
				children
			)}
		</>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ErrorMessage = styled.p`
	margin: 10px 0;
`;

const RefetchRequestButton = styled.button`
	${buttonMixin};
	display: flex;
	align-items: center;
	gap: 4px;
	background-color: var(--primary);
	color: var(--white);
	font-size: 14px;
	padding: 0.3em 0.5em;
	margin-bottom: 12px;
	border-radius: 4px;

	& > svg {
		fill: var(--white);
	}
`;
