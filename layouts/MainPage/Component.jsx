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
import useMainPageSearch from "../../hooks/useMainPageSearch";
import CustomRadioButtonsGroup from "../../components/CustomRadioButtons";
import ConfirmModal from "../../components/ConfirmModal";
import CountriesAutocomplete from "./Components/CountriesAutocomplete";
import { renderOptionsFunction } from "./Functions/renderOptionsFunction";

const Component = ({ data }) => {
  //HOOKS
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    data;
  const {
    countriesList,
    statesList,
    companiesList,
    states: { companies },
  } = useMainPageSearch({
    selectedCountry: values.country,
  });

  //STATES
  const arrayCountriesWithState = ["CA", "US"];
  const [stateVisibly, setStateVisibly] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState(false);

  const [inputCountry, setInputCountry] = useState("");
  const [inputStates, setInputStates] = useState("");

  //USE-EFFECTS
  useEffect(() => {
    if (arrayCountriesWithState.includes(values.country.id)) {
      setStateVisibly(true);
    } else {
      setStateVisibly(false);
    }
  }, [values.country]);

  //FUNCTIONS
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
            {/*---COUNTRIES---*/}
            <CountriesAutocomplete
              {...{
                countriesList,
                inputCountry,
                touched,
                setInputCountry,
                stateVisibly,
                setFieldValue,
              }}
            />

            {/*---STATES---*/}
            {stateVisibly && (
              <Autocomplete
                disablePortal
                options={statesList}
                getOptionLabel={(option) =>
                  `${option.attributes.names[0].name} ${option.attributes.code}`
                }
                fullWidth={true}
                loading={statesList.length <= 0}
                id="combo-box-demo"
                onChange={(e, value) => setFieldValue("state", value)}
                renderOption={(props, option, { selected }) => {
                  let optionString = `${option.attributes.names[0].name} ${option.attributes.code}`;
                  return renderOptionsFunction({
                    props,
                    option,
                    selected,
                    optionString,
                    inputText: inputStates,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={inputStates}
                    onChange={(event) => setInputStates(event.target.value)}
                    label="Select State"
                    variant="standard"
                    required
                    error={touched.states && Boolean(errors.states)}
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

          {/*---Companies---*/}
          <Autocomplete
            disablePortal
            options={companiesList}
            getOptionLabel={(option) => `${option.title} `}
            fullWidth={true}
            // loading={companiesList.length <= 0}
            loading={companies.loading}
            renderOption={(props, option, { selected }) => {
              let optionString = `${option.title}`;
              return renderOptionsFunction({
                props,
                option,
                selected,
                optionString,
                inputText: companies.value,
              });
            }}
            id="combo-box-demo"
            onChange={(e, value) => setFieldValue("company", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Legal entity name (start typing org name - autofill possible)"
                variant="standard"
                name={"companyText"}
                value={companies.value}
                onChange={(event) => companies.handleChange(event.target.value)}
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
