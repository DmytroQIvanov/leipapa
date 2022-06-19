import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function CustomRadioButtonsGroup({
  buttonsArray,
  title,
  value,
  handleChange,
  flexDirection = "row",
}) {
  const [state, setState] = useState("5d");
  const updateSelection = (event, value) => {
    event.persist();
    const name = event.target.name;
    setState(value);
    handleChange && handleChange(value);
  };
  useEffect(() => {
    setState(value);
  }, [value]);
  return (
    <FormControl>
      <Typography fontWeight={700} fontSize={20}>
        {title}
      </Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={buttonsArray[0].value}
        name="radio-buttons-group"
        value={state}
        onChange={updateSelection}
        // onChange={handleChange}
        sx={{ display: "flex", flexDirection: flexDirection }}
      >
        {buttonsArray.map((elem, index) => (
          <FormControlLabel
            key={index}
            sx={{ pr: "8px", mt: "10px" }}
            value={elem.value}
            control={<Radio />}
            label={elem.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
