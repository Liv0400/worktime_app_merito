import './Administrator.css';
import React, { useEffect, useState } from 'react';
import { updateUser } from '../../services/auth';
import TextInput from './Textinput';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

export const EdycjaFormularz = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [typedeal, setTypeDeal] = useState("");
  const [idworker, setIdWorker] = useState("");
  const [rightapp, setRightApp] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const getUserById = async (id) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', id));
        if (userDoc.exists()) {
          console.log('User data fetched:', userDoc.data());
          return userDoc.data();
        } else {
          console.log('No such document!');
          return null;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    };

    if (userId) {
      getUserById(userId).then(userData => {
        if (userData) {
          console.log('Setting user data:', userData);
          setFirstName(userData.fullname.firstname || "");
          setLastName(userData.fullname.lastname || "");
          setBirthDate(userData.fullname.birthdate || "");
          setTypeDeal(userData.fullname.typedeal || "");
          setIdWorker(userData.fullname.idworker || "");
          setRightApp(userData.fullname.rightapp || "");
          
        }
      });
    }
  }, [userId]);


  const onFirstNameChanged = (e) => setFirstName(e.target.value);
  const onLastNameChanged = (e) => setLastName(e.target.value);
  const onBirthDateChanged = (e) => setBirthDate(e.target.value);
  const onTypeDealChanged = (e) => setTypeDeal(e.target.value);
  const onRightAppChanged = (e) => setRightApp(e.target.value);
  const onIdWorkerChanged = (e) => setIdWorker(e.target.value);

  async function handleSubmitForm(e) {
    e.preventDefault();
  
    // Tworzenie nowego obiektu użytkownika na podstawie obecnych stanów
    const updatedUser = {
      firstname,
      lastname,
      birthdate,
      typedeal,
      rightapp,
      idworker,
    };
    // Aktualizacja użytkownika w bazie danych
    await updateUser(userId, updatedUser);

    navigate("/administrator");
  }

  return (
    <>
      <div>
        <h1 className="tytulform">Edytuj pracownika</h1>
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
        <button type="submit" className="Dodaj">Zapisz</button>
      </form>
    </>
  );
};