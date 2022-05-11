import express from 'express';
import checkAuth from './checkAuth';
import google from './google';
import logOut from './logOut';

export default (): express.Router => {
	const router = express.Router();
	router.use('/check', checkAuth());
	router.use('/google', google());
	router.use('/logout', logOut());

	return router;
};
