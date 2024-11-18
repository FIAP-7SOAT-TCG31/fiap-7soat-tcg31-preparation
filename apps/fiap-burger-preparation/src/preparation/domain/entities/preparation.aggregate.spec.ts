import { randomUUID } from 'crypto';
import { PreparationCompleted } from '../events/preparation-completed.event';
import { PreparationRequested } from '../events/preparation-requested.event';
import { PreparationStarted } from '../events/preparation-started.event';
import { PreparationStatusFactory } from '../values/preparation-status.value';
import { Preparation } from './preparation.aggregate';

const createSpiedTarget = () => {
  const target = new Preparation(
    randomUUID(),
    'dummy',
    [],
    PreparationStatusFactory.new(),
    null,
    null,
    null,
  );
  jest.spyOn(target as any, 'applyEvent');
  return target;
};

describe('Preparation', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  describe('.getWaitTime()', () => {
    it('should throw if preparation is still in draft', () => {
      const target = createSpiedTarget();
      expect(() => target.getWaitTime()).toThrow(
        'Cannot get wait time for drafted preparation',
      );
    });

    it('should return a number of seconds if preparation has been requested', () => {
      const target = createSpiedTarget();
      target.request();
      expect(target.getWaitTime()).toEqual(expect.any(Number));
    });

    it('should return a number of seconds if preparation has been completed', () => {
      const target = createSpiedTarget();
      target.request();
      jest.advanceTimersByTime(60000);
      target.complete();
      const result = target.getWaitTime();
      expect(result).toEqual(expect.any(Number));
      expect(result).toBeGreaterThanOrEqual(60);
    });
  });

  describe('.request()', () => {
    it('should request a preparation', () => {
      const target = createSpiedTarget();
      target.request();

      expect((target as any).applyEvent).toHaveBeenCalledWith(
        expect.objectContaining(new PreparationRequested()),
      );
      expect(target.requestedAt).toEqual(expect.any(Date));
    });
  });

  describe('.start()', () => {
    it('should start order preparation', () => {
      const target = createSpiedTarget();
      target.request();
      target.start();

      expect((target as any).applyEvent).toHaveBeenCalledWith(
        expect.objectContaining(new PreparationStarted()),
      );
      expect(target.startedAt).toEqual(expect.any(Date));
    });
  });

  describe('.complete()', () => {
    it('should complete order preparation', () => {
      const target = createSpiedTarget();
      target.request();
      target.start();
      target.complete();

      expect((target as any).applyEvent).toHaveBeenCalledWith(
        expect.objectContaining(new PreparationCompleted()),
      );
      expect(target.completedAt).toEqual(expect.any(Date));
    });
  });
});
