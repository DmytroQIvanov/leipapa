import React from "react";
import { Box, Typography } from "@mui/material";
import CustomInput from "../../../components/CustomInput";

const HeadquartersAddressBlock = ({
  values,
  handleChange,
  touched,
  errors,
}) => {
  if (!values.headquartesAddress)
    return (
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
          error={touched.headquartersAddress && errors.headquartersAddress}
        />
        <CustomInput
          label={"City"}
          name={"headquartersCity"}
          required
          value={values.headquartersCity}
          onChange={handleChange}
          error={touched.headquartersCity && errors.headquartersCity}
        />
        <CustomInput
          label={"Postal code"}
          required
          name={"headquartersPostalCode"}
          value={values.headquartersPostalCode}
          onChange={handleChange}
          error={
            touched.headquartersPostalCode && errors.headquartersPostalCode
          }
        />
      </Box>
    );
  return <></>;
};

export default HeadquartersAddressBlock;
