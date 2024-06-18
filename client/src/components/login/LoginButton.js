import './Login.css'
import { Link } from "react-router-dom";

export default function LoginButton({...props}) {

	return (
	  <a
	  {...props}
		className='loginButton'
		href='http://localhost:4000/oauth/login'
	  >
		<img src='https://profile.intra.42.fr/assets/42_logo-7dfc9110a5319a308863b96bda33cea995046d1731cebb735e41b16255106c12.svg'/> Login with Intra
	  </a>
	);
  }

