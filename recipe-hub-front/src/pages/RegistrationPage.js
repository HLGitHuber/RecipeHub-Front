import "../css/basicPage.css";
import RegistrationForm from "../components/RegistrationForm";
import { Link } from '@mui/material';

const RegistrationPage = () => {

    return(
        <div className='background'>
            <div className='container'>
                <RegistrationForm/>

            </div>
        </div>
  
    )
}

export default RegistrationPage