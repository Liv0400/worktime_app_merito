import { doc, setDoc} from "firebase/firestore"
import { db } from "./firebase"

 export const createUserData = async ({uid, fullname //, typedeal

 }) =>{
    const userRef = doc(db, "users", uid )
    const data = {
        fullname: fullname//, typedeal

        
    }
    await setDoc(userRef, data)
}