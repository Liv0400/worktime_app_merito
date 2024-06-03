import{ createContext, useState, useEffect } from 'react';
import { auth } from './firebase';
import { getUserById } from './firestore';

// Tworzenie kontekstu użytkownika
const UserContext = createContext();

// Tworzenie dostawcy kontekstu użytkownika
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await getUserById(user.uid);
        setUser({ ...user, rightapp: userData.fullname.rightapp });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
