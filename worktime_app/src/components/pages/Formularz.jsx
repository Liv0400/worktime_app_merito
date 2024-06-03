import './Administrator.css';
import { useState } from 'react';
import { signUpUser } from '../../services/auth';
import TextInput from './Textinput';
import { useNavigate } from 'react-router-dom';

export const Formularz = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [typedeal, setTypeDeal] = useState("");
  const [idworker, setIdWorker] = useState("");
  const [rightapp, setRightApp] = useState(""); // Uprawnienia
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onBirthDateChanged = (e) => setBirthDate(e.target.value);
  const onTypeDealChanged = (e) => setTypeDeal(e.target.value);
  const onRightAppChanged = (e) => setRightApp(e.target.value);
  const onIdWorkerChanged = (e) => setIdWorker(e.target.value);

  const handleSubmitForm = async (e) => {
    e.preventDefault(); //strona nie bedzie się odświeżać
    const errorsObj = {
      email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
      password: password.length < 6 || password.length > 24,
    };
    setErrors(errorsObj);
    if (errorsObj.email || errorsObj.password) return;

    const result = await signUpUser({
      fullname: { firstname, lastname, birthdate, typedeal, rightapp, idworker },
      email,
      password,
      firstName: firstname,
      lastName: lastname
    });
    if (result) {
      navigate("/administrator");
    }
  };

  
  return (
    <>
      <div className="form-background">
        <h1 className="tytulform">Nowy pracownik</h1>
      </div>
      <form className="formularz" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label className="label" htmlFor="firstname">Imię</label>
          <TextInput
            name="firstname"
            value={firstname}
            onChange={onFirstNameChanged}
            className="pole"
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="lastname">Nazwisko</label>
          <TextInput
            name="lastname"
            value={lastname}
            onChange={onLastNameChanged}
            className="pole"
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="birthdate">Data urodzenia</label>
          <input
            type="date"
            name="birthdate"
            value={birthdate}
            onChange={onBirthDateChanged}
            className="pole"
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="typedeal">Typ umowy</label>
          <select
            name="typedeal"
            value={typedeal}
            onChange={onTypeDealChanged}
            className="pole"
            required
            >
            <option value="">Wybierz...</option>
            <option value="Umowa o pracę">Umowa o pracę</option>
            <option value="Umowa zlecenie">Umowa zlecenie</option>
            <option value="Etat 1/2">Etat 1/2</option>
            <option value="Etat 1/3">Etat 1/4</option>
            <option value="Etat 1/4">Etat 3/4</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="idworker">Id pracownika</label>
          <TextInput
            name="idworker"
            value={idworker}
            onChange={onIdWorkerChanged}
            className="pole"
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="rightapp">Uprawnienia</label>
          <select
            name="rightapp"
            value={rightapp}
            onChange={onRightAppChanged}
            className="pole"
            required
          >
            <option value="">Wybierz...</option>
            <option value="Pracownik">Pracownik</option>
            <option value="Manager">Menadżer</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="email">Email</label>
          <TextInput
            name="email"
            type="email"
            value={email}
            onChange={onEmailChanged}
            className="pole"
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">Hasło</label>
          <TextInput
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
            className="pole"
            required
          />
        </div>
        <button type="submit" className="Dodaj">Dodaj</button>
      </form>
    </>
  );
};