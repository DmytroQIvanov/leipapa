import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField, Typography,
} from "@mui/material";
import styles from "./MainPage.module.scss";
import { countryList } from "../../assets/countryList";
import { Formik } from "formik";
import { MainPageSchema } from "./ValidationSchema";
import CustomInput from "../../components/CustomInput";
import SelectableBlock from "../../components/SelectableBlock";

const MainPage = () => {
  return (
    <Formik
      initialValues={{ country: "", fullName: "" }}
      validationSchema={MainPageSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => {
        console.log(values);
        console.log(errors);
        return (
          <form onSubmit={handleSubmit} className={styles.mainPage}>
              <div className={styles.mainPageContainer}>
                <div className={styles.mainPageContainer__firstBlock}>
                  <Autocomplete
                    disablePortal
                    fullWidth={true}
                    id="combo-box-demo"
                    options={countryList}
                    onChange={(e, value) => setFieldValue("country", value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Country"
                        variant="standard"
                        required
                        error={touched.country && Boolean(errors.country)}
                        helperText={touched.fullName && errors.fullName}
                      />
                    )}
                  />
                  <CustomInput
                    placeholder={"Application first and last name"}
                    required
                    questionLink={"smth"}
                    variant="standard"
                    size={"medium"}
                    value={values.email}
                    onChange={handleChange}
                    error={touched.fullName && errors.fullName}
                    helperText={touched.fullName && errors.fullName}
                    subTitle={"Add another e-mail"}
                  />
                  <Input
                    placeholder="Legal entity name (start typing org name - autofill possible) *"
                    required
                  />
                  <Input
                    placeholder="E-mail *"
                    required
                    name={"email"}
                    type={"email"}
                  />
                  <Input
                    placeholder="Company number / Registration ID *"
                    required
                  />
                  <Input placeholder="Phone number" />
                  <Input placeholder="Vat number, if applicable (E.G. GB 999 999 999 999)" />
                </div>
                <SelectableBlock label={'Is the company owned be another company? (>50%)'} required/>

                <Box className={styles.mainPageContainer__secondBlock}>
                  <Typography fontWeight={700} fontSize={20}>Entity Address</Typography>
                  <CustomInput
                      placeholder={"Application first and last name"}
                      required
                      value={values.email}
                      onChange={handleChange}
                      error={touched.fullName && errors.fullName}
                  />
                  <CustomInput
                      placeholder={"Application first and last name"}
                      required
                      value={values.email}
                      onChange={handleChange}
                      error={touched.fullName && errors.fullName}
                  />
                  <CustomInput
                      placeholder={"Application first and last name"}
                      required
                      value={values.email}
                      onChange={handleChange}
                      error={touched.fullName && errors.fullName}
                  />
                </Box>
                <SelectableBlock label={'Is the company owned be another company? (>50%)'} required/>

                <Box sx={{ display: "flex" }}>
                  <Button
                      type={"submit"}
                      variant={"contained"}
                      sx={{ m: "20px auto" }}
                  >
                    Submit
                  </Button>
                </Box>
              </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default MainPage;
