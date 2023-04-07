import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';
import { useAuthContext } from '../../Providers/AuthContext';
import { Input } from '../Login/Input';
import { AuthCard, BottomLinks, Button } from '../Login/Form.css';
import { AuthPaths } from '../Navbar/Navbar';


type FormData = {
	email: string;
	password: string;
	password_check: string;
	fName: string;
	lName: string;
};

const registerValidationSchema = object({
	email: string()
		.required('Please enter an email address.')
		.email('Your email address does not seem valid.'),
	password: string()
		.required('Please enter a password')
		.min(6, 'Your password should be at least 6 characters long.'),
	password_check: string()
		.required('Please retype the password.')
		.oneOf([ref('password')], "The passwords don't match"),
	fName: string()
		.required('Please enter your first name.')
		.min(2, 'The first name should be at least 2 characters long.'),
	lName: string()
		.required('Please enter your last name')
		.min(2, 'The last name should be at least 2 characters long.'),
}).required();

const Register: React.FC = () => {
	const methods = useForm<FormData>({
		resolver: yupResolver(registerValidationSchema),
	});

	// TODO: Remove autocomplete?
	const { login } = useAuthContext();
	const navigate = useNavigate();

	async function onSubmit(formData: FormData) {
		const { password_check, ...payload } = formData;
		const data = await fetch(process.env.REGISTER_API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		}).then((res) => res.json());

		// const { token, user } = data;
		login(data);
		navigate('/');
	}

	return (
		<FormProvider {...methods}>
			<div>
				<AuthCard>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<Input name="username" type="text" labelText="Username" />
						<Input name="fName" type="text" labelText="First Name" />
						<Input name="lName" type="text" labelText="Last Name" />
						<Input name="email" type="email" labelText="Email" />
						<Input name="password" type="password" labelText="Password" />
						<Input
							name="password_check"
							type="password"
							labelText="Retype Password"
						/>

						<Button>Register</Button>
						<BottomLinks>
							<div>Got lost? <Link to={AuthPaths.LOGIN}>Go back to Login</Link></div>
						</BottomLinks>
					</form>
				</AuthCard>
			</div>
		</FormProvider>
	);
}

export default Register;
