import { IconProps } from '@types';
import SVG from '../SVG';

export default function CaretDown({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG
			width={width}
			height={height}
			viewBox="0 0 128 128"
			fill={fill}
			aria-label="caret down icon"
		>
			<path d="M105.05 37.5H22.9498C20.4873 37.5 19.1123 40.1 20.6373 41.875L61.6873 89.475C62.8623 90.8375 65.1248 90.8375 66.3123 89.475L107.362 41.875C108.887 40.1 107.512 37.5 105.05 37.5Z" />
		</SVG>
	);
}
