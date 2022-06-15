import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./SelectableBlock.module.scss";

const Index = ({ label, required, value, handleChange, width }) => {
  const [stateBlock, setStateBlock] = useState(value || false);

  const handleClick = (state) => {
    setStateBlock(state || false);
    handleChange && handleChange(state || false);
  };

  return (
    <div>
      <Box className={styles.title}>
        {label}
        {required && (
          <Typography sx={{ color: "#d32f2f", ml: "4px" }}>*</Typography>
        )}
      </Box>

      <Box
        className={styles.container}
        sx={{ width: width && width + "!important" }}
      >
        <div
          className={`${styles.container__btn} ${
            stateBlock && styles.container__btn_active
          }`}
          onClick={() => handleClick(true)}
        >
          YES
        </div>

        <div
          className={`${styles.container__btn} ${
            !stateBlock && styles.container__btn_active
          }`}
          onClick={() => handleClick(false)}
        >
          NO
        </div>
      </Box>
    </div>
  );
};

export default Index;
