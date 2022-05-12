import { SyntheticEvent } from 'react';
import { Pencil as PencilIcon, TrashCan as TrashCanIcon } from '@components/Icon';
import { StockTransactionLog, StockTransactionType } from '@prisma/client';
import { useModal } from '@hooks/Modal';
import { formatDate, formatCurrency, formatNum } from '@utils';
import {
	ListItems,
	ListItem,
	EmptyListNotice,
	StickyNote as StickyNoteIcon,
	DynamicCaret,
	useSelectedPortfolioId
} from '@components/index';
import * as Style from './styles';
import StockMemoEditPage from '../ModalPage/StockMemoEdit';
import EditStockTransactionPage from '../ModalPage/EditStockTransaction';
import DeleteConfirmPage from '../ModalPage/DeleteStockTransactionConfirm';

interface Props {
	stockTransactionList: StockTransactionLog[] | undefined;
	isLoading: boolean;
}

interface OpenMemoModalProps {
	e: SyntheticEvent;
	stockTransactionId: number;
	ticker: string;
	memo: string | null;
}

interface OpenEditModalProps {
	e: SyntheticEvent;
	stockTransactionId: number;
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	date: string;
}

interface OpenDeleteModalProps {
	e: SyntheticEvent;
	stockTransactionId: number;
	ticker: string;
	quantityToDelete: number;
	type: StockTransactionType;
}

export default function StockTransactionList({ stockTransactionList, isLoading }: Props) {
	const { openModal } = useModal();
	const portfolioId = useSelectedPortfolioId();

	function handleOpenMemoModal({ e, stockTransactionId, ticker, memo }: OpenMemoModalProps) {
		openModal(
			e,
			<StockMemoEditPage
				portfolioId={portfolioId}
				ticker={ticker}
				stockTransactionId={stockTransactionId}
				memo={memo}
			/>
		);
	}

	function handleOpenEditTransactionModal({
		e,
		stockTransactionId,
		ticker,
		price,
		quantity,
		type,
		date
	}: OpenEditModalProps) {
		openModal(
			e,
			<EditStockTransactionPage
				stockTransactionId={stockTransactionId}
				portfolioId={portfolioId}
				initialInputs={{ ticker, price, quantity, type, date }}
			/>
		);
	}

	function handleOpenDeleteConfirmModal({
		e,
		stockTransactionId,
		ticker,
		quantityToDelete,
		type
	}: OpenDeleteModalProps) {
		openModal(
			e,
			<DeleteConfirmPage
				stockTransactionId={stockTransactionId}
				ticker={ticker}
				quantityToDelete={quantityToDelete}
				type={type}
			/>
		);
	}

	if (isLoading) {
		return <EmptyListNotice>로딩 중...</EmptyListNotice>;
	}

	return (
		<>
			<ListItems
				isListEmpty={!stockTransactionList || stockTransactionList.length === 0}
				emptyListNoticeMessage="거래 내역이 없습니다."
			>
				{stockTransactionList?.map(
					({ id, createdAt, ticker, transactionType, price, quantity, memo, avgBuyCost }) => {
						const realizedProfitLossPercent = avgBuyCost
							? ((price - avgBuyCost) / avgBuyCost) * 100
							: 0;

						return (
							<ListItem key={id}>
								<Style.DateSection>{formatDate(createdAt as unknown as string)}</Style.DateSection>
								<Style.TransactionTypeSection>
									{stockTransactionTypeKor[transactionType as keyof typeof StockTransactionType]}
								</Style.TransactionTypeSection>
								<Style.PriceSection>{formatCurrency(price, 'usd')}</Style.PriceSection>
								<Style.QuantitySection>{formatNum(quantity)}</Style.QuantitySection>
								<Style.MemoSection>
									<Style.MemoOpenButton
										type="button"
										isMemoExist={!!memo}
										onClick={e => handleOpenMemoModal({ e, stockTransactionId: id, ticker, memo })}
									>
										<StickyNoteIcon />
									</Style.MemoOpenButton>
								</Style.MemoSection>
								<Style.RealizedProfitAndLossSection value={avgBuyCost ? price - avgBuyCost : 0}>
									<DynamicCaret
										value={avgBuyCost ? price - avgBuyCost : 0}
										width={20}
										height={20}
										marginTop={0}
									/>
									{avgBuyCost && formatCurrency((price - avgBuyCost) * quantity, 'usd')}
									{avgBuyCost &&
										` (${formatNum(realizedProfitLossPercent, { signDisplay: 'exceptZero' })}%)`}
								</Style.RealizedProfitAndLossSection>
								<Style.StockTransactionActionsSection>
									<Style.StockTransactionEditButton
										type="button"
										onClick={e =>
											handleOpenEditTransactionModal({
												e,
												stockTransactionId: id,
												ticker,
												price,
												quantity,
												type: transactionType,
												date: createdAt as unknown as string
											})
										}
									>
										<PencilIcon width={16} height={16} />
										내역 수정
									</Style.StockTransactionEditButton>
									<Style.StockTransactionDeleteButton
										type="button"
										onClick={e =>
											handleOpenDeleteConfirmModal({
												e,
												stockTransactionId: id,
												ticker,
												quantityToDelete: quantity,
												type: transactionType
											})
										}
									>
										<TrashCanIcon width={16} height={16} />
										삭제
									</Style.StockTransactionDeleteButton>
								</Style.StockTransactionActionsSection>
							</ListItem>
						);
					}
				)}
			</ListItems>
		</>
	);
}

const stockTransactionTypeKor = {
	buy: '매수',
	sell: '매도'
} as const;
