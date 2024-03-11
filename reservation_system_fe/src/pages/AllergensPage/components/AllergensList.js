import React, { useEffect, useState } from 'react';
import { getAllergens } from '../../../services/apiService';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const AllergensList = () => {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    async function fetchAllergens() {
      try {
        const response = await getAllergens();
        setAllergens(response);
      } catch (error) {
        console.error('Chyba při načítání alergenů:', error);
      }
    }

    fetchAllergens();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="div" sx={{ textAlign: 'left', mb: 4, mt: 2 }}>
        Seznam Alergenů
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Číslo</Typography></TableCell>
              <TableCell align="left"><Typography variant="h6">Název</Typography></TableCell>
              <TableCell align="left"><Typography variant="h6">Popis</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allergens.map((allergen, index) => (
              <TableRow key={allergen.id}>
                <TableCell component="th" scope="row">
                  <Typography variant="body1">{index + 1}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1">{allergen.name}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body1">{allergen.description}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllergensList;
