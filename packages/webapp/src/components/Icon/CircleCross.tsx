import { IconProps } from '@types';
import SVG from '../SVG';

export default function CircleCross({ width = 16, height = 16, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 16 16" fill={fill} aria-label="icon">
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			>
				<path d="m10.25 5.75l-4.5 4.5m0-4.5l4.5 4.5" />
				<circle cx="8" cy="8" r="6.25" />
			</g>
		</SVG>
	);
}
