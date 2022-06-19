import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import styles from "./MainPage.module.scss";
import CustomInput from "../../components/CustomInput";
import SelectableBlock from "../../components/SelectableBlock";
import useMainPageSearch from "../../hooks/useMainPageSearch";
import CustomRadioButtonsGroup from "../../components/CustomRadioButtons";
import ConfirmModal from "../../components/ConfirmModal";
import CountriesAutocomplete from "./Components/CountriesAutocomplete";
import CustomCheckBox from "../../components/CustomCheckBox";
import FirstAndLastName from "./Components/FirstAndLastName";
import Companies from "./Components/Companies";
import Email from "./Components/Email";
import CompanyNumber from "./Components/CompanyNumber";
import EntityAddressBlock from "./Components/EntityAddressBlock";
import HeadquartersAddressBlock from "./Components/HeadquartersAddressBlock";
import DirectParentCompanySubBlock from "./Components/DirectParentCompanySubBlock";
import UltimateParentCompany from "./Components/UltimateParentCompany";

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

  //USE-EFFECTS
  useEffect(() => {
    if (
      values.country &&
      values.country.id &&
      arrayCountriesWithState.includes(values.country.id)
    ) {
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

  const commonObject = { ...data };

  return (
    <form onSubmit={handleSubmit} className={styles.mainPage}>
      <div className={styles.mainPageContainer}>
        <div className={styles.mainPageContainer__firstBlock}>
          {/*---COUNTRIES && STATES---*/}
          <CountriesAutocomplete
            {...{
              ...commonObject,
              countriesList,
              inputCountry,
              setInputCountry,
              stateVisibly,
              statesList,
            }}
          />

          {/*---FIRST && LAST NAME---*/}
          <FirstAndLastName {...{ company, ...commonObject }} />

          {/*---Companies---*/}
          <Companies {...{ companiesList, companies, ...commonObject }} />

          {/*---EMAIL---*/}
          <Email {...{ ...commonObject }} />

          {/*---COMPANY NUMBER---*/}
          <CompanyNumber {...{ ...commonObject }} />
          {values.addAnotherEmail && (
            <CustomInput label="Addiction e-mail (optional)" />
          )}
          {/*---PHONE NUMBER---*/}
          <CustomInput label="Phone number" />

          {/*---VAT NUMBER---*/}
          <CustomInput label="VAT number, if applicable (e.g. GB123456789)" />

          <Box sx={{ display: "flex" }}>
            <CustomRadioButtonsGroup
              flexDirection={"column"}
              handleChange={(data) => setFieldValue("userAuthority", data)}
              buttonsArray={[
                { label: "Member of board", value: "MemberOFBoard" },
                { label: "Power of attorney", value: "PowerOFAttorney" },
              ]}
              title={"User authority"}
            />
            {values.userAuthority === "PowerOFAttorney" && (
              <div>
                <Typography sx={{ fontWeight: "700", width: "300px" }}>
                  Upload authorization letter. Maximum file size: 16 MB.
                </Typography>

                <Typography sx={{ fontWeight: "700", mt: "15px" }}>
                  We can accept only pdf and jpg format.
                </Typography>

                <TextField
                  variant="outlined"
                  size={"small"}
                  type={"file"}
                  inputProps={{ accept: "application/pdf, application/jpg" }}
                />
              </div>
            )}
          </Box>
        </div>

        <SelectableBlock
          handleChange={(elem) => setFieldValue("headquartesAddress", elem)}
          value={values.headquartesAddress}
          label={"Headquartes address is identical to legal address?"}
        />

        <Box sx={{ display: "flex", flexDirection: "column", mb: "15px" }}>
          <CustomRadioButtonsGroup
            title={"Entity type"}
            value={values.typeOfEmployment}
            handleChange={(e, value) => {
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
          {/*---ENTITY ADDRESS BLOCK---*/}
          <EntityAddressBlock {...{ handleChange, values, touched, errors }} />

          {/*---HEADQUARTERS ADDRESS BLOCK---*/}
          <HeadquartersAddressBlock
            {...{
              values,
              handleChange,
              touched,
              errors,
            }}
          />
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
                value={values.companyUltimate}
              />
              <Typography sx={{ color: "#969696", pb: "20px" }}>
                Answer YES if the parent entity is the ultimate consolidating
                entity.
              </Typography>
            </Box>
            <Box className={styles.mainPageContainer__secondBlock}>
              <DirectParentCompanySubBlock {...{ ...commonObject }} />
              <UltimateParentCompany {...{ ...commonObject }} />
            </Box>
          </>
        )}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            label={
              "*Please note that we may contact you to request a signature."
            }
            error={touched.weMayContact && errors.weMayContact}
            formikData={data}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={handleSubmit}
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
