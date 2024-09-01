import React, { useState, useCallback } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalBody, Box, Card, CardHeader, CardBody, Flex, Avatar, Heading, Text, Image, Input, IconButton, Icon, Button
} from '@chakra-ui/react';
import { BiChat, BiShare, BiSend, BiChevronLeft, BiChevronRight,BiCamera  } from 'react-icons/bi';
import { AiFillLike, AiOutlineLike, AiFillCloseCircle } from 'react-icons/ai';
import Comment from '@/components/comment';

interface ModalCommentProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function ModalComment(props: ModalCommentProps) {
  const {
    isOpen, onClose, name, avatarSrc, role, title, content, images,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false); // State to manage like toggle
  const [newComment, setNewComment] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const toggleLike = useCallback(() => {
    setLiked((prevLiked) => !prevLiked);
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const likeIcon = liked ? <AiFillLike /> : <AiOutlineLike />;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent minHeight='95vh' top='-12'>
        <ModalBody p={0}>
          <Flex direction={{ base: 'column', lg: 'row' }} height="95vh">
            {/* Image Slider Section */}
            <Box flex="1" minW="300px" position="relative">
              <Box position="relative" width="full" height="full">
                <Image
                  objectFit='cover'
                  src={images[currentIndex]}
                  alt='Post Image'
                  width="100%"
                  height="100%"
                />
                {images.length > 1 && (
                  <>
                    <IconButton
                      aria-label="Previous Slide"
                      icon={<BiChevronLeft />}
                      onClick={handlePrevSlide}
                      className="text-lg absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-black/60 text-white hover:bg-black/80"
                    />
                    <IconButton
                      aria-label="Next Slide"
                      icon={<BiChevronRight />}
                      onClick={handleNextSlide}
                      className="text-lg absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-black/60 text-white hover:bg-black/80"
                    />
                  </>
                )}
              </Box>
            </Box>
            {/* Content Section */}
            <Box flex="1" display="flex" flexDirection="column">
              <Box flex='7' overflowY="auto" px={{ lg: '4' }} className="hide-scrollbar">
                <Card m="0" px="0" pt="4" className="shadow-none">
                  <CardHeader m="0" p="0">
                    <Flex gap="2" alignItems="center">
                      <Avatar name={name} src={avatarSrc} boxSize="45px" />
                      <Box>
                        <Heading fontSize="sm">{name}</Heading>
                        <Text fontSize="sm">{role}</Text>
                      </Box>
                    </Flex>
                  </CardHeader>
                  <CardBody mx='0' px='0'>
                    <Text fontWeight="bold" fontSize="lg" mb="2">{title}</Text>
                    <Text fontSize="sm">{content}</Text>
                  </CardBody>
                </Card>
                <Box mt="2">
                  <h1 className='font-bold text-lg mb-5'>Komentar</h1>
                  <Comment
                    name="Segun Adebayo"
                    avatarSrc="https://bit.ly/sage-adebayo"
                    role="Pelajar"
                    date="Kamis, 24 Juni 2024"
                    content="With Chakra UI, I wanted to sync the speed of development with the speed of design..."
                    images={[
                      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                      'https://images.unsplash.com/photo-1521747116042-5a810fda9664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    ]}
                  />
                </Box>
              </Box>
              {/* Comment Input and Send Button Section */}
              <Box flex='3' px="4" borderTopWidth="1px">
                <Flex direction="row" mt="4" gap="2" alignItems="center">
                  <IconButton
                    className="rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] hover:bg-black transition-transform transition-shadow duration-300 ease-in-out"
                    icon={likeIcon}
                    onClick={toggleLike}
                    fontSize="lg"
                    px="1"
                    py="1"
                    aria-label="Like"
                  />
                  <IconButton
                    className="rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] hover:bg-black transition-transform transition-shadow duration-300 ease-in-out"
                    icon={<BiChat />}
                    fontSize="lg"
                    px="1"
                    py="1"
                    aria-label="Comment"
                  />
                  <IconButton
                    className="rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] hover:bg-black transition-transform transition-shadow duration-300 ease-in-out"
                    icon={<BiShare />}
                    fontSize="lg"
                    px="1"
                    py="1"
                    aria-label="Share"
                  />
                </Flex>
                <Box mt="4">
                  <Text fontWeight="bold" fontSize="sm">10.262 suka</Text>
                  <Text fontSize="sm">Kamis, 24 Juni 2024</Text>
                </Box>
                <Flex direction="column" my="2" py="2" borderTopWidth="1px">
                  <Flex direction="row" gap="4" alignItems="center">
                    <Input
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Tambahkan komentar..."
                      fontSize="sm"
                      flex="1"
                      size="lg"
                      border="none" 
                      _focus={{ border: 'none', boxShadow: 'none' }} 
                      _hover={{ border: 'none' }} 
                      bg="gray.200" 
                      color="gray.800" 
                      // placeholderColor="gray.500" 
                      borderRadius="xl"
                    />
                    <Box position="relative">
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        id="image-input"
                        opacity="0"
                        position="absolute"
                        width="full"
                        height="full"
                        top="0"
                        left="0"
                        zIndex="1"
                        cursor="pointer"
                      />
                      <IconButton
                        aria-label="Add images"
                        icon={<BiCamera />}
                        className="text-lg rounded-full bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] hover:bg-black transition-transform transition-shadow duration-300 ease-in-out"
                        size="md"
                        as="label"
                        htmlFor="image-input"
                        cursor="pointer"
                      />
                    </Box>
                    <IconButton
                      aria-label="Send comment"
                      icon={<BiSend />}
                      className="text-lg rounded-lg bg-black text-white shadow-solid hover:shadow-solid1 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[#DBFF00] hover:bg-black transition-transform transition-shadow duration-300 ease-in-out"
                      size="md"
                    />
                  </Flex>
                  <Flex direction="row" gap="2">
                    {selectedImages.map((image, index) => (
                      <Box key={index} position="relative" mt="2">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`preview-${index}`}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <IconButton
                          icon={<AiFillCloseCircle />}
                          size="xs"
                          colorScheme="red"
                          position="absolute"
                          top="0"
                          right="0"
                          aria-label="Remove image"
                          onClick={() => handleRemoveImage(index)}
                        />
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
