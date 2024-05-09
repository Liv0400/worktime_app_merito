import { auth } from "./firebase"

export const signUpUser = async ({email,password}) => {
    const result = await createUserWithEmailAndPassword(auth, )
    console.log(result)
}