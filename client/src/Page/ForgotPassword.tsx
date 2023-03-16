import { object, ref, string } from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { IAuthData, useAuthContext } from '../Providers/AuthContext';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Input } from '../components/Login/Input';

const ForgotPassword: React.FC = () => {
		const forgotPasswordValidationSchema = object({
			email: string()
				.required('Please enter an email address.')
				.email('Your email address does not seem valid.'),
		}).required();

		const methods = useForm<FormData>({
			resolver: yupResolver(forgotPasswordValidationSchema),
		});
		const [serverError, setServerError] = useState('');
		const { login, user } = useAuthContext();

		const location = useLocation();

		if (user) {
			const state = location.state as { from: string } | undefined;
			const destination = state?.from ?? '/about';
			return <Navigate to={destination} />;
		}

		// TODO: env for variables
		async function handleSubmit(formData: FormData) {
			console.log('here', formData);
			const data: IAuthData = await fetch('http://localhost:5000/api/auth/forgot-password', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(formData),
			}).then((res) => res.json());

			if (typeof data !== 'object') {
				// TODO: modal for server error
				setServerError(data);
				return;
			}
			// TODO: success message
		}

		// TODO: form error handling
		return (
			<FormProvider {...methods}>
				<div className="w-7/12 m-auto">
					<form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
						<Input name="email" type="email" labelText="Email" />
						<button className="bg-purple-800">Submit</button>
					</form>
				</div>
			</FormProvider>
		);
	};

export default ForgotPassword;
