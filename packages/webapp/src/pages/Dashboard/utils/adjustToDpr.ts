/* eslint-disable no-param-reassign */
export default function adjustToDpr(
	ctx: CanvasRenderingContext2D | null,
	canvas: HTMLCanvasElement
) {
	if (!ctx) return null;
	const dpr = window.devicePixelRatio;
	const rect = canvas.getBoundingClientRect();
	canvas.width = rect.width * dpr;
	canvas.height = rect.height * dpr;
	ctx.scale(dpr, dpr);
	return ctx;
}
