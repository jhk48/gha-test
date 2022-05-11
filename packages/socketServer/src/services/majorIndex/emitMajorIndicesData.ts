import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData
} from '@portbullio/shared/src/types';
import * as MajorIndexService from '@services/majorIndex';

export default async function emitMajorIndicesData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	userId?: string
) {
	let cachedMajorIndicesData = await MajorIndexService.getMajorIndicesDataFromDB();
	if (!cachedMajorIndicesData) {
		const majorIndicesData = await MajorIndexService.fetchMajorIndicesData();
		if (!majorIndicesData) return;

		await MajorIndexService.saveMajorIndicesDataIntoDB(majorIndicesData);
		cachedMajorIndicesData = MajorIndexService.transformMajorIndexData(majorIndicesData);
	}

	if (!userId) io.emit('MAJOR_INDICES_DATA', cachedMajorIndicesData);
	else io.to(userId).emit('MAJOR_INDICES_DATA', cachedMajorIndicesData);
}
