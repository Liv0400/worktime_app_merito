import './Administrator.css'

const TextInput = ({ title, name, value, onChange, type = 'text' , isError, errorMessage}) => (
  <div className="input-wrapper">
    <label className="label" htmlFor={name}>{title}</label>
    <input className="pole"
      name={name}
      value={value || ""}
      onChange={onChange}
      type={type}
      />
      {isError}  <span>{errorMessage}</span>
      </div>
);

export default TextInput