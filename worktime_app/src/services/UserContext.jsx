import{ createContext, useState } from 'react';

// Tworzenie kontekstu użytkownika
const UserContext = createContext();

// Tworzenie dostawcy kontekstu użytkownika
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
