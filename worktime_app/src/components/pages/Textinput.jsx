//import "./Administrator.css"
//import { isError } from "./Formularz";


const TextInput =({title, name, type, value, onChange,isError, errorMessage }) =>{
    return(
        <div>

            <label className="label" htmlFor={name}>{title} </label>
            <input className="pole" value={value} onChange={onChange} name={name} type={type}  id={name} />
            {isError}  <span>{errorMessage}</span>
            </div>
    )
}
export default TextInput ;
