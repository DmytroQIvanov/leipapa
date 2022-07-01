import React, { useEffect, useState } from "react";
import { renderOptionsFunction } from "../Functions/renderOptionsFunction";
import { Autocomplete, TextField } from "@mui/material";

const FirstAndLastName = ({ company, errors, setFieldValue, touched }) => {
  const [inputFullName, setInputFullName] = useState({
    name: "",
  });

  const [autoCompleteValue, setAutoCompleteValue] = useState(null);
  const [companyList, setCompanyList] = useState(company.officers.list);
  useEffect(() => {
    setCompanyList(company.officers.list);
  }, [company.officers.list]);
  useEffect(() => {
    setAutoCompleteValue(company.officers?.list[0]);
  }, [company.officers.list]);

  console.log(touched);
  useEffect(() => {
    if (autoCompleteValue?.name)
      setFieldValue("fullName", autoCompleteValue?.name);
  }, [autoCompleteValue]);
  return (
    <Autocomplete
      disablePortal
      options={companyList}
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
        setAutoCompleteValue(value);
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
              setAutoCompleteValue(inputFullName);
            setCompanyList([...companyList, inputFullName]);
            console.log(inputFullName.name);
            console.log(autoCompleteValue);
          }}
          value={inputFullName.name}
          onChange={(event) => setInputFullName({ name: event.target.value })}
          error={touched.fullName && errors.fullName}
        />
      )}
    />
  );
};

export default FirstAndLastName;
