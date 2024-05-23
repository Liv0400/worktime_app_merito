import { doc, setDoc, collection, getDocs} from "firebase/firestore"
import { db } from "./firebase"

 export const createUserData = async ({uid, fullname //, typedeal

 }) =>{
    const userRef = doc(db, "users", uid )
    const data = {
        fullname: fullname//, typedeal

        
    }
    await setDoc(userRef, data)
}

export const getUsers = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return usersList;
  };
