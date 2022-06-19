import React from "react";
import { Box, Typography } from "@mui/material";
import SelectableBlock from "../../../components/SelectableBlock";
import CustomInput from "../../../components/CustomInput";
import CustomRadioButtonsGroup from "../../../components/CustomRadioButtons";

const CompanyUltimateSubBlock = ({
  values,
  setFieldValue,
  touched,
  handleChange,
  errors,
  radioButtonsArray,
}) => {
  return (
    <div>
      {!values.companyUltimate ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            mb: "20px",
            minWidth: "40vw",
            maxWidth: "40vw",
          }}
        >
          <Typography>Information about direct parent companys</Typography>
          <Typography>
            NB! Validating parental data (Level 2) costs additional 10€ per
            parent per year. Validation can take up to 48h. A complete LEI
            record consists of both Level 1 and Level 2 data. A legal entity is
            obliged to provide Level 2 data if it is available to them. If not,
            you can select an exception by clicking ‘NO’.
          </Typography>
          <SelectableBlock
            width={"100%"}
            handleChange={(elem) =>
              setFieldValue("informationDirectParentCompany", elem)
            }
            value={values.informationDirectParentCompany}
          />
          {values.informationDirectParentCompany ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                mb: "20px",
                minWidth: "40vw",
                maxWidth: "40vw",
              }}
            >
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
          ) : (
            <>
              <Typography>
                Information about ultimate parent company *
              </Typography>
              <CustomRadioButtonsGroup
                flexDirection={"column"}
                value={"smth"}
                buttonsArray={radioButtonsArray}
              />
            </>
          )}
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CompanyUltimateSubBlock;
