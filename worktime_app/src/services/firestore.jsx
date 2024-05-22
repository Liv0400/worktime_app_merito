import { doc, setDoc} from "firebase/firestore"
import { db } from "./firebase"

 export const createUserData = async ({uid, fullname //, typedeal

 }) =>{
    const userRef = doc(db, "users", uid )
    const data = {
        fullname: fullname//, typedeal

        
    }
    await setDoc(userRef, data)

  //     try {
  //   await setDoc(doc(db, "users", uid), {
  //     fullname,
  //   });
  // } catch (error) {
  //   console.error("Error creating user data:", error);
  //   throw error;
  // }
}


