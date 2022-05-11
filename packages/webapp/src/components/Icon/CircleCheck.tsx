import { IconProps } from '@types';
import SVG from '../SVG';

export default function CircleCheck({ width = 24, height = 24, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 24 24" fill={fill} aria-label="icon">
			<g fill="none" stroke="currentColor" strokeWidth="3">
				<path strokeLinecap="round" strokeLinejoin="round" d="m8 12.5l3 3l5-6" />
				<circle cx="12" cy="12" r="10" />
			</g>
		</SVG>
	);
}
