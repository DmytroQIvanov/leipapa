import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import styles from "./CustomInput.module.scss";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const Index = ({
  placeholder,
  required,
  value,
  onChange,
  error,
  subTitle,
  fullWidth = true,
    width,
  questionLink,
}) => {
  return (
    <div style={{ position: "relative" }} className={'customInput'}>
      <FormControl fullWidth={fullWidth} sx={{width}}>
        <InputLabel style={{ left: "-14px" }}>
          <Box sx={{ display: "flex" }}>
            {placeholder}
            {required && (
              <Typography sx={{ color: "#d32f2f", ml: "4px" }}>*</Typography>
            )}
          </Box>
        </InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          required={required}
          value={value}
          onChange={onChange}
          error={error}
        />
        {questionLink && (
          <HelpOutlineOutlinedIcon className={styles.helpOutlineOutlinedIcon} />
        )}
        {error && (
          <FormHelperText id="my-helper-text" className={styles.error}>
            {error}
          </FormHelperText>
        )}
        {subTitle && (
          <FormHelperText className={styles.subtitle} id="my-helper-text">
            {subTitle}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default Index;
