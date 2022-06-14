import * as Yup from "yup";

export const MainPageSchema = Yup.object({
  country: Yup.object().required("Country is required"),
  fullName: Yup.string()
    .min(3)
    .max(10)
    .required("First and Last name is required"),
  email: Yup.string().email().required("Email is required"),
  companyNumber: Yup.string().min(3).max(10).required(),
  // rating: Yup.number().min(1).max(10).required(),
  // date: Yup.date().default(() => new Date()),
  // wouldRecommend: Yup.boolean().default(false),
  company: Yup.object({ title: Yup.string().min(3).required() }).required(
    "Company is required"
  ),

  entityAddress: Yup.string()
    .min(3)
    .max(10)
    .required("Entity address required"),
  entityCity: Yup.string().min(3).max(10).required("Entity address required"),
  entityPostalCode: Yup.string()
    .min(3)
    .max(10)
    .required("Entity address required"),

  // entityCity: Yup.string().min(1).max(10).required("Entity city is required"),

  // entityPostalCode: Yup.string()
  //   .min(1)
  //   .max(10)
  //   .required("Entity Postal Code is required"),
});
