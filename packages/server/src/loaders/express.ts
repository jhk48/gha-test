import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { LoaderProps } from '@src/types';
import api from '@api';
import { errorHandler } from '@middlewares';
import { morgan, formatMorgan } from './morgan';

export default async function expressLoader({ app }: LoaderProps) {
	app.use(
		cors({
			origin: process.env.ORIGIN,
			methods: 'GET,POST,PUT,PATCH,DELETE',
			allowedHeaders: 'Content-Type,X-Requested-With',
			credentials: true,
			maxAge: 3600
		})
	);
	app.use(morgan(formatMorgan));
	app.use(express.json());
	app.use(cookieParser());
	app.use('/', api());
	app.use(errorHandler);
}
