import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Avatar, Heading, Text, Button, Divider } from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiChat } from 'react-icons/bi';

interface ReplyProps {
  name: string;
  avatarSrc: string;
  role: string;
  date: string;
  content: string;
}

export default function Reply({ name, avatarSrc, role, date, content }: ReplyProps) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(prevState => !prevState); // Toggle heart state
  };

  return (
      // <Divider /> 
    <Card maxW="5xl" className="ms-10 bg-transparent shadow-none ">
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
        <Text className='font-bold text-base'>@Namaorang</Text>
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
          <Button className="bg-transparent text-gray-500 rounded-full px-2 hover:bg-slate-100" leftIcon={<BiChat />}>
            Balas
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}
