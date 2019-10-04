import RecordService from '../services/RecordService';

class RecordRestController {
  async set(req, res) {
    const { key } = req.params;
    const value = req.body;
    const options = req.query;

    const response = await RecordService.set(key, value, options);

    return res.send(response.toString());
  }

  async get(req, res) {
    const { key } = req.params;
    const response = await RecordService.get(key);

    if (!response) {
      return res.send('nil');
    }

    return res.send(response);
  }

  async del(req, res) {
    const { key } = req.params;
    const response = await RecordService.del(key);

    return res.send(response.toString());
  }

  async dbsize(req, res) {
    const response = await RecordService.dbsize();

    return res.send(response.toString());
  }

  async incr(req, res) {
    const { key } = req.params;
    const response = await RecordService.incr(key);

    return res.send(response.toString());
  }

  async zadd(req, res) {
    const { key } = req.params;
    const { members } = req.body;

    const response = await RecordService.zadd(key, members);

    return res.send(response.toString());
  }

  async zcard(req, res) {
    const { key } = req.params;
    const response = await RecordService.zcard(key);

    return res.send(response.toString());
  }

  async zrank(req, res) {
    const { key, member } = req.params;
    const response = await RecordService.zrank(key, member);

    return res.send(response.toString());
  }

  async zrange(req, res) {
    const { key } = req.params;
    const { start, stop } = req.query;
    const response = await RecordService.zrange(key, start, stop);

    return res.send(response.toString());
  }
}

export default new RecordRestController();
