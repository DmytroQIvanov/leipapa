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
  //HOOKS
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    data;
  const { countriesList, statesList, companiesList } = useCountry({
    selectedCountry: values.country,
  });

  //STATES
  const arrayCountriesWithState = ["CA", "US"];
  const [stateVisibly, setStateVisibly] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState(false);

  const [inputCountry, setInputCountry] = useState("");
  const [inputStates, setInputStates] = useState("");
  const [inputCompanies, setInputCompanies] = useState("");

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

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part) =>
          part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part
        )}
      </span>
    );
  };

  const renderOptionsFunction = ({
    props,
    option,
    selected,
    optionString,
    inputText,
  }) => {
    return (
      <li {...props}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          // style={{ backgroundColor: selected ? "red" : "green" }}
        >
          <Box display={"flex"} ml={0} flexDirection={"column"}>
            <Typography>
              {getHighlightedText(optionString, inputText)}
            </Typography>
          </Box>
        </Box>
      </li>
    );
  };
  return (
    <form onSubmit={handleSubmit} className={styles.mainPage}>
      <div className={styles.mainPageContainer}>
        <div className={styles.mainPageContainer__firstBlock}>
          <div style={{ display: "flex" }}>
            {/*---COUNTRIES---*/}
            <Autocomplete
              disablePortal
              options={countriesList}
              getOptionLabel={(option) =>
                `${option.attributes.name} ${option.attributes.code}`
              }
              fullWidth={true}
              id="combo-box-demo"
              loading={countriesList.length <= 0}
              renderOption={(props, option, { selected }) => {
                let optionString = `${option.attributes.name} ${option.attributes.code}`;
                return renderOptionsFunction({
                  props,
                  option,
                  selected,
                  optionString,
                  inputText: inputCountry,
                });
              }}
              sx={stateVisibly ? { mr: "26px" } : {}}
              onChange={(e, value) => setFieldValue("country", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={inputCountry}
                  onChange={(event) => setInputCountry(event.target.value)}
                  label="Select Country"
                  variant="standard"
                  required
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.fullName && errors.fullName}
                />
              )}
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
            getOptionLabel={(option) =>
              `${option.attributes.names[0].localName} ${option.attributes.code}`
            }
            fullWidth={true}
            loading={companiesList.length <= 0}
            renderOption={(props, option, { selected }) => {
              let optionString = `${option.attributes.names[0].localName} ${option.attributes.code}`;
              return renderOptionsFunction({
                props,
                option,
                selected,
                optionString,
                inputText: inputCompanies,
              });
            }}
            id="combo-box-demo"
            onChange={(e, value) => setFieldValue("country", value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Legal entity name (start typing org name - autofill possible)"
                variant="standard"
                name={"companyText"}
                value={inputCompanies}
                // onChange={handleChange}
                onChange={(event) => setInputCompanies(event.target.value)}
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
