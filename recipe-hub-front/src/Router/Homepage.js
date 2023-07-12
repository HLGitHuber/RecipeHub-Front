import { Link } from "react-router-dom";
import "../css/homePage.css";
import CookieIcon from '@mui/icons-material/Cookie';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { orange } from "@mui/material/colors";
import { Button } from '@mui/material';



function Homepage() {
  return (
    <div className='background'>
      <div className='container'>
        <Link to={'/login'}>
          <Button variant="contained" sx={{ backgroundColor: orange[500], fontSize: 15}}>Login</Button>
        </Link>

        <h1 className="heading">Homepage</h1>
        <h3 className="text">With us you're gonna find your dream meal Choose meal type</h3>

        <table>
          <th><td>Snack - less than 250 kcal</td><td>Normal meal - more than 250 kcal</td></th>
          <tr><td><Link to={'/search'}>
              <CookieIcon sx={{ color: orange[500], fontSize: 80}}></CookieIcon>
            </Link></td>
            <td><Link to={'/search'}>
              <DinnerDiningIcon sx={{ color: orange[500], fontSize: 80}}></DinnerDiningIcon>
            </Link></td></tr>
        </table>
      </div>
  </div>
  );
}

export default Homepage;