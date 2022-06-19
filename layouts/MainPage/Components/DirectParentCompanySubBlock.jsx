import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import CustomInput from "../../../components/CustomInput";
import CustomRadioButtonsGroup from "../../../components/CustomRadioButtons";
import SelectableBlock from "../../../components/SelectableBlock";
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
const DirectParentCompanySubBlock = ({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        mb: "20px",
        minWidth: "38vw",
        maxWidth: "38vw",
      }}
    >
      <Typography>Information about direct parent company</Typography>
      <Typography>
        NB! Validating parental data (Level 2) costs additional 10€ per parent
        per year. Validation can take up to 48h. A complete LEI record consists
        of both Level 1 and Level 2 data. A legal entity is obliged to provide
        Level 2 data if it is available to them. If not, you can select an
        exception by clicking ‘NO’.
      </Typography>
      <SelectableBlock
        handleChange={(elem) => setFieldValue("directParentCompany", elem)}
        value={values.directParentCompany}
        width={"100%"}
      />
      <>
        {values.directParentCompany ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              mb: "20px",
            }}
          >
            <CustomInput
              label={"Parent company name"}
              name={"parentCompanyName"}
              required
              value={values.parentCompanyName}
              onChange={handleChange}
              error={touched.parentCompanyName && errors.parentCompanyName}
            />
            <CustomInput
              label={"Company number / Registration ID "}
              name={"parentCompanyNumber"}
              required
              value={values.parentCompanyNumber}
              onChange={handleChange}
              error={touched.parentCompanyNumber && errors.parentCompanyNumber}
            />
            <CustomInput
              label={"Entity address"}
              name={"parentEntityAddress"}
              required
              value={values.parentEntityAddress}
              onChange={handleChange}
              error={touched.parentEntityAddress && errors.parentEntityAddress}
            />
            <CustomInput
              label={"City"}
              name={"parentEntityCity"}
              required
              value={values.parentEntityCity}
              onChange={handleChange}
              error={touched.parentEntityCity && errors.parentEntityCity}
            />
            <CustomInput
              label={"Postal code"}
              name={"parentPostalCode"}
              required
              value={values.parentPostalCode}
              onChange={handleChange}
              error={touched.parentPostalCode && errors.parentPostalCode}
            />
            <CustomInput
              inputLabel={
                "Accounting period starting from (which has been filed the latest)"
              }
              name={"parentAccountingPeriodStarting"}
              type={"date"}
              required
              value={values.parentAccountingPeriodStarting}
              onChange={handleChange}
              error={
                touched.parentAccountingPeriodStarting &&
                errors.parentAccountingPeriodStarting
              }
            />
            <CustomInput
              inputLabel={"Accounting period to "}
              type={"date"}
              name={"parentAccountingPeriod"}
              required
              value={values.parentAccountingPeriod}
              onChange={handleChange}
              error={
                touched.parentAccountingPeriod && errors.parentAccountingPeriod
              }
            />
            <CustomInput
              inputLabel={"Relationship period from"}
              name={"parentRelationshipPeriod"}
              type={"date"}
              required
              value={values.parentRelationshipPeriod}
              onChange={handleChange}
              error={
                touched.parentRelationshipPeriod &&
                errors.parentRelationshipPeriod
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
      </>
    </Box>
  );
};

export default DirectParentCompanySubBlock;
