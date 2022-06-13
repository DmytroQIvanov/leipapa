import { Box, Typography } from "@mui/material";
import React from "react";

export const renderOptionsFunction = ({
  props,
  option,
  selected,
  optionString,
  inputText,
}) => {
  return (
    <li {...props}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        // style={{ backgroundColor: selected ? "red" : "green" }}
      >
        <Box display={"flex"} ml={0} flexDirection={"column"}>
          <Typography>{getHighlightedText(optionString, inputText)}</Typography>
        </Box>
      </Box>
    </li>
  );
};

export const getHighlightedText = (text, highlight) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part) =>
        part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part
      )}
    </span>
  );
};
