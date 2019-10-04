import RecordService from '../services/RecordService';

class RecordController {
  async command(req, res) {
    const { cmd } = req.query;

    const query_params = cmd.split(' ');

    const func = query_params[0].toLowerCase();

    if (
      ![
        'set',
        'get',
        'del',
        'dbsize',
        'incr',
        'zadd',
        'zcard',
        'zrank',
        'zrange',
      ].includes(func)
    ) {
      return res.send(null);
    }

    const params = query_params.slice(1);

    if (func === 'set') {
      const [key, value, type, time] = params;
      const response = await RecordService.set(key, value, { type, time });

      return res.send(response.toString());
    }

    if (func === 'get') {
      const [key] = params;
      const response = await RecordService.get(key);

      if (!response) {
        return res.send(null);
      }

      return res.send(response.toString());
    }

    if (func === 'del') {
      const [key] = params;
      const response = await RecordService.del(key);

      return res.send(response.toString());
    }

    if (func === 'dbsize') {
      const response = await RecordService.dbsize();

      return res.send(response.toString());
    }

    if (func === 'incr') {
      const [key] = params;
      const response = await RecordService.incr(key);

      return res.send(response.toString());
    }

    if (func === 'zadd') {
      const [key] = params;
      const allParamsMembers = params.slice(1);

      const members = [];

      for (let i = 0; i < allParamsMembers.length; i += 2) {
        members.push({
          score: allParamsMembers[i],
          member: allParamsMembers[i + 1],
        });
      }

      const response = await RecordService.zadd(key, members);

      return res.send(response.toString());
    }

    if (func === 'zcard') {
      const [key] = params;
      const response = await RecordService.zcard(key);

      return res.send(response.toString());
    }

    if (func === 'zrank') {
      const [key, member] = params;
      const response = await RecordService.zrank(key, member);

      return res.send(response.toString());
    }

    if (func === 'zrange') {
      const [key, start, stop] = params;
      const response = await RecordService.zrange(key, start, stop);

      return res.send(response.toString());
    }

    return null;
  }
}

export default new RecordController();
