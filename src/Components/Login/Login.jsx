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