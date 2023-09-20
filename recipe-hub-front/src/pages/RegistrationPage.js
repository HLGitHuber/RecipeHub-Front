import "../css/basicPage.css";
import RegistrationForm from "../components/RegistrationForm";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const RegistrationPage = () => {

    return(
        <div className='background'>
            <div className='container'>
            <Link to="/" className='home-link'>
                <HomeIcon className="home-icon" style={{ fontSize: 60, color: 'orange' }}/>
            </Link>
                <RegistrationForm/>
            </div>
        </div>
  
    )
}

export default RegistrationPage