import sinon from 'sinon';
import dailySchedule from './index';

describe('DailySchedule test', () => {
	test('throw error when the time pattern is invalid', () => {
		expect(() => {
			dailySchedule('-01:00:00', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('01:-00:00', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('01:0a:12', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('   ', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('a', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('34:00:03', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('12:61:59', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('12:38:61', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('24:00:00', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('120021', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('06:43:01 AM', () => {});
		}).toThrow('Invalid time pattern');

		expect(() => {
			dailySchedule('06:43:02 pm', () => {});
		}).toThrow('Invalid time pattern');
	});

	test('run scheduled task at 00:00:30 AM every day', () => {
		const callback = jest.fn();
		const dateForTest = new Date('01/01/2022');
		dateForTest.setSeconds(0);
		dateForTest.setMinutes(0);
		dateForTest.setHours(0);

		const clock = sinon.useFakeTimers(dateForTest.getTime());

		dailySchedule('00:00:30', callback);

		const day = 24 * 60 * 60 * 1000;
		clock.tick(day);
		expect(callback).toHaveBeenCalledTimes(1);
		clock.tick(day);
		expect(callback).toHaveBeenCalledTimes(2);
		clock.tick(day);
		expect(callback).toHaveBeenCalledTimes(3);
		clock.tick(5 * day);
		expect(callback).toHaveBeenCalledTimes(8);
		clock.restore();
	});

	test('run scheduled task at immediately', () => {
		const callback = jest.fn();
		const dateForTest = new Date('01/01/2022');
		dateForTest.setSeconds(0);
		dateForTest.setMinutes(0);
		dateForTest.setHours(0);

		const clock = sinon.useFakeTimers(dateForTest.getTime());

		dailySchedule('00:00:00', callback);

		const day = 24 * 60 * 60 * 1000;
		clock.tick(1);
		expect(callback).toHaveBeenCalledTimes(1);
		clock.tick(day);
		expect(callback).toHaveBeenCalledTimes(2);
		clock.tick(day * 10);
		expect(callback).toHaveBeenCalledTimes(12);
		clock.restore();
	});
});
