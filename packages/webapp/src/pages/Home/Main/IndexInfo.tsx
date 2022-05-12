import { DynamicCaret } from '@components/index';
import { formatNum } from '@utils';
import * as Style from './styles';

interface Props {
	indexName: string;
	indexValue: number;
	indexValueChange: number;
	indexValueChangePercent: number;
}

export default function IndexInfo({
	indexName,
	indexValue,
	indexValueChange,
	indexValueChangePercent
}: Props) {
	return (
		<Style.IndexContainer>
			<Style.IndexHeader>{indexName}</Style.IndexHeader>
			<Style.IndexInfo value={indexValueChangePercent}>
				<Style.IndexPriceContainer>
					<Style.IndexPrice>{formatNum(indexValue)}</Style.IndexPrice>
					<Style.IndexPriceChange>
						<DynamicCaret value={indexValueChangePercent} width={20} height={20} />
						{formatNum(indexValueChange)}
					</Style.IndexPriceChange>
				</Style.IndexPriceContainer>
				<Style.IndexChangePercent>
					{formatNum(indexValueChangePercent, { signDisplay: 'exceptZero' })}%
				</Style.IndexChangePercent>
			</Style.IndexInfo>
		</Style.IndexContainer>
	);
}
