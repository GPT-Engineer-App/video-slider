import React, { useRef, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";

const VideoThumbnail = ({ url }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const loadThumbnail = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      video.removeEventListener("loadedmetadata", loadThumbnail);
    };

    video.addEventListener("loadedmetadata", loadThumbnail);
    video.src = url;

    return () => {
      video.removeEventListener("loadedmetadata", loadThumbnail);
    };
  }, [url]);

  return (
    <Box position="relative">
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <Image src={canvasRef.current?.toDataURL()} alt="Video Thumbnail" />
    </Box>
  );
};

export default VideoThumbnail;
