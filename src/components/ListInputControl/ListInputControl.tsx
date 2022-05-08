import * as React from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const textInputRequired = 'Please type an item to add';

export type ListInputControlProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  max: number;
  disabled?: boolean;
  list: string[];
  onListChange: (items: string[]) => void;
};
export function ListInputControl({
  label,
  placeholder,
  required,
  max,
  disabled,
  list,
  onListChange,
}: ListInputControlProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [inputError, setInputError] = React.useState('');

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setInputError('');
    },
    []
  );

  const handleInputKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') {
        return;
      }

      if (inputValue === '') {
        setInputError(textInputRequired);
        return;
      }

      if (list.length === max) {
        setInputError(`Number of list items cannot exceed ${max}`);
        return;
      }

      onListChange([...list, inputValue]);
      setInputValue('');
    },
    [inputValue, list, max, onListChange]
  );

  const handleDeleteItem = React.useCallback(
    (itemToDelete: string) => {
      const newList = list.filter((item) => item !== itemToDelete);
      onListChange(newList);
    },
    [list, onListChange]
  );

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { width: '100%', mb: 1 },
      }}>
      <TextField
        label={label}
        placeholder={placeholder}
        variant="standard"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        error={!!inputError}
        helperText={inputError}
        disabled={disabled}
      />
      {list.length === 0 && required && (
        <Typography variant="body1" color="error">
          The list can not be empty
        </Typography>
      )}
      <List>
        {list.map((item) => (
          <ListItem
            key={item}
            disabled={disabled}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteItem(item)}>
                <CloseIcon />
              </IconButton>
            }>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
