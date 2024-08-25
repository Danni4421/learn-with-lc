"use client"; // Ensure this file is a client component

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Avatar, Heading, Text, Button, Divider } from '@chakra-ui/react';
import { BiChat } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; 
import Reply from '@/components/reply'; // Ensure the path is correct

interface CommentProps {
  name: string;
  avatarSrc: string;
  role: string;
  date: string;
  content: string;
}

export default function Comment({ name, avatarSrc, role, date, content }: CommentProps) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(prevState => !prevState); // Toggle heart state
  };

  const handleReplyClick = () => {
    setShowReply(prevState => !prevState); // Toggle reply visibility
  };

  return (
    <Card maxW="5xl" className="mb-5 bg-transparent shadow-none">
      <CardHeader>
        <Flex gap="4" alignItems="center" flexWrap="wrap">
          <Flex flex="1" gap="4" alignItems="center">
            <Avatar name={name} src={avatarSrc} />
            <Box>
              <Heading size="sm">{name}</Heading>
              <Text>{role}</Text>
            </Box>
          </Flex>
          <Flex direction="row" alignItems="flex-start" justifyContent="start">
            <Text fontSize="sm">{date}</Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{content}</Text>
      </CardBody>
      <CardFooter>
        {/* Ensure buttons are aligned with text */}
        <Flex direction="row" alignItems="center" gap="2">
          <Button
            className="bg-transparent rounded-full px-2 hover:bg-slate-100"
            onClick={handleHeartClick}
            leftIcon={isHeartFilled ? <AiFillHeart style={{ fontSize: '1.6em', color: '#FF6767' }} /> : <AiOutlineHeart style={{ fontSize: '1.6em', strokeWidth: '2' }} />}
          >
            {isHeartFilled ? '1 orang suka' : 'Suka'}
          </Button>
          <Button className="bg-transparent text-gray-500 rounded-full px-2 hover:bg-slate-100" leftIcon={<BiChat />} onClick={handleReplyClick}>
            Balas
          </Button>
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
