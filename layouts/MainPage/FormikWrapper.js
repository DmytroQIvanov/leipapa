import React from "react";
import { MainPageSchema } from "./ValidationSchema";
import { Formik } from "formik";

const FormikWrapper = ({ children }) => {
  return (
    <Formik
      initialValues={{
        country: "",
        fullName: "",
        email: "",
        typeOfEmployment: "",
        companyName: "",
      }}
      validationSchema={MainPageSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formikData) => children({ formikData })}
    </Formik>
  );
};

export default FormikWrapper;
