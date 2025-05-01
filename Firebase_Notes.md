# Firebase Auth
### sign in and singout system :
```jsx
//  1.create a project firebase console and npm i firebase
//  2.bring firebase config into your project(from firebase website) and add google
//  3.by using get started.. create the auth and export
//  4.in the login page : create provider new GoogleAuthProvider()
//  5.use signInWithPopup and pass auth and provider
//  6.user information exces (res.user) and display
//  7.add signOut and pass auth using condition for button

import {  GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from './Firebase/Firebase';

const SignUp = () => {
  const [userData, setUserData]=useState(null)
  const provider = new GoogleAuthProvider();
  const GithubProvider = new GoogleAuthProvider();
  const handleSingUp=()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    setUserData(result.user)
  }).catch((error) => {
    console.log(error);
  });
  }
  const handleGithub=()=>{
    signInWithPopup(auth, GithubProvider)
  .then((result) => {
    setUserData(result.user)
  }).catch((error) => {
    console.log(error);
  });
  }
  const handleSingOut=()=>{
    signOut(auth).then(() => {
      setUserData(null)
    }).catch((error) => {
      console.log(error);
    }); 
  }
  return (
    <div>
      {
        userData ? <button onClick={handleSingOut}>Sing Out with Google</button> :    <div>
          <button onClick={handleSingUp}>Sing up with Google</button>
          <button onClick={handleGithub}>Sign in with Github</button>
        </div>
      }
      <h1>{userData && <p>{userData.email}</p>}</h1>
    </div>
  );
};
export default SignUp;
```
