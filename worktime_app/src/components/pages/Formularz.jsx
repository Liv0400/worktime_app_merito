
import './Administrator.css';
import React from 'react';
//import { Link } from "react-router-dom";
import { useState } from 'react';
import { signUpUser } from '../../services/auth';
import TextInput from './Textinput';



export const Formularz = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [errors, setErrors] = useState({})

const onEmailChanged = (e) =>{
  setEmail(e.target.value)
}
const onPasswordChanged = (e) =>{
  setPassword(e.target.value)
}
const handleSubmitForm= async (e) =>{
    e.preventDefault() //strona nie bedzie sie odswiezac
const errorsObj={
email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
password: password.length < 6  ||password.length > 24  
}
setErrors (errorsObj)
if(errorsObj.email || errorsObj.password) return;
await signUpUser({ email: email, password: password })
}
  
    return (<>
        
        <div>
          <h1 className="tytul">Nowy pracownik</h1></div>
          <form clasname="formularz" onSubmit={handleSubmitForm} 
          >
         <TextInput  title="Imię" name ="firstname"/>
         <TextInput title="Nazwisko" name ="lastname"/>
        
        <TextInput title="Data urodzenia" name ="birthdate" type="date"/>
        <TextInput  title="Typ umowy" name ="Type_deal"/>
        <select > 
        <option>Umowa na czas nieokreślony</option>
        <option>Umowa na pół etatu</option></select>
        <TextInput title="Id pracownika" name ="ID"/>
         <TextInput title="Uprawnienia" name ="uprawnienia"/> 
         <select>
        <option>Manager</option>
        <option>Pracownik</option>
        <option>Administrator</option>
        </select> <div>
        <TextInput 
         onChange ={onEmailChanged} 
         value = {email} 
         title="Email"
         name ="email"
         type="email"
         />
        <TextInput 
        onChange ={onPasswordChanged} 
        value = {password} 
        title="Hasło" 
        name ="password"
        type="password"
        />
            <button type = "submit" >
                Dodaj
         </button>
         </div> 
    </form>
        
        </>
    )
  };