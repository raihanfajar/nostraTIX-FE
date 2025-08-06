// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { dummyPendingTx, type TxRow } from "@/mock/dummyTransactions";
// import type { ColumnDef } from "@tanstack/react-table";
// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// const columns: ColumnDef<TxRow>[] = [
//   { accessorKey: "id", header: "Order ID" },
//   { accessorKey: "customer", header: "Customer" },
//   { accessorKey: "event", header: "Event" },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//     cell: ({ getValue }) => `Rp ${getValue<number>().toLocaleString()}`,
//   },
//   { accessorKey: "seats", header: "Seats" },
//   {
//     accessorKey: "usedPoints",
//     header: "Points",
//     cell: ({ getValue }) => (getValue<number>() ? getValue<number>() : "—"),
//   },
//   {
//     accessorKey: "usedCoupon",
//     header: "Coupon",
//     cell: ({ getValue }) => getValue<string>() || "—",
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => <TxActions {...row.original} />,
//   },
// ];

// // Re-usable action column
// function TxActions(tx: TxRow) {
//   const [viewProof, setViewProof] = useState(false);
//   const [confirm, setConfirm] = useState<null | {
//     action: "accept" | "reject";
//   }>(null);

//   const handleConfirm = () => {
//     console.log(`${confirm?.action} transaction ${tx.id}`);
//     setConfirm(null);
//   };

//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="icon">
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <DropdownMenuItem onSelect={() => setViewProof(true)}>
//             View Proof
//           </DropdownMenuItem>
//           <DropdownMenuItem onSelect={() => setConfirm({ action: "accept" })}>
//             Accept
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onSelect={() => setConfirm({ action: "reject" })}
//             className="text-red-600"
//           >
//             Reject
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Proof modal */}
//       <Dialog open={viewProof} onOpenChange={setViewProof}>
//         <DialogContent className="max-w-md border-[#2D4C51] bg-[#173236] text-white">
//           <DialogHeader>
//             <DialogTitle>Transfer Proof – {tx.id}</DialogTitle>
//           </DialogHeader>
//           <Image
//             src={tx.proofUrl}
//             alt="proof"
//             width={600}
//             height={400}
//             className="rounded-md"
//           />
//           <DialogFooter>
//             <Button onClick={() => setViewProof(false)}>Close</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Accept / Reject confirm */}
//       <Dialog open={!!confirm} onOpenChange={() => setConfirm(null)}>
//         <DialogContent className="border-[#2D4C51] bg-[#173236] text-white">
//           <DialogHeader>
//             <DialogTitle>Confirm {confirm?.action?.toUpperCase()}</DialogTitle>
//             <DialogDescription>
//               Transaction {tx.id} will be marked as {confirm?.action}.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="ghost" onClick={() => setConfirm(null)}>
//               Cancel
//             </Button>
//             <Button onClick={handleConfirm} className="bg-[#E67F3C]">
//               Confirm
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// export default function TransactionsPage() {
//   const [data] = useState(() => dummyPendingTx); // later → useQuery(...)

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="p-6 text-white">
//       <h1 className="mb-4 text-2xl font-bold">Pending Transactions</h1>

//       <div className="rounded-md border border-[#2D4C51] bg-[#173236]">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((hg) => (
//               <TableRow key={hg.id}>
//                 {hg.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext(),
//                     )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id}>
//                 {row.getVisibleCells().map((cell) => {
//                   console.log(cell);
//                   return (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext(),
//                       )}
//                     </TableCell>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

import React from 'react'

const StupidPage = () => {
  return (
    <div>StupidPage</div>
  )
}

export default StupidPage