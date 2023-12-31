
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { FocusEvent, FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { ILogin } from '../../../types/Interfaces/Login/ILogin';
import { Login } from '../../../types/Classes/Login/Login';
import axios, { AxiosRequestConfig } from 'axios';
import { IJWT } from '../../../types/Interfaces/JWT/IJWT';
import { UserProps } from '../../../types/Interfaces/Users/IUserProps';
import { HiMail,HiKey } from 'react-icons/hi';
import { success } from 'io-ts';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { LoginUser, fetchUsers } from '../../../store/action-creator/user';


export default function LoginPage() {
  const {jwtd,error,loading, status,message} = useTypedSelector(state => state.user_login);
  const dispatch: any  = useDispatch();
  const cookies = new Cookies();

  const logi = new Login();

  const [email,setEmail] = useState("")
  const [mainerror, setMainError] = useState("")
  const [remember,setRemember] = useState(false)
  const [password,setPassword] = useState("")
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email cannot be empty')
  const [passwordError, setPasswordError] = useState('Password cannot be empty')
  const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        emailHandler(e);
        break;
        case 'password':
          setPasswordDirty(true);
          passwordHandler(e);
        break;
    }
  };
  const emailHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    setEmail(e.target.value);
    const resp = validateEmail(email);
    if(resp == false) {
      setEmailError('Incorrect email')
    }
    else {
      setEmailError('')
    }
  };
  const passwordHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    setPassword(e.target.value);
    if(password.length < 3 || password.length > 16) {
      setPasswordError('Password must be from 3 to 16 symbols');
      if(!password) {
        setPasswordError('Password must have at least 3 symbols');
      }
    }
    else {
      setPasswordError('');
    }
  };
  function validateEmail(email: string) {
    var re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return re.test(email);
  }
  const [formValid, setFormValid] = useState(false)
  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    }
    else {
      setFormValid(true)
    }
  },[emailError,passwordError]);

  const [jwt,setJwt] = useState<string>("")

  const onButtonClick =() => {
    logi.Email = email;
    logi.Password = password;
    loginUser(logi)
  }
  useEffect(() => {
    if(jwtd.AccessToken.length > 0) {
    if(remember) {
      cookies.set("token",jwtd.AccessToken,{maxAge:2592000});
      cookies.set("refreshToken",jwtd.RefreshToken,{maxAge:2592000});
    }
    else {
      cookies.set("token",jwtd.AccessToken);
      cookies.set("refreshToken",jwtd.RefreshToken);
    }
    setJwt(String(jwtd.AccessToken));
    window.location.href = '/';
  }
},[onButtonClick]);
  const fetchToken  = () => {
    const resp = dispatch(LoginUser(logi));
  };

function loginUser(iuser:ILogin) {
  try {
    const resp = fetchToken();
  }
  catch (e) {
    alert(e)
  }
}

const toggleRemember = () => {
  setRemember((prevState) => !prevState);
};

  return (
    <div className='grid place-items-center mt-10'>
    <form className="flex max-w-md flex-col gap-4 grid place-items-center" 
    >
      <img src="/logo512.png" className="h-28 w-28 max-auto content-center m-0 p-0" alt="Skyme logo" />
      <h1 className='m-0 p-0 text-slate-200 text-2xl'>Login in Skymey</h1>
      {status > 0 && 
        <h2 className='text-rose-600'>
          {message}
        </h2>
      }
      <div className='p-0 m-0 w-full'>
      {(emailDirty && emailError) && 
            <div className='text-rose-600'>{emailError}</div>
          }
        <div className="relative mb-1 w-full">
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
        <input
          id="email"
          name="email"
          placeholder="Email"
          required
          type="email"
          value={email}
          onBlur={e=>blurHandler(e)}
          className="z-0 bg-gray-700 text-slate-300 pl-12 rounded-md border-0 border-transparent focus:ring-0 w-full"
          onChange={emailHandler}
        />
        </div>
        </div>
      <div className='p-0 m-0 w-full'>
      {(passwordDirty && passwordError) && 
            <div className='text-rose-600'>{passwordError}</div>
          }
      <div className="relative mb-0 w-full">
        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        </div>
        
        <input
          id="password"
          required
          name="password"
          type="password"
          placeholder='Password'
          value={password}
          onBlur={e=>blurHandler(e)}
          className='z-0 bg-gray-700 text-slate-300 pl-12 rounded-md border-0 border-transparent focus:ring-0 w-full'
          onChange={passwordHandler}
        />
        </div>
      </div>
      <div className='place-items-left w-full p-0 m-0'>
      <div className="flex items-center gap-2 mx-0">
        <Checkbox id="remember" onClick={toggleRemember}/>
        <Label htmlFor="remember" className='text-slate-300'>
          Remember me
        </Label>
      </div>
      <div className='bg-slate-700 h-1 mt-2 border-separate rounded-md opacity-50'></div>
      </div>
      <button type="button" onClick={onButtonClick} disabled={!formValid} className='
      bg-rose-600 hover:bg-rose-700 disabled:bg-gray-600
      rounded-md py-2 px-4 text-slate-200 text-lg'>
        Login
      </button>
      <div className='flex dont-have'>
        <span className='text-slate-200 inline-block mx-2'>Don't have an account?</span> <a href="/register" className='text-rose-500 bold inline-blocks hover:underline'>Register here</a>
      </div>
    </form>
    </div>
  )
}

