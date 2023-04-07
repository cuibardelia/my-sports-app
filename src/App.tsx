import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './Providers/AuthContext';
import { AuthLayout } from './layout/AuthLayout';
import { GlobalStyles } from './Providers/GlobalStyles.css';
import Dashboard from './components/Page/Dashboard';
import Exercises from './components/Page/Exercises';
import Trainers from './components/Page/Trainers';
import NotFound from './components/Page/NotFound';
import Historic from './components/Page/Historic';
import Buddies from './components/Page/Buddies';
import Login from './components/Page/Login';
import Register from './components/Page/Register';
import ForgotPassword from './components/Page/ForgotPassword';
import ResetPassword from './components/Page/ResetPassword';
import PrivateRoute from './HOC/PrivateRoute';
import Settings from './components/Page/Settings';
import { AuthPaths } from './components/Navbar/Navbar';

// TODO: NOT FOUND DESIGN
const App: React.FC = () => (
    <AuthContextProvider>
        <GlobalStyles />
        <Router>
            <div className="App">
                <Routes>
                    <Route  path={AuthPaths.LOGIN} element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path={AuthPaths.REGISTER} element={<Register />} />
                        <Route path={AuthPaths.FORGOT} element={<ForgotPassword />} />
                        <Route path={`${AuthPaths.RESET}/:resetToken`} element={<ResetPassword />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/exercises" element={<Exercises />} />
                        <Route path="/trainers" element={<Trainers />} />
                        <Route path="/buddies" element={<Buddies />} />
                        <Route path="/historic" element={<Historic />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
         </div>
        </Router>
    </AuthContextProvider>
  );

export default App;
