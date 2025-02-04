import React from "react";
import AdminLayout from "../../layout/AdminLayout";

import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Box,

} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon, Group as GroupIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import moment from "moment";
import { CurveButton, SearchField } from "../../components/StyledComponents";
import { LineChart } from "../../specific/Charts";
import { Doughnut } from "react-chartjs-2";
import { DoughnutChart } from "../../specific/Charts";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      className="p-8 "
      sx={{ margin: "2rem 0", borderRadius: "1rem" }}
    >
      <div className="flex flex-row items-center gap-4">
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />

        <SearchField />

        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />

        <Typography className="hidden md:block text-center">
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>

        <NotificationsIcon />
      </div>
    </Paper>
  );

  const Widgets = (
    <Stack
    className="flex gap-12 justify-between mt-24 " 
      direction={{
      xs: "column",
      sm: "row",
      }}
      alignItems={"center"}

    >
      <Widget title={"Users"} value={34} Icon={<PersonIcon />} />
      <Widget title={"Chats"} value={3} Icon={<GroupIcon/> } />
      <Widget title={"Messages"} value={453} Icon={<MessageIcon />} />
   </Stack>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <div className="flex flex-wrap justify-center lg:justify-stretch gap-8 lg:flex-row flex-col items-center lg:items-stretch">
          <Paper
            className="px-14 py-8 w-full max-w-[45rem]"
            sx={{ borderRadius: "1rem" }}
            elevation={3}
          >
            <Typography variant="h4" margin={"1rem 0"}>
              Last Messages
            </Typography>
            <LineChart value={[23, 56, 33, 67, 33, 1]} />
          </Paper>

          <Paper
            className="p-4 rounded-2xl w-full max-w-[20rem] h-auto flex justify-center items-center relative"
            elevation={3}
          >
            <div className="w-full h-60 sm:h-80 flex justify-center items-center">
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[23, 66]}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className="absolute justify-center items-center gap-2 w-full h-full flex flex-col sm:flex-row">
              <GroupIcon className=" absolute items-center flex justify-center mr-12 " />
              <Typography className="absolute items-center flex justify-center">
                Vs
              </Typography>

              <PersonIcon className="absolute items-center flex justify-center ml-12 " />
            </div>
          </Paper>
        </div>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={5}
    className="p-8 w-[19rem] my-8 mx-0 "
    sx={{ borderRadius: "1.5rem" }}
  >
    <Stack className="items-center " spacing={"1rem"}>
      <Typography
        className="w-20 h-20 flex items-center justify-center "
        sx={{
          color: "rgba(0, 0, 0, 0.7)",
          borderRadius: "50% ",
          border: `5px solid rgba(0, 0, 0, 0.9)`,
        }}
      >
        {value}
      </Typography>

      <div className="flex flex-row items-center gap-4">
        {Icon}
        <Typography>{title}</Typography>
      </div>
    </Stack>
  </Paper>
);

export default Dashboard;
