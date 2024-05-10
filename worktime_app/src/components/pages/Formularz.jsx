
import './Administrator.css';
import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import TextInput from './Textinput';


export const Formularz = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [errors, setErrors] = useState("")

const onEmailChanged = (e) =>{
  setEmail(e.target.value)
}
const onPasswordChanged = (e) =>{
  setPassword(e.target.value)
}
const handleSubmitForm= (e) =>{
    e.preventDefault()
const errorsObj={
email: !/^[A-Z0-9._%+-]+[A-Z0-9.-]+[A-Z]{2,}$/i.test(email)
} 
setErrors (errorsObj)
}
  
    return (<>
        
        <div>
          <h1 className='tytul'>Nowy pracownik</h1></div>
          <div><form onSubmit={handleSubmitForm}
          >
         <TextInput  title="Imię" name ="firstname"/>
         <TextInput title="Nazwisko" name ="lastname"/>
         <TextInput onChange ={onEmailChanged} value = {email} 
         title="Email" name ="email"/>
        <TextInput onChange ={onPasswordChanged} value = {password} 
        title="Hasło" name ="password"/>
        <TextInput title="Data urodzenia" name ="birthdate" type="date"/>
        <TextInput  title="Typ umowy" name ="Type_deal"/>
        <select > <option>Umowa na czas nieokreślony</option>
        <option>Umowa na pół etatu</option>
        
        </select>
        <TextInput title="Id pracownika" name ="ID"/>
         <TextInput title="Uprawnienia" name ="uprawnienia"/> <select><option>Manager</option>
        <option>Pracownik</option>
        <option>Administrator</option>
        </select>
         <Link to ="/administrator">
            <button type = "submit" className='dodaj'>
                Dodaj
         </button>
         </Link> 
    </form>
        </div> 
        </>
    )
  };