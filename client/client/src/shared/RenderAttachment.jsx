import { FileOpen as FileOpenIcon } from '@mui/icons-material';
import { transformImage } from "../lib/features";
import React from 'react'

const RenderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

      break;

    case "image":
       return (
         <img
           src={transformImage(url, 200)}
           alt="Attachment"
           className="w-[200px] h-[150px]
      object-contain"
         />
       );

     

    case "audio":
      return <audio src={url} preload="none" controls />;
    
    default:
       return <FileOpenIcon />;
  }
}

export default RenderAttachment