import { IconProps } from '@types';
import SVG from '../SVG';

export default function PieChart({ width = 24, height = 24, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 32 32" fill={fill} aria-label="icon">
			<path d="M16 16V4.80005C22.192 4.80005 27.2 9.80805 27.2 16H16ZM14.4 6.40005V17.6H25.6C25.6 23.792 20.592 28.8 14.4 28.8C8.20801 28.8 3.20001 23.792 3.20001 17.6C3.20001 11.408 8.20801 6.40005 14.4 6.40005Z" />
		</SVG>
	);
}
