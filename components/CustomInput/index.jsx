import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./CustomInput.module.scss";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const Index = ({
  label,
  required,
  value,
  onChange,
  error,
  subTitle,
  fullWidth = true,
  width,
  questionLink,
  type = "input",
  ...other
}) => {
  const Component = () => {
    switch (type) {
      case "input":
        return (
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            required={required}
            value={value}
            onChange={onChange}
            error={error}
            {...other}
          />
        );
      case "textField":
        return (
          <TextField
            required={required}
            value={value}
            onChange={onChange}
            error={error}
            {...other}
          />
        );
      default:
        return (
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            required={required}
            value={value}
            onChange={onChange}
            error={error}
            {...other}
          />
        );
    }
  };
  return (
    <div style={{ position: "relative" }} className={"customInput"}>
      <FormControl fullWidth={fullWidth} sx={{ width }}>
        <InputLabel style={{ left: "-14px" }}>
          <Box sx={{ display: "flex" }}>
            {label}
            {required && (
              <Typography sx={{ color: "#d32f2f", ml: "4px" }}>*</Typography>
            )}
          </Box>
        </InputLabel>
        {Component()}
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
