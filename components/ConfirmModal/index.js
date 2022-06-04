import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const Index = ({ modalOpen, handleClose, handleConfirm }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Do you confirm the submission?
        </Typography>
        <Box sx={{ mt: "20px" }}>
          <Button
            onClick={() => {
              handleConfirm();
              handleClose();
            }}
            color={"success"}
            variant={"contained"}
            sx={{ mr: "20px" }}
            type={"submit"}
          >
            Confirm
          </Button>
          <Button
            onClick={() => {
              handleClose();
            }}
            variant={"contained"}
            color={"error"}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Index;
