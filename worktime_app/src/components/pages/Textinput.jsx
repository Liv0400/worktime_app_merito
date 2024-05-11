import React from "react"

//import { isError } from "./Formularz";

const TextInput =({title, name, type, value, onChange,isError, errorMessage }) =>{
    return(
        <div>

            <label htmlFor={name}>{title} </label>
            <input value={value} onChange={onChange} name={name} type={type}  id={name} />
            {isError}  <span>{errorMessage}</span>
            </div>
    )
}
export default TextInput ;
