import React, { useState } from "react";
import { renderOptionsFunction } from "../Functions/renderOptionsFunction";
import { Autocomplete, TextField } from "@mui/material";

const FirstAndLastName = ({ company, errors, setFieldValue, touched }) => {
  const [inputFullName, setInputFullName] = useState({
    name: "",
  });

  const [autoCompleteValue, setAutoCompleteValue] = useState(null);

  return (
    <Autocomplete
      disablePortal
      options={company.officers.list}
      getOptionLabel={(option) => `${option.name}`}
      fullWidth={true}
      value={autoCompleteValue}
      loading={company.officers.loading}
      renderOption={(props, option, { selected }) => {
        let optionString = `${option.name}`;
        return renderOptionsFunction({
          props,
          option,
          selected,
          optionString,
          inputText: inputFullName.name,
        });
      }}
      onChange={(e, value) => {
        setFieldValue("officerFullName", value);
        setAutoCompleteValue(value.name);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Application First and Last Name"
          variant="standard"
          autocomplete="off"
          required
          onBlur={() => {
            inputFullName.name.length >= 1 &&
              setAutoCompleteValue(company.officers.list[0]);
            console.log(inputFullName.name);
            console.log(autoCompleteValue);
          }}
          value={inputFullName.name}
          onChange={(event) => setInputFullName({ name: event.target.value })}
          error={touched.company && errors.company}
        />
      )}
    />
  );
};

export default FirstAndLastName;
