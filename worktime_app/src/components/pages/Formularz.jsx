
import './Administrator.css';
import React from 'react';
//import { Link } from "react-router-dom";
//import Textinput from '../Textinput';


export const Formularz = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const onEmailChanged = (e) =>{
  setEmail(e.target.value)
}
const onPasswordChanged = (e) =>{
  setPassword(e.target.value)
}
const handleSubmitForm= (e) =>{
    e.preventDefault()
const errors={
email: !/^[A-Z0-9._%+-]+[A-Z0-9.-]+[A-Z]{2,}$/i.test(email)
}}
  
    return (
        <>
        <div>
          <h1 className='tytul'>Nowy pracownik</h1>
        <form onSubmit={handleSubmitForm}>
         <TextInput title="imię" name ="firstname"/>
            <TextInput title="Nazwisko" name ="lastname"/>
          <TextInput onChange ={onEmailChanged} value = {email} title="Email" name ="email"/>
          <TextInput onChange ={onPasswordChanged} value = {password} title="Hasło" name ="password"/>
          <TextInput title="Data urodzenia" name ="birthdate"/>
          <TextInput title="Typ umowy" name ="Type_deal"/>
          <TextInput title="Wymiar czasu pracy" name ="time_job"/>
          <TextInput title="Id pracownika" name ="ID"/>
          <Textinput title="Uprawnienia" name ="uprawnienia"/> 
         <Link to ="/administrator"><button type = "submit" className='dodaj'>Dodaj</button></Link> 
        </form></div>
        </>
    )
  };