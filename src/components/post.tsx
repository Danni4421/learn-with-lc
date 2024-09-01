"use client";

import React, { useState } from 'react';
import { 
  Card, CardHeader, CardBody, CardFooter, Flex, Box, Avatar, Heading, Text, Badge, Button, IconButton, Image, useDisclosure 
} from '@chakra-ui/react';
import { BiLike, BiChat, BiShare, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'; // Import icons for filled and outline like
import ModalComment from '@/components/modal-comment';

interface PostProps {
  name: string;
  avatarSrc: string;
  role: string;
  date: string;
  title: string;
  content: string;
  badgeColorScheme: string;
  badgeText: string;
  images: string[]; // Array of image URLs
  commentName?: string;
  commentAvatarSrc?: string;
  commentRole?: string;
  commentDate?: string;
  commentContent?: string;
}

export default function Post(props: PostProps) {
  const { name, avatarSrc, role, date, title, content, badgeColorScheme, badgeText, images, commentName, commentAvatarSrc, commentRole, commentDate, commentContent } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false); // State to manage like toggle

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <Card maxW="2xl" className='mb-5'>
      <CardHeader>
        <Flex gap="4" alignItems="center" flexWrap="wrap">
          <Flex flex="1" gap="4" alignItems="center">
            <Avatar name={name} src={avatarSrc} />
            <Box>
              <Heading size="sm">{name}</Heading>
              <Text>{role}</Text>
            </Box>
          </Flex>
          <Flex direction="column" alignItems="end">
            <Text mt="2" fontSize="sm">
              {date}
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontWeight="bold" fontSize="2xl" mb="4">
          {title}
        </Text>
        <Text>
          {content}
        </Text>
      </CardBody>

      {/* Image Slider */}
      <Box position="relative" width="full" height="400px">
        <Image
          objectFit='cover'
          src={images[currentIndex]}
          alt='Post Image'
          width="full"
          height="full"
        />
        <IconButton
         size='sm'
          aria-label="Previous Slide"
          icon={<BiChevronLeft />}
          onClick={handlePrevSlide}
          className="text-lg absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-black/60 text-white hover:bg-black/80"
        />
        <IconButton
         size='sm'
          aria-label="Next Slide"
          icon={<BiChevronRight />}
          onClick={handleNextSlide}
          className="text-lg absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-black/60 text-white hover:bg-black/80"
        />
      </Box>

      <CardFooter
        justify="start"
        gap="2"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Flex direction="column" alignItems="start" gap="4">
          <Flex direction="row" gap="2" alignItems="start">
            <Button 
              className="flex-1 px-4 py-2 rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] hover:bg-black transition-transform transition-shadow duration-300 ease-in-out" 
              leftIcon={liked ? <AiFillLike /> : <AiOutlineLike />} // Toggle between filled and outline icons
              onClick={toggleLike} // Toggle like status on click
            >
              <span className="hidden md:inline-block">Suka</span>
            </Button>
            <Button 
              className="flex-1 px-4 py-2 rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] hover:bg-black transition-transform transition-shadow duration-300 ease-in-out" 
              leftIcon={<BiChat />}
              onClick={onOpen}
            >
              <span className="hidden md:inline-block">Komen</span>
            </Button>
            <Button className="flex-1 px-4 py-2 rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] hover:bg-black transition-transform transition-shadow duration-300 ease-in-out" leftIcon={<BiShare />}>
              <span className="hidden md:inline-block">Bagikan</span>
            </Button>
          </Flex>
          <Box mt="2" w="full" textAlign="start">
            <Text fontWeight="bold" fontSize="base">
              10.262 suka
            </Text>
            <Text fontSize="base" onClick={onOpen} cursor="pointer" _hover={{ textDecoration: 'underline' }}>
              Lihat semua 2.078 komentar
            </Text>
          </Box>
        </Flex>
      </CardFooter>


      {/* Modal for full post with comments */}
      <ModalComment
        isOpen={isOpen}
        onClose={onClose}
        name="Segun Adebayo"
        avatarSrc="https://bit.ly/sage-adebayo"
        role="Pelajar"
        date="Kamis, 24 Juni 2024"
        title="Bangun Ruang | Matematika"
        content="With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen."
        badgeColorScheme="green"
        badgeText="Terjawab"
        images={[
          'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
          'https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        ]}
        commentName="Rina Kusuma"
        commentAvatarSrc="https://bit.ly/rina-kusuma"
        commentRole="Mahasiswa"
        commentDate="Jumat, 25 Juni 2024"
        commentContent="Great explanation! It really helps with understanding the concept."
      />
    </Card>
  );
}
