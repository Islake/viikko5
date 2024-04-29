import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Layout from './views/Layout';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Login from './views/Login';
import {UserProvider} from './contexts/UserContext';
import Logout from './views/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import Modify from './views/Modify';

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route path="/media/:id" element={<Single />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/modify/:id" element={
              <ProtectedRoute>
              <Modify />
              </ProtectedRoute>
            }
            />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
