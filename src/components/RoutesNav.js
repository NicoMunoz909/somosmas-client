import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home/index.jsx";
import NewsBackOffice from "../pages/NewsBackOffice";
import NewsForm from "../pages/NewsBackOffice/NewsForm";
import OrganizacionBackoffice from "../pages/OrganizacionBackOffice";
import Backoffice from "./Backoffice";
import Login from "../pages/Login";
import RegisterForm from "./RegisterForm";
import Profile from "../pages/Profile";
import Contacto from "../pages/Contacto";
import News from "../components/News";
import NewsById from "../components/News/NewsById/index";
import Contacts from "../pages/Contacts/Contacts.jsx";
import Testimonials from "./Testimonials";
import ProtectedRoute from "./ProtectedRoute";
import Members from "../pages/Members/Members";
import CategoriesBackOffice from "../pages/CategoriesBackOffice";
import CategoriesForm from "../pages/CategoriesBackOffice/CategoriesForm";
import ActivitiesBackOffice from "../pages/ActivitiesBackOffice";
import ActivitiesForm from "../pages/ActivitiesBackOffice/ActivitiesForm";
import TestimonialsBackOffice from "../pages/TestimonialsBackOffice";
import TestimonialsForm from "../pages/TestimonialsBackOffice/TestimonialsForm";
import Activities from "./Activities/index.jsx";
import ActivityById from "./Activities/ActivityById/index.jsx";
import Contribute from "./Contribute/index.jsx";
import ABMSlide from "../pages/backofficeSlide/ABMSlide.jsx";
import EditSlide from "../pages/backofficeSlide/EditSlide.jsx";
import CreateTestimonio from "./Testimonials/CreateTestimonio.jsx";
import ABMMembers from "../pages/MembersBackoffice/ABMMembers.jsx";
import MembersForm from "../pages/MembersBackoffice/MembersForm.jsx";
import ABMUsers from "../pages/UsersBackoffice/index.jsx";
import UsersForm from "../pages/UsersBackoffice/UsersForm.jsx";
import CreateUser from "../pages/UsersBackoffice/CreateUser.jsx";

import Organization from '../pages/OrganizacionBackOffice/OrganizacionABM'
import OrganizationEdit from '../pages/OrganizacionBackOffice'

import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./transitions.css";

const RoutesNav = () => {
  const { key } = useLocation();
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={key} classNames="dialog" timeout={1000}>
        <div className="min-vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/backoffice" element={<ProtectedRoute role={4} />}>
              <Route path="" element={<Backoffice />} />
              <Route path="slides" element={<ABMSlide />} />
              <Route path="slides/edit/:id" element={<EditSlide/>} />
              <Route path="Organizacion" element={<Organization/>} />
              <Route path="Organizacion/edit/:id" element={<OrganizationEdit/>} />
              <Route path="miembros" element={<ABMMembers/>} />
              <Route path="miembros/edit/:id" element={<MembersForm/>} />
              <Route path="miembros/create/new" element={<MembersForm/>} />
              <Route path="categories" element={<CategoriesBackOffice />} />
              <Route path="categories/edit/:id" element={<CategoriesForm />} />
              <Route path="categories/edit/" element={<CategoriesForm />} />
              <Route path="activities" element={<ActivitiesBackOffice />} />
              <Route path="activities/edit/:id" element={<ActivitiesForm />} />
              <Route path="activities/edit/" element={<ActivitiesForm />} />
              <Route path="edit-organization" element={<OrganizacionBackoffice />} />
              <Route path="news" element={<NewsBackOffice />} />
              <Route path="news/edit/:id" element={<NewsForm />} />
              <Route path="news/create/new" element={<NewsForm />} />
              <Route path="testimonials" element={<TestimonialsBackOffice />} />
              <Route path="testimonials/edit/:id" element={<TestimonialsForm />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="usuarios" element={<ABMUsers />} />
              <Route path="usuarios/edit/:id" element={<UsersForm />} />
              <Route path="usuarios/create/new" element={<CreateUser />} />
            </Route>
            <Route path="/user" element={<ProtectedRoute logged={true} />}>
              <Route path="" element={<Profile />} />
            </Route>
            <Route path="ingreso" element={<Login />} />
            <Route path="registro" element={<RegisterForm />} />
            <Route path="nosotros" element={<Members />} />
            <Route path="testimonios" element={<Testimonials />} />
            <Route path="testimonios/add" element={<CreateTestimonio />} />
            <Route path="contribuye" element={<Contribute />} />
            <Route path="actividades" element={<Activities />} />
            <Route path="actividades/:id" element={<ActivityById />} />
            {/* <Route path="novedades" element={<Novedades />} /> */}
            <Route path="contacto" element={<Contacto />} />
            {/* <Route path="contacto" element={<Contacto />} /> */}
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsById />} />
            <Route path="*" element={<h2>Esta pagina aun no fue creada</h2>} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default RoutesNav;
