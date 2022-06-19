import React from "react";
import CustomInput from "../../../components/CustomInput";

const CompanyNumber = ({ values, handleChange, touched, errors }) => {
  return (
    <CustomInput
      label="Company number / Registration ID"
      questionLink={
        "Insert the number the legal entity was given when it was registered - that is the number it can be found by in a registry (e.g. Companies House). If your entity does not have a registration number insert N/A (e.g. a trust or other type of entity that is not registered)."
      }
      required
      name={"companyNumber"}
      value={values.companyNumber}
      onChange={handleChange}
      error={touched.companyNumber && errors.companyNumber}
    />
  );
};

export default CompanyNumber;
