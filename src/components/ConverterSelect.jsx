import React from 'react';
import './ConvertSelect.css'
function ConverterSelect({ value, onChange, allCurrencies }) {
    return (
        <div>
            <select className="FromCurrency"
                value={value}
                onChange={onChange}
            >
                {
                    allCurrencies && Object.keys(allCurrencies).map((country, index) =>
                        <option key={index} defaultValue={country}>
                            {country}
                        </option>)
                }
            </select>
        </div>
    );
}

export default ConverterSelect;
