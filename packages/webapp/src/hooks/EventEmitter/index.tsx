import * as React from 'react';
import EventEmitter from 'eventemitter3';

type EventTypes = 'LOG_OUT';

const EventEmitterContext = React.createContext<EventEmitter<EventTypes> | null>(null);
const Emitter = new EventEmitter<EventTypes>();

export function EventEmitterProvider({ children }: { children: React.ReactNode }) {
	return <EventEmitterContext.Provider value={Emitter}>{children}</EventEmitterContext.Provider>;
}

export function useEmitter() {
	const state = React.useContext(EventEmitterContext);
	if (state === null) throw new Error('Cannot find EventEmitterContextProvider');
	return state;
}
