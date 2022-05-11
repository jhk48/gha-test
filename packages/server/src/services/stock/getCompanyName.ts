import prisma from '@lib/prisma';

export default async function getCompanyName(ticker: string) {
	const res = await prisma.stockMeta.findFirst({
		where: { ticker },
		select: { name: true }
	});
	return res?.name;
}
