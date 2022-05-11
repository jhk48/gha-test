import { IconProps } from '@types';
import SVG from '../SVG';

export default function Dashboard({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 32 32" fill={fill} aria-label="icon">
			<path
				d="M0 17.7778H14.2222V0H0V17.7778ZM0 32H14.2222V21.3333H0V32ZM17.7778 32H32V14.2222H17.7778V32ZM17.7778 0V10.6667H32V0H17.7778Z"
				strokeWidth="0"
			/>
		</SVG>
	);
}
