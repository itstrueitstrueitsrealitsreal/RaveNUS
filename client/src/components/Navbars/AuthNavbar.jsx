import { Link } from "react-router-dom";
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

const AuthNavbar = () => {
  console.log(`AuthNavbar called`);
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark bg-default" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={require("../../components/img/ravenus_header_auth.png")}
            />
          </NavbarBrand>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
