
# Firebase Auth
### 1.sign in and singout system with google and github :
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
### 2.Menualy Email and Password crate and validation with Firebase
#### sign Up Page
```js
const SingnUp = () => {
  // const [userData, setUserData]=useState(null)
  const [errorMessage, setErrorMessage]=useState("")
  const [success, setSuccess]=useState(false)
  const [showPassword,setShowPassword]=useState(false)

  const handleRegister=e=>{
    e.preventDefault()
    const name=e.target.name.value ;
    const email=e.target.email.value;
    const password=e.target.password.value;
    const terms =e.target.terms.checked;
    console.log(name,email,password,terms);

    setSuccess(false)
    setErrorMessage("") //susces clear error
    if(!terms){
      setErrorMessage("please accepts terms")
      return
    }
   //password validation
   const passwordRegEx=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
   if(passwordRegEx.test(password)===false){
    setErrorMessage("password must be strong digit,lower,uooer,and charecter 6")
    return
   }
   //create user
  createUserWithEmailAndPassword(auth, email, password)
  .then((result) => {
    // setUserData(result.user)
    console.log(result);
    // setSuccess(true)
    //email verify
    sendEmailVerification(auth.currentUser)
    .then(() => {
     setSuccess(true)
     console.log("please check your email");
  });
  })
  .catch((error) => {
   setErrorMessage(error.message)
  });
  }
  return (
  <div>
      <form onSubmit={handleRegister} className='flex flex-col p-10'>
   <label><input type="text" name='name' placeholder='usernmae'/></label>
   <label> <input name='email' type="email"  placeholder='email'/></label>
   <label>
    {/* Eye icon toggle */}
    <div className='relative'>
    <input type={showPassword ? "text" : "password"} name='password' placeholder='password'/>
    <button onClick={()=>{setShowPassword(!showPassword)}} className='absolute'>{showPassword ? "hide" : "show"}</button>
    </div>
    </label>
    {/* checkbox */}
    <label className="label">
    <input type="checkbox" name='terms' className="checkbox" />
    Accept terms and condition
    </label>
   <input type='submit' value="Submit"></input>
  </form>
  <p>Already have an account <Link to="/login">Login</Link></p>
    {/* {
      userData && <h2>{userData.email}</h2>
    } */}
    {
      errorMessage && <p>Error {errorMessage} </p>
    }
    {
      success && <h2>user create suscesfully</h2>
    }
  </div>
  );
};

```
#### Login Page
```js
const Login = () => {
  const[errorMessage, setErrorMessage]=useState("")
  const EmailRef=useRef()

  const handleLogin = e =>{
    e.preventDefault()
    const email=e.target.email.value;
    const password=e.target.password.value;
    console.log(email,password);
    //Login user
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
    console.log(result.user);
    //verify confirom
    if(!result.user.emailVerified){
      alert("please verify our email")
    }else{
      console.log("verify successfully");
    }
  })
  .catch((error) => {
   setErrorMessage(error.message)
  }); 
  }

  const handelForgetPassword=()=>{
    console.log(EmailRef.current?.value);
    const email =EmailRef.current?.value;
    setErrorMessage("")
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("password reset please check your Email")
  })
  .catch((error) => {
   console.log(error.message);
  });
  }
  return (
        <div>
          <form onSubmit={handleLogin} className='flex flex-col'>
            <label>Email</label>
          <input type="email" name='email'  placeholder="Email" />
          <label >Password</label>
          <input type="password" name='password' ref={EmailRef} placeholder="Pass" />
          <div onClick={handelForgetPassword}><a className='link link-hover'>Forgot password?</a></div>
          <button >Login</button>
        </form>
        <p>New to this website? <Link to='/register'>Register</Link></p>
        {
          errorMessage && <p>Show anyError {errorMessage} </p>
        }
        </div>
  );
};

```
### Context Api (data coummnication any where) working 4 step
#### 1.create AuthContex.jsx and 2.AuthProvider 3.add main.jsx and 4.any comoponent exces
```js
//module:
//1.crate sigin and sigup page and value recive
//2.context api create(4) and create function authProvider: createUserWithEmailAndPassword(),
//signInWithEmailAndPassword(),signOut() and useEffect inside onAuthStateChanged() and and use useState receve useData
//3.sigin and signup page througth data destructure and function call with props down .then() and catch()
//4.data take navbar and create ternary button and handllesignOut



//1.step AuthContext.jsx
import { createContext } from "react";
export const AuthContext =createContext(null)

//2.AuthProvider.jsx
const AuthProvider = ({children}) => {
  const [UserData,setUserData]=useState(null)
  //show order and profile data
  const [Loading, setLoading]=useState(true)
 const createUser=(email,password)=>{
  setLoading(true)
  return createUserWithEmailAndPassword(auth,email,password)
 }
 const SignInUser=(email,password)=>{
  setLoading(true)
  return signInWithEmailAndPassword(auth, email, password);
 }
 const SignOutUser=()=>{
  setLoading(true)
  return signOut(auth)
 }
 useEffect(()=>{
  const UnSubscribe = onAuthStateChanged(auth, currentUser=> {
    console.log("inside useEffect on auth state change",currentUser);
    setUserData(currentUser)
    setLoading(false)
  })
  return ()=>{
    UnSubscribe()
  }
 },[])
   const UserInfo={
    Loading,
    UserData,
    SignOutUser,
    createUser,
    SignInUser
   }
  return (
    <AuthContext value={UserInfo}>
     {children}
    </AuthContext>
  );
};


//3.main.jsx
 <AuthProvider>
     <RouterProvider router={router} />
 </AuthProvider>

//4.use sign up and similar sign IN page
 const {createUser} =use(AuthContext)
  console.log(createUser);

 const handleSubmit=e=>{
    e.preventDefault()
    const name=e.target.name.value
    const email=e.target.email.value;
    const password=e.target.password.value;

    //context api to data
   createUser(email, password)
   .then((result) => {
    console.log(result);
  })
  .catch((error) => {
  console.log(error);
  });
//use Nabvar button
const Navbar = () => {
   const { UserData,SignOutUser }=use(AuthContext)
   console.log(UserData);

   const handleSignOut=()=>{
    SignOutUser().then(()=>{
      console.log("sign out successfully");
      
    }).catch((error)=>{
      console.log(error);

    })
   }
{
      UserData ? <a onClick={handleSignOut} className="btn">Sign Out</a> : <Link to="/signin">Login</Link>
    }
}
  
```
### Private Route :
```js
//1.UserData use ternary operetor NavLink and component create
//2.Private Rotue create
//3. add main Route file Private Route
//4. loading add authProvider and PrivateRoute
//5.User click login go to home page
//6. Disable:(login korar age jekhane jete chai login korar por thik oikhane jabo)
// new component create public Navlink and private Router and componenet privateRoute add useLocation
//7.login page add location and call add (navigate(location?.state || "/"))
//8.social google item add tailwin google button add sigin in and sign uo page from ar niche
 <NavLink to="/signin">Sign In</NavLink>
   <NavLink to="/signup">Sign Up</NavLink>
   {
    UserData && <>
    <NavLink to="/orders">Orders</NavLink>
    <NavLink to="/profile">Profile</NavLink>
    </>
   }

//2.private route
const PrivateRoute = ({children}) => {
  const {UserData,Loading}=use(AuthContext)
  //UserData check na kortei data diye dibe
  if(Loading){
    return <span className="loading loading-spinner text-info"></span>
  }
  if(!UserData){
    return <Navigate to="/signin">Login</Navigate>
  }
  return children
};

//3. add main route
{path:"/orders", element:<PrivateRoute><Orders></Orders></PrivateRoute>},

//4 add loading
 const {UserData,Loading}=use(AuthContext)
  if(Loading){
    return <span className="loading loading-spinner text-info"></span>
  }

//5.Login page add
const navigate=useNavigate()
and down add and call
  SignInUser(email,password)
  .then((result) => {
  navigate("/")
  })

//6. add location
const PrivateRoute = ({children}) => {
  const {UserData,Loading}=use(AuthContext)
  //add location
  const location =useLocation()
  console.log(location);
  
  if(Loading){
    return <span className="loading loading-spinner text-info"></span>
  }
  if(!UserData){
    //add location
    return <Navigate state={location?.pathname} to="/signin">Login</Navigate>
  }
  return children
};





```













