import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { getURLStats } from '../api';

const StatsPage = () => {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);

  const handleFetch = async () => {
    try {
      const res = await getURLStats(code);
      setStats(res.data);
    } catch (err) {
      alert(err.response?.data?.error || 'Error fetching stats');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>URL Stats</Typography>
      <TextField
        label="Enter Shortcode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={handleFetch}>Get Stats</Button>

      {stats && (
        <Box sx={{ mt: 4 }}>
          <Typography>Original URL: {stats.url}</Typography>
          <Typography>Created: {new Date(stats.createdAt).toLocaleString()}</Typography>
          <Typography>Expires: {new Date(stats.expiry).toLocaleString()}</Typography>
          <Typography>Total Clicks: {stats.clickCount}</Typography>
          <Typography>Click Data:</Typography>
          {stats.clickData.map((click, i) => (
            <Box key={i} sx={{ ml: 2 }}>
              <Typography>📍 {click.timestamp} — {click.referrer} — {click.location}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default StatsPage;
