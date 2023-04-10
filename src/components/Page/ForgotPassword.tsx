import * as React from 'react';
import { object, string } from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { IAuthData, useAuthContext } from '../../Providers/AuthContext';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Input } from '../Login/Input';
import { AuthCard, BottomLinks, Button } from '../Login/Form.css';
import { AuthPaths } from '../Navbar/Navbar';

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
			const destination = state?.from ?? '/dashboard';
			return <Navigate to={destination} />;
		}

		async function handleSubmit(formData: FormData) {
			const data: IAuthData = await fetch(process.env.FORGOT_PWD_API, {
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
			// TODO: modal for success

		}

		// TODO: form error handling
		return (
			<FormProvider {...methods}>
				<AuthCard>
					<form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
						<Input name="email" type="email" labelText="Email" />
						<Button>Submit</Button>
						<BottomLinks>
							<div>Got lost? <Link to={AuthPaths.LOGIN}>Go back to Login</Link></div>
						</BottomLinks>
					</form>
				</AuthCard>
			</FormProvider>
		);
	};

export default ForgotPassword;
