import * as Yup from "yup";

export const MainPageSchema = Yup.object({
  country: Yup.object().required("Country is required"),
  fullName: Yup.string()
    .min(3)
    .max(10)
    .required("First and Last name is required"),
  // email: Yup.string().email().required(),
  // rating: Yup.number().min(1).max(10).required(),
  // date: Yup.date().default(() => new Date()),
  // wouldRecommend: Yup.boolean().default(false),
});
