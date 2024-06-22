import './Login.css'

export default function LoginButton({...props}) {

	return (
	  <a
	  {...props}
		className='loginButton'
		href='/auth/login'
	  >
		<img alt='42 intra logo' src='https://profile.intra.42.fr/assets/42_logo-7dfc9110a5319a308863b96bda33cea995046d1731cebb735e41b16255106c12.svg'/> Login with Intra
	  </a>
	);
  }

