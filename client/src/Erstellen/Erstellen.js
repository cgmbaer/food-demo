import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import ImagePlaceholder from './imagePlaceholder.jpg'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import SaveName from './SaveName'

const Input = styled('input')({
  display: 'none'
});

const Img = styled('img')({
  width: '100%',
  borderRadius: 5,
});

function ImageUpload() {

  const [image, setImage] = useState(null)

  const handleChange = e => {
    console.log(image)
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <Box sx={{ paddingTop: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" onChange={handleChange} type="file" />
        {!image ? (<IconButton color="primary" component="span">
          <AddAPhotoIcon sx={{ fontSize: 60 }} />
        </IconButton>) : (
          <Img src={image} alt='add' width='160px' />
        )}
      </label>
    </Box>
  );
}

function ZutatContainer() {
  return (
    <p>test</p>
  )
}

export default function Erstellen() {

  const [recipeId, setRecipeId] = useState("");

  const items = [1, 2, 3]

  const Items = items.map((x, i) =>
    <ZutatContainer value={x} key={i} />
  )

  useEffect(() => {
    console.log(recipeId)
  })

  return (
    <Container>
      <SaveName setRecipeId={setRecipeId} />
      <ImageUpload />
      {Items}
    </Container>
  );
}