import React, { useState, useEffect } from "react";
import "./App.css";

const api = "https://api.exchangeratesapi.io/latest";

function App() {
  const [value, setValue] = useState(0);
  const [submitValue, setSubmitValue] = useState(0)
  const [currencyData, setCurrencyData] = useState({});
  const [fromValue, setFromValue] = useState("EUR");
  const [toValue, setToValue] = useState("EUR");
  const [defaultData, setDefaultData] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect((prevState) => {
    fetch(`https://api.exchangeratesapi.io/latest`)
      .then((res) => res.json())
      .then((response) => {
        setDefaultData(response);
        console.log(response, "hello");
        setCurrencies(Object.keys(response.rates));
        console.log(Object.keys(response.rates));
      });
  }, []);

  const search = (event) => {
    event.preventDefault();
    console.log("Clicked");
    fetch(`${api}?base=${fromValue}`)
      .then((res) => res.json())
      .then((response) => {
        setCurrencyData(response);
        setSubmitValue(value)
        console.log(response);
        console.log(fromValue);
      });
  };

  return (
    <div className="container">
      {" "}
      <div className="app">
        <div className="currency-box">
          <form className="currency-form" onSubmit={search}>
            <div className="inputs">
              <input
                className="input-box"
                placeholder="Enter number..."
                min="1"
                type="number"
                value={value}
                name="value"
                required
                onChange={(e) => setValue(e.target.value)}
              />
              <select
                id="fromValue"
                onChange={(e) => setFromValue(e.target.value) }
                defaultValue="EUR"
              >
                <option selected value="EUR">
                  EUR - Euros
                </option>
                {currencies.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>

              <div className="exchange-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>

              <select
                defaultValue="EUR"
                id="toValue"
                onChange={(e) => setToValue(e.target.value)}
              >
                <option value="EUR" selected>
                  EUR
                </option>
                {currencies.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <button className="button">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </form>
          {typeof currencyData.rates !== "undefined" ? (
            <div className="results">
              <p>
                {submitValue} {currencyData.base} ={" "}
              </p>

              <div className="test">
                <span
                  style={
                    (submitValue * currencyData.rates[toValue]).toFixed(3).length > 6
                      ? { fontSize: "50px" }
                      : { fontSize: "60px" }
                  }
                >
                  {fromValue === toValue ? submitValue + " " : (submitValue * currencyData.rates[toValue]).toFixed(3)+" "}
                  
                </span>
                <p> </p>
                <p> {toValue}</p>
              </div>
              <div className="rates">
                <p>
                1 {toValue} = {toValue === fromValue ? 1 : (1 / currencyData.rates[toValue]).toFixed(3)}{" "}
                  {currencyData.base}

                  
                </p>
                <p>
                  1 {currencyData.base} = {toValue === fromValue ? 1 : (1 * currencyData.rates[toValue]).toFixed(3)}{" "}
                  {toValue}
                </p>
              </div>
            </div>
          )  : null}
        </div>
      </div>
    </div>
  );
}

export default App;
