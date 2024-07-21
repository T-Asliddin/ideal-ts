import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { order } from "@service";
import { Delete } from "@order-interfaces";
//  import { ServiceModal } from "@modal";
import { Data } from "@global-interfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }: Data) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState();
  const daletItem = async (id: Delete) => {
    try {
      const response = await order.delete(id);
      response.status === 200 && window.location.reload();
    } catch (error) {}
  };

  const editItem = (item: any) => {
    setOpen(true);
    setItem(item);
  };

  return (
    <>
      {/* <ServiceModal open={open} handleClose={() => setOpen(false)}  item={item}/> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T/R</StyledTableCell>
              <StyledTableCell align="center">Client Name</StyledTableCell>
              <StyledTableCell align="center">Servise Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Amout</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.service_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.price}</StyledTableCell>
                <StyledTableCell align="center">{item.amount}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_phone_number}
                </StyledTableCell>
                <StyledTableCell align="center">{item.status}</StyledTableCell>

                <StyledTableCell align="center">
                  <div>
                    <button
                      onClick={() => {
                        setEdit(true);
                      }}
                      class=" mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        daletItem(item.id);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-5 rounded "
                    >
                      Dalet
                    </button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
