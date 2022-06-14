import React from "react";
import styles from "./CustomCheckBox.module.scss";
import { Checkbox, FormControlLabel } from "@mui/material";

const Index = ({
  label,
  required,
  value,
  onChange,
  error,
  width,
  formikData,
  ...other
}) => {
  const handleChange = (event) => {
    formikData.setFieldValue(other.name, event.target.checked);
  };
  return (
    <FormControlLabel
      value="end"
      control={<Checkbox checked={value} onChange={handleChange} />}
      label="*I here by accept the Terms & Conditions of LEI Register and give permission to apply for an LEI"
      className={error ? styles.checkBox_error : styles.checkBox_default}
      labelPlacement="*I here by accept the Terms & Conditions of LEI Register and give permission to apply for an LEI"
    />
  );
};

export default Index;
