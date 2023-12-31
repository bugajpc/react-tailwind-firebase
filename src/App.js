import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Sign_in from "./pages/Sign_in";
import SignUp from "./pages/SignUp";
import EditListing from "./pages/EditListing";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateListing from "./pages/CreateListing";
import Category from "./pages/Category";
function App() {
  return (
    <div>
      <>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category/:listingId" element={<Listing />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/offers" element={<Offers />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/sign-in" element={<Sign_in />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="edit-listing" element={<PrivateRoute />}>
              <Route path="/edit-listing/:listingId" element={<EditListing />} />
            </Route>
            <Route path="create-listing" element={<PrivateRoute />}>
              <Route path="/create-listing" element={<CreateListing />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </>
    </div>
  );
}

export default App;
