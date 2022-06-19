import React from "react";
import { Box, Typography } from "@mui/material";
import CustomInput from "../../../components/CustomInput";

const EntityAddressBlock = ({ handleChange, values, touched, errors }) => {
  return (
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
  );
};

export default EntityAddressBlock;
