import React from 'react';

import './Input.css';

const Input = ({ type, placeholder, value, setValue }) => {
    return (
        <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type={type}
            placeholder={placeholder}
        />
    );
};

export default Input;
