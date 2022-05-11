import { useEffect, useState } from 'react';
import { MajorIndices } from '@portbullio/shared/src/types';
import { useSocketIo } from '@hooks/index';

export default function useMajorIndicesData(): MajorIndices | undefined {
	const [majorIndicesData, setMajorIndicesData] = useState<MajorIndices>();
	const socket = useSocketIo();

	useEffect(() => {
		let shouldCancel = false;
		socket.emit('SUBSCRIBE_MAJOR_INDICES_DATA');
		socket.emit('REQ_MAJOR_INDICES_DATA');
		socket.on('MAJOR_INDICES_DATA', data => {
			if (shouldCancel) return;
			setMajorIndicesData(data);
		});

		return () => {
			shouldCancel = true;
			socket.emit('UNSUBSCRIBE_MAJOR_INDICES_DATA');
		};
	}, [socket]);

	return majorIndicesData;
}
