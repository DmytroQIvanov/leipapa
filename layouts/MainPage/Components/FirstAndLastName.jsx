import React, { useState } from "react";
import { renderOptionsFunction } from "../Functions/renderOptionsFunction";
import { Autocomplete, TextField } from "@mui/material";

const FirstAndLastName = ({ company, errors, setFieldValue, touched }) => {
  const [inputFullName, setInputFullName] = useState({
    name: "",
  });

  return (
    <Autocomplete
      disablePortal
      options={company.officers.list}
      getOptionLabel={(option) => `${option.name}`}
      fullWidth={true}
      value={inputFullName}
      loading={company.officers.loading}
      renderOption={(props, option, { selected }) => {
        let optionString = `${option.name}`;
        return renderOptionsFunction({
          props,
          option,
          selected,
          optionString,
          inputText: inputFullName,
        });
      }}
      onChange={(e, value) => {
        setFieldValue("officerFullName", value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Application First and Last Name"
          variant="standard"
          required
          value={inputFullName.name}
          onChange={(event) => setInputFullName({ name: event.target.value })}
          error={touched.company && errors.company}
        />
      )}
    />
  );
};

export default FirstAndLastName;
