import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { shortenURL } from '../api';

const URLShortenerForm = () => {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAdd = () => {
    if (urls.length < 5) setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
  };

  const handleSubmit = async () => {
    const responses = [];
    for (let i = 0; i < urls.length; i++) {
      const { url, validity, shortcode } = urls[i];
      if (!/^https?:\/\/.+\..+/.test(url)) {
        alert(`Invalid URL at row ${i + 1}`);
        return;
      }
      try {
        const res = await shortenURL({
          url,
          validity: validity ? parseInt(validity) : undefined,
          shortcode: shortcode || undefined,
        });
        responses.push(res.data);
      } catch (err) {
        alert(`Error for row ${i + 1}: ${err.response?.data?.error || 'Unknown error'}`);
      }
    }
    setResults(responses);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((entry, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Long URL"
              value={entry.url}
              onChange={(e) => handleChange(i, 'url', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Validity (mins)"
              value={entry.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              value={entry.shortcode}
              onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={handleAdd} disabled={urls.length >= 5}>Add URL</Button>
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>Shorten</Button>

      <Box sx={{ mt: 4 }}>
        {results.map((res, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography>
              🔗 <a href={res.shortLink} target="_blank" rel="noopener noreferrer">{res.shortLink}</a>
              <br />
              ⏳ Expires at: {new Date(res.expiry).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default URLShortenerForm;
