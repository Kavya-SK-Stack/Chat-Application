import {
  Button,
  Container,
  Typography,
  Avatar,
  IconButton,
  Stack,
} from '@mui/material'
import React, { useState } from 'react'
import {CameraAlt as CameraAltIcon} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { usernameValidator } from '../utils/validators';

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);


  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <Container component={"main"} className="m">
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 ">
        <div className="border-2 p-8 rounded-lg shadow-md w-full max-w-md bg-gradient-to-br from-purple-300 to-orange-400">
          {isLogin ? (
            <>
              <form onSubmit={handleSignUp}>
                <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">
                  Login
                </h2>

                {/* Username Field */}
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-[16px] font-medium text-black"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    required
                    value={username.value}
                    onChange={username.changeHandler}
                    className="mt-1 block w-full p-2 border border-orange-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your username"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-[16px] font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    value={password.value}
                    onChange={password.changeHandler}
                    className="mt-1 block w-full p-2 border border-orange-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-orange-400 to-purple-600 p-2 rounded-md hover:bg-orange-400 transition"
                >
                  Login
                </button>

                <Typography className="flex justify-center pt-5">OR</Typography>

                <button
                  type="submit"
                  className="text-purple-800 font-bold mx-40 pt-3 underline"
                  onClick={(toggleLogin) => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSignUp}>
                <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">
                  Sign Up
                </h2>

                <Stack className="relative w-40 m-auto">
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  {avatar.error && (
                    <Typography
                      m={"1rem"}
                      width={"fit-content"}
                      display={"block"}
                      color="error"
                      variant="caption"
                    >
                      {avatar.error}
                    </Typography>
                  )}

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7}",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {/*Name Field */}
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-[16px] font-medium text-black my-6"
                  ></label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name.value}
                    onChange={name.changeHandler}
                    className="mt-1 block w-full p-2 border border-orange-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Name *"
                  />
                </div>

                {/* Bio Field */}
                <div className="mb-6">
                  <label
                    htmlFor="bio"
                    className="block text-[16px] font-medium text-black"
                  ></label>
                  <input
                    type="text"
                    id="bio"
                    required
                    value={bio.value}
                    onChange={bio.changeHandler}
                    className="mt-1 block w-full p-2 border border-orange-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder=" Bio Details *"
                  />
                </div>

                {/* Username Field */}
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-[16px] font-medium text-black"
                  ></label>
                  <input
                    type="text"
                    id="username"
                    required
                    value={username.value}
                    onChange={username.changeHandler}
                    className="mt-1 block w-full p-2 border border-orange-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Username *"
                  />
                </div>

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                {/* Password Field */}
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-[16px] font-medium text-black"
                  ></label>
                  <input
                    type="password"
                    id="password"
                    required
                    value={password.value}
                    onChange={password.changeHandler}
                    className="mt-1 block w-full p-2 border border-orange-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Password *"
                  />
                </div>

                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-orange-400 to-purple-600 p-2 rounded-md hover:bg-orange-400 transition"
                >
                  Sign Up
                </button>

                <Typography className="flex justify-center pt-5">OR</Typography>

                <button
                  type="submit"
                  className="text-purple-800 font-bold mx-[10.5rem] pt-3 underline"
                  onClick={(toggleLogin) => setIsLogin(false)}
                >
                  Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </Container>
  );

};

export default Login

