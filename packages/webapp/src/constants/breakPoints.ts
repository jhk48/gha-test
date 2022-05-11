interface BreakPoints {
	mobile: number;
	mobileLandScape: number;
	tablet: number;
	tabletLandScape: number;
	laptop: number;
}

// 해상도 break point는 https://gs.statcounter.com/screen-resolution-stats/ 참조하였음.
export const WIDTH_BREAK_POINT_PX: BreakPoints = {
	mobile: 414, // 414x736
	mobileLandScape: 640, // 640x360(360x640)
	tablet: 810, // 810x1080
	tabletLandScape: 1280, // 1280x800(800x1280)
	laptop: 1536 // 1536x864
};
