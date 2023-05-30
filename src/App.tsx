import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthContextProvider } from './Providers/AuthContext';
import { AuthLayout } from './layout/AuthLayout';
import { GlobalStyles } from './Providers/GlobalStyles.css';
import Dashboard from './components/Page/Common/Dashboard';
import Exercises from './components/Page/Common/Exercises';
import NotFound from './components/Page/NotFound';
import Historic from './components/Page/Client/Historic';
import Buddies from './components/Page/Client/Buddies';
import Login from './components/Page/Auth/Login';
import Register from './components/Page/Auth/Register';
import ForgotPassword from './components/Page/Auth/ForgotPassword';
import ResetPassword from './components/Page/Auth/ResetPassword';
import PrivateRoute from './HOC/PrivateRoute';
import Settings from './components/Page/Settings';
import AdminDashboard from './components/Page/Admin/AdminDashboard';
import TrainerDashboard from './components/Page/Trainers/TrainerDashboard';
// import InviteTrainer from './components/Page/Trainers/InviteTrainer';
import AdminUsers from './components/Page/Admin/AdminUsers';
import Landing from './components/Page/Landing';
import TrainerSessions from './components/Page/Trainers/TrainerSessions';
import { ExercisesProvider } from './Providers/ExercisesContext';
import TrainerBuddies from './components/Page/Trainers/TrainerBuddies';
import NextAppointments from './components/Appointments/NextAppointments';
import CreateSession from './components/Page/Trainers/CreateSession';
import {
  AuthPaths, ConnectionPaths, FeaturePaths, UserPaths,
} from './helpers/fnPaths';
import { UserType } from './components/types/User';
import theme from './theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <AuthContextProvider>
      <ExercisesProvider>

        <GlobalStyles />
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path={AuthPaths.AUTH} element={<AuthLayout />}>
                <Route index element={<Login userType={UserType.CLIENT} />} />
                <Route path={UserPaths.TRAINER} element={<Login userType={UserType.TRAINER} />} />
                <Route path={UserPaths.ADMIN} element={<Login userType={UserType.ADMIN} />} />
                <Route path={`${AuthPaths.REGISTER}`} element={<Register userType={UserType.CLIENT} />} />
                <Route path={`${UserPaths.TRAINER}/${AuthPaths.REGISTER}`} element={<Register userType={UserType.TRAINER} />} />
                <Route path={`${AuthPaths.FORGOT}`} element={<ForgotPassword userType={UserType.CLIENT} />} />
                <Route path={`${UserPaths.TRAINER}/${AuthPaths.FORGOT}`} element={<ForgotPassword userType={UserType.TRAINER} />} />
                <Route path={`${AuthPaths.RESET}/:resetToken`} element={<ResetPassword />} />
              </Route>
              {/* <Route path={AuthPaths.INVITE_TRAINER} element={<InviteTrainer />} /> */}
              <Route path="/client" element={<PrivateRoute userType="client" />}>
                <Route path={FeaturePaths.DASHBOARD} element={<Dashboard />} />
                <Route path={FeaturePaths.EXERCISES} element={<Exercises />} />
                <Route path={ConnectionPaths.BUDDIES} element={<Buddies />} />
                <Route path={ConnectionPaths.TRAINERS} element={<Buddies />} />
                <Route path={FeaturePaths.HISTORIC} element={<Historic />} />
                <Route path={FeaturePaths.SETTINGS} element={<Settings />} />
              </Route>
              <Route path="/trainer" element={<PrivateRoute userType="trainer" />}>
                <Route path={FeaturePaths.DASHBOARD} element={<TrainerDashboard />} />
                <Route path={ConnectionPaths.CLIENTS} element={<TrainerBuddies />} />
                <Route path={FeaturePaths.EXERCISES} element={<Exercises />} />
                <Route path={FeaturePaths.SESSIONS} element={<TrainerSessions />} />
                <Route path={`${FeaturePaths.SESSIONS}/${FeaturePaths.NEW_SESSION}`} element={<CreateSession />} />
                <Route path={FeaturePaths.APPOINTMENTS} element={<NextAppointments />} />
                {/* <Route path="/trainer-settings" element={<TrainerSettings />} /> */}
              </Route>
              <Route path="/admin" element={<PrivateRoute userType="admin" />}>
                <Route path={FeaturePaths.DASHBOARD} element={<AdminDashboard />} />
                <Route path={ConnectionPaths.TRAINERS} element={<AdminUsers userType={UserType.TRAINER} />} />
                <Route path={ConnectionPaths.CLIENTS} element={<AdminUsers userType={UserType.CLIENT} />} />
                {/* <Route path="/admin-settings" element={<AdminSettings />} /> */}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>

      </ExercisesProvider>
    </AuthContextProvider>
  </ThemeProvider>
);

export default App;
