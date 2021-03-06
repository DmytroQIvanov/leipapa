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
    <div className={styles.checkBox}>
      <FormControlLabel
        value="end"
        control={<Checkbox checked={value} onChange={handleChange} />}
        label={label}
        className={error ? styles.checkBox_error : styles.checkBox_default}
      />
    </div>
  );
};

export default Index;
