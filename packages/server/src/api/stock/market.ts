import express, { NextFunction, Request, Response } from 'express';
import { getMarketStatus } from '@services/stock';

export default (): express.Router => {
	const router = express.Router();

	router.get('/status', async (req: Request, res: Response, next: NextFunction) => {
		try {
			const marketStatus = await getMarketStatus();
			res.set('Cache-control', 'no-store');
			res.json(marketStatus);
		} catch (error) {
			next(error);
		}
	});

	return router;
};
