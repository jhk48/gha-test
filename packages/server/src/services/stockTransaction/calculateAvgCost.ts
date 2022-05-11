import { join } from 'path';
import { Worker } from 'worker_threads';
import { StockTransactionLog } from '@prisma/client';
import { Holding } from '@portbullio/shared/src/types';

export default function calculateAvgCost(transactions: StockTransactionLog[]) {
	return new Promise<Holding[]>((resolve, reject) => {
		const worker = new Worker(join(process.cwd(), 'src', 'worker', 'worker.ts'), {
			workerData: transactions
		});
		worker.once('message', resolve);
		worker.on('error', reject);
		worker.on('exit', code => {
			if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
		});
	});
}
