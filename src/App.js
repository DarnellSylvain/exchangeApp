import React, { useState } from "react";
import "./App.css";

const api = "https://api.exchangeratesapi.io/latest";

function App() {
  const [value, setValue] = useState(0);
  const [currencyData, setCurrencyData] = useState({});
  const [selectValue, setSelectValue] = useState("");

  const search = (event) => {
    event.preventDefault();
    console.log("Clicked");
    fetch(`${api}?base=${selectValue}`)
      .then((res) => res.json())
      .then((response) => {
        setCurrencyData(response);
        console.log(response);
        console.log(selectValue);
      });
  };

  return (
    <div className="app">
      <div className="currency-box">
        <form onSubmit={search}>
          <div className="inputs">
            <select onChange={(e) => setSelectValue(e.target.value)}>
              <option value="none">Currency</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
            </select>
            <input
              className="input-box"
              placeholder="Enter Number"
              min="0"
              type="number"
              value={value}
              name="value"
              onChange={(e) => setValue(e.target.value)}
            />
            <button>Convert</button>
          </div>
        </form>
        {typeof currencyData.rates != "undefined" ? (
          <div>
            <span>{value * currencyData.rates.USD}</span>
            <span> Hello</span>
            <span> Hello</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
