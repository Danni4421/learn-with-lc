"use client";

import { useState, useEffect } from "react";

/** Components */
import { Box, Button, Flex } from "@chakra-ui/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableLoader from "@/components/table-loader";

/** Types */
import { Question } from "@/types";

/** Libraries */
import { deleteQuestionById } from "@/lib/faqs";
import { fetchAllQuestion } from "@/lib/faqs";

interface FAQsTableProps {
  initialData: Question[];
}

export default function FAQsTable({ initialData }: FAQsTableProps) {
  const [data, setData] = useState<Question[]>(initialData);
  const [pending, setPending] = useState<boolean>(true);

  const refetch = async () => {
    const updatedData = await fetchAllQuestion();
    setData(updatedData);
  };

  const ActionCell = ({ row }: { row: Question }) => (
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

  const columns: TableColumn<Question>[] = [
    { name: "Pertanyaan", selector: (row) => row.question, sortable: true },
    {
      name: "Jawaban",
      cell: (row) => <span dangerouslySetInnerHTML={{ __html: row.answer }} />,
      sortable: true,
      minWidth: "60%",
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
