import { useNavigate } from 'react-router-dom';

export const UseRedirect = () => {
  const history = useNavigate();

  const GoToPage = (path) => {
    history.push(path);
  }

  return GoToPage;
}
