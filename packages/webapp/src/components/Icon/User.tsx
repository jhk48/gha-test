import { IconProps } from '@types';
import SVG from '../SVG';

export default function User({ width = 32, height = 32, fill = 'primary' }: IconProps) {
	return (
		<SVG width={width} height={height} viewBox="0 0 128 128" fill={fill} aria-label="icon">
			<path d="M40 34.6667C40 47.8987 50.768 58.6667 64 58.6667C77.232 58.6667 88 47.8987 88 34.6667C88 21.4347 77.232 10.6667 64 10.6667C50.768 10.6667 40 21.4347 40 34.6667ZM106.667 112H112V106.667C112 86.0854 95.248 69.3334 74.6667 69.3334H53.3333C32.7467 69.3334 16 86.0854 16 106.667V112H106.667Z" />
		</SVG>
	);
}
