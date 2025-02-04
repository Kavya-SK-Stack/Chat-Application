import React from "react";
import AppLayout from "../layout/AppLayout";
import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box className="bg-slate-100 h-screen ">
      <Typography className="text-center p-8" variant="h5">
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
