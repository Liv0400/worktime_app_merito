import {useState, useEffect} from 'react';
import {auth} from '../services/firebase';
import { getCurrentUser,signInUser, updateUserPassword } from "../services/auth";
import { useNavigate } from 'react-router-dom'; 
import LogoName from "../img/projekt_krzak.png";
import TextInput from "./pages/Textinput";
import "./Logowanie.css";

export const Logowanie = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const onNewPasswordChanged = (e) => {
    setNewPassword(e.target.value);
  };

    

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async (user)=>{
      if (user) {
        const currentUserData = await getCurrentUser();
        setCurrentUser(currentUserData);
        if(currentUser && currentUserData.passwordChanged === false){
          setShowChangePasswordPopup(true);
        }
      }else{
        setCurrentUser(null);
      }
    });
    return ()=>unsubscribe();
  }, [currentUser]);

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
      if (result) {
        console.log("Login successful"); // Debug: sprawdź czy logowanie jest udane
        const user = await getCurrentUser();
        if (user.passwordChanged === false){
          setShowChangePasswordPopup(true);
        } else {
          navigate("/home")
        }
      } else {
        console.log("Login failed"); // Debug: sprawdź czy logowanie się nie powiodło
        setErrors({ email: false, password: false, loginFailed: true });
      }
    } catch (error) {
      console.log("Login failed due to error:", error); // Debug: błąd podczas logowania
      setErrors({ email: false, password: false, loginFailed: true });
    }
  };

  const handleChangePassword = async ()=>{
    if (newPassword.length < 6 || newPassword.length > 24){
      setErrors({newPassword:true});
      return;
    }
    try {
      await updateUserPassword(newPassword);
      setShowChangePasswordPopup(false);
      setChangePasswordSuccess(true);
      await auth.signOut();
      navigate("/zaloguj")
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };
  useEffect(() => {
  if (changePasswordSuccess) {
    alert("Hasło zostało zmienione. Zaloguj się przy użyciu nowego hasła");
  }
}, [changePasswordSuccess]);

  return (
    <div className='zaloguj'>
      
       
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

      {showChangePasswordPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Zmień hasło</h2>
            <TextInput
            onChange={onNewPasswordChanged}
            value={newPassword}
            title="Nowe hasło"
            name= "newPassword"
            type='password'
            className="newPassword"
            />
            {errors.newPassword && <span className="error">Hasło musi mieć od 6 do 24 znaków</span>}
            <button onClick={handleChangePassword} className="buttonChangePassword">Zmień hasło</button>
          </div>
        </div>
      )}

    </div>
  );
};