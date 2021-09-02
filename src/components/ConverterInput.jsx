import React from 'react';
import './ConverterInput.css'
function ConverterInput({ quantity, changeQuantity }) {
    return (
        <div>
            <input className="Input"
                type="number"
                defaultValue={quantity}
                value={quantity}
                min={1}
                onChange={changeQuantity}
            />
        </div>
    );
}

export default ConverterInput;
