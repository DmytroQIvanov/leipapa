import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

export default function CustomRadioButtonsGroup({
  buttonsArray,
  title,
  value,
  handleChange,
}) {
  return (
    <FormControl>
      <Typography fontWeight={700} fontSize={20}>
        {title}
      </Typography>
      {/*<FormLabel id="demo-radio-buttons-group-label">{title}</FormLabel>*/}
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={buttonsArray[0].value}
        name="radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        {buttonsArray.map((elem, index) => (
          <FormControlLabel
            key={index}
            sx={{ pr: "8px" }}
            value={elem.value}
            control={<Radio />}
            label={elem.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
