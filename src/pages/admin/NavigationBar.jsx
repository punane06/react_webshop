import { Navbar, Container, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ReactComponent as Logo } from "../../assets/WebShop.svg";
import { Link } from "react-router-dom";

function NavigationBar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Logo />
          {/* <img src={require("./assets/WebShop.png")} alt="" /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">
              {t("navbar.admin-button")}
            </Nav.Link>
            <Nav.Link as={Link} to="/poed">
              {t("navbar.shops-button")}
            </Nav.Link>
            <Nav.Link as={Link} to="/ostukorv">
              {t("navbar.cart-button")}
            </Nav.Link>
            <Nav.Link as={Link} to="/meist">
              Meist
            </Nav.Link>
            <img
              className="lang"
              onClick={() => changeLanguage("ee")}
              src={require("../../assets/estonia.png")}
              alt=""
            />
            <img
              className="lang"
              onClick={() => changeLanguage("ru")}
              src={require("../../assets/russia.png")}
              alt=""
            />
            <img
              className="lang"
              onClick={() => changeLanguage("uk")}
              src={require("../../assets/uk.png")}
              alt=""
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
