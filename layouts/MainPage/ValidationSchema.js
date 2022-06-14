import * as Yup from "yup";

export const MainPageSchema = Yup.object({
  country: Yup.object().required("Country is required"),
  fullName: Yup.string()
    .min(3)
    .max(10)
    .required("First and Last name is required"),
  email: Yup.string().email().required("Email is required"),
  companyNumber: Yup.string()
    .min(3)
    .max(10)
    .required("Company Number is required"),
  company: Yup.object({ title: Yup.string().min(3).required() }).required(
    "Company is required"
  ),

  acceptTerms: Yup.bool().oneOf([true], "Field must be checked"),

  entityAddress: Yup.string()
    .min(3)
    .max(10)
    .required("Entity address required"),
  entityCity: Yup.string().min(3).max(10).required("Entity City required"),
  entityPostalCode: Yup.string()
    .min(3)
    .max(10)
    .required("Entity Postal Code required"),

  // entityCity: Yup.string().min(1).max(10).required("Entity city is required"),

  // entityPostalCode: Yup.string()
  //   .min(1)
  //   .max(10)
  //   .required("Entity Postal Code is required"),
});
