import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./MainPage.module.scss";
import CustomInput from "../../components/CustomInput";
import SelectableBlock from "../../components/SelectableBlock";
import useCountry from "../../hooks/useCountry";
import CustomRadioButtonsGroup from "../../components/CustomRadioButtons";
import ConfirmModal from "../../components/ConfirmModal";

const Component = ({ data }) => {
  console.log(data);
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    data;
  const [stateVisibly, setStateVisibly] = useState(false);
  const arrayCountriesWithState = ["CA", "US"];

  useEffect(() => {
    if (arrayCountriesWithState.includes(values.country.iso2)) {
      setStateVisibly(true);
    } else {
      setStateVisibly(false);
    }
  }, [values.country]);
  const { countriesList, companyList, statesList } = useCountry({
    companyTextInput: values.companyText,
    selectedCountry: values.country,
  });
  const [confirmModalState, setConfirmModalState] = useState(false);
  const handleClose = () => {
    setConfirmModalState(false);
  };
  const handleOpen = () => {
    setConfirmModalState(true);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.mainPage}>
      <div className={styles.mainPageContainer}>
        <div className={styles.mainPageContainer__firstBlock}>
          <div style={{ display: "flex" }}>
            <Autocomplete
              disablePortal
              options={countriesList}
              // getOptionLabel={(option) => option.attributes.name}
              getOptionLabel={(option) => option.country}
              fullWidth={true}
              id="combo-box-demo"
              sx={stateVisibly ? { mr: "26px" } : {}}
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
            {stateVisibly && (
              <Autocomplete
                disablePortal
                options={statesList}
                getOptionLabel={(option) => option.name}
                fullWidth={true}
                id="combo-box-demo"
                onChange={(e, value) => setFieldValue("state", value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select State"
                    variant="standard"
                    required
                    error={touched.country && Boolean(errors.country)}
                    helperText={touched.fullName && errors.fullName}
                  />
                )}
              />
            )}
          </div>
          <CustomInput
            label={"Application first and last name"}
            required
            questionLink={"smth"}
            name={"email"}
            variant="standard"
            size={"medium"}
            value={values.email}
            onChange={handleChange}
            error={touched.fullName && errors.fullName}
            helperText={touched.fullName && errors.fullName}
          />
          {/*<CustomInput*/}
          {/*  label="Legal entity name (start typing org name - autofill possible)"*/}
          {/*  name={'companyText'}*/}
          {/*  required*/}
          {/*/>*/}

          <Autocomplete
            disablePortal
            options={companyList}
            getOptionLabel={(option) => option.attributes.value}
            fullWidth={true}
            id="combo-box-demo"
            onChange={(e, value) => setFieldValue("country", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Legal entity name (start typing org name - autofill possible)"
                variant="standard"
                name={"companyText"}
                value={values.companyText}
                onChange={handleChange}
                required
                error={touched.companyText && Boolean(errors.companyText)}
                helperText={touched.companyText && errors.companyText}
              />
            )}
          />
          <CustomInput
            label="E-mail"
            required
            name={"email"}
            type={"email"}
            subTitle={"Add another e-mail"}
          />
          <CustomInput
            label="Company number / Registration ID"
            questionLink={"smth"}
            required
          />
          <CustomInput label="Phone number" />
          <CustomInput label="Vat number, if applicable (E.G. GB 999 999 999 999)" />
        </div>
        <SelectableBlock
          label={"Headquartes address is identical to legal address?"}
        />
        <Box sx={{ display: "flex", flexDirection: "column", mb: "15px" }}>
          <CustomRadioButtonsGroup
            title={"???"}
            value={values.typeOfEmployment}
            handleChange={(e, value) => {
              console.log(value);
              setFieldValue("typeOfEmployment", value);
            }}
            buttonsArray={[
              { label: "Private person", value: "private" },
              { label: "Company", value: "company" },
            ]}
          />
          {values.typeOfEmployment == "company" && <input type={"file"} />}
        </Box>
        <Box className={styles.mainPageContainer__secondBlock}>
          <Typography fontWeight={700} fontSize={20}>
            Entity Address
          </Typography>
          <CustomInput
            label={"Entity address"}
            required
            name={"entityAddress"}
            value={values.entityAddress}
            onChange={handleChange}
            error={touched.entityAddress && errors.entityAddress}
          />
          <CustomInput
            label={"City"}
            name={"entityCity"}
            required
            value={values.entityCity}
            onChange={handleChange}
            error={touched.entityCity && errors.entityCity}
          />
          <CustomInput
            label={"Postal code"}
            required
            name={"entityPostalCode"}
            value={values.entityPostalCode}
            onChange={handleChange}
            error={touched.entityPostalCode && errors.entityPostalCode}
          />
        </Box>
        <SelectableBlock
          label={"Is the company owned be another company? (>50%)"}
          required
        />
        <FormControlLabel
          value="end"
          className={styles.mainPageContainer__secondBlockTerms}
          control={<Checkbox />}
          label="*I here by accept the Terms & Conditions of LEI Register and give permission to apply for an LEI"
          sx={{ color: "#989898" }}
          labelPlacement="*I here by accept the Terms & Conditions of LEI Register and give permission to apply for an LEI"
        />
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => handleOpen()}
            variant={"contained"}
            sx={{ m: "20px auto" }}
          >
            Submit
          </Button>
        </Box>
        <ConfirmModal
          modalOpen={confirmModalState}
          handleClose={handleClose}
          handleConfirm={handleSubmit}
        />
      </div>
    </form>
  );
};

export default Component;
