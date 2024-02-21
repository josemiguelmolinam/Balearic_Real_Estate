import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import CreateListing from './pages/CreateListing';
import Header from './components/Header';
import Footer from './components/Footer';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Category from './pages/Category';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/' element={<PrivateRoute />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='create-listing' element={<PrivateRoute />}>
            <Route path='/create-listing' element={<CreateListing />} />
          </Route>
          <Route path='edit-listing' element={<PrivateRoute />}>
            <Route path='/edit-listing/:listingId' element={<EditListing />} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/about-us' element={<AboutUs />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
}

export default App;
