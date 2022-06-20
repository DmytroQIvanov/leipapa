import React from "react";
import { renderOptionsFunction } from "../Functions/renderOptionsFunction";
import { Autocomplete, TextField } from "@mui/material";

const Companies = ({
  companiesList,
  companies,
  setFieldValue,
  touched,
  errors,
}) => {
  return (
    <Autocomplete
      disablePortal
      options={companiesList}
      getOptionLabel={(option) => `${option.title}`}
      fullWidth={true}
      loading={companies.loading}
      renderOption={(props, option, { selected }) => {
        let optionString = `${option.title}`;
        return renderOptionsFunction({
          props,
          option,
          selected,
          optionString,
          inputText: companies.value,
        });
      }}
      id="combo-box-demo"
      onChange={(e, value) => {
        setFieldValue("company", value);
        setFieldValue("entityAddress", value.address.address_line_1);
        setFieldValue("entityCity", value.address.locality);
        setFieldValue("entityPostalCode", value.address.postal_code);
        setFieldValue("companyNumber", value.company_number);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Legal Entity name (start typing - autofill is possible)"
          variant="standard"
          name={"companyText"}
          value={companies.value}
          onChange={(event) => companies.handleChange(event.target.value)}
          required
          error={touched.company && errors.company}
          autocomplete="off"
        />
      )}
    />
  );
};

export default Companies;
