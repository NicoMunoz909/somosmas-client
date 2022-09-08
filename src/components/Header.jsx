import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authSlice'

// TODO: Cargar dinamicamente el logo
import logo from "../images/LOGO-SOMOS-MAS.png";

// TODO: Cargar dinámicamente los links de navegación
const NAV_LINKS = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Nosotros",
    path: "/nosotros",
  },
  {
    name: "Novedades",
    path: "/news",
  },
  {
    name: "Actividades",
    path: "/actividades",
  },
  {
    name: "Testimonios",
    path: "/testimonios",
  },
  {
    name: "Contacto",
    path: "/contacto",
  },
  {
    name: "Contribuye",
    path: "/contribuye",
  },
];

function Header() {
  const { pathname } = useLocation()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.user? state.auth.user.roleId : null)
  const dispatch = useDispatch()

  const getLinkClassName = (path) =>
    path === pathname ? "text-decoration-none text-body fw-bold" : "text-decoration-none text-body";

  return (
    <nav
      className="d-flex align-items-center justify-content-between container-fluid py-2 shadow relative"
      style={{ zIndex: "40" }}
    >
      <Link to="/" className="ps-2">
        <img src={logo} alt="ONG" height="50" />
      </Link>

      <div className="d-flex align-items-center gap-3">
        <ul className="d-flex list-unstyled m-0 gap-4">
          {NAV_LINKS.map(({ name, path }) => (
            <li key={name}>
              <Link className={getLinkClassName(path)} to={path}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="d-flex gap-2">
          {!isLoggedIn &&
          <>
            <Link
              className="d-block text-decoration-none btn btn-outline-dark rounded-pill px-3"
              to="/ingreso"
            >
              Log in
            </Link>
            <Link
              className="d-block text-decoration-none btn btn-danger text-white rounded-pill px-3"
              to="/registro"
            >
              Regístrate
            </Link>
          </>}
          {(isLoggedIn && role === 4) &&
          <>
            <Link
              className="d-block text-decoration-none btn btn-outline-dark rounded-pill px-3"
              to="/user"
            >
              Perfil
            </Link>
            <Link
              className="d-block text-decoration-none btn btn-outline-dark rounded-pill px-3"
              to="/Backoffice"
            >
              Backoffice
            </Link>
            <button
              className="d-block text-decoration-none btn btn-danger text-white rounded-pill px-3"
              onClick={() => dispatch(logout())}
            >
              Cerrar Sesion
            </button>
          </>}
          {(isLoggedIn && role === 14) &&
          <>
            <Link
              className="d-block text-decoration-none btn btn-outline-dark rounded-pill px-3"
              to="/user"
            >
              Perfil
            </Link>
            <button
              className="d-block text-decoration-none btn btn-danger text-white rounded-pill px-3"
              onClick={() => dispatch(logout())}
            >
              Cerrar Sesion
            </button>
          </>}
        </div>
      </div>
    </nav>
  );
}

export default Header;
