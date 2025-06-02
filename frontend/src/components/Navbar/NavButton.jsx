import { Link } from 'react-router-dom';

import { StyledButton } from './styles';

const NavButton = ({ to, onClick, icon, text }) => (
  <StyledButton
    component={to ? Link : 'button'}
    to={to}
    onClick={onClick}
    startIcon={icon}
  >
    {text}
  </StyledButton>
);

export default NavButton;
