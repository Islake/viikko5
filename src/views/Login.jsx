import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Button from '../components/UI/Button';

const Login = () => {
  const [toggleForm, setToggleForm] = useState(true);
  const toggle = () => {
    setToggleForm(!toggleForm);
  }
  return (
    <>
    {toggleForm ?
      <LoginForm />
      :
      <RegisterForm/>}
      <Button text = {'register'} handleClick = {toggle}/>
    </>
  );
};

export default Login;
