import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
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
import CustomCheckBox from "../../components/CustomCheckBox";

const Component = ({ data }) => {
  //HOOKS
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    data;
  const {
    countriesList,
    statesList,
    companiesList,
    states: { companies, company },
  } = useMainPageSearch({
    values,
  });

  //STATES
  const arrayCountriesWithState = ["CA", "US"];
  const [stateVisibly, setStateVisibly] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState(false);

  const [inputCountry, setInputCountry] = useState("");
  const [inputStates, setInputStates] = useState("");
  const [inputFullName, setInputFullName] = useState("");

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
                errors,
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
                    helperText={touched.states && errors.states}
                  />
                )}
              />
            )}
          </div>
          {/*<CustomInput*/}
          {/*  label={"Application first and last name"}*/}
          {/*  required*/}
          {/*  questionLink={"smth"}*/}
          {/*  name={"fullName"}*/}
          {/*  variant="standard"*/}
          {/*  size={"medium"}*/}
          {/*  value={values.fullName}*/}
          {/*  onChange={handleChange}*/}
          {/*  error={touched.fullName && errors.fullName}*/}
          {/*  helperText={touched.fullName && errors.fullName}*/}
          {/*/>*/}
          <Autocomplete
            disablePortal
            options={company.officers.list}
            getOptionLabel={(option) => `${option.name}`}
            fullWidth={true}
            loading={company.officers.loading}
            renderOption={(props, option, { selected }) => {
              let optionString = `${option.name}`;
              return renderOptionsFunction({
                props,
                option,
                selected,
                optionString,
                inputText: inputFullName,
              });
            }}
            onChange={(e, value) => {
              setFieldValue("officerFullName", value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Application first and last name"
                variant="standard"
                required
                value={inputFullName}
                onChange={(event) => setInputFullName(event.target.value)}
                error={touched.company && errors.company}
              />
            )}
          />
          {/*---Companies---*/}
          <Autocomplete
            disablePortal
            options={companiesList}
            getOptionLabel={(option) => `${option.title}`}
            fullWidth={true}
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
            onChange={(e, value) => {
              setFieldValue("company", value);
              setFieldValue("entityAddress", value.address_snippet);
              setFieldValue("entityCity", value.address.locality);
              setFieldValue("entityPostalCode", value.address.postal_code);
              setFieldValue("companyNumber", value.company_number);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Legal entity name (start typing org name - autofill possible)"
                variant="standard"
                name={"companyText"}
                value={companies.value}
                onChange={(event) => companies.handleChange(event.target.value)}
                required
                error={touched.company && errors.company}
              />
            )}
          />
          <CustomInput
            label="E-mail"
            required
            name={"email"}
            type={"email"}
            subTitle={"Add another e-mail"}
            value={values.email}
            onChange={handleChange}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
          />
          <CustomInput
            label="Company number / Registration ID"
            questionLink={"smth"}
            required
            name={"companyNumber"}
            value={values.companyNumber}
            onChange={handleChange}
            error={touched.companyNumber && errors.companyNumber}
          />
          <CustomInput label="Phone number" />
          <CustomInput label="Vat number, if applicable (E.G. GB 999 999 999 999)" />
        </div>
        <SelectableBlock
          handleChange={(elem) => setFieldValue("headquartesAddress", elem)}
          value={values.headquartesAddress}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "34px",
              // width: "400px",
              mb: "20px",
            }}
          >
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
          {!values.headquartesAddress && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "34px",
                mb: "20px",
              }}
            >
              <Typography fontWeight={700} fontSize={20}>
                Headquarters Address
              </Typography>
              <CustomInput
                label={"Headquarters address "}
                required
                name={"headquartersAddress"}
                value={values.headquartersAddress}
                onChange={handleChange}
                error={
                  touched.headquartersAddress && errors.headquartersAddress
                }
              />
              <CustomInput
                label={"City"}
                name={"entityCity"}
                required
                value={values.headquartersCity}
                onChange={handleChange}
                error={touched.headquartersCity && errors.headquartersCity}
              />
              <CustomInput
                label={"Postal code"}
                required
                name={"entityPostalCode"}
                value={values.headquartersPostalCode}
                onChange={handleChange}
                error={
                  touched.headquartersPostalCode &&
                  errors.headquartersPostalCode
                }
              />
            </Box>
          )}
        </Box>

        <SelectableBlock
          handleChange={(elem) => setFieldValue("companyOwned", elem)}
          label={"Is the company owned by another company? (>50%) *"}
        />
        {values.companyOwned && (
          <SelectableBlock
            handleChange={(elem) => setFieldValue("parentConsolidate", elem)}
            label={
              "Does the parent consolidate financial statements/annual report?"
            }
          />
        )}
        {values.parentConsolidate && (
          <>
            <Box>
              <SelectableBlock
                handleChange={(elem) => setFieldValue("companyUltimate", elem)}
                label={"Is the parent company ultimate consolidation parent?"}
              />
              <Typography sx={{ color: "#969696", pb: "20px" }}>
                Answer YES if the parent entity is the ultimate consolidating
                entity.
              </Typography>
            </Box>
            <Box className={styles.mainPageContainer__secondBlock}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                  mb: "20px",
                }}
              >
                <Typography>Information about direct parent company</Typography>
                <Typography>
                  NB! Validating parental data (Level 2) costs additional 10€
                  per parent per year. Validation can take up to 48h. A complete
                  LEI record consists of both Level 1 and Level 2 data. A legal
                  entity is obliged to provide Level 2 data if it is available
                  to them. If not, you can select an exception by clicking ‘NO’.
                </Typography>

                <SelectableBlock
                  handleChange={(elem) =>
                    setFieldValue("companyUltimate", elem)
                  }
                  value={values.companyUltimate}
                  width={"100%"}
                />
                <CustomInput
                  label={"Parent company name"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Company number / Registration ID "}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Entity address"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"City"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Postal code"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={
                    "Accounting period starting from (which has been filed the latest)"
                  }
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Accounting period to "}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Relationship period from"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <Typography>
                  Upload the parent’s latest consolidated financial statement to
                  prove the relationship.{" "}
                </Typography>
                <input type={"file"} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                  mb: "20px",
                }}
              >
                <Typography>
                  Information about direct parent companys
                </Typography>
                <Typography>
                  NB! Validating parental data (Level 2) costs additional 10€
                  per parent per year. Validation can take up to 48h. A complete
                  LEI record consists of both Level 1 and Level 2 data. A legal
                  entity is obliged to provide Level 2 data if it is available
                  to them. If not, you can select an exception by clicking ‘NO’.
                </Typography>

                <SelectableBlock
                  width={"100%"}
                  handleChange={(elem) =>
                    setFieldValue("companyUltimate", elem)
                  }
                  value={values.companyUltimate}
                />
                <CustomInput
                  label={"Parent company name"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Company number / Registration ID "}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Entity address"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"City"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Postal code"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={
                    "Accounting period starting from (which has been filed the latest)"
                  }
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Accounting period to "}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <CustomInput
                  label={"Relationship period from"}
                  name={"entityCity"}
                  required
                  value={values.headquartersCity}
                  onChange={handleChange}
                  error={touched.headquartersCity && errors.headquartersCity}
                />
                <Typography>
                  Upload the parent’s latest consolidated financial statement to
                  prove the relationship.{" "}
                </Typography>
                <input type={"file"} />
              </Box>
            </Box>
          </>
        )}
        <CustomCheckBox
          name={"acceptTerms"}
          value={values.acceptTerms}
          onChange={handleChange}
          label={
            "*I here by accept the Terms & Conditions of LEI Register and give permission to apply for an LEI."
          }
          error={touched.acceptTerms && errors.acceptTerms}
          formikData={data}
        />
        <CustomCheckBox
          name={"weMayContact"}
          value={values.weMayContact}
          onChange={handleChange}
          label={"*Please note that we may contact you to request a signature."}
          error={touched.weMayContact && errors.weMayContact}
          formikData={data}
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
