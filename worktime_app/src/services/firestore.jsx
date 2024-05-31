import { doc, setDoc, collection, getDocs, getDoc, } from "firebase/firestore"
import { db } from "./firebase"
import { getFirestore } from "firebase/firestore"; 



 export const createUserData = async ({uid, fullname 

 }) =>{
    const userRef = doc(db, "users", uid )
    const data = {
        fullname: fullname

        
    }
    await setDoc(userRef, data)
}
const firestore = getFirestore();

export const getUserById = async (userId) => {
  const userDoc = await getDoc(doc(firestore, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error("User not found");
  }
};

export const getUsers = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return usersList;
  };
