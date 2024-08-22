"use client";

import { useState, useEffect } from "react";
import { deleteQuestionById } from "@/lib/faqs";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { fetchAllQuestion } from "@/lib/faqs";
import TableLoader from "../../table-loader";

interface RowData {
  id: string;
  question: string;
  answer: string;
}

interface FAQsTableProps {
  initialData: RowData[];
}

export default function FAQsTable({ initialData }: FAQsTableProps) {
  const [data, setData] = useState<RowData[]>(initialData);
  const [pending, setPending] = useState<boolean>(true);

  const refetch = async () => {
    const updatedData = await fetchAllQuestion();
    setData(updatedData);
  };

  const ActionCell = ({ row }: { row: RowData }) => (
    <Flex gap="2">
      <Button
        px="2"
        py="1"
        as="a"
        href={`/faqs/${row.id}/edit`}
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
              await deleteQuestionById(row.id);
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

  const columns: TableColumn<RowData>[] = [
    { name: "Pertanyaan", selector: (row) => row.question, sortable: true },
    {
      name: "Jawaban",
      cell: (row) => <span dangerouslySetInnerHTML={{ __html: row.answer }} />,
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
