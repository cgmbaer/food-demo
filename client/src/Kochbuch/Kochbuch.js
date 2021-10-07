import { Link } from 'react-router-dom'

import Container from '@mui/material/Container';

import TextField from '@mui/material/TextField';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function Kochbuch() {

  return (
    <Container sx={{ marginTop: 2 }}>
      <TextField
        sx={{ width: '100%', height: '100%' }}
        label="Filtern"
        variant="standard"
      />
      <Link to={{ pathname: 'Erstellen', state: {} }}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'absolute', bottom: 80, right: 25 }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </Container>
  );
}