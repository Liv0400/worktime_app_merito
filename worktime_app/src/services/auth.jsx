import { auth } from "./firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
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

export const logout = async () =>{
    await signOut (auth)
}
