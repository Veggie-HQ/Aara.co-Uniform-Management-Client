import { auth, firestore } from "@/firebase/clientApp";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";

const useStudentInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const [savedStudents, setSavedStudents] = useState([]);
  useEffect(() => {
    getStudents();
  });

  const getStudents = async () => {
    setLoading(true);
    if (error) setError("");
    try {
      const studentDocs = await getDocs(
        collection(firestore, `users/${user.email}/students`)
      );

      const students = studentDocs.docs.map((doc) => ({
        ...doc.data(),
      }));

      setSavedStudents(students);
    } catch (error) {
      console.log("getStudents error", error);
      setError(error.message);
    }
    setLoading(false);
  };
  return { getStudents, savedStudents };
};

export default useStudentInfo;
