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

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import React, { useState } from 'react';
import { auth } from '../../../Firebase/Firebase.init';

const Login = () => {
  const [userdata, setUserdata]=useState(null)
  const provider = new GoogleAuthProvider();
  const handleClick=()=>{
    console.log("helo");
    signInWithPopup(auth,provider).then(res=>{
      console.log(res.user);
      setUserdata(res.user)
    }).catch(error=>{
      console.log(error); 
    }) 
  }

  const handleOut=()=>{
    signOut(auth).then(()=>{
      console.log("sign out compeled");
      setUserdata(null)
    }).catch(error=>{
      console.log(error);
    })
  }
  return (
    <div>
      <h1>please login</h1>
      {
        userdata ? <button onClick={handleOut}>sign out</button> : <button onClick={handleClick}>Sign in google</button>
      }
       {/* show data */}
        {
          userdata && <div>
            <h1>{userdata?.displayName}</h1>
             <h3>{userdata?.email}</h3>
             <img src={userdata.photoURL} alt="" />
          </div>
        }
    </div>
  );
};

export default Login;
```
