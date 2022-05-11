import prisma from '@lib/prisma';

export default async function getExchange(ticker: string) {
	const res = await prisma.stockMeta.findFirst({
		where: { ticker },
		select: { exchange: true }
	});
	return res?.exchange;
}
