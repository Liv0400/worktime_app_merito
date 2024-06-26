import { auth, secondaryAuth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { createUserData } from "./firestore";
import { doc, getDoc, updateDoc, setDoc, deleteDoc} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { db } from './firebase';


const firestore = getFirestore();

export const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(
      auth,
      async (user) => {
        unsub();
        if (user) {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if(userDoc.exists()){
            resolve({uid: user.uid, ...userDoc.data()});
          }else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
};

export const signUpUser = async ({
  fullname,
  email,
  password,
  firstName,
  lastName, //,typedeal
}) => {
  try {
    const result = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const user = result.user;

    if (user) {
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
      await createUserData({
        uid: result.user.uid,
        fullname,
        passwordChanged:false, //, typedeal
      });
      await signOut(secondaryAuth);
      return user;
    } else {
      throw new Error("Użytkownik jest null lub undefined");
    }
  } catch (error) {
    console.error("Error during sign up:", error);
    return null;
  }
};

export const signInUser = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return false;
  }
};

export const updateUserPassword = async (newPassword) => {
  const user = auth.currentUser;
  if(user) {
    await updatePassword(user, newPassword);
    const userDocRef = doc(firestore, "users", user.uid);
    await updateDoc(userDocRef, {passwordChanged: true});
  }
};

export const updateUser = async (userId, userData) => {
  try {
 
    await setDoc(doc(db, "users", userId), userData, { merge: false });
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
    console.log(`User with ID ${userId} has been deleted`);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const logout = async () => {
  await signOut(auth);
}