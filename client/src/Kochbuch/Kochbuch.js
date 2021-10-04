import { Link } from 'react-router-dom'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


function AddButton() {
  return (
    <Link to={{ pathname: 'Erstellen', state: {} }}>
      <IconButton
        color="primary"
        aria-label="Neues Rezept"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'right',
          '& svg': {
            fontSize: 45
          },
          padding: 0,
        }}
      >
        <ControlPointIcon />
      </IconButton>
    </Link>
  );
}

export default function Kochbuch() {

  return (
    <Container sx={{
      marginTop: 2
    }}>
      <Grid container spacing={0}>
        <Grid item xs={10}>
          <TextField
            sx={{
              width: '100%',
              height: '100%',
            }}
            label="Filtern"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2}>
          <AddButton />
        </Grid>
      </Grid>
    </Container>
  );
}