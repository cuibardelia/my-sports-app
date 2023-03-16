import { useForm, FormProvider } from 'react-hook-form';
import { object, string } from 'yup';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Input } from '../components/Login/Input';
import { IAuthData, useAuthContext } from '../Providers/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';


const Login: React.FC = () => {
	const loginValidationSchema = object({
		email: string()
			.required('Please enter an email address.')
			.email('Your email address does not seem valid.'),
		password: string()
			.required('Please enter a password')
			.min(6, 'Your password should be at least 6 characters long.'),
	}).required();

		const methods = useForm<FormData>({
			resolver: yupResolver(loginValidationSchema),
		});
		const [serverError, setServerError] = useState('');
		const { login, user } = useAuthContext();

		const location = useLocation();

		if (user) {
			const state = location.state as { from: string } | undefined;
			const destination = state?.from ?? '/about';
			return <Navigate to={destination} />;
		}

		// TODO: env for variables + update schema
		async function handleSubmit(formData: FormData) {
			const data: IAuthData = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(formData),
			}).then((res) => res.json());

			if (typeof data !== 'object') {
				// TODO: modal for server error + add proper message for user
				setServerError(data);
				return;
			}
			login(data);
		}
		// TODO: form error handling
	return (
		<FormProvider {...methods}>
			<div className="w-7/12 m-auto">
				<form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
					<Input name="email" type="email" labelText="Email" />
					<Input name="password" type="password" labelText="Password" />
					<div className={"text-right mb-6"}>Don't have an account? <Link to={"/register"}>Register here</Link></div>
					<div className={"text-right mb-6"}><Link to={"/forgotpassword"}>Forgot password?</Link></div>
					<button className="bg-purple-800">Sign In</button>
				</form>
			</div>
		</FormProvider>
	);
};

export default Login;