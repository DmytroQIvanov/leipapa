import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./CustomInput.module.scss";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Index = ({
  label,
  inputLabel,
  required,
  value,
  onChange,
  error,
  subTitle,
  fullWidth = true,
  width,
  questionLink,
  type = "input",
  handleSubTitle,
  ...other
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            autocomplete="off"
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
            autocomplete="off"
            {...other}
          />
        );
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label={inputLabel}
              inputFormat="MM/dd/yyyy"
              // value={value}
              onChange={() => {}}
              renderInput={(params) => <TextField size={"small"} {...params} />}
            />
          </LocalizationProvider>
        );
      default:
        return (
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            required={required}
            value={value}
            onChange={onChange}
            autocomplete="off"
            error={error}
            {...other}
          />
        );
    }
  };
  return (
    <div style={{ position: "relative" }} className={"customInput"}>
      <FormControl fullWidth={fullWidth} sx={{ width, position: "relative" }}>
        <InputLabel style={{ left: "-14px" }}>
          <Box sx={{ display: "flex" }}>
            {label}
            {required && (
              <Typography sx={{ color: "#d32f2f", ml: "4px" }}>*</Typography>
            )}
          </Box>
        </InputLabel>
        {Component()}
        <div>
          {questionLink && (
            <Box onClick={handleOpen} className={styles.questionContainer}>
              <HelpOutlineOutlinedIcon
                className={styles.helpOutlineOutlinedIcon}
              />
              <Box
                sx={{
                  border: 1,
                  p: 1,
                  bgcolor: "background.paper",
                  position: "absolute",
                  right: "0px",
                }}
                className={styles.questionBlock}
              >
                {questionLink}
              </Box>
            </Box>
          )}
        </div>

        {error && (
          <FormHelperText className={styles.error}>{error}</FormHelperText>
        )}
        {subTitle && (
          <div onClick={handleSubTitle && handleSubTitle}>
            <FormHelperText className={styles.subtitle}>
              {subTitle}
            </FormHelperText>
          </div>
        )}
      </FormControl>
    </div>
  );
};

export default Index;
