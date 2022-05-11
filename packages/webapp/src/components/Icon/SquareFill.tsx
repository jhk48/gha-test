import { IconProps } from '@types';
import SVG from '../SVG';

export default function SquareFill({ width = 24, height = 24, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 24 24" fill={fill} aria-label="icon">
			<rect width="20" height="20" x="2" y="2" fill="currentColor" rx="0" />
		</SVG>
	);
}
