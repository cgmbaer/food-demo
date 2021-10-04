import { Link } from 'react-router-dom'

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function AddButton() {
  return (
    <Link to={{ pathname: 'Erstellen', state: {} }}>
      <IconButton
        color="primary"
        aria-label="Name Speichern"
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
        <CheckCircleOutlineIcon />
      </IconButton>
    </Link>
  );
}

const Input = styled('input')({
  display: 'none',
});

const Img = styled('img')({
  width: '80%',
  marginLeft: '10%',
  marginTop: 30,
  borderRadius: 10,
});

function ImageUpload() {
  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <Img
        src="https://mui.com/static/images/cards/paella.jpg"
        alt="recipe image"
      />
    </label>

  );
}

export default function Erstellen() {

  return (
    <Box>
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
              label="Rezeptname eingeben"
              variant="standard"
            />
          </Grid>
          <Grid item xs={2}>
            <AddButton />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <ImageUpload />
      </Container>
    </Box>
  );
}