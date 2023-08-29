import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";

const InitialForm = {
  title: "",
  description: "",
  isCompleted: false
};


export default function TransactionForm({ fetchTransctions, editTransaction, setEditTransaction }) {
  const token = Cookies.get("token");
  const [form, setForm] = useState(InitialForm);
  const [editBtn, setEditBtn] = useState(false);

  useEffect(() => {
    if (editTransaction.title !== undefined) {
      setForm(editTransaction);
      setEditBtn(true);
    }
  }, [editTransaction]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    editTransaction.title === undefined ? create() : update();
  }

  function reload(res) {
    if (res.ok) {
      setForm(InitialForm);
      fetchTransctions();
      setEditBtn(false);
      setEditTransaction({})
    }
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    reload(res);
  }

  async function update() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reload(res);
  }


  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Todos</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Title"
            size="small"
            name="title"
            variant="outlined"
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            size="small"
            name="description"
            variant="outlined"
            value={form.description}
            onChange={handleChange}
          />
          
          {
            editBtn ?
              <Button type="submit" variant="secondary">
                Update
              </Button>
              :
              <Button type="submit" variant="contained">
                Submit
              </Button>
          }
        </Box>
      </CardContent>
    </Card>
  );
}