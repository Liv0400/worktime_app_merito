import './Administrator.css';
import React, { useEffect, useState } from 'react';
import { updateUser } from '../../services/auth';
import TextInput from './Textinput';
import { useNavigate, useParams } from 'react-router-dom';

export const EdycjaFormularz = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [typedeal, setTypeDeal] = useState("");
  const [idworker, setIdWorker] = useState("");
  const [rightapp, setRightApp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      // Pobierz dane użytkownika z Firestore i ustaw je w stanie
      getUserById(userId).then(userData => {
        setFirstName(userData.firstname);
        setLastName(userData.lastname);
        setBirthDate(userData.birthdate);
        setTypeDeal(userData.typedeal);
        setIdWorker(userData.idworker);
        setRightApp(userData.rightapp);
        setEmail(userData.email);
      });
    }
  }, [userId]);

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onBirthDateChanged = (e) => setBirthDate(e.target.value);
  const onTypeDealChanged = (e) => setTypeDeal(e.target.value);
  const onRightAppChanged = (e) => setRightApp(e.target.value);
  const onIdWorkerChanged = (e) => setIdWorker(e.target.value);

  async function handleSubmitForm(e) {
    e.preventDefault(); //strona nie bedzie się odswiezac
    const errorsObj = {
      email: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
    };
    setErrors(errorsObj);
    if (errorsObj.email) return;

    await updateUser(userId, {
      firstname,
      lastname,
      birthdate,
      typedeal,
      rightapp,
      idworker,
      email,
    });

    navigate("/zaloguj");
  }

  return (
    <>
      <div>
        <h1 className="tytulform">Edytuj pracownika</h1>
      </div>
      <form className="formularz" onSubmit={handleSubmitForm}>
        <TextInput title="Imię" name="firstname" value={firstname} onChange={onFirstNameChanged} />
        <TextInput title="Nazwisko" name="lastname" value={lastname} onChange={onLastNameChanged} />
        <TextInput title="Data urodzenia" name="birthdate" type="date" value={birthdate} onChange={onBirthDateChanged} />
        <TextInput title="Typ umowy" name="Type_deal" value={typedeal} onChange={onTypeDealChanged} />
        <TextInput title="Id pracownika" name="ID" value={idworker} onChange={onIdWorkerChanged} />
        <TextInput title="Uprawnienia" name="uprawnienia" value={rightapp} onChange={onRightAppChanged} />
        <TextInput title="Email" name="email" type="email" value={email} onChange={onEmailChanged} />
        <button type="submit" className="Dodaj">Zapisz</button>
      </form>
    </>
  );
};

