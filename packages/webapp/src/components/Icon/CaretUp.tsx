import { IconProps } from '@types';
import SVG from '../SVG';

export default function CaretUp({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 128 128" fill={fill} aria-label="caret up icon">
			<path d="M107.362 86.125L66.3123 38.525C65.1373 37.1625 62.8748 37.1625 61.6873 38.525L20.6373 86.125C19.1123 87.9 20.4873 90.5 22.9498 90.5H105.05C107.512 90.5 108.887 87.9 107.362 86.125Z" />
		</SVG>
	);
}
