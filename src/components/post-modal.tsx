"use client";

import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalBody, Box, Flex, Image, Input, Textarea, Button, IconButton
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostModal({ isOpen, onClose }: PostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);

      // Preview images
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setPreviewImages(imageUrls);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ title, content, images });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={6}>
          <Flex direction="column" gap={4}>
            <Button onClick={onClose} variant="outline" leftIcon={<AiOutlineClose />}>
              Close
            </Button>
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  mb={3}
                />
                <Textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                />
              </Box>
              <Box mb={4}>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  mb={4}
                />
                <Flex wrap="wrap" gap={2}>
                  {previewImages.map((src, index) => (
                    <Box key={index} position="relative">
                      <Image
                        src={src}
                        alt={`preview ${index}`}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                        mb={2}
                      />
                      <IconButton
                        aria-label="Remove Image"
                        icon={<AiOutlineClose />}
                        position="absolute"
                        top={0}
                        right={0}
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                        variant="outline"
                        colorScheme="red"
                      />
                    </Box>
                  ))}
                </Flex>
              </Box>
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </form>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
