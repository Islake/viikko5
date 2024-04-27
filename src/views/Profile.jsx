import {Link} from 'react-router-dom';
import {useUser} from '../hooks/ApiHooks';
import {useEffect} from 'react';
import { UserContext } from '../context/UserContext';

export const Profile = () => {
  const [setUser] = UserContext();
  const {getUserByToken} = useUser();

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = await getUserByToken(token);
      setUser(userData.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Tämä on minun profiilisivu</h2>

      <p>
        <Link to="/">Navigoi takaisin etusivulle</Link>
      </p>
      <div>
      <userData/>
      </div>
    </div>
  );
};
