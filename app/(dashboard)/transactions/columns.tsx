"use client"

import { format, isValid } from "date-fns"; // Import isValid for date validation
import { InferResponseType } from "hono"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { client } from "@/lib/hono"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox"
import { formatCurrency } from "@/lib/utils";

import { Actions } from "./actions"
import { AccountColumn } from "./account-column";
import { CategoryColumn } from "./category-column";


export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    
  },
    cell: ({ row }) => {
      const dateValue = new Date(row.getValue("date")); // Parse the date

      // Check if the date is valid
      if (!isValid(dateValue)) {
        return <span>Invalid date</span>; // Handle invalid date
      }

      return <span>{format(dateValue, "dd MMMM, yyyy")}</span>; // Format and return the date
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoría
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    
  },
    cell: ({ row }) => {

      return (
        <CategoryColumn 
          id={row.original.id}
          category={row.original.category}
          categoryId={row.original.categoryId}
        />
      );
    },
  },
  {
    accessorKey: "payee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Beneficiario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cantidad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    
  },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return (
        <Badge 
          variant={amount < 0 ? "destructive" : "primary"}
          className="text-xs font-medium px-3.5 py-2.5"
          >
          {formatCurrency(amount)}
        </Badge>
      );
    }
  },
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cuenta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    
  },
    cell: ({ row }) => {

      return (
      <AccountColumn 
        account={row.original.account}
        accountId={row.original.accountId}
      />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />
  },
];

