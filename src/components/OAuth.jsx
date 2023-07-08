import React from "react";
import {FcGoogle} from "react-icons/fc";
export default function OAuth() {
  return (
    <button className="flex gap-2 items-center justify-center w-full bg-red-500 active:bg-red-800 shadow-md hover:shadow-lg transition duration-150 hover:bg-red-600 text-white p-2 mt-4 rounded-md cursor-pointer">
      <FcGoogle className="text-2xl bg-white rounded-full"/>
      Continue with Google
    </button>
  );
}
