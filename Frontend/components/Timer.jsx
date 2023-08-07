import React, { useState, useEffect } from "react";
import NumberSelector from "./NumberSelector";
import { Stack, Button, Grid } from "@chakra-ui/react";
/* eslint-disable react/no-children-prop */

const Timer = ({ handleStatusChange }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);


  console.log("hora",hours,minutes,seconds)

  const handleStartTimer = () => {
    setIsRunning(true);
  };


  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              setIsRunning(false);
              handleStatusChange();
              return;
            } else {
              setHours((prevHours) => prevHours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, hours, minutes, seconds, handleStatusChange]);

  const handleHourChange = (value) => {
    setHours(value);
  };

  const handleMinuteChange = (value) => {
    setMinutes(value);
  };

  const handleSecondChange = (value) => {
    setSeconds(value);
  };

  return (
    <div>
      <Stack direction={"row"}>
        <div>
          <label>Hours:</label>
          <NumberSelector
            defaultValue={hours}
            min={0}
            max={30}
            handleChange={handleHourChange}
          />
        </div>

        <div>
          <label>Minutes:</label>
          <NumberSelector
            defaultValue={minutes}
            min={0}
            max={60}
            handleChange={handleMinuteChange}
          />
        </div>

        <div>
          <label>Seconds:</label>
          <NumberSelector
            defaultValue={seconds}
            min={0}
            max={59}
            handleChange={handleSecondChange}
          />
        </div>
      </Stack>

      <Grid content="center" justifyContent={"center"}>
        <div>
          <Button onClick={handleStartTimer} color="green.400" margin={"10px"}>
            Iniciar equipo
          </Button>
        </div>
        <div>
          <strong>Tiempo:</strong> {hours.toString().padStart(2,"0")}:
          {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </div>
      </Grid>
    </div>
  );
};

export default Timer;
