import { object, ref, string } from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { IAuthData, useAuthContext } from '../../Providers/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Input } from '../Login/Input';
import { useParams } from 'react-router';
import { AuthCard, Button } from '../Login/Form.css';


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
		const destination = state?.from ?? '/dashboard';
		return <Navigate to={destination} />;
	}

	// FIXME: type
	async function handleSubmit(formData) {

		const data: IAuthData = await fetch(`${process.env.RESET_PWD_API}/${resetToken}`, {
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
		// TODO: modal for success + redirect
	}

	// TODO: form error handling, seems like pwd check doesn't work
	// TODO: view pwd options
	return (
		<FormProvider {...methods}>
				<AuthCard>
					<form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
						<Input name="password" type="password" labelText="Password" />
						<Input
							name="password_check"
							type="password"
							labelText="Retype Password"
						/>
						<Button>Submit</Button>
					</form>
				</AuthCard>
		</FormProvider>
	);
};

export default ResetPassword;