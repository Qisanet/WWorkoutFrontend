
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const PrivateRoute = ({ children }) => {

    const {user} = useContext(AuthContext);

  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;