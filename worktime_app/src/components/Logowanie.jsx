import {useState, useEffect} from 'react';
import {auth} from '../services/firebase';
import { getCurrentUser } from "../services/auth";
import { useNavigate } from 'react-router-dom'; 
import LogoName from "../img/projekt_krzak.png";
import TextInput from "./pages/Textinput";
import { signInUser } from "../services/auth";
import "./Logowanie.css";

export const Logowanie = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

    const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if (user) {
        const currentUserData = await getCurrentUser();
        setCurrentUser(currentUserData);
      }else{
        setCurrentUser(null);
      }
    });
    return ()=>unsubscribe();
  })

  const zaloguj = async (e) => {
    e.preventDefault(); // Zapobiega odświeżaniu strony

    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    const passwordValid = password.length >= 6 && password.length <= 24;

    const errorsObj = {
      email: !emailValid,
      password: !passwordValid,
    };
    setErrors(errorsObj);

    if (!emailValid || !passwordValid) {
      console.log("Validation errors:", errorsObj); // Debug: wyświetl błędy walidacji
      return;
    }

    try {
      const result = await signInUser({ email, password });
      if (result && currentUser) {
        console.log("Login successful"); // Debug: sprawdź czy logowanie jest udane
        navigate("/home");
      } else {
        console.log("Login failed"); // Debug: sprawdź czy logowanie się nie powiodło
        setErrors({ email: false, password: false, loginFailed: true });
      }
    } catch (error) {
      console.log("Login failed due to error:", error); // Debug: błąd podczas logowania
      setErrors({ email: false, password: false, loginFailed: true });
    }
  };



  return (
    <>
      
       
      <div className="logowanie">
        <form onSubmit={zaloguj}>
        <img src={LogoName} alt="Logo firmy krzak" className="logoName" />
      
          <TextInput
            onChange={onEmailChanged}
            value={email}
            title="Email"
            name="email"
            className="login"
          />
          {errors.email && <span className="error">Nieprawidłowy email</span>}
          <TextInput
            onChange={onPasswordChanged}
            value={password}
            title="Hasło"
            name="password"
            type="password"
            className="haslo"
          />
          {errors.password && <span className="error">Zapomniałeś hasła skontaktuj się z Administratorem aplikacji</span>}
          {errors.loginFailed && <span className="error">Błędny email lub hasło</span>}
          <button type="submit" value="Zaloguj" className="buttonLogowanie" >Zaloguj</button>
   

        </form>
      </div>
    </>
  );
};