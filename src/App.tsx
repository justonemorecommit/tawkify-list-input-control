import * as React from 'react';
import {
  Alert,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

import { ListInputControl } from './components/ListInputControl';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT as string;

// An api function to save a list
const apiPutList = (items: string[]) => {
  return window.fetch(apiEndpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(items),
  });
};

// An api function to fetch a list
const apiFetchList = () => {
  return window
    .fetch(apiEndpoint)
    .then((res) => res.json() as Promise<string[]>);
};

function App() {
  const [list, setList] = React.useState<string[]>([]);
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    apiFetchList()
      .then((list) => {
        setList(list);
      })
      .catch(() => {
        setError('An error occurred while fetching a list');
      });
  }, []);

  const handleDisabledChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDisabled(e.target.checked);
    },
    []
  );

  const handleListChange = React.useCallback((list: string[]) => {
    setList(list);
    apiPutList(list).catch(() => {
      setError('An error occurred while saving a list');
    });
  }, []);

  const handleCloseAlert = React.useCallback(() => {
    setError('');
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={3}>
      {error && (
        <Box mb={5}>
          <Alert severity="error" onClose={handleCloseAlert}>
            {error}
          </Alert>
        </Box>
      )}
      <Box width="300px">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={disabled} onChange={handleDisabledChange} />
            }
            label="Disabled"
          />
        </FormGroup>
        <ListInputControl
          label="Top 3 Priorities"
          placeholder="Type an item to add and press enter"
          required
          disabled={disabled}
          max={3}
          list={list}
          onListChange={handleListChange}
        />
      </Box>
    </Box>
  );
}

export default App;
