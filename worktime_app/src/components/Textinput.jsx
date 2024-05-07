export const TextInput =({title, name, type = "text", value, onChange}) =>{
    return(
        <div>

            <label htmlFor={name}>{title} </label>
            <input value={value} onChange={onChange} name={name} type={type}  id={name}></input>
            </div>
    )
}

