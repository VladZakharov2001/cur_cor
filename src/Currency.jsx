import React, {useEffect, useState } from 'react';
const Currency = () => {
    const getCountryCurrency = async (country)=>{
        const promise = await fetch(`https://restcountries.eu/rest/v2/alpha/${country}`);
        const countryCurrency = await promise.json();
        return countryCurrency;
    };
      const getBaseUserGeoCurrency = async ()=> {
         const countryCurrency = await getCountryCurrency("RU");
         const fromNameCurrency = countryCurrency.currencies[0].code; //"currencies":[{"code":"RUB","name":"Russian ruble","symbol":"₽"}]
         return fromNameCurrency //  rub     
     };
      const getAllInfoAboutCurrency = async (base)=>{
         const APIKEY = 'a515eed149f7937c6e2ce9c8';
         const URL = `https://v6.exchangerate-api.com/v6/${APIKEY}/latest/${base}`;
         const promise = await fetch(URL);
         const currency = await promise.json();
         //  валюты в conversion_rates
         return currency.conversion_rates;
     };     
      const convertValue = async (selected, base) => {
        console.log("selected", selected); 
        console.log("base", base)
        const convertingValue = await getAllInfoAboutCurrency(selected); //все валюты
        const value = convertingValue[base];
        return value
     };
    const [allCurrency, setAllCurrency] = useState(null);
    const [resultValue, setResultValue] = useState(null);
    const [toNameCurrency, settoNameCurrency] = useState('RUB');
    const [fromNameCurrency, setfromNameCurrency] = useState('USD');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchData() {
            const userGeoCurrency = await getBaseUserGeoCurrency();
            const allInfoCurrency = await getAllInfoAboutCurrency(fromNameCurrency);
            setAllCurrency(allInfoCurrency);
            console.log({allInfoCurrency});
            settoNameCurrency(userGeoCurrency);
        }
        fetchData();
    }, []);
    const updateValue = async () => {
         const convertingValue = await convertValue(toNameCurrency, fromNameCurrency);
         setResultValue(convertingValue);
    };
    useEffect(() => {
            updateValue();
    }, [toNameCurrency, fromNameCurrency]);

    const changeFromName = (event) => {
        setfromNameCurrency(event.target.value)
    };

    const changetoNameCurrency = (event) => {
        settoNameCurrency(event.target.value);
    };

    const changeQuantity = (event) => {
        setQuantity(+event.target.value)
        console.log("ev",+event.target.value)
       
    }
    const result = Math.floor((quantity * resultValue) * 10000) / 10000
    const changeCurrency = () => {
        setQuantity(result)
        // t = a, a = b, b = a
        let tempstr =  toNameCurrency 
        settoNameCurrency(fromNameCurrency)
        setfromNameCurrency(tempstr)
    }
    return (
        <div >
            <div>
                <input
                    type="number"
                    defaultValue={quantity}
                    value={quantity}
                    min={1}
                    onChange={changeQuantity}
                    id="1"
                />
                <select
                    name="currency-selected"
                    id="from"
                    value={toNameCurrency}
                    onChange={changetoNameCurrency}
                >
                    {
                        allCurrency && Object.keys(allCurrency).map((country, index) =>
                        <option key={index} defaultValue={country}>
                            {country}
                        </option>)
                    }
                </select>
                <input type="number" 
                        value={result}
                        min={1}
                />
                <select
                    name="currency-base"
                    id="to"
                    value={fromNameCurrency}
                    onChange={changeFromName}
                >
                    {
                       allCurrency && Object.keys(allCurrency).map((country, index) =>
                       <option key={index} defaultValue={country}>
                           {country}
                       </option>)
                    }
                </select>
                <button  onClick = {changeCurrency}>Поменять значения</button>
            </div>
        </div>
    )
};

export default Currency;