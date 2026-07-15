import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MissingReport from './pages/MissingReport';
import FoundReport from './pages/FoundReport';
import CaseStatus from './pages/CaseStatus';
import ModeratorDashboard from './pages/ModeratorDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/missing-report" element={<MissingReport />} />
        <Route path="/found-report" element={<FoundReport />} />
        <Route path="/case-status" element={<CaseStatus />} />
        <Route path="/case-status/:id" element={<CaseStatus />} />
        <Route path="/moderator" element={<ModeratorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Landing />} />
      </Route>
    </Routes>
  );
}
