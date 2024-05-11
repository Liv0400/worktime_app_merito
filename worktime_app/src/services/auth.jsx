import { auth } from "./firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

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


export const signUpUser = async ({email,password}) => {
    const result = await createUserWithEmailAndPassword(auth, email, password )
    console.log(result)
}

