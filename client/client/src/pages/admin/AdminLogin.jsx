import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();
   dispatch(adminLogin(secretKey.value));
  };

  useEffect(() => { 
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <Container component={"main"} className="m">
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 ">
        <div className="border-2 p-8 rounded-lg shadow-md w-full max-w-md bg-gradient-to-br from-purple-300 to-orange-400">
          <form onSubmit={submitHandler}>
            <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">
              Admin Login
            </h2>

            {/* Username Field */}

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="Secret Key"
                className="block text-[16px] font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={secretKey.value}
                onChange={secretKey.changeHandler}
                className="mt-1 block w-full p-2 border border-orange-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Secret Key"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-orange-400 to-purple-600 p-2 rounded-md hover:bg-orange-400 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default AdminLogin;
