const express = require('express');
const router = express.Router();
const geoip = require('geoip-lite');
const generateShortcode = require('../utils/generateShortcode');
const { urls, clicks } = require('../data/storage');

// POST /shorturls
router.post('/shorturls', (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const code = shortcode || generateShortcode();

  if (urls[code]) return res.status(409).json({ error: 'Shortcode already exists' });

  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60000);

  urls[code] = { url, createdAt: now, expiry };
  clicks[code] = [];

  return res.status(201).json({
    shortLink: `http://localhost:5000/${code}`,
    expiry: expiry.toISOString()
  });
});

// Redirect GET /:shortcode
router.get('/:code', (req, res) => {
  const code = req.params.code;
  const record = urls[code];
  if (!record) return res.status(404).json({ error: 'Shortcode not found' });

  if (new Date() > new Date(record.expiry))
    return res.status(410).json({ error: 'Link expired' });

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const location = geoip.lookup(ip) || {};
  clicks[code].push({
    timestamp: new Date(),
    referrer: req.get('Referer') || 'Direct',
    location: location.country || 'Unknown'
  });

  return res.redirect(record.url);
});

// GET /shorturls/:code (Stats)
router.get('/shorturls/:code', (req, res) => {
  const code = req.params.code;
  if (!urls[code]) return res.status(404).json({ error: 'Shortcode not found' });

  const { url, createdAt, expiry } = urls[code];
  return res.status(200).json({
    url,
    createdAt,
    expiry,
    clickCount: clicks[code].length,
    clickData: clicks[code]
  });
});

module.exports = router;
