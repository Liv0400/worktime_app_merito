import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createUserData } from "./firestore";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        unsub();
        if (user) {
          resolve(user);
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
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    if (user) {
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
      await createUserData({
        uid: result.user.uid,

        fullname, //, typedeal
      });
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

export const updateUser = async (userId, userData) => {
  try {
    await firestore
      .collection("users")
      .doc(userId)
      .set(userData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};
