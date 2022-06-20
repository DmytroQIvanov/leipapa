import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import SelectableBlock from "../../../components/SelectableBlock";
import CustomInput from "../../../components/CustomInput";
import CustomRadioButtonsGroup from "../../../components/CustomRadioButtons";

const radioButtonsArray = [
  {
    value: "1d",
    label:
      "Natural Persons: There is no parent entity according to the definition used because the entity is controlled by the natural person or persons without any intermediate legal entity meeting the definition of accounting consolidating parent. ",
  },
  {
    value: "2d",
    label:
      "Non Consolidating: There is no parent according to the definition used, because the entity is controlled by legal entities not subject to preparing consolidated financial statements.",
  },
  {
    value: "3d",
    label:
      "No Known Person: There is no parent according to the definition used in the Legal Entity Identifier Foundation because there is no known person controlling the entity (e.g., diversified shareholding). ",
  },
  {
    value: "4d",
    label:
      "Legal Obstacles: Obstacles in the laws or regulations of a jurisdiction prevent providing or publishing this information. The entity can not publish a parent entity in the Global LEI number database. ",
  },
  {
    value: "5d",
    label:
      "Binding Legal Commitments: Binding legal commitments (other than the laws or regulations of a jurisdiction), such as articles governing the legal entity or a contract, prevent providing or publishing this information. ",
  },
  {
    value: "6d",
    label:
      "Detriment Not Excluded: The child entity has sought to consult the parent entity about the reporting of the parent information but could not confirm the absence of detriment in a way that can appropriately prevent liability risks for the child entity. ",
  },

  {
    value: "7d",
    label:
      "Disclosure Detrimental: The disclosure of this information would be detrimental to the legal entity or the relevant parent. This will include reasons generally accepted by public authorities in similar circumstances, based on a declaration by the entity",
  },
];
const UltimateParentCompany = ({
  setFieldValue,
  values,
  handleChange,
  touched,
  errors,
}) => {
  if (!values.companyUltimate)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          mb: "20px",
          minWidth: "38vw",
          maxWidth: "100%",
        }}
      >
        <Typography>Information about ultimate parent company</Typography>
        <Typography>
          NB! Validating parental data (Level 2) costs additional 10€ per parent
          per year. Validation can take up to 48h. A complete LEI record
          consists of both Level 1 and Level 2 data. A legal entity is obliged
          to provide Level 2 data if it is available to them. If not, you can
          select an exception by clicking ‘NO’.
        </Typography>
        <SelectableBlock
          handleChange={(elem) => setFieldValue("ultimateParentCompany", elem)}
          value={values.ultimateParentCompany}
          width={"100%"}
        />
        {values.ultimateParentCompany ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              mb: "20px",
            }}
          >
            <CustomInput
              label={"Ultimate parent company name"}
              name={"ultimateParentCompanyName"}
              required
              value={values.ultimateParentCompanyName}
              onChange={handleChange}
              error={
                touched.ultimateParentCompanyName &&
                errors.ultimateParentCompanyName
              }
            />
            <CustomInput
              label={"Company number / Registration ID "}
              name={"ultimateCompanyName"}
              required
              value={values.ultimateCompanyName}
              onChange={handleChange}
              error={touched.ultimateCompanyName && errors.ultimateCompanyName}
            />
            <CustomInput
              label={"Ultimate parent entity address"}
              name={"ultimateEntityAddress"}
              required
              value={values.ultimateEntityAddress}
              onChange={handleChange}
              error={
                touched.ultimateEntityAddress && errors.ultimateEntityAddress
              }
            />
            <CustomInput
              label={"City"}
              name={"ultimateCity"}
              required
              value={values.ultimateCity}
              onChange={handleChange}
              error={touched.ultimateCity && errors.ultimateCity}
            />
            <CustomInput
              label={"Postal code"}
              name={"ultimatePostalCode"}
              required
              value={values.ultimatePostalCode}
              onChange={handleChange}
              error={touched.ultimatePostalCode && errors.ultimatePostalCode}
            />
            <CustomInput
              inputLabel={
                "Accounting period starting from (which has been filed the latest)"
              }
              name={"ultimatePeriodStart"}
              type={"date"}
              required
              value={values.ultimatePeriodStart}
              onChange={handleChange}
              error={touched.ultimatePeriodStart && errors.ultimatePeriodStart}
            />
            <CustomInput
              inputLabel={"Accounting period to "}
              type={"date"}
              name={"ultimateAccordingPeriod"}
              required
              value={values.ultimateAccordingPeriod}
              onChange={handleChange}
              error={
                touched.ultimateAccordingPeriod &&
                errors.ultimateAccordingPeriod
              }
            />
            <CustomInput
              inputLabel={"Relationship period from"}
              name={"ultimateRelationsPeriod"}
              type={"date"}
              required
              value={values.ultimateRelationsPeriod}
              onChange={handleChange}
              error={
                touched.ultimateRelationsPeriod &&
                errors.ultimateRelationsPeriod
              }
            />
            <Typography>
              Upload the parent’s latest consolidated financial statement to
              prove the relationship.{" "}
            </Typography>
            <TextField
              variant="outlined"
              size={"small"}
              type={"file"}
              inputProps={{ accept: "application/pdf, application/jpg" }}
            />
          </Box>
        ) : (
          <Box>
            <Typography>Reason for not providing details *</Typography>
            <CustomRadioButtonsGroup
              flexDirection={"column"}
              value={"smth"}
              buttonsArray={radioButtonsArray}
            />
          </Box>
        )}
      </Box>
    );
  return <></>;
};

export default UltimateParentCompany;
