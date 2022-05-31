import React from "react";
import "./App.css";
import db from "./index";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

function tkk() {
  const postData = 2;
  return postData;
}
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
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postData = collection(db, "posts");
    const q = query(postData, orderBy("timestamp", "desc"));
    getDocs(q).then((snapShot) => {
      console.log(snapShot.docs);
      setPosts(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });

    /* リアルタイムで取得 */
    // onSnapshot(q, (querySnapshot) => {
    console.log(posts);
    //   setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    // });
  }, []);

  return (
    <div className="App">
      {/* <p className="h1tag">こんにちは</p>    */}
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
      {/* <h2 className="h1tag">{tkk()}</h2> */}
    </div>
  );
}
