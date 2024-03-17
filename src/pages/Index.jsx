import React, { useState } from "react";
import { Box, Heading, VStack, Text, Flex, IconButton, Textarea, Button } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const VIDEOS_PER_PAGE = 50;

const Index = () => {
  const [videoUrls, setVideoUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePasteVideos = (event) => {
    const pastedUrls = event.target.value.split("\n").filter((url) => url.trim() !== "");
    setVideoUrls(pastedUrls);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(videoUrls.length / VIDEOS_PER_PAGE);
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
  const endIndex = startIndex + VIDEOS_PER_PAGE;
  const currentVideos = videoUrls.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Video Player
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Paste your video URLs below (one per line)
        </Text>
        <Textarea placeholder="Paste video URLs here..." rows={10} onChange={handlePasteVideos} />
        <Flex flexWrap="wrap" justifyContent="center" gap={4}>
          {currentVideos.map((url, index) => (
            <Box key={index}>
              <img src={`${url}#t=0.5`} alt={`Video ${index + 1}`} width="300px" height="169px" />
            </Box>
          ))}
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <IconButton icon={<FaArrowLeft />} aria-label="Previous Page" onClick={goToPreviousPage} isDisabled={currentPage === 1} />
          <Text mx={4}>
            Page {currentPage} of {totalPages}
          </Text>
          <IconButton icon={<FaArrowRight />} aria-label="Next Page" onClick={goToNextPage} isDisabled={currentPage === totalPages} />
        </Flex>
      </VStack>
    </Box>
  );
};

export default Index;
