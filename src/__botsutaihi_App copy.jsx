import React from "react";
import "./App.css";
import db from "./index";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    //データを取得する
    const postData = collection(db, "posts");
    getDocs(postData).then((snapShot) => {
      console.log(snapShot.docs.map((doc) => doc.data()));
    });

    console.log(postData);
    console.log("postData");
  }, []);

  return (
    <div className="container">
      {posts.map((post) => (
        <div className="d">
          <h1>{post.title}</h1>
        </div>
      ))}
    </div>
  );
}
