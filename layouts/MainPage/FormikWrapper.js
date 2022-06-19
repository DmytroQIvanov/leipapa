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
        directParentCompany: true,
        ultimateParentCompany: true,
        companyOwned: false,
        acceptTerms: false,
        weMayContact: false,
        informationDirectParentCompany: false,
        companyName: "",

        //PARENT
        parentCompanyName: "",
        parentCompanyNumber: "",
        parentEntityAddress: "",
        parentEntityCity: "",
        parentPostalCode: "",
        parentAccountingPeriodStarting: "",
        parentAccountingPeriod: "",
        parentRelationshipPeriod: "",

        addAnotherEmail: false,

        //ULTIMATE
        ultimateParentCompanyName: "",
        ultimateCompanyName: "",
        ultimateEntityAddress: "",
        ultimateCity: "",
        ultimatePostalCode: "",
        ultimatePeriodStart: "",
        ultimateAccordingPeriod: "",
        ultimateRelationsPeriod: "",

        userAuthority: "",
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
