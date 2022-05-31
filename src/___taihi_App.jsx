import React from "react";
import "./assets/styles/App.css";
import db from "./index";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";


// try {
//   const docRef = await addDoc(collection(db, "posts"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1982
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// const querySnapshot = getDocs(collection(db, "posts"));
// const aa=querySnapshot.map((doc) => {
//   return {
//     id: doc.title,
//     count: doc.text,
//     color: doc.time,
//   };
// });

// console.log(aa);

export default function App() {
  const [posts, setUsers] = useState([]);

  useEffect(() => {

    const usersCollectionRef = collection(db, 'posts');
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => 
          ({ ...doc.data(), id: doc.id })
      )
      );
    });
  }, []);



  return (
    <div className="App">
  
      <div>
        {posts.map((post) => {
            console.log(post);
          return(
          <div key={post.title}>
            <h1 className="title">{post.title}</h1>
            <p>{post.text}</p>
       
          </div>
          );
        })}
      </div>
  
    </div>
  );
}
