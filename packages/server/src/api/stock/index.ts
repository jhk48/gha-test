import express from 'express';
import market from './market';
import query from './query';

export default (): express.Router => {
	const router = express.Router();
	router.use('/market', market());
	router.use('/query', query());

	return router;
};
