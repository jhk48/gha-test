import { SyntheticEvent, useEffect, useState } from 'react';
import { MAX_PORTFOLIO_NAME_LENGTH } from '@portbullio/shared/src/constants';
import { PortfolioPrivacy } from '@prisma/client';
import { TextInput } from '@components/Form';
import { LockClose, LockOpen } from '@components/Icon';
import toast from '@lib/toast';
import { CloseModalFn } from '@types';
import useCreatePortfolio from '../queries/useCreatePortfolio';
import * as Style from './styles';

interface Props {
	closeFunction?: CloseModalFn;
}

export default function AddPortfolio({ closeFunction }: Props) {
	const [newName, setNewName] = useState('');
	const [privacy, setPrivacy] = useState<PortfolioPrivacy>('public');
	const [isNameLengthOverflow, setIsNameLengthOverflow] = useState(false);
	const createPortfolioMutation = useCreatePortfolio();

	useEffect(() => {
		if (newName.length <= MAX_PORTFOLIO_NAME_LENGTH) setIsNameLengthOverflow(false);
		else setIsNameLengthOverflow(true);
	}, [newName]);

	function handleChangeNewName(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setNewName(target.value);
	}

	function handleChangePrivacy(e: SyntheticEvent) {
		const target = e.target as HTMLInputElement;
		setPrivacy(target.value as PortfolioPrivacy);
	}

	async function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();

		if (newName === '') {
			toast.error({ message: '포트폴리오 이름을 작성해주세요.' });
			return;
		}

		if (isNameLengthOverflow) {
			toast.error({ message: '포트폴리오 이름은 20자 이하여야 합니다.' });
			return;
		}

		createPortfolioMutation.mutate(
			{ portfolioName: newName, privacy },
			{
				onSuccess: () => {
					toast.success({ message: '성공적으로 포트폴리오를 추가했습니다.' });
					closeFunction!(e, false);
				},
				onError: () => toast.error({ message: '에러가 발생했습니다. 다시 시도해 주세요' })
			}
		);
	}

	return (
		<Style.Container>
			<Style.Header>포트폴리오 추가</Style.Header>
			<Style.Form onSubmit={handleSubmit}>
				<TextInput
					htmlFor="new-portfolio-name"
					labelName="새 포트폴리오 이름"
					placeholder="새 포트폴리오 이름"
					value={newName}
					handleChange={handleChangeNewName}
					errorLabel="*이름은 20자 이하여야 합니다."
					isError={isNameLengthOverflow}
				/>
				{!isNameLengthOverflow && (
					<Style.MaxLengthNotice>*이름은 최대 20자까지 가능합니다.</Style.MaxLengthNotice>
				)}
				<Style.RadioInputContainer>
					<Style.RadioInput
						id="privacy-public"
						type="radio"
						name="portfolioPrivacy"
						value="public"
						checked={privacy === 'public'}
						onChange={handleChangePrivacy}
					/>
					<Style.RadioLabel htmlFor="privacy-public">
						<LockOpen />
						공개
					</Style.RadioLabel>
					<Style.RadioInput
						id="privacy-private"
						type="radio"
						name="portfolioPrivacy"
						value="private"
						checked={privacy === 'private'}
						onChange={handleChangePrivacy}
					/>
					<Style.RadioLabel htmlFor="privacy-private">
						<LockClose />
						비공개
					</Style.RadioLabel>
				</Style.RadioInputContainer>
				<Style.AddButton type="submit">추가하기</Style.AddButton>
			</Style.Form>
		</Style.Container>
	);
}
