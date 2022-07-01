import React, { useEffect, useState } from "react";
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
  statesList,
  values,
}) => {
  const [inputStates, setInputStates] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <Autocomplete
        disablePortal
        options={countriesList}
        getOptionLabel={(option) =>
          `${option.attributes.name} ${option.attributes.code}`
        }
        fullWidth={true}
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
            label="Select Country (the jurisdiction of incorporation)"
            variant="standard"
            required
            autocomplete="off"
            error={touched.country && Boolean(errors.country)}
            helperText={touched.fullName && errors.fullName}
          />
        )}
      />
      {/*---STATES---*/}
      {stateVisibly && (
        <Autocomplete
          disablePortal
          options={statesList}
          getOptionLabel={(option) =>
            `${option.attributes.names[0].name} ${option.attributes.code}`
          }
          fullWidth={true}
          loading={statesList.length <= 0}
          id="combo-box-demo"
          onChange={(e, value) => setFieldValue("state", value)}
          renderOption={(props, option, { selected }) => {
            let optionString = `${option.attributes.names[0].name} ${option.attributes.code}`;
            return renderOptionsFunction({
              props,
              option,
              selected,
              optionString,
              inputText: inputStates,
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={inputStates}
              onChange={(event) => setInputStates(event.target.value)}
              label="Select State"
              variant="standard"
              required
              error={touched.states && Boolean(errors.states)}
              helperText={touched.states && errors.states}
            />
          )}
        />
      )}
    </div>
  );
};

export default CountriesAutocomplete;
