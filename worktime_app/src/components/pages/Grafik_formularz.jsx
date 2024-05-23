import "../style/Grafik_formularz.css";
export const Grafik_formularz = () => {
  function handleSubmit(e) {
    return e.preventDefault(), console.log("wniosek");
  }

  return (
    <div className="Grafik_formularz">
      Dodaj zmianę <br />
      <form onSubmit={handleSubmit} className="nowaZmiana">
        <label className="pracownik">
          Pracownik <br />
          <select>
            <option value="user1">User1</option>
            <option value="user2">User2</option>
            <option value="user3">User3</option>
          </select>
        </label>
        <label className="dataZmiany">
          <br /> Dzień <br />
          <input type="date" id="Date"></input>
        </label>
        <label className="godzinaZmiany">
          <br /> Początek <br />
          <input type="time" id="beginigHour"></input>
          <br /> Koniec <br />
          <input type="time" id="endingHour"></input>
        </label>
        <br />
        <input type="submit" value="Ok" className="zatwierdzZmiane"></input>
        <input type="reset" value="Anuluj" className="anulujZmiane"></input>
      </form>
    </div>
  );
};
