import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import Cookies from "js-cookie";
import React from "react";

export default function TransactionsList({
  data,
  fetchTransctions,
  setEditTransaction,
}) {
  const token = Cookies.get("token");

  function reload(res) {
    if (res.ok) {
      fetchTransctions();
    }
  }

  async function HandleStatus(id) {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/status/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reload(res)
  }

  async function remove(_id) {
    const token = Cookies.get("token");
    if (window.confirm("Are you sure")) {

    }
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      fetchTransctions();
      window.alert("Deleted Successfully");
    }
  }


  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Todos
      </Typography>
      <TableContainer component={Paper} data-testid="todo-test">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="todo-data-test">
            {data.map((month) =>
              month.transactions.map((row) => (
                <TableRow
                  TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={row.isCompleted}
                      onChange={() => HandleStatus(row._id)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      component="label"
                      onClick={() => setEditTransaction(row)}
                    >
                      <EditSharpIcon />
                    </IconButton>

                    <IconButton
                      color="warning"
                      component="label"
                      onClick={() => remove(row._id)}
                    >
                      <DeleteSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer >
    </>
  );
}