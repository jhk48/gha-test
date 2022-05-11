import { RealtimeData, MajorIndexData } from '@portbullio/shared/src/types';
import EventEmitter from 'events';

type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = keyof T & (string | symbol);
type EventReceiver<T> = (evtParams: T) => void;

interface EvtEmitter<T extends EventMap> {
	on<K extends EventKey<T>>(evtName: K, fn: EventReceiver<T[K]>): void;
	off<K extends EventKey<T>>(evtName: K, fn: EventReceiver<T[K]>): void;
	emit<K extends EventKey<T>>(evtName: K, evtParams?: T[K]): void;
}

interface EventTypes {
	BROADCAST_REALTIME_DATA: () => void;
	BROADCAST_MAJOR_INDICES_DATA: MajorIndexData[];
	BROADCAST_TOP_STOCKS_DATA: () => void;
	BROADCAST_STOCK_OVERVIEW_DATA: RealtimeData[];
}

export class Emitter<T extends EventMap> implements EvtEmitter<T> {
	private emitter = new EventEmitter();

	on<K extends EventKey<T>>(evtName: K, fn: EventReceiver<T[K]>) {
		this.emitter.on(evtName, fn);
	}

	off<K extends EventKey<T>>(evtName: K, fn: EventReceiver<T[K]>) {
		this.emitter.off(evtName, fn);
	}

	emit<K extends EventKey<T>>(evtName: K, evtParams?: T[K]) {
		this.emitter.emit(evtName, evtParams);
	}
}

export default new Emitter<EventTypes>();
