import React, { useState } from 'react';

function ValueCalculator() {
  const [values, setValues] = useState(['']);
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const handleValueChange = (index, newValue) => {
    const updated = [...values];
    updated[index] = newValue;
    setValues(updated);
  };

  const addInput = () => {
    setValues([...values, '']);
  };

  const removeInput = (indexToRemove) => {
    const updated = values.filter((_, index) => index !== indexToRemove);
    setValues(updated.length ? updated : ['']); // leave at least one input
  };

  const calculate = () => {
    const nums = values.map(v => {
      const parsed = Number(v);
      return isNaN(parsed) ? null : parsed;
    }).filter(n => n !== null);

    let res;

    if (nums.length === 0) {
      setResult("Enter valid numbers");
      return;
    }

    switch (operation) {
      case 'add':
        res = nums.reduce((a, b) => a + b, 0);
        break;
      case 'subtract':
        res = nums.reduce((a, b) => a - b);
        break;
      case 'multiply':
        res = nums.reduce((a, b) => a * b, 1);
        break;
      case 'divide':
        res = nums.reduce((a, b) => a / b);
        break;
      case 'average':
        res = nums.reduce((a, b) => a + b, 0) / nums.length;
        break;
      case 'exponent':
        res = nums.length === 2 ? Math.pow(nums[0], nums[1]) : 'Needs exactly 2 values for exponentiation';
        break;
      default:
        res = 'Invalid operation';
    }

    setResult(res.toExponential ? res.toExponential(2) : res);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Value Calculator</h2>
      <div>
        {values.map((val, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <input
              type="text"
              placeholder={`e.g. 5.32E6`}
              value={val}
              onChange={(e) => handleValueChange(i, e.target.value)}
              style={{ width: '200px' }}
            />
            <button
              onClick={() => removeInput(i)}
              style={{
                marginLeft: '8px',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer',
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              ✕
            </button>
          </div>
        ))}
        <button onClick={addInput}>+ Add Another Value</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Select Operation:</label><br />
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
          <option value="average">Average</option>
          <option value="exponent">Exponent (Base ^ Exponent)</option>
        </select>
      </div>

      <button onClick={calculate} style={{ marginTop: '1rem' }}>Calculate</button>

      {result !== null && <p><strong>Result:</strong> {result}</p>}
    </div>
  );
}

export default ValueCalculator;
