"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Avatar, Heading, Text, Badge, Button } from '@chakra-ui/react';
import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import Comment from '@/components/comment';

interface PostProps {
  name: string;
  avatarSrc: string;
  role: string;
  date: string;
  title: string;
  content: string;
  badgeColorScheme: string;
  badgeText: string;
  commentName?: string; // Optional prop for comment component
  commentAvatarSrc?: string; // Optional prop for comment component
  commentRole?: string; // Optional prop for comment component
  commentDate?: string; // Optional prop for comment component
  commentContent?: string; // Optional prop for comment component
}

export default function Post(props: PostProps) {
  const { name, avatarSrc, role, date, title, content, badgeColorScheme, badgeText, commentName, commentAvatarSrc, commentRole, commentDate, commentContent } = props;
  const [showComment, setShowCommentshowComment] = useState(false);

  const handleCommentClick = () => {
    setShowCommentshowComment(prevState => !prevState); // Toggle showComment state
  };

  return (
    <Card maxW="5xl" className='mb-5'>
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
            <Badge colorScheme={badgeColorScheme} p="2" borderRadius="full">
              {badgeText}
            </Badge>
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
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <div className="flex flex-wrap gap-2">
          <Button className="flex-1 bg-black text-white border-black rounded-full m-2 px-6 hover:bg-slate-800 hover:text-white" leftIcon={<BiLike />}>
            <span className="hidden md:inline-block">Suka</span>
          </Button>
          <Button 
            className="flex-1 bg-black text-white border-black rounded-full m-2 px-6 hover:bg-slate-800 hover:text-white" 
            leftIcon={<BiChat />}
            onClick={handleCommentClick}
          >
            <span className="hidden md:inline-block">Komen</span>
          </Button>
          <Button className="flex-1 bg-black text-white border-black rounded-full m-2 px-6 hover:bg-slate-800 hover:text-white" leftIcon={<BiShare />}>
            <span className="hidden md:inline-block">Bagikan</span>
          </Button>
        </div>
      </CardFooter>

      {showComment && (
        <div className="mx-8 mb-8">
          <h1 className='font-bold text-xl mb-5'>Komentar</h1>
          <Comment
            name={commentName || "Segun Adebayo"}
            avatarSrc={commentAvatarSrc || "https://bit.ly/sage-adebayo"}
            role={commentRole || "Pelajar"}
            date={commentDate || "Kamis, 24 Juni 2024"}
            content={commentContent || "With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen."}
          />
        </div>
      )}
    </Card>
  );
}
