import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import StarFirebase from "../config/firebaseConfig";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ref, set } from "firebase/database";

import moment from "moment";

const Ingreso = () => {
  const [state, setState] = useState({
    peso0: "",
    peso1: "",
    pesoNeto: "",
    tipo: "",
    valor: "",
    fecha: "",
    hora0: "",
    hora1: "",
  });
  const [matricula, setMatricula] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    setState({ db: StarFirebase() });
  }, []);

  const insertData = () => {
    const db = state.db;
    const data = {
      peso0: "1200",
      peso1: "",
      pesoNeto: "",
      tipo: tipo,
      valor: "",
      fecha: moment().format("YYYY-MM-DD"),
      hora0: moment().format("h:mm:ss"),
      hora1: "",
    };
    set(
      ref(
        db,
        "Orders/" + moment().format("YYYY-MM-DD") + "/" + matricula + "/"
      ),
      data
    )
      .then(() => {
        alert("Dato guardado");
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  const handleChangeM = (e) => {
    e.preventDefault();
    setMatricula(e.target.value);
  };

  const handleChangeT = (e) => {
    e.preventDefault();
    setTipo(e.target.value);
  };

  return (
    <Paper
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl variant="outlined" fullWidth>
          <TextField
            id="matricula"
            value={matricula}
            name="matricula"
            label="Matrícula"
            variant="outlined"
            onChange={handleChangeM}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-label">
            Tipo de Chatarra
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            value={tipo}
            onChange={handleChangeT}
            label="Tipo de Chatarra"
          >
            <MenuItem value={"Sólida"}>Sólida</MenuItem>
            <MenuItem value={"Mixta"}>Mixta</MenuItem>
            <MenuItem value={"Carrocería"}>Carrocería</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <Button variant="contained" onClick={() => insertData()}>
            ABRIR ÓRDEN
          </Button>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default Ingreso;