import { IconProps } from '@types';
import SVG from '../SVG';

export default function Reset({ width = 21, height = 21, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 21 21" fill={fill} aria-label="icon">
			<g
				fill="none"
				fillRule="evenodd"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			>
				<path d="M3.578 6.487A8 8 0 1 1 2.5 10.5" />
				<path d="M7.5 6.5h-4v-4" />
			</g>
		</SVG>
	);
}
