import express, { NextFunction, Request, Response } from 'express';
import { sessionValidator } from '@middlewares';
import { stockService } from '@services/index';

interface SearchQuery {
	search: string;
}

export default (): express.Router => {
	const router = express.Router();

	router.get('/', async (req: Request, res: Response, next: NextFunction) => {
		const { search } = req.query as unknown as SearchQuery;
		if (!search) {
			res.status(400).json({ message: `'search' query param is missing.` });
			return;
		}
		const lowerCasedQuery = search.toLowerCase();
		try {
			const tickerResult = await stockService.getByTicker(lowerCasedQuery);
			const nameResult = await stockService.getByName(lowerCasedQuery);
			res.json([...tickerResult, ...nameResult]);
		} catch (error) {
			next(error);
		}
	});

	router.get(
		'/sectors',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { search } = req.query as unknown as SearchQuery;
			if (!search) {
				res.status(400).json({ message: `'search' query param is missing.` });
				return;
			}

			const tickers = JSON.parse(decodeURIComponent(search)) as string[];
			try {
				const sectors = await stockService.getSectors(tickers);
				res.json(sectors);
			} catch (error) {
				next(error);
			}
		}
	);

	router.get('/company-name', async (req: Request, res: Response, next: NextFunction) => {
		const { search } = req.query as unknown as SearchQuery;
		if (!search) {
			res.status(400).json({ message: `'search' query param is missing.` });
			return;
		}

		try {
			const companyName = await stockService.getCompanyName(search);

			if (!companyName) {
				res.status(404).json({ message: 'Cannot find company name' });
				return;
			}
			res.json(companyName);
		} catch (error) {
			next(error);
		}
	});

	router.get('/exchange', async (req: Request, res: Response, next: NextFunction) => {
		const { search } = req.query as unknown as SearchQuery;
		if (!search) {
			res.status(400).json({ message: `'search' query param is missing.` });
			return;
		}

		try {
			const exchangeName = await stockService.getExchange(search);

			if (!exchangeName) {
				res.status(404).json({ message: 'Cannot find exchange name' });
				return;
			}
			res.json(exchangeName);
		} catch (error) {
			next(error);
		}
	});

	return router;
};
