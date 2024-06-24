import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerExample = () => {
    const [startDate, setStartDate] = useState(new Date("2022-08-01"));

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
      />
    </div>
  );
};

export default DatePickerExample;
