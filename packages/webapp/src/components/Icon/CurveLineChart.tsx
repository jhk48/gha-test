import { IconProps } from '@types';
import SVG from '../SVG';

export default function CurveLineChart({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 32 32" fill={fill} aria-label="icon">
			<path d="M13 15C14.485 15 15.554 16.497 16.686 18.081C17.998 19.918 19.486 22 22 22C27.67 22 29.78 11.21 30 10L28.032 9.642C27.55 12.282 25.394 20 22 20C20.515 20 19.446 18.503 18.314 16.919C17.002 15.082 15.514 13 13 13C8.814 13 5.555 20.404 4 24.762V2H2V28C2.00053 28.5303 2.21141 29.0387 2.58637 29.4136C2.96133 29.7886 3.46973 29.9995 4 30H30V28H5.044C6.554 22.857 9.964 15 13 15Z" />
		</SVG>
	);
}
