import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./SelectableBlock.module.scss";

const Index = ({ label, required, state }) => {
  const [stateBlock, setStateBlock] = useState(false);

  const handleClick = (state) => {
    setStateBlock(state || false);
  };
  return (
    <div>

          <Typography className={styles.title}>{label}
              {required && (
                  <Typography sx={{ color: "#d32f2f", ml: "4px" }}>*</Typography>
              )}</Typography>

      <Box className={styles.container}>
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
