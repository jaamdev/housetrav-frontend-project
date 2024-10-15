import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '#Components/ProtectedRoute.jsx';
import Header from '#Components/Header.jsx';
import Display from '#Components/Display.jsx';
import Home from '#Pages/Home.jsx';
import Login from '#Pages/Login.jsx';
import Logout from '#Pages/Logout.jsx';
import Register from '#Pages/Register.jsx';
import Mod from '#Pages/Mod.jsx';
import Profile from '#Pages/Profile.jsx';
import NewProperty from '#Pages/NewProperty.jsx';
import EditProperty from '#Pages/EditProperty.jsx';
import PropertyDetails from '#Pages/PropertyDetails.jsx';
import Page404 from '#Pages/Page404.jsx';

export default function App() {
  return (
    <>
      <Header />
      <Display />

      <Routes>
        <Route index Component={Home} />
        <Route path="/properties/:id" Component={PropertyDetails} />
        <Route path="/signin" Component={Login} />
        <Route path="/signup" Component={Register} />
        <Route path="*" Component={Page404} />

        <Route Component={ProtectedRoute}>
          <Route path="/moderator" Component={Mod} />
          <Route path="/profile" Component={Profile} />
          <Route path="/profile/properties/new" Component={NewProperty} />
          <Route path="/profile/properties/edit/:id" Component={EditProperty} />
          <Route path="/logout" Component={Logout} />
        </Route>
      </Routes>
    </>
  );
}
