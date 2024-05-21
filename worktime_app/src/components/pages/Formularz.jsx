
import './Administrator.css';
import React from 'react';
import { useState } from 'react';
import { signUpUser } from '../../services/auth';
import TextInput from './Textinput';

//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export const Formularz = () => {
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
 const [birthdate, setBirthDate] = useState("")
  const [typedeal, setTypeDeal] = useState("")
  const [idworker, setIdWorker] = useState("")
  const [rightapp, setRightApp] = useState("")

  const navigate = useNavigate()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [errors, setErrors] = useState({})

const onEmailChanged = (e) =>{
  setEmail(e.target.value)
}
const onPasswordChanged = (e) =>{
  setPassword(e.target.value)
}
const onFirstNameChanged =(e) =>{
  setFirstName(e.target.value)
}
const onLastNameChanged =(e) =>{
  setLastName(e.target.value)
}
const onBirthDateChanged =(e) =>{
  setBirthDate(e.target.value)
}
const onTypeDealChanged =(e) =>{
  setTypeDeal(e.target.value)
}
const onRightAppChanged =(e) =>{
  setRightApp(e.target.value)
}
const onIdWorkerChanged =(e) =>{
  setIdWorker(e.target.value)
}



  async function handleSubmitForm(e) {
    e.preventDefault(); //strona nie bedzie sie odswiezac
    const errorsObj = {
     // firstname: firstname.length < 3 || firstname.length > 25,
     // lastname: lastname.length < 3 || lastname.length > 35,
     // typedeal: typedeal.valueOf ("Umowa na czas nieokreślony", "Etat 3/4", "Etat 1/2", "Umowa próbna"),
     // birthdate: birthdate.length < 1900-12-31 ,
      email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
      password: password.length < 6 || password.length > 24
    };
    setErrors(errorsObj);
    if (errorsObj.email || errorsObj.password) return;
    const result = await signUpUser({fullname: [{firstname}, {lastname}, {birthdate}, {typedeal},{rightapp}, {idworker}], email: email, password: password });
    if (result) {
     navigate("/zaloguj");
     }        //nawigacja do strony logowania dla niezalogowanych
  }
  
    return (<>
        
        <div>
          <h1 className="tytulform">Nowy pracownik</h1></div>
          <form className="formularz" onSubmit={handleSubmitForm} 
          >
    <TextInput
      title="Imię" 
      name ="firstname"
      value = {firstname}
      onChange={onFirstNameChanged}
      
      />
    <TextInput 
    title="Nazwisko" 
    name ="lastname"
    value = {lastname}
    onChange={onLastNameChanged}
   
    />
    <TextInput 
    title="Data urodzenia" 
    name ="birthdate" 
    type="date"
    //isError={errors.birthDate}
    value={birthdate}
    onChange={onBirthDateChanged}
    />
    <TextInput  
    title="Typ umowy" 
    name ="Type_deal"
    value={typedeal}
    onChange={onTypeDealChanged}
    />
        <TextInput 
        title="Id pracownika" 
        name ="ID"
        value ={idworker}
        onChange={onIdWorkerChanged}
        />
         <TextInput
          title="Uprawnienia" 
          name ="uprawnienia"
          value={rightapp}
          onChange={onRightAppChanged}/> 
           <div> 
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
        type="password"/>
         
         <button type = "submit" className="Dodaj" >
                Dodaj         </button> </div> 
        
    </form>
    </>    
    )
  };