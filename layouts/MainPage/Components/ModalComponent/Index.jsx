import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Box, Button, Typography } from "@mui/material";
import styles from "./style.module.scss";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Index = ({ open, handleCloseModal, values }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className={styles.modal}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: "700" }}>
              Dear customer, there is a possible duplicate match between your
              application and Global Legal Entity (GLEIF) database. Please check
              the information below to confirm if this is your company or not.
            </Typography>
            <Box sx={{ ml: "35px", my: "10px" }}>
              <div>
                <b>LEI:</b>
                {values.companyNumber}
              </div>
              <div>
                <b>Company:</b>
                {values.company?.company_name}
              </div>
              <div>
                <b>Reg nr:</b>
                {values.companyNumber}
              </div>
              <div>
                <b>Next renewal date:</b>
                {values.companyNumber}
              </div>
              <div>
                <b>Status:</b>
                {values.companyNumber}
              </div>
            </Box>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2, fontWeight: "700" }}
            >
              In case this is your company information above, clock YES to
              proceed to LEI renewal application. If you are sure this is not
              your entity, click NO and proceed with new LEI application.
            </Typography>

            <Box
              sx={{ display: "flex", mt: "15px" }}
              className={styles.btn__container}
            >
              <Button
                className={styles.btn}
                variant={"contained"}
                color={"error"}
                sx={{
                  width: "40%",
                  lineHeight: "15px",
                  fontSize: "14px",
                  // color: "black",
                  fontWeight: "600",
                }}
                onClick={() => handleCloseModal()}
              >
                No - proceed with new LEI application.
              </Button>
              <Button
                className={styles.btn}
                variant={"contained"}
                color={"success"}
                sx={{
                  m: "auto 0px auto auto",
                  width: "40%",
                  lineHeight: "15px",
                  // color: "black",
                  fontWeight: "600",
                }}
                onClick={() => handleCloseModal()}
              >
                Yes, it is my company. Proceed with LEI Renewal
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Index;
