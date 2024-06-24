import React, { useState } from 'react';

function App() {
  const [firstSelectValue, setFirstSelectValue] = useState('');
  const [secondSelectValue, setSecondSelectValue] = useState('');
  const [isSecondSelectDisabled, setIsSecondSelectDisabled] = useState(true);

  const handleFirstSelectChange = (event) => {
    setFirstSelectValue(event.target.value);
    if (event.target.value === '') {
      setIsSecondSelectDisabled(true);
      setSecondSelectValue('');
    } else {
      setIsSecondSelectDisabled(false);
    }
  };

  const handleSecondSelectChange = (event) => {
    setSecondSelectValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="first-select">First Select:</label>
      <select id="first-select" value={firstSelectValue} onChange={handleFirstSelectChange}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <br />

      <label htmlFor="second-select">Second Select:</label>
      <select
        id="second-select"
        value={secondSelectValue}
        onChange={handleSecondSelectChange}
        disabled={isSecondSelectDisabled}
        className={isSecondSelectDisabled ? 'bg-gray-200' : ''}
      >
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
}

export default App;
