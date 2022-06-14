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

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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
          <Box onClick={handleOpen}>
            <HelpOutlineOutlinedIcon
              className={styles.helpOutlineOutlinedIcon}
            />
          </Box>
        )}
        <Popper open={open} sx={{ background: "red" }}>
          <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
            The content of the Popper.
          </Box>
        </Popper>
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
