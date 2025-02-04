import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import Table from "../../shared/Table";
import { Avatar, Box } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { fileFormat, transformImage } from "../../lib/features";
import { Stack } from "@mui/material";
import AvatarCard from "../../shared/AvatarCard";
import moment from "moment";
import RenderAttachment  from "../../shared/RenderAttachment";
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
  const [rows, setRows] = useState([]);
// not working this
  useEffect(() => {
    setRows(
      dashboardData.messages.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },

        createdAt: moment(i.createdAt).format("MMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, []);
  return (
    <AdminLayout>
     <Table heading={"All Messages"} columns={columns} rows={rows}  rowHeight={150} ></Table>
    </AdminLayout>
  );
};

export default MessageManagement;
