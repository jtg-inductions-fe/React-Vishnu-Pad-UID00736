import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';

// Dummy components for now...i will update after implementation
const Home = () => <div>Public Restaurant List</div>;
const Login = () => <div>Login Page</div>;
const Dashboard = () => <div>Protected Dashboard Area</div>;

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
