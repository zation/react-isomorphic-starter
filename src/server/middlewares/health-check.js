export default (req, res) => {
  setTimeout(() => {
    res.locals.statsdUrlKey = 'healthCheck';

    if (req.app.get('isSigterm')) {
      res.writeHead(500);
      return res.end('React web is unavailable');
    }

    if (!req.accepts('txt') && req.accepts('json')) {
      return res.json({
        ping: 'PONG',
      });
    }

    res.type('txt');
    return res.send('PONG');
  }, req.query.wait || 0);
};
