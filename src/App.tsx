import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { StoreProvider } from './store/StoreProvider';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Shifts from './pages/Shifts';
import Leave from './pages/Leave';
import Overtime from './pages/Overtime';
import Payroll from './pages/Payroll';
import Recruitment from './pages/Recruitment';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Discipline from './pages/Discipline';
import Contracts from './pages/Contracts';
import Resign from './pages/Resign';

function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="shifts" element={<Shifts />} />
              <Route path="leave" element={<Leave />} />
              <Route path="overtime" element={<Overtime />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="recruitment" element={<Recruitment />} />
              <Route path="performance" element={<Performance />} />
              <Route path="training" element={<Training />} />
              <Route path="discipline" element={<Discipline />} />
              <Route path="contracts" element={<Contracts />} />
              <Route path="resign" element={<Resign />} />
            </Route>
          </Routes>
        </HashRouter>
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;
