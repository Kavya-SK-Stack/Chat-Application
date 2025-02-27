import { Typography, Box } from "@mui/material";
import React, { memo } from "react";
import moment from "moment";
import { fileFormat } from "../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from 'framer-motion'

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      className={`${
        sameSender ? "self-end" : "self-start"
      } bg-gradient-to-br from-purple-600 to-orange-500 text-white p-2 rounded-md w-fit`}
    >
      {!sameSender && (
        <Typography color={"orange"} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments?.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a href={url} target="_blank" download className="text-black">
                
                
                      {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

export default memo(MessageComponent);
