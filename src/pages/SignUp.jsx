import React from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredentials.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      console.log(user);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="pt-10 flex flex-wrap justify-center items-center lg:gap-10">
        <div>
          <img
            src="https://www.mswipe.com/assets/images/signin_marchant_mswipe_Illustrations.svg"
            alt="sign in"
            className="w-96"
          />
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Full name"
              id="name"
              onChange={onChange}
              className="block w-96 border-2 border-gray-300 rounded-md p-2 mt-4"
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={onChange}
              className="block w-96 border-2 border-gray-300 rounded-md p-2 mt-4"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
                className="block w-96 border-2 border-gray-300 rounded-md p-2 mt-4"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex items-center justify-around flex-col">
              <p className="mt-3">
                have an account?
                <Link to="/sign-in" className="text-red-500 ml-2">
                  Sign In
                </Link>
              </p>
              <p className="mt-3">
                <Link to="/forgot-password" className="text-blue-500">
                  Forgot Password?
                </Link>
              </p>
            </div>

            <input
              type="submit"
              value="Sign Up"
              className="block w-96 bg-blue-500 active:bg-blue-800 shadow-md hover:shadow-lg transition duration-150 hover:bg-blue-600 text-white p-2 mt-4 rounded-md cursor-pointer"
            />
            <div className="my-3 before:border-t after:border-t flex after:border-gray-300 after:flex-1 before:flex-1 items-center before:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
