import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <Link to={'/search'}>
        <Button variant="contained" href="#contained-buttons">
          Search ingredients
        </Button>
      </Link>
    </div>
  );
}

export default Homepage;