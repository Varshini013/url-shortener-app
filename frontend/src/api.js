import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const shortenURL = async (data) =>
  await axios.post(`${API_BASE}/shorturls`, data);

export const getURLStats = async (shortcode) =>
  await axios.get(`${API_BASE}/shorturls/${shortcode}`);
