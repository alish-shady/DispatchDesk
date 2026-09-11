import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RequestsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">tkt_id</TableHead>
          <TableHead className="min-w-60">summary</TableHead>
          <TableHead>status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="cursor-pointer group">
          <TableCell
            className="uppercase relative
            before:absolute before:left-0 before:top-0 before:h-full before:w-1
            before:bg-primary before:transition-opacity before:opacity-0
            before:content-['']
            group-hover:before:opacity-100"
          >
            #REQ-4091
          </TableCell>
          <TableCell>Database migration failure on staging</TableCell>
          <TableCell className="uppercase">
            <span className="p-1 text-status-rejected-text bg-status-rejected-bg text-xs uppercase">critical</span>
          </TableCell>
        </TableRow>
        <TableRow className="cursor-pointer group">
          <TableCell
            className="uppercase relative
            before:absolute before:left-0 before:top-0 before:h-full before:w-1
            before:bg-primary before:transition-opacity before:opacity-0
            before:content-['']
            group-hover:before:opacity-100"
          >
            #REQ-4090
          </TableCell>
          <TableCell>Database migration failure on staging</TableCell>
          <TableCell className="uppercase">
            <span className="p-1 text-status-submitted-text bg-status-submitted-bg text-xs uppercase">in_prog</span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
