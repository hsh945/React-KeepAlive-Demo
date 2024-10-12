import { useState } from 'react';

function From() {
    const [ inputValue, setInputValue ] = useState('');

    return (
        <div>
            <h1>我是表单页</h1>
            <h1>{inputValue}</h1>
            <input value={inputValue} onInput={ (e) => setInputValue(e.target.value)} /> 
        </div>
    )
}

export default From;