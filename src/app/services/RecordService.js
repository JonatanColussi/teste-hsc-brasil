import Record from '../models/Records';

class RecordService {
  async set(key, value, options) {
    const record = await Record.findOne({ key });

    if (record) {
      const { id } = record;

      await Record.findByIdAndUpdate(id, { value });
    } else {
      await Record.create({
        key,
        value,
      });
    }

    const { type, time } = options;

    if (type && type.toUpperCase() === 'EX') {
      setTimeout(async () => {
        await Record.deleteOne({ key });
      }, time * 10000);
    }

    return 'OK';
  }

  async get(key) {
    const record = await Record.findOne({ key });

    if (!record) {
      return null;
    }

    const { value } = record;

    return value;
  }

  async del(key) {
    const deleted = await Record.deleteOne({ key });

    return deleted ? 1 : null;
  }

  async dbsize() {
    const count = await Record.countDocuments();

    return count;
  }

  async incr(key) {
    const record = await Record.findOne({ key });

    if (!record) {
      await Record.create({ key, value: 0 });
      return 0;
    }

    const { value } = record;

    if (!Number.isNaN(value)) {
      const newValue = parseInt(value, 10) + 1;
      record.value = newValue;
      record.save();

      return newValue;
    }
    return null;
  }

  async zadd(key, members) {
    const record = await Record.findOne({ key });

    if (record) {
      const { id, value } = record;

      const newValue = [...value, ...members];

      await Record.findByIdAndUpdate(id, { value: newValue });
    } else {
      await Record.create({
        key,
        value: members,
      });
    }

    return members.length;
  }

  async zcard(key) {
    const record = await Record.findOne({ key });

    const { value } = record;

    return value.length;
  }

  async zrank(key, findMember) {
    const record = await Record.findOne({ key });

    if (!record) {
      return null;
    }

    const { value } = record;

    const index = value.findIndex(item => {
      const { member } = item;

      return member === findMember;
    });

    return index;
  }

  async zrange(key, start, stop) {
    const record = await Record.findOne({ key });

    const { value } = record;

    const values = value.map(val => val.member);

    return stop <= 0 ? values.slice(start) : values.slice(start, stop);
  }
}

export default new RecordService();
