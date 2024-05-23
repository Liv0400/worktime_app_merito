import { auth } from "./firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { createUserData } from "./firestore"

export const getCurrentUser =() => {
return new Promise((resolve, reject)=>
{
    const unsub = onAuthStateChanged( auth, (user)=>{
        unsub()
        resolve(user)
        
    }, reject)
}
)  
}


export const signUpUser = async ( { fullname, email, password //,typedeal

}) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password ) 
        await createUserData({uid: result.user.uid, fullname //, typedeal

         })
        return true
    } catch (error) {
        console.error(error)
        return false
    }
    

}

export const signInUser = async ({email, password})=>{
try {
    await signInWithEmailAndPassword(auth, email, password)
    return true
} catch (error) {
    return false
}
}

export const updateUser = async (userId, userData) => {
    try {
      await firestore.collection('users').doc(userId).set(userData, { merge: true });
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  
export const logout = async () =>{
    await signOut (auth)
}
