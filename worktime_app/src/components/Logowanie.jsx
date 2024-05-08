import "./Logowanie.css"
import LogoName from "../img/projekt_krzak.png"

export const Logowanie = ()=>{
 

  function zaloguj(e){
    return(
      e.preventDefault(),
      alert("logowanie")
    )
  }
  return(
    <div className="logowanie">
      <img src={LogoName} alt="Logo firmy krzak" className="logoName"/>
      <form onSubmit={zaloguj}>
        <label  className="login">
          Login: 
          <input type="text"/>
        </label>
        <label className="haslo">
          Hasło:
          <input type="password" />
        </label>
        <input type="submit" value="Zaloguj" className="buttonLogowanie" />
        
      </form>
    </div>
  )
}