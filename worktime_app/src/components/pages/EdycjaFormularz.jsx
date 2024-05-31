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
   

    await updateUser(userId, {
      firstname,
      lastname,
      birthdate,
      typedeal,
      rightapp,
      idworker,
      
    });

    navigate("/administrator");
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

        <button type="submit" className="Dodaj">Zapisz</button>
      </form>
    </>
  );
};