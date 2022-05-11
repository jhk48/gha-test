import { SyntheticEvent } from 'react';
import { ListItems, ListItem, EmptyListNotice } from '@components/ListPage';
import { CashTransactionLog, CashTransactionType } from '@prisma/client';
import { useModal } from '@hooks/Modal';
import { formatCurrency, formatDate } from '@utils';
import {
	StickyNote as StickyNoteIcon,
	TrashCan as TrashCanIcon,
	Pencil as PencilIcon
} from '@components/Icon';
import * as Style from './styles';
import EditCashTransaction from '../ModalPage/EditCashTransaction';
import EditCashTransactionMemo from '../ModalPage/CashMemoEdit';
import DeleteCashTransactionConfirm from '../ModalPage/DeleteCashTransactionConfirm';

interface Props {
	portfolioId: number;
	cashList: CashTransactionLog[] | undefined;
	isLoading: boolean;
}

interface OpenEditModalArgs {
	e: SyntheticEvent;
	cashTransactionId: number;
	amount: number;
	type: CashTransactionType;
	date: string;
}

interface OpenEditMemoModalArgs {
	e: SyntheticEvent;
	cashTransactionId: number;
	memo: string | null;
}

export default function CashTransactionList({ portfolioId, cashList, isLoading }: Props) {
	const { openModal } = useModal();

	function openEditCashTransactionModal({
		e,
		cashTransactionId,
		amount,
		type,
		date
	}: OpenEditModalArgs) {
		openModal(
			e,
			<EditCashTransaction
				cashTransactionId={cashTransactionId}
				portfolioId={portfolioId}
				initialInputs={{ amount, type, date }}
			/>
		);
	}

	function openEditCashMemoModal({ e, cashTransactionId, memo }: OpenEditMemoModalArgs) {
		openModal(
			e,
			<EditCashTransactionMemo
				portfolioId={portfolioId}
				cashTransactionId={cashTransactionId}
				memo={memo}
			/>
		);
	}

	function openDeleteCashTransactionConfirmModal(e: SyntheticEvent, cashTransactionId: number) {
		openModal(
			e,
			<DeleteCashTransactionConfirm
				cashTransactionId={cashTransactionId}
				portfolioId={portfolioId}
			/>
		);
	}

	if (isLoading) {
		return <EmptyListNotice>로딩 중...</EmptyListNotice>;
	}

	return (
		<ListItems
			isListEmpty={!cashList || cashList.length === 0}
			emptyListNoticeMessage="현금 거래내역이 없습니다."
		>
			{cashList?.map(({ id, createdAt, transactionType, amount, memo }) => (
				<ListItem key={id}>
					<Style.DateSection>{formatDate(createdAt as unknown as string)}</Style.DateSection>
					<Style.CashTypeSection>{translateCashTypeToKor(transactionType)}</Style.CashTypeSection>
					<Style.AmountSection value={priceColor(amount, transactionType)}>
						{minusPrefix(transactionType)}
						{formatCurrency(amount, 'usd')}
					</Style.AmountSection>
					<Style.MemoSection>
						<Style.MemoOpenButton
							type="button"
							isMemoExist={!!memo}
							onClick={e => openEditCashMemoModal({ e, cashTransactionId: id, memo })}
						>
							<StickyNoteIcon />
						</Style.MemoOpenButton>
					</Style.MemoSection>
					<Style.ActionsSection>
						<Style.CashTransactionEditButton
							type="button"
							onClick={e =>
								openEditCashTransactionModal({
									e,
									cashTransactionId: id,
									amount,
									type: transactionType,
									date: createdAt as unknown as string
								})
							}
						>
							<PencilIcon width={16} height={16} />
							내역 수정
						</Style.CashTransactionEditButton>
						<Style.CashTransactionDeleteButton
							type="button"
							onClick={e => openDeleteCashTransactionConfirmModal(e, id)}
						>
							<TrashCanIcon width={16} height={16} />
							삭제
						</Style.CashTransactionDeleteButton>
					</Style.ActionsSection>
				</ListItem>
			))}
		</ListItems>
	);
}

function translateCashTypeToKor(type: CashTransactionType) {
	if (type === 'deposit') return '입금';
	if (type === 'withdraw') return '출금';
	if (type === 'purchased') return '매수';
	if (type === 'sold') return '매도';
	return '배당';
}

function priceColor(amount: number, type: CashTransactionType) {
	if (amount === 0) return 0;
	if (type === 'withdraw' || type === 'purchased') return -1;
	return 1;
}

function minusPrefix(type: CashTransactionType) {
	return type === 'withdraw' || type === 'purchased' ? '-' : '';
}
