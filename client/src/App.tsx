import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import About from './Page/About';
import Exercises from './Page/Exercises';
import Trainers from './Page/Trainers';
import NotFound from './Page/NotFound';
import Login from './Page/Login';
import { AuthContextProvider } from './Providers/AuthContext';
import { Register } from './Page/Register';
import { AuthLayout } from './layout/AuthLayout';

// TODO: add reset
// TODO persist routes

const App: React.FC = () => (
    <AuthContextProvider>
        <Router>
            <div className="App">
                <Routes>
                    <Route  path="/" element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
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
