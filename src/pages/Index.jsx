import React, { useState, useEffect } from "react";
import { Box, Heading, VStack, Text, Flex, Spacer, IconButton } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const videoUrls = [
  "https://example.com/video1.mpr",
  "https://example.com/video2.mpr",
  "https://example.com/video3.mpr",
  // Add more video URLs as needed
];

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        goToPreviousVideo();
      } else if (event.key === "ArrowRight") {
        goToNextVideo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const goToPreviousVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videoUrls.length - 1 : prevIndex - 1));
  };

  const goToNextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videoUrls.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Video Player
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Use the arrow keys to navigate through the videos
        </Text>
        <Box as="video" src={videoUrls[currentIndex]} controls width="100%" height="auto" />
        <Flex>
          <IconButton icon={<FaArrowLeft />} aria-label="Previous Video" onClick={goToPreviousVideo} />
          <Spacer />
          <IconButton icon={<FaArrowRight />} aria-label="Next Video" onClick={goToNextVideo} />
        </Flex>
      </VStack>
    </Box>
  );
};

export default Index;
