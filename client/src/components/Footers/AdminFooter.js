// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  console.log(`AdminFooter called`);
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="https://www.creative-tim.com?ref=adr-admin-footer"
              rel="noopener noreferrer"
              target="_blank"
            >
              Kenneth Seet, Edmund Ng
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
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
    </footer>
  );
};

export default Footer;
