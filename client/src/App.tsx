import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import About from './Page/About';
import Exercises from './Page/Exercises';
import Trainers from './Page/Trainers';
import NotFound from './Page/NotFound';

import { AuthContextProvider } from './Providers/AuthContext';
import { AuthLayout } from './layout/AuthLayout';
import Login from './Page/Login';
import Register from './Page/Register';
import ForgotPassword from './Page/ForgotPassword';
import ResetPassword from './Page/ResetPassword';

// TODO: add css reset
// TODO: consider /auth path

const App: React.FC = () => (
    <AuthContextProvider>
        <Router>
            <div className="App">
                <Routes>
                    <Route  path="/" element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgotpassword" element={<ForgotPassword />} />
                        <Route path="passwordreset/:resetToken" element={<ResetPassword />} />
                    </Route>
                  <Route path="/exercises" element={<Exercises />} />
                  <Route path="/trainers" element={<Trainers />} />
                  <Route path="/about" element={<About />} />
                   <Route element = {<NotFound/>}/>
                </Routes>
         </div>
        </Router>
    </AuthContextProvider>
  );

export default App;
