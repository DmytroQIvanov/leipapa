import React from "react";
import CustomInput from "../../../components/CustomInput";

const Email = ({ values, handleChange, errors, touched, setFieldValue }) => {
  return (
    <CustomInput
      label="E-mail"
      required
      name={"email"}
      type={"email"}
      subTitle={"Add another e-mail"}
      value={values.email}
      onChange={handleChange}
      error={touched.email && errors.email}
      helperText={touched.email && errors.email}
      handleSubTitle={() => setFieldValue("addAnotherEmail", true)}
    />
  );
};

export default Email;
