"use client";

import { useState, useEffect } from "react";
import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Program } from "@/types";
import { fetchAllProgram, deleteProgramById } from "@/lib/programs";
import TableLoader from "@/components/table-loader";

interface ProgramTableProps {
  initialData: Program[];
}

export default function ProgramTable({ initialData }: ProgramTableProps) {
  const [data, setData] = useState<Program[]>(initialData);
  const [pending, setPending] = useState<boolean>(true);

  const refetch = async () => {
    const updatedData = await fetchAllProgram();
    setData(updatedData);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const ActionCell = ({ row }: { row: Program }) => (
    <Flex gap="2">
      <Button
        px="2"
        py="1"
        as="a"
        href={`/programs/${row.id}/edit`}
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
              await deleteProgramById(row.id);
              await refetch();
            }
          } catch (error) {
            console.error("Failed to delete program", error);
          }
        }}
      >
        <FaTrash />
      </Button>
    </Flex>
  );

  const columns: TableColumn<Program>[] = [
    {
      name: "Nama program",
      maxWidth: "20%",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Gambar",
      maxWidth: "20%",
      cell: (row) => (
        <Image src={row.image} className="w-20 h-14" alt="Program Image" />
      ),
    },
    {
      name: "Deskripsi program",
      maxWidth: "50%",
      selector: (row) => row.description,
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
