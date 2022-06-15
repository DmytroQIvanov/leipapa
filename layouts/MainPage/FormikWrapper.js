import React from "react";
import { MainPageSchema } from "./ValidationSchema";
import { Formik } from "formik";

const FormikWrapper = ({ children }) => {
  return (
    <Formik
      initialValues={{
        country: "",
        fullName: "",
        legalEntityName: "",
        email: "",
        companyNumber: "",
        phoneNumber: "",
        vatNumber: "",
        typeOfEmployment: "",
        entityAddress: "",
        entityCity: "",
        entityPostalCode: "",

        headquartesAddress: true,
        headquartersAddress: "",
        headquartersCity: "",
        headquartersPostalCode: "",
        parentConsolidate: false,
        companyUltimate: true,
        companyOwned: false,
        acceptTerms: false,
        weMayContact: false,
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
