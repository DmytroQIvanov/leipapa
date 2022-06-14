import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { renderOptionsFunction } from "../Functions/renderOptionsFunction";

const CountriesAutocomplete = ({
  countriesList,
  stateVisibly,
  inputCountry,
  setInputCountry,
  touched,
  setFieldValue,
  errors,
}) => {
  return (
    <Autocomplete
      disablePortal
      options={countriesList}
      getOptionLabel={(option) =>
        `${option.attributes.name} ${option.attributes.code}`
      }
      fullWidth={true}
      id="combo-box-demo"
      loading={countriesList.length <= 0}
      renderOption={(props, option, { selected }) => {
        let optionString = `${option.attributes.name} ${option.attributes.code}`;
        return renderOptionsFunction({
          props,
          option,
          selected,
          optionString,
          inputText: inputCountry,
        });
      }}
      sx={stateVisibly ? { mr: "26px" } : {}}
      onChange={(e, value) => setFieldValue("country", value)}
      renderInput={(params) => (
        <TextField
          {...params}
          value={inputCountry}
          onChange={(event) => setInputCountry(event.target.value)}
          label="Select Country"
          variant="standard"
          required
          error={touched.country && Boolean(errors.country)}
          helperText={touched.fullName && errors.fullName}
        />
      )}
    />
  );
};

export default CountriesAutocomplete;
