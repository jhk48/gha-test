// https://ui.toast.com/weekly-pick/ko_20210526#%EB%91%90%EA%BB%98%EA%B0%80-1px%ED%99%80%EC%88%98-%EA%B0%92%EC%9D%B8-%EB%9D%BC%EC%9D%B8-%EC%84%A0%EB%AA%85%ED%95%98%EA%B2%8C-%ED%91%9C%ED%98%84%ED%95%98%EA%B8%B0

export default function crispPixel(pixel: number, thickness = 1) {
	const halfThickness = thickness / 2;

	return thickness % 2
		? (Number.isInteger(pixel) ? pixel : Math.round(pixel - halfThickness)) + halfThickness
		: Math.round(pixel);
}
