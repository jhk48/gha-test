import express, { NextFunction, Request, Response } from 'express';
import { getAssetChartData } from '@services/user';
import { sessionValidator } from '@middlewares';

interface AssetChartDataReqQuery {
	pid: string;
	start: string;
	count: string;
}

export default (): express.Router => {
	const router = express.Router();

	router.get('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = res.locals;
			const { pid, start, count } = req.query as unknown as AssetChartDataReqQuery;

			if (Number.isNaN(Number(pid))) {
				res.status(400).json({ message: 'Invalid pid' });
				return;
			}

			if (Number.isNaN(Date.parse(start))) {
				res.status(400).json({ message: 'Invalid date string' });
				return;
			}

			if (Number.isNaN(Number(count))) {
				res.status(400).json({ message: 'Invalid count number' });
				return;
			}

			const data = await getAssetChartData({
				userId: Number(userId),
				portfolioId: Number(pid),
				startDate: new Date(start),
				count: Number(count)
			});

			res.json(data);
		} catch (error) {
			next(error);
		}
	});

	return router;
};
