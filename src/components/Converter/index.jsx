import React, { useEffect, useState } from "react";
import ConverterInput from "./components/ConvertInput";
import ConverterSelect from "./components/ConvertSelect";
import {
  URL_API,
  DEFAULT_TO_CURRENCY,
  DEFAULT_FROM_CURRENCY,
} from "./constants";
import "./style.css";

const Currency = () => {
  const [resultValue, setResultValue] = useState(null);
  const [currencyFrom, setCurrencyFrom] = useState(DEFAULT_FROM_CURRENCY);
  const [currencyTo, setCurrencyTo] = useState(DEFAULT_TO_CURRENCY);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${URL_API}${process.env.REACT_APP_API}/latest/${currencyFrom}`)
      .then((res) => res.json())
      .then((data) => {
        setResultValue(data.conversion_rates);
      });
  }, [currencyFrom]);

  const changeQuantity = (event) => {
    setQuantity(event.target.value < 0 ? 0 : event.target.value);
  };

  const changeCurrency = () => {
    setQuantity(result);
    const tempstr = currencyTo;
    setCurrencyTo(currencyFrom);
    setCurrencyFrom(tempstr);
  };

  const result = quantity * (resultValue && resultValue[currencyTo]);
  return (
    <div>
      <div className="main_container">
        <h1>Конвертер валют</h1>
        <span className="text">Вы переходите из</span>
        <div className="main_container_select">
          <ConverterSelect
            value={currencyFrom}
            onChange={(event) => setCurrencyFrom(event.target.value)}
            resultValue={resultValue}
          />
          <p className="text_interval">в</p>
          <ConverterSelect
            value={currencyTo}
            onChange={(event) => setCurrencyTo(event.target.value)}
            resultValue={resultValue}
          />
        </div>
        <div className="main_container_input">
          <ConverterInput quantity={quantity} changeQuantity={changeQuantity} />
          <p className="text_interval">=</p>
          <ConverterInput quantity={result} />
        </div>
      </div>
      <a className="change_currency" onClick={changeCurrency}>
        Поменять валюты местами
      </a>
    </div>
  );
};

export default Currency;
