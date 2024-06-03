import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore"
import { db } from "./firebase"
// import { getFirestore } from "firebase/firestore"; 



 export const createUserData = async ({uid, fullname, passwordChanged}) =>{
  try {
    await setDoc(doc(db, "users",uid), {
      fullname,
      passwordChanged,
    });
  } catch (error){
    console.error("Error creating user data:", error);
    throw error;
  }
}
// const firestore = getFirestore();

export const getUserById = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
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
