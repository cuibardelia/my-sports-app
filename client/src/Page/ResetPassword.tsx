import { object, ref, string } from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { IAuthData, useAuthContext } from '../Providers/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Input } from '../components/Login/Input';
import { useParams } from 'react-router';


const ResetPassword: React.FC = () => {
	const forgotPasswordValidationSchema = object({
		password: string()
			.required('Please enter a password')
			.min(6, 'Your password should be at least 6 characters long.'),
		password_check: string()
			.required('Please retype the password.')
			.oneOf([ref('password')], "The passwords don't match"),
	}).required();

	const methods = useForm<FormData>({
		resolver: yupResolver(forgotPasswordValidationSchema),
	});
	const [serverError, setServerError] = useState('');
	const { login, user } = useAuthContext();
	const {resetToken} = useParams();

	const location = useLocation();

	if (user) {
		const state = location.state as { from: string } | undefined;
		const destination = state?.from ?? '/about';
		return <Navigate to={destination} />;
	}

	// TODO: env for variables
	// FIXME: type
	async function handleSubmit(formData) {


		console.log('here', formData.password, JSON.stringify(formData.password));
		const data: IAuthData = await fetch(`http://localhost:5000/api/auth/reset-password/${resetToken}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(formData),
		}).then((res) => {return res.json()});

		if (typeof data !== 'object') {
			// TODO: modal for server error
			setServerError(data);
			return;
		}
		// TODO: success message
	}

	// TODO: form error handling
	// TODO: view pwd
	return (
		<FormProvider {...methods}>
			<div className="w-7/12 m-auto">
				<form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
					<Input name="password" type="password" labelText="Password" />
					<Input
						name="password_check"
						type="password"
						labelText="Retype Password"
					/>
					<button className="bg-purple-800">Submit</button>
				</form>
			</div>
		</FormProvider>
	);
};

export default ResetPassword;