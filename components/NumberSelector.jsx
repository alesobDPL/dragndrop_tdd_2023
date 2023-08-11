import React from 'react';
import { NumberInput, NumberInputStepper, NumberInputField, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";

const NumberSelector = ({ defaultValue, min, max, handleChange }) => {
  const handleInputChange = (value) => {
    handleChange(parseInt(value, 10));
  };

  return (
    <div>
      <NumberInput defaultValue={defaultValue.toString()} min={min} max={max} size="md" onChange={handleInputChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper children="+" />
          <NumberDecrementStepper children="-" />
        </NumberInputStepper>
      </NumberInput>
    </div>
  );
};

export default NumberSelector;
