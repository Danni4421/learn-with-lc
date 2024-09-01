"use client"; // Ensure this file is a client component

import React, { useState } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, Flex, Box, Avatar, Heading, Text, Button, Image, IconButton
} from '@chakra-ui/react';
import { BiChat } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Reply from '@/components/reply'; // Ensure the path is correct

interface CommentProps {
  name: string;
  avatarSrc: string;
  role: string;
  date: string;
  content: string;
  images: string[]; // Array of image URLs
}

export default function Comment({ name, avatarSrc, role, date, content, images }: CommentProps) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleHeartClick = () => {
    setIsHeartFilled(prevState => !prevState); // Toggle heart state
  };

  const handleReplyClick = () => {
    setShowReply(prevState => !prevState); // Toggle reply visibility
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Card maxW="5xl" m="0" px="0" className="mb-5 bg-transparent shadow-none">
      <CardHeader m="0" p="0">
        <Flex gap="2" alignItems="center" flexWrap="wrap">
          <Flex flex="1" gap="2" alignItems="center">
            <Avatar name={name} src={avatarSrc} boxSize="45px" />
            <Box>
              <Heading fontSize="sm">{name}</Heading>
              <Text fontSize="sm">{role}</Text>
            </Box>
          </Flex>
          <Flex direction="row" alignItems="flex-start" justifyContent="start">
            <Text fontSize="xs">{date}</Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody ml="8">
        <Text fontSize="sm">{content}</Text>
        {/* Image Slider Section */}
        {images.length > 0 && (
          <Box position="relative" mt="4">
            <Image
              src={images[currentIndex]}
              alt="Comment Image"
              borderRadius="md"
              objectFit="cover"
              width="100%"
              height="auto"
            />
            {images.length > 1 && (
              <>
                <IconButton
                  aria-label="Previous Slide"
                  icon={<BiChevronLeft />}
                  className="text-lg absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-black/60 text-white hover:bg-black/80"
                  onClick={handlePrevSlide}
                />
                <IconButton
                  aria-label="Next Slide"
                  icon={<BiChevronRight />}
                  className="text-lg absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-black/60 text-white hover:bg-black/80"
                  onClick={handleNextSlide}
                />
              </>
            )}
          </Box>
        )}
      </CardBody>
      <CardFooter ml="10" pl="3">
        <Flex direction="column" alignItems="start" gap="2">
          <Flex direction="row" alignItems="center" gap="2">
            <Button
              className="bg-transparent rounded-full px-2 hover:bg-slate-100"
              onClick={handleHeartClick}
              leftIcon={isHeartFilled ? <AiFillHeart style={{ fontSize: '1.6em', color: '#FF6767' }} /> : <AiOutlineHeart style={{ fontSize: '1.6em', strokeWidth: '2' }} />}
            >
              {isHeartFilled ? '1 orang suka' : 'Suka'}
            </Button>
            <Button className="bg-transparent text-gray-500 rounded-full px-2 hover:bg-slate-100" leftIcon={<BiChat />}>
              Balas
            </Button>
          </Flex>
          <Text onClick={handleReplyClick} cursor="pointer" color="blue.500" _hover={{ textDecoration: 'underline' }}>
            Lihat semua balasan
          </Text>
        </Flex>
      </CardFooter>

      {/* Render the Reply component inside the Card */}
      {showReply && (
        <>
          <Reply
            name="Segun Adebayo"
            avatarSrc="https://bit.ly/sage-adebayo"
            role="Pelajar"
            date="Kamis, 24 Juni 2024"
            content="With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen."
          />
          <Reply
            name="Segun Adebayo"
            avatarSrc="https://bit.ly/sage-adebayo"
            role="Pelajar"
            date="Kamis, 24 Juni 2024"
            content="With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen."
          />
        </>
      )}
    </Card>
  );
}
