import express, { NextFunction, Request, Response } from 'express';
import { PortfolioPrivacy } from '@prisma/client';
import { MAX_PORTFOLIO_NAME_LENGTH } from '@portbullio/shared/src/constants';
import * as portfolioService from '@services/portfolio';
import { sessionValidator } from '@middlewares';

interface PortfolioIdParam {
	portfolioId: string;
}

interface NewPortfolioReqBody {
	portfolioName: string;
	privacy: PortfolioPrivacy;
}

interface EditPortfolioNameReqBody {
	newPortfolioName: string;
}

interface EditDefaultPortfolioReqBody {
	prevPortfolioId: string;
	newPortfolioId: string;
}

interface EditPortfolioPrivacyReqBody {
	newPrivacy: PortfolioPrivacy;
}

interface DeletePortfolioReqBody {
	isDefaultPortfolio: '0' | '1';
}

export default (): express.Router => {
	const router = express.Router();

	router.get('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		const { userId } = res.locals;

		try {
			const portfolios = await portfolioService.getPortfolios(Number(userId));
			if (!portfolios) {
				res.status(404).json({ error: 'Portfolio not found.' });
				return;
			}
			res.status(200).json({ portfolios });
		} catch (error) {
			next(error);
		}
	});

	router.get(
		'/default',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { userId } = res.locals;

			try {
				const defaultPortfolioInfo = await portfolioService.getDefaultPortfolio(Number(userId));
				res.json({ defaultPortfolioId: defaultPortfolioInfo?.portfolioId });
			} catch (error) {
				next(error);
			}
		}
	);

	router.get(
		'/:portfolioId',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { userId } = res.locals;

			try {
				const portfolio = await portfolioService.getPortfolio(Number(portfolioId), Number(userId));
				if (!portfolio) {
					res.status(404).json({ error: 'Portfolio not found.' });
					return;
				}
				res.status(200).json({ portfolio });
			} catch (error) {
				next(error);
			}
		}
	);

	router.post('/', sessionValidator, async (req: Request, res: Response, next: NextFunction) => {
		const { portfolioName, privacy } = req.body as unknown as NewPortfolioReqBody;

		if (portfolioName.length > MAX_PORTFOLIO_NAME_LENGTH) {
			res
				.status(400)
				.json({ error: `Portfolio name's length must be shorter than or equal to 20.` });
			return;
		}

		try {
			const { userId } = res.locals;
			const newPortfolio = await portfolioService.createPortfolio({
				userId: Number(userId),
				portfolioName,
				privacy
			});

			const isFirstlyCreated = (await portfolioService.getPortfolios(Number(userId))).length === 1;
			if (isFirstlyCreated) {
				await portfolioService.setDefaultPortfolio(newPortfolio.id, Number(userId));
			}

			res.status(201).json({ newPortfolio });
		} catch (error) {
			next(error);
		}
	});

	router.post(
		'/:portfolioId/default',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { userId } = res.locals;

			try {
				const doesUserHavePortfolio = !!(await portfolioService.getPortfolio(
					Number(portfolioId),
					Number(userId)
				));
				if (!doesUserHavePortfolio) {
					res.status(400).json({ error: 'User does not have the portfolio.' });
					return;
				}
				await portfolioService.setDefaultPortfolio(Number(portfolioId), Number(userId));
				res.send();
			} catch (error) {
				next(error);
			}
		}
	);

	router.patch(
		'/:portfolioId/name',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { newPortfolioName } = req.body as unknown as EditPortfolioNameReqBody;
			const { userId } = res.locals;

			if (newPortfolioName.length > MAX_PORTFOLIO_NAME_LENGTH) {
				res
					.status(400)
					.json({ error: `Portfolio name's length must be shorter than or equal to 20.` });
				return;
			}

			try {
				const portfolio = await portfolioService.getPortfolio(Number(portfolioId), Number(userId));
				if (!portfolio) {
					res.status(404).json({ error: 'Portfolio not found.' });
					return;
				}
				const modifiedPortfolio = await portfolioService.editPortfolioName(
					Number(portfolioId),
					newPortfolioName
				);
				res.status(200).json({ modifiedPortfolio });
			} catch (error) {
				next(error);
			}
		}
	);

	router.patch(
		'/:portfolioId/privacy',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { newPrivacy } = req.body as unknown as EditPortfolioPrivacyReqBody;
			const { userId } = res.locals;

			if (newPrivacy !== 'public' && newPrivacy !== 'private') {
				res.status(400).json({ error: 'Invalid privacy type.' });
				return;
			}

			try {
				const portfolio = await portfolioService.getPortfolio(Number(portfolioId), Number(userId));
				if (!portfolio) {
					res.status(404).json({ error: 'Portfolio not found.' });
					return;
				}
				const modifiedPortfolio = await portfolioService.editPortfolioPrivacy(
					Number(portfolioId),
					newPrivacy
				);
				res.status(200).json({ modifiedPortfolio });
			} catch (error) {
				next(error);
			}
		}
	);

	router.put(
		'/default',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { prevPortfolioId, newPortfolioId } =
				req.body as unknown as EditDefaultPortfolioReqBody;
			const { userId } = res.locals;

			try {
				const doesUserHavePortfolio = !!(await portfolioService.getPortfolio(
					Number(newPortfolioId),
					Number(userId)
				));
				if (!doesUserHavePortfolio) {
					res.status(400).json({ error: 'User does not have the portfolio.' });
					return;
				}
				const modifiedId = await portfolioService.editDefaultPortfolio(
					Number(prevPortfolioId),
					Number(newPortfolioId),
					Number(userId)
				);
				res.json({ modifiedId });
			} catch (error) {
				next(error);
			}
		}
	);

	router.delete(
		'/:portfolioId',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { isDefaultPortfolio } = req.query as unknown as DeletePortfolioReqBody;
			const { userId } = res.locals;

			try {
				const portfolio = await portfolioService.getPortfolio(Number(portfolioId), Number(userId));
				if (!portfolio) {
					res.status(404).json({ error: 'Portfolio not found.' });
					return;
				}

				if (Number(isDefaultPortfolio)) {
					await portfolioService.setDefaultPortfolioAutomatically(
						Number(portfolioId),
						Number(userId)
					);
				}

				const deletedPortfolioId = await portfolioService.deletePortfolio(Number(portfolioId));
				res.status(200).json({ deletedId: deletedPortfolioId });
			} catch (error) {
				next(error);
			}
		}
	);

	router.delete(
		'/:portfolioId/default',
		sessionValidator,
		async (req: Request, res: Response, next: NextFunction) => {
			const { portfolioId } = req.params as unknown as PortfolioIdParam;
			const { userId } = res.locals;

			try {
				const doesUserHavePortfolio = !!(await portfolioService.getPortfolio(
					Number(portfolioId),
					Number(userId)
				));
				if (!doesUserHavePortfolio) {
					res.status(400).json({ error: 'User does not have the portfolio.' });
					return;
				}
				await portfolioService.deleteDefaultPortfolio(Number(portfolioId), Number(userId));
				res.send();
			} catch (error) {
				next(error);
			}
		}
	);

	return router;
};
