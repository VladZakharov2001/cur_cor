import React, { useEffect, useState } from 'react';
import ConverterInput from './ConverterInput'
import ConverterSelect from './ConverterSelect'
import { constans } from './Constants';
import './ConverterLogic.css'
const Currency = () => {
    const [allCurrencies, setAllCurrencies] = useState(null);
    const [resultValue, setResultValue] = useState(null);
    const [fromNameCurrency, setFromNameCurrency] = useState(constans.DEFAULT_FROM_CURRENCY);
    const [toNameCurrency, setToNameCurrency] = useState(constans.DEFAULT_TO_CURRENCY);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        (async function fetchData() {
            const userGeoCurrency = await getBaseUserGeoCurrency();
            const allInfoCurrency = await getAllInfoAboutCurrency(fromNameCurrency);
            setAllCurrencies(allInfoCurrency);
            setToNameCurrency(userGeoCurrency);
        })();
    }, []);

    useEffect(() => {
        updateValue();
    }, [toNameCurrency, fromNameCurrency]);
    const getBaseUserGeoCurrency = async () => {
        return (await (await (await fetch(constans.DEFAULT_URL)).json())).currencies[0].code;
    };
    const getAllInfoAboutCurrency = async (base) => {
        return (await (await fetch(`${constans.URL_API}${process.env.REACT_APP_API}/latest/${base}`)).json()).conversion_rates;
    };
    const convertRates = async (selected, base) => {
        return (await getAllInfoAboutCurrency(selected))[base];
    };

    const updateValue = async () => {
        const convertingValue = await convertRates(toNameCurrency, fromNameCurrency);
        setResultValue(convertingValue);
    };

    const changeFromName = (event) => {
        setFromNameCurrency(event.target.value)
    };

    const changetoNameCurrency = (event) => {
        setToNameCurrency(event.target.value);
    };

    const changeQuantity = (event) => {
        setQuantity(+event.target.value < 0 ? 0 : +event.target.value)
    }
    const changeCurrency = () => {
        setQuantity(result)
        let tempstr = toNameCurrency
        setToNameCurrency(fromNameCurrency)
        setFromNameCurrency(tempstr)
    }
    const result = Math.floor((quantity * resultValue) * 10000) / 10000
    return (
        <div>
            <div className="main_container">

                <h1>Конвертер валют</h1>
                <span className="text">Вы переходите из</span>
                <div className="main_container_select">
                    <ConverterSelect value={toNameCurrency} onChange={changetoNameCurrency} allCurrencies={allCurrencies} />
                    <p className="text_interval">в</p>
                    <ConverterSelect value={fromNameCurrency} onChange={changeFromName} allCurrencies={allCurrencies} />
                </div>
                <div className="main_container_input" >
                    <ConverterInput quantity={quantity} changeQuantity={changeQuantity} />
                    <p className="text_interval">=</p>
                    <ConverterInput quantity={result} />
                </div>
            </div>
            <a className="change_currency" onClick={changeCurrency}>Поменять валюты местами</a>
        </div>
    )
};

export default Currency;