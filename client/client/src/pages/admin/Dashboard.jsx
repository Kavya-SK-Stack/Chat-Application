import React, { useEffect, useState } from "react";
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
  Person as PersonIcon,
  Group as GroupIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import moment from "moment";
import { CurveButton, SearchField } from "../../components/StyledComponents";
import { LineChart } from "../../specific/Charts";
import { Doughnut } from "react-chartjs-2";
import { DoughnutChart } from "../../specific/Charts";
import { server } from "../../constants/config";
import { LayoutLoader } from "../../layout/Loaders";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from storage
        const response = await fetch(`${server}/api/v1/admin/stats`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Parsed API data:", data);

        if (data && data.stats) {
          setStats(data.stats);
        } else {
          console.error("Error: API response does not contain 'stats' field.");
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

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
      className="flex gap-12 justify-between  "
      direction={{
        xs: "column",
        sm: "row",
      }}
      alignItems={"center"}
    >
      <Widget
        title={"Users"}
        value={stats ? stats.userCount : "Fetching..."}
        Icon={<PersonIcon />}
      />
      <Widget
        title={"Chats"}
        value={stats ? stats.groupsCount : "Fetching..."}
        Icon={<GroupIcon />}
      />
      <Widget
        title={"Messages"}
        value={stats ? stats.messageCount : "Fetching..."}
        Icon={<MessageIcon />}
      />
    </Stack>
  );

  return loading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <Container component={"main"} className="bg-gray-100">
        {Appbar}

        <div className="flex gap-8 lg:justify-stretch lg:flex-row flex-col items-center lg:items-stretch">
          <Paper
            className="px-14 py-8 w-full "
            sx={{ borderRadius: "1rem" }}
            elevation={3}
          >
            <Typography variant="h4" margin={"1rem 0"}>
              Last Messages
            </Typography>
            <LineChart value={stats?.messagesChart || []} />
          </Paper>

          <Paper
            className="p-4 rounded-4xl w-full max-w-[20rem] h-auto flex justify-center items-center relative"
            elevation={3}
          >
            <div className="w-full flex justify-center items-center">
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[
                  (stats?.totalChatscount ?? 0) - (stats?.groupsChats ?? 0),
                  stats?.groupsChats ?? 0,
                ]}
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
    className="p-8 my-8 mx-0 "
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
