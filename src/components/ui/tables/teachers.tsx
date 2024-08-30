"use client";

import { useState, useEffect } from "react";

/** Components */
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { PiGenderMaleBold, PiGenderFemaleBold } from "react-icons/pi";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableLoader from "@/components/table-loader";

/** Types */
import { Teacher } from "@/types";

/** Libraries */
import { deleteTeacherById, fetchAllTeacher } from "@/lib/teachers";

interface TeacherTableProps {
  initialData: Teacher[];
}

export default function TeacherTable({ initialData }: TeacherTableProps) {
  const [data, setData] = useState<Teacher[]>(initialData);
  const [pending, setPending] = useState<boolean>(true);

  const refetch = async () => {
    const updatedData = await fetchAllTeacher();
    setData(updatedData);
  };

  const ActionCell = ({ row }: { row: Teacher }) => (
    <Flex gap="2">
      <Button
        px="2"
        py="1"
        as="a"
        href={`/teachers/${row.id}/edit`}
        className="bg-yellow-400 text-white hover:bg-yellow-600"
        data-id={row.id}
      >
        <FaEdit />
      </Button>
      <Button
        px="2"
        py="1"
        className="bg-red-500 text-white hover:bg-red-600"
        onClick={async () => {
          try {
            const confirmation = confirm("Yakin hapus?");
            if (confirmation) {
              await deleteTeacherById(row.id);
              await refetch();
            }
          } catch (error) {
            console.error("Failed to delete testimony", error);
          }
        }}
      >
        <FaTrash />
      </Button>
    </Flex>
  );

  const columns: TableColumn<Teacher>[] = [
    {
      name: "Tentor",
      cell: (row) => (
        <Flex gap={3} alignItems="center">
          <Image
            src={row.image}
            className="w-8 h-8 rounded-full"
            alt="Teacher Image"
          />
          <Box>
            <Text fontWeight="bold">{row.name}</Text>
            <Text fontSize=".6rem">{row.role}</Text>
          </Box>
        </Flex>
      ),
    },
    {
      name: "Jenis kelamin",
      cell: (row) => {
        if (row.gender == "lk") {
          return (
            <span className="w-6 h-6 bg-indigo-300/30 text-indigo-600 rounded-full flex justify-center items-center">
              <PiGenderMaleBold />
            </span>
          );
        } else if (row.gender == "pr") {
          return (
            <span className="w-6 h-6 bg-pink-300/30 text-pink-600 rounded-full flex justify-center items-center">
              <PiGenderFemaleBold />
            </span>
          );
        }
      },
      sortable: true,
    },
    {
      name: "Pendidikan terakhir",
      selector: (row) => row.last_graduate_at,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => <ActionCell row={row} />,
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={pending}
      progressComponent={
        <Box className="p-3 flex items-center gap-x-2">
          <TableLoader />
        </Box>
      }
      pagination
    />
  );
}
