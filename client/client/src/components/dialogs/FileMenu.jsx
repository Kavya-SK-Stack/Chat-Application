import React from 'react'
import { Menu } from '@mui/material';

const FileMenu = ({ anchorEl }) => {
  return (
    <Menu anchorEl={anchorEl} open={false}>
  
      <div className="w-40">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequuntur cupiditate doloremque aperiam tempora. Deleniti suscipit fugit harum deserunt sequi itaque id recusandae, quaerat iusto temporibus repellat eligendi earum asperiores!
      </div>
    </Menu>
  );
};

export default FileMenu