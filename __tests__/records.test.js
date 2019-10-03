import dbConnection from './utils/dbConnection';
import truncate from './utils/truncate';

import recordService from '../src/app/services/RecordService';

describe('Record', () => {
  beforeAll(async () => {
    dbConnection();
    await truncate();
  });

  it('Set record', async () => {
    const record = await recordService.set('mykey', 'Hello', {});

    expect(record).toBe('OK');
  });

  it('Update record', async () => {
    const record = await recordService.set('mykey', 'Hello 2', {});

    expect(record).toBe('OK');
  });

  it('Get record', async () => {
    const record = await recordService.get('mykey');

    expect(record).toBe('Hello 2');
  });

  it('Delete record', async () => {
    const deleted = await recordService.del('mykey');
    const notFoundRecord = await recordService.get('mykey');

    expect(deleted).toBe(1);
    expect(notFoundRecord).toBe(null);
  });

  it('count records', async () => {
    await recordService.set('key 1', 'Hello', {});
    await recordService.set('key 2', 'Hello', {});
    await recordService.set('key 3', 'Hello', {});

    const count = await recordService.dbsize();

    expect(count).toBe(3);
  });

  it('Increment value', async () => {
    await recordService.set('mykeyincremental', 1, {});

    const newValue = await recordService.incr('mykeyincremental');

    expect(newValue).toBe(2);
  });

  it('Create array members', async () => {
    const recordCount = await recordService.zadd('myarray', [
      { score: 1, member: 'One' },
    ]);

    expect(recordCount).toBe(1);
  });

  it('Add array members', async () => {
    const recordCount = await recordService.zadd('myarray', [
      { score: 2, member: 'Two' },
      { score: 3, member: 'Three' },
    ]);

    expect(recordCount).toBe(2);
  });

  it('Count array members', async () => {
    const recordCount = await recordService.zcard('myarray');

    expect(recordCount).toBe(3);
  });

  it('Get position of member', async () => {
    const recordCount = await recordService.zrank('myarray', 'Three');

    expect(recordCount).toBe(2);
  });

  it('Get itens of range', async () => {
    const items = await recordService.zrange('myarray', -2, -1);

    expect(items).toEqual(['Two', 'Three']);
  });
});
