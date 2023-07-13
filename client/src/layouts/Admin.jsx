import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

import routes from "../routes.js";

import img from "../assets/img/brand/ravenus_header_admin.png";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  // // console.log(getRoutes(routes));
  // // let renderedRoutes = getRoutes(routes);
  // // while (renderedRoutes.length > 6) {
  // //   renderedRoutes.push();
  // // }
  // // console.log(renderedRoutes)
  // const renderedRoutes = routes;
  // while (renderedRoutes.length > 6) {
  //    renderedRoutes.pop();
  // }
  // console.log(renderedRoutes);
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: img,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Routes>
          
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
