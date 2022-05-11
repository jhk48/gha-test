import { SyntheticEvent, useState } from 'react';
import { CloseModalFn } from '@types';
import { Textarea } from '@components/Form';
import toast from '@lib/toast';
import * as Style from './styles';
import { useEditCashTransactionMemo } from '../queries';

interface Props {
	portfolioId: number;
	cashTransactionId: number;
	memo: string | null;
	closeFunction?: CloseModalFn;
}

export default function CashMemoEdit({
	portfolioId,
	cashTransactionId,
	closeFunction,
	memo
}: Props) {
	const [memoContent, setMemoContent] = useState(memo ?? '');
	const editMemoMutation = useEditCashTransactionMemo(portfolioId);

	function handleMemoContent(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setMemoContent(target.value);
	}

	function handleUpdateMemo(e: SyntheticEvent) {
		e.preventDefault();
		editMemoMutation.mutate(
			{ cashTransactionId, newMemo: memoContent ?? '' },
			{
				onSuccess: () => {
					toast.success({ message: '메모 내용을 변경했습니다.' });
					closeFunction!(e, false);
				},
				onError: () => toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요.' })
			}
		);
	}

	return (
		<Style.MemoEditForm onSubmit={handleUpdateMemo}>
			<Textarea
				labelName="메모 내용"
				htmlFor="memo-content"
				value={memoContent}
				handleChange={handleMemoContent}
				rows={3}
				cols={60}
			/>
			<Style.MemoSubmitButtonContainer>
				<Style.MemoSubmitButton type="submit">메모 수정</Style.MemoSubmitButton>
			</Style.MemoSubmitButtonContainer>
		</Style.MemoEditForm>
	);
}
