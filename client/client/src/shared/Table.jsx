import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container,Paper, Typography } from "@mui/material";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
    return (
      <Container sx={{ height: "100vh", width:"80vw"}}>
        <Paper
          elevation={3}
                className="py-4 px-16 m-auto overflow-hidden h-full  shadow-none rounded-2xl"
                
        >
          <Typography variant="h3" className="text-center p-8 uppercase">
            {heading}
          </Typography>
          <DataGrid
            variant="h4"
            sx={{
              border: "none",
              ".table-header": {
                bgcolor: "black",
                color: "white",
              },
            }}
            rows={rows}
            columns={columns}
            rowHeight={rowHeight}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // autoHeight
            style={{ height: "500px" }}
            // style={{ height: "80%" }}
          />
        </Paper>
      </Container>
    );
};

export default Table;
