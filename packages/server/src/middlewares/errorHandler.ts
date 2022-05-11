import express from 'express';
import logger from '@lib/winston';

export default function errorHandler(
	err: any,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) {
	if (err.message) logger.error(err.message);
	else logger.error(err);

	if (err.message === 'Invalid session') {
		res.status(401).json({ message: 'Invalid session' });
		return;
	}

	if (err.message === 'Log out failed') {
		res.status(500).json({ message: 'Log out failed' });
		return;
	}

	res.status(500).json({ message: 'Internal server error' });
	return;
}
