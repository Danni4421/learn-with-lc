"use client";

import { useState, useEffect } from "react";
import { deleteTestimonyById, fetchAllTestimonial } from "@/lib/testimonials";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableLoader from "@/components/table-loader";

interface RowData {
  id: string;
  testimony: string;
  testimoner_name: string;
  now_studied_at: string;
  last_graduate_at: string;
  image: string;
}

interface TestimonialTableProps {
  initialData: RowData[];
}

export default function TestimonialTable({
  initialData,
}: TestimonialTableProps) {
  const [data, setData] = useState<RowData[]>(initialData);
  const [pending, setPending] = useState<boolean>(true);

  const refetch = async () => {
    const updatedData = await fetchAllTestimonial();
    setData(updatedData);
  };

  const ActionCell = ({ row }: { row: RowData }) => (
    <Flex gap="2">
      <Button
        px="2"
        py="1"
        as="a"
        href={`/testimonials/${row.id}/edit`}
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
              await deleteTestimonyById(row.id);
              await refetch(); // Reload data after delete
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

  const columns: TableColumn<RowData>[] = [
    { name: "Testimony", selector: (row) => row.testimony, sortable: true },
    {
      name: "Testimoner",
      selector: (row) => row.testimoner_name,
      sortable: true,
    },
    {
      name: "Alumni sekolah",
      selector: (row) => row.last_graduate_at,
      sortable: true,
    },
    {
      name: "Sekolah saat ini",
      selector: (row) => row.now_studied_at,
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
