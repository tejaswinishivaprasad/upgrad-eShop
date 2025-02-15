/*
Creatable Select is used to add a select box which can display the Product categories and 
also allows the user to add a  new category of product while adding or modifying product 
details.
*/

import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";

const CreatableSelect = ({
  options,
  value,
  onChange,
  label,
  error,
  helperText,
}) => {
  const filter = createFilterOptions();
  const [selectedValue, setSelectedValue] = useState(value || null);

  useEffect(() => {
    // Sync internal state with the value prop
    setSelectedValue(value);
  }, [value]);

  return (
    <Autocomplete
      value={selectedValue}
      onChange={(event, newValue) => {
        if (
          newValue &&
          typeof newValue === "string" &&
          newValue.startsWith("Add ")
        ) {
          newValue = newValue.replace(/^Add /, "");
        }
        setSelectedValue(newValue);
        onChange(newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        if (inputValue !== "" && !options.includes(inputValue)) {
          filtered.push(`Add ${inputValue}`);
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="creatable-select"
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      renderOption={(props, option) => <li {...props}>{option}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
          sx={{ width: "100%" }} 
        />
      )}
      sx={{ width: "100%" }}
    />
  );
};

export default CreatableSelect;
