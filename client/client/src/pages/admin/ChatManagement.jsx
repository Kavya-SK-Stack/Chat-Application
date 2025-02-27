import AdminLayout from "../../layout/AdminLayout";
import React, { useEffect, useState } from "react";
import Table from "../../shared/Table";
import { Avatar, Typography , Grid2 as Grid, Skeleton} from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { transformImage } from "../../lib/features";
import { Stack } from "@mui/material";
import AvatarCard from "../../shared/AvatarCard";
import { server } from "../../constants/config";


const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard src={params.row.avatar} />,
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },

  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item>
          <Avatar
            src={params.row.creator.avatar && params.row.creator.avatar[0]}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1">{params.row.creator.name} </Typography>
        </Grid>
      </Grid>
    ),
  },
];
const ChatManagement = () => {

  const [chats, setChats] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
  
   useEffect(() => {
     const fetchData = async () => {
       try {
         const token = localStorage.getItem("token"); 
         const response = await fetch(`${server}/api/v1/admin/chats`, {
           method: "GET",
           credentials: "include",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`, 
           },
         });
  
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
  
         const data = await response.json();
         console.log("Parsed API data:", data);
  
         if (data && Array.isArray(data.chats)) {
           setChats(data.chats);
         } else {
           console.error("Error: API response does not contain 'chats' field.");
           setChats([]); 
         }
       } catch (err) {
         console.error("Error fetching chats:", err);
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
  
     fetchData();
   }, []); 
  
  
  const [rows, setRows] = useState([]);

  useEffect(() => {
      
    if (chats) {
      setRows(
        chats.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
          members: i.members.map((i) => transformImage(i.avatar, 50)),
          creator: {
            name: i.creator.name,
            avatar: transformImage(i.creator.avatar, 50),
          },
        }))
      );
   }
    }, [chats]);
  
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <Table heading={"All Chats"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
