import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import Table from "../../shared/Table";
import { Avatar, Skeleton } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { transformImage } from "../../lib/features";
import { useFetchData } from "6pp";
import { server} from "../../constants/config";
import { useErrors } from "../../hooks/hook";
// import { data } from "react-router-dom";

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
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];
const UserManagement = () => {
  

 const [users, setUsers] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const token = localStorage.getItem("token"); // Get token from storage
       const response = await fetch(`${server}/api/v1/admin/users`, {
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

       if (data && Array.isArray(data.users)) {
         setUsers(data.users);
       } else {
         console.error("Error: API response does not contain 'users' field.");
         setUsers([]); // Prevent undefined errors
       }
     } catch (err) {
       console.error("Error fetching users:", err);
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };

   fetchData();
 }, []); 


 const [rows, setRows] = useState([]);

useEffect(() => {
  
  if (users) {
    setRows(
      users.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
      }))
    );
  }
}, [users]);

  
  return (
    <AdminLayout>
      {
        loading ? (
          <Skeleton/>
        ) : (
         <Table heading={"All users"} columns={columns} rows={rows} />
        )
     }
    </AdminLayout>
  );
};

export default UserManagement;
