import React, { useEffect, useState } from "react";
import { renderOptionsFunction } from "../Functions/renderOptionsFunction";
import { Autocomplete, TextField } from "@mui/material";

const Companies = ({
  companiesList,
  companies,
  setFieldValue,
  touched,
  errors,
  values,
}) => {
  const [inputFullName, setInputFullName] = useState({
    title: "",
  });

  const [autoCompleteValue, setAutoCompleteValue] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    // if (autoCompleteValue) setCompanyList(companiesList);
    if (companiesList) setCompanyList(companiesList);
  }, [companiesList]);

  useEffect(() => {
    setFieldValue("companyName", autoCompleteValue);
    console.log(autoCompleteValue);
  }, [autoCompleteValue]);

  useEffect(() => {
    // console.log(errors.companyName?.title);
    // console.log(touched);
    console.log(companiesList);
  }, [companiesList]);
  return (
    <Autocomplete
      disablePortal
      options={companyList}
      getOptionLabel={(option) => `${option.companyName}`}
      fullWidth={true}
      value={autoCompleteValue}
      loading={companies.loading}
      renderOption={(props, option, { selected }) => {
        let optionString = `${option.companyName}`;
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
        setFieldValue("companyName", value);
        // setFieldValue("entityAddress", value.address.address_line_1);
        // setFieldValue("entityCity", value.address.locality);
        // setFieldValue("entityPostalCode", value.address.postal_code);
        // setFieldValue("companyNumber", value.company_number);
        setAutoCompleteValue(value);
        setInputFullName(value.companyName);
        // companies.handleChange(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Legal Entity name (start typing - autofill is possible)"
          variant="standard"
          name={"companyText"}
          onBlur={() => {
            inputFullName.title.length >= 1 &&
              setAutoCompleteValue(inputFullName);
            setCompanyList([...companyList, inputFullName]);
          }}
          value={inputFullName.title}
          onChange={(event) => {
            setInputFullName({ title: event.target.value });
            companies.handleChange(event.target.value);
          }}
          required
          error={touched.companyName && errors.companyName?.title}
          autocomplete="off"
        />
      )}
    />
  );
};

export default Companies;
