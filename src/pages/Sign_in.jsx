import React from "react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
export default function Sign_in() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
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
                Don't have an account?
                <Link to="/sign-up" className="text-red-500 ml-3">
                  Register
                </Link>
              </p>
              <p className="mt-3">
                <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
              </p>
            </div>

            <input
              type="submit"
              value="Sign In"
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
