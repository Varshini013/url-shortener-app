import React from 'react';
import URLShortenerForm from './components/URLShortenerForm';
import StatsPage from './components/StatsPage';
import { Box, Tabs, Tab } from '@mui/material';

function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} centered>
        <Tab label="Shorten URLs" />
        <Tab label="View Stats" />
      </Tabs>
      {tab === 0 && <URLShortenerForm />}
      {tab === 1 && <StatsPage />}
    </Box>
  );
}

export default App;
