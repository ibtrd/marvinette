import './Login.css'
import { Link } from "react-router-dom";
import LoginButton from './LoginButton';

export default function LoginForm({...props}) {

	return (
	  <div
	  	{...props}
		className='loginForm'
	  >
		<LoginButton />
	  </div>
	);
  }

