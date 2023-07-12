// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                  target="_blank"
                >
                  Kenneth Seet, Edmund Ng
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-start">
                <NavItem>
                  <NavLink
                    className="justify-content-center"
                    href="https://docs.google.com/document/d/19blLvT9Qm1wjgwXpkjagxnkMIjLazTdj-sTa8llWuuc/edit?usp=sharing"
                    target="_blank"
                  >
                    Documentation
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="justify-content-center"
                    href="https://github.com/edmundnwl/RaveNUS"
                    target="_blank"
                  >
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
