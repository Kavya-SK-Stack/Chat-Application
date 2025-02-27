import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import Table from "../../shared/Table";
import { Avatar, Box, Skeleton } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { fileFormat, transformImage } from "../../lib/features";
import { Stack } from "@mui/material";
import AvatarCard from "../../shared/AvatarCard";
import moment from "moment";
import RenderAttachment  from "../../shared/RenderAttachment";
import { server } from "../../constants/config";
// import { messages} from "../../constants/sampleData";
// import { sampleMessage } from "../../constants/sampleData";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {


      const { attachments } = params.row;

      return attachments?.length > 0 ? attachments.map((i) => {

        const url = i.url;
        const file = fileFormat(url);

        return (
          <Box>
            <a
              href={url}
              download
              target="_blank"
              style={{
                color: "black",
              }}
            >
              {RenderAttachment(file, url)}
            </a>
          </Box>
        );

      })

        : "No Attachments";
    },
  },

  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <div className="flex flex-row gap-4 items-center">
        <Avatar alt={params.row.sender.name} src={params.row.sender.name} />
        <span>{params.row.sender.name}</span>
      </div>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Groups Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagement = () => {

   const [messages, setMessages] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
  
   useEffect(() => {
     const fetchData = async () => {
       try {
         const token = localStorage.getItem("token"); 
         const response = await fetch(`${server}/api/v1/admin/messages`, {
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
  
         if (data && Array.isArray(data.messages)) {
           setMessages(data.messages);
         } else {
           console.error("Error: API response does not contain 'users' field.");
           setMessages([]); // Prevent undefined errors
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
   if(messages){
      setRows(
        messages.map((i) => ({
          ...i,
          id: i._id,
          sender: i.sender
            ? {
                name: i.sender.name,
                avatar: transformImage(i.sender.avatar, 50),
              }
            : { name: "Unknown", avatar: "" },

          createdAt: moment(i.createdAt).format("MMM Do YYYY, h:mm:ss a"),
        }))
      );
   }
  }, [messages]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={150}
        ></Table>
      )}
    </AdminLayout>
  );
};

export default MessageManagement;
