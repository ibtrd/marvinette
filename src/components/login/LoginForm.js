import './Login.css'
import LoginButton from './LoginButton';

export default function LoginForm({...props}) {

	return (
	  <div
	  	{...props}
		className='loginForm'
	  >
		<h1>42 Roulette</h1>
		<LoginButton />
	  </div>
	);
  }

