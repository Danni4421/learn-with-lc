"use client";

import clsx from "clsx";
import { useState } from "react";
import Swal from "sweetalert2";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

/** Components */
import {
  Button,
  FormLabel,
  Image,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  Heading,
} from "@chakra-ui/react";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";
import DangerButton from "../buttons/danger";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { FaPlus, FaRegFloppyDisk } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

/** Types */
import { type Activity } from "@/types";
import { type Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { StoreActivitySchema } from "@/schemas/activity";
import { deleteActivityById } from "@/lib/lbb";
import { store } from "@/actions/activities";
import DismissableAlert from "../alerts/dismissable-alert";
import { fecthLBB } from "@/lib/lbb";

type ActivitiesProps = {
  __activities: Activity[];
  className?: string;
};

export function EditableActivities({
  __activities,
  className = "",
  ...props
}: ActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>(__activities);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const refetch = async () => {
    try {
      const refetchActivities = await fecthLBB();
      setActivities(refetchActivities.activities);
    } catch (error) {
      setActivities([]);
    }
  };

  const {
    isOpen: isOpenPostModal,
    onOpen: onOpenPostModal,
    onClose: onClosePostModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  return (
    <div {...props} className={clsx(className)} id="activities">
      <div className="flex justify-between mb-5">
        <Heading fontSize=".8rem" mb="6">
          Bagian Aktifitas
        </Heading>
        <PrimaryButton onClick={onOpenPostModal}>
          <FaPlus />
          <span className="ms-2">Tambah Aktifitas</span>
        </PrimaryButton>
      </div>
      <div>
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 rounded-lg"
          style={{ height: "550px" }}
        >
          {activities.map((activity, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <Image
                src={activity.data.url}
                alt={`Activity ${index + 1}`}
                className="object-cover cursor-grabbing"
                style={{ height: "100%", width: "100%" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={(swiper) => setThumbsSwiper(swiper)}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          style={{ height: "150px", marginTop: "15px" }}
        >
          {activities.map((activity, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center brightness-75 hover:brightness-100 transition-all cursor-grab"
              onClick={() => {
                onOpenDeleteModal();
                setSelectedActivity(activity);
              }}
            >
              <Image
                src={activity.data.url}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover rounded-lg"
                style={{ height: "100%", width: "100%" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Post Image Modal */}
        <PostActivityModal
          isOpen={isOpenPostModal}
          onClose={onClosePostModal}
          refetch={refetch}
        />

        {/*Delete Image Modal */}
        <DeleteActivityModal
          isOpen={isOpenDeleteModal}
          onClose={onCloseDeleteModal}
          activity={selectedActivity}
          refetch={refetch}
        />
      </div>
    </div>
  );
}

interface PostActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const PostActivityModal = ({
  isOpen,
  onClose,
  refetch,
}: PostActivityModalProps) => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<z.infer<typeof StoreActivitySchema>>();

  const onSubmit: SubmitHandler<z.infer<typeof StoreActivitySchema>> = async (
    data
  ) => {
    setSuccess("");
    setError("");

    const formData = new FormData();

    try {
      data.activities.forEach((file) => {
        formData.append(`images[]`, file);
      });

      Swal.fire({
        title: "Apakah Anda yakin menambahkan aktifitas?",
        text: "Aktifitas akan ditambahkan jika menyetujui",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#808080",
        confirmButtonText: "Iya, Tambahkan!",
        cancelButtonText: "Batalkan",
        customClass: {
          popup: "swa-popup",
          container: "swa-container",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await store(formData);

            if (!!response?.success) {
              Swal.fire({
                title: "Berhasil ditambahkan",
                text: "Aktifitas berhasil ditambahkan.",
                icon: "success",
                customClass: {
                  popup: "swa-popup",
                  container: "swa-container",
                },
              });

              refetch();
              setError("");
              setPreviews([]);
              onClose();
            }

            if (!!response?.error) {
              setError(response?.error);
            }
          } catch (error) {
            Swal.fire({
              title: "Gagal",
              text: "Gagal menambahkan aktifitas.",
              icon: "error",
              customClass: {
                popup: "swa-popup",
                container: "swa-container",
              },
            });

            setError("Terjadi kesalahan.");
          }
        }
      });
    } catch (error) {
      setError("Terjadi error.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Aktifitas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Image Preview */}
          {previews.length > 0 && (
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation]}
              className="mySwiper mb-3"
              style={{ height: "150px", marginTop: "15px" }}
            >
              {previews.map((preview, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center brightness-75 hover:brightness-100 transition-all cursor-grab"
                >
                  <Image
                    src={preview}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover rounded-lg"
                    style={{ height: "100%", width: "100%" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Error View */}
          {error && (
            <DismissableAlert
              status="error"
              title="Terjadi kesalahan!"
              description={error}
            />
          )}
          {success && (
            <DismissableAlert
              status="success"
              title="Berhasil!"
              description={success}
            />
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/formdata"
            className="mt-3"
          >
            <FormLabel className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <Text className="flex items-center space-x-2">
                <FaFileUpload className="text-gray-500" />
                <span className="font-medium text-gray-500 flex text-xs">
                  Drop files to Attach, or
                  <span className="text-blue-600 underline ms-2">browse</span>
                </span>
              </Text>
              <Input
                type="file"
                display="none"
                onChange={(event) => {
                  if (event.target.files) {
                    const newFiles = Array.from(event.target.files);
                    const imageUrls = newFiles.map((file) =>
                      URL.createObjectURL(file)
                    );

                    setPreviews((prevState) => [...prevState, ...imageUrls]);

                    const existingFiles = getValues("activities") || [];
                    setValue("activities", [...existingFiles, ...newFiles]);
                  }
                }}
                multiple={true}
              />
            </FormLabel>

            <ModalFooter className="flex gap-x-2">
              <SecondaryButton onClick={onClose}>
                <MdKeyboardBackspace />
                <span className="ms-2">Kembali</span>
              </SecondaryButton>
              <PrimaryButton type="submit">
                <FaRegFloppyDisk />
                <span className="ms-2">Tambah aktifitas</span>
              </PrimaryButton>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

interface DeleteActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity?: Activity;
  refetch: () => void;
}

function DeleteActivityModal({
  isOpen,
  onClose,
  activity,
  refetch,
}: DeleteActivityModalProps) {
  const handleDeleteActivity = async (id: string) => {
    Swal.fire({
      title: "Apakah Anda yakin menghapus aktifitas?",
      text: "Aktifitas akan terhapus jika Anda menyetujui",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus!",
      cancelButtonText: "Batalkan",
      customClass: {
        popup: "swa-popup",
        container: "swa-container",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteActivityById(id);

          Swal.fire({
            title: "Terhapus",
            text: "Aktifitas berhasil dihapus.",
            icon: "success",
            customClass: {
              popup: "swa-popup",
              container: "swa-container",
            },
          });

          if (response === "success") {
            refetch();
            onClose();
          }
        } catch (error) {
          Swal.fire({
            title: "Gagal",
            text: "Gagal menghapus aktifitas.",
            icon: "error",
            customClass: {
              popup: "swa-popup",
              container: "swa-container",
            },
          });
        }
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hapus Aktifitas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={activity?.data.url} alt="Selected Activity Image" />
        </ModalBody>

        <ModalFooter className="flex gap-2">
          <SecondaryButton onClick={onClose}>
            <MdKeyboardBackspace />
            <span className="ms-2">Kembali</span>
          </SecondaryButton>
          <DangerButton
            onClick={() => handleDeleteActivity(activity?.key || "")}
          >
            <FaRegFloppyDisk />
            <span className="ms-2">Hapus Aktifitas</span>
          </DangerButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
