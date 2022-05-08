import * as React from 'react';
import { Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

import { ListInputControl } from './components/ListInputControl';
import { CheckBox } from '@mui/icons-material';

function App() {
  const [list, setList] = React.useState<string[]>([]);
  const [disabled, setDisabled] = React.useState(false);

  const handleDisabledChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDisabled(e.target.checked);
    },
    []
  );

  return (
    <Box display="flex" justifyContent="center" mt={3}>
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
          onListChange={setList}
        />
      </Box>
    </Box>
  );
}

export default App;
