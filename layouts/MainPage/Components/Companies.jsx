import React, { useEffect, useState } from "react";
import { renderOptionsFunction } from "../Functions/renderOptionsFunction";
import { Autocomplete, TextField } from "@mui/material";

const Companies = ({
  companiesList,
  companies,
  setFieldValue,
  touched,
  errors,
}) => {
  const [inputFullName, setInputFullName] = useState({
    title: "",
  });

  const [autoCompleteValue, setAutoCompleteValue] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    setCompanyList(companiesList);
    console.log(companiesList);
  }, [companiesList]);
  useEffect(() => {
    setAutoCompleteValue(companiesList[0]);
  }, [companiesList]);

  useEffect(() => {
    companies.handleChange(inputFullName.title);
  }, [inputFullName]);
  return (
    <Autocomplete
      disablePortal
      options={companyList}
      getOptionLabel={(option) => `${option.title}`}
      fullWidth={true}
      value={autoCompleteValue}
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
        setAutoCompleteValue(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Legal Entity name (start typing - autofill is possible)"
          variant="standard"
          name={"companyText"}
          // value={companies.value}
          // onChange={(event) => companies.handleChange(event.target.value)}
          onBlur={() => {
            inputFullName.title.length >= 1 &&
              setAutoCompleteValue(inputFullName);
            setCompanyList([...companyList, inputFullName]);
          }}
          value={inputFullName.title}
          onChange={(event) => {
            setInputFullName({ title: event.target.value });
          }}
          required
          error={touched.company && errors.company}
          autocomplete="off"
        />
      )}
    />
  );
};

export default Companies;
