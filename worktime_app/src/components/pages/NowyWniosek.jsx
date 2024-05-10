import '../style/NowyWniosek.css'

export const NowyWniosek = () => {
  function handleSubmit(e){
    return(
      e.preventDefault(),
      console.log("wniosek")
    )
  }
  return(
    <>
    <h1 className='nowyWniosekh1'>Pracownik Nazwisko</h1>
    <form onSubmit={handleSubmit} className='nowyWniosek'>
      <label className='typWniosku'>
        Typ wniosku
        <select>
          <option value="wypoczynkowy">Urlop wypoczynkowy</option>
          <option value="naZadanie">Urlop na żądanie</option>
          <option value="macierzynskiTacierzynski">Urlop macierzyński/tacierzyński</option>
          <option value="naDziecko">Urlop na dziecko</option>
          <option value="opiekunczy">Urlop opiekuńczy</option>
          <option value="l4">Zwolnienie lekarskie</option>
        </select>
      </label>
      <label className='dataWniosku'>
        Początek
        <input type="date" id="beginigDate"></input>
        Koniec
        <input type="date" id="endingDate"></input>
      </label>
      <label className='godzinyWniosku'>
        Początek <span>opcjonalnie</span>
        <input type="time" id="beginigHour"></input>
    
        Koniec <span>opcjonalnie</span>
        <input type="time" id="endingHour"></input>
      </label>
      <input type="submit" value="Wyślij" className='zatwierdzWniosek'></input>
      <input type="reset" value="Anuluj" className='anulujWniosek'></input>
    </form>
    </>
  )
}