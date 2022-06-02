import React from 'react';
import {MainPageSchema} from "./ValidationSchema";
import {Formik} from "formik";

const FormikWrapper = ({children}) => {
    return (

        <Formik
            initialValues={{ country: "s", fullName: "",email:'',typeOfEmployment:'' }}
            validationSchema={MainPageSchema}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {(formikData) => children({formikData})}
        </Formik>
    )


};

export default FormikWrapper;