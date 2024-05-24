import {useState, useEffect} from "react";
import {db} from "../../services/firebase"
import { collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import '../style/Pracownicy.css';

export const Pracownicy = () => {

  const [users, setUsers] = useState([]);
  const[loading, setLoading] = useState(true);
  // const [selectedUser, setSelectedUser] = useState(null)

  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const querySnapshot= await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map(doc=>({
          id:doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setLoading(false);
      } catch(error){
        console.error("Błąd podczas pobierania listy pracowników:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  if (loading) {
    return <div>Pobieranie listy pracowników...</div>;
  }

  return (
    <div className="pracownicy">
      <h1>Lista pracowników:</h1>
      <ul>
        {users.map((user) => (
  
    <li key={user.id}>
    {/* <span className="minPhoto"></span> */}
    <NavLink 
    to={{
      pathname: "/pracownicy/profil",
      state: {user}
    }}
    // onClick={()=>setSelectedUser(user)}
    >
    {user.fullname.firstname} {user.fullname.lastname}
    </NavLink>
    </li>
  ))}
      </ul>
    </div>
  )
};
