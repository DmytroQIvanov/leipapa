import React from "react";
import { MainPageSchema } from "./ValidationSchema";
import { Formik } from "formik";
import axios from "axios";

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
        const data = {
          companyName: values.companyName?.title,
          companyNumber: values.companyNumber,
          firstName: values.fullName,
          lastName: values.fullName,
          isLevel2DataAvailable: true,
          multiYearSupport: 1,
          legalJurisdiction: values.country.id,
        };
        alert(JSON.stringify(values, null, 2));
        alert(JSON.stringify(data, null, 2));

        axios
          .post("http://45.90.33.248:8000/api/v1/lei/demand/", data)
          .then((elem) => console.log(elem));
      }}
    >
      {(formikData) => children({ formikData })}
    </Formik>
  );
};

export default FormikWrapper;
