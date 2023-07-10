import React from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  function onChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
    } catch (error) {
      toast.error("Could not send reset password")
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
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
            
            <div className="flex items-center justify-around flex-col">
              <p className="mt-3">
                Don't have an account?
                <Link to="/sign-up" className="text-red-500 ml-2">
                  Register
                </Link>
              </p>
              <p className="mt-3">
                <Link to="/sign-in" className="text-blue-500">Sign in instead</Link>
              </p>
            </div>

            <input
              type="submit"
              value="Send reset password"
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

