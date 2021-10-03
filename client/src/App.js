import './App.css';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, Route, BrowserRouter, useLocation } from 'react-router-dom';
import Drafts from './Drafts';
import Trash from './Trash';


function NavBar() {

  const location = useLocation();

  return (
    <Container maxWidth="sm">
      <Tabs value={location.pathname}>
        <Tab label="Inbox" value="/" to="/" component={Link} />
        <Tab label="Drafts" value="/drafts" to="/drafts" component={Link} />
        <Tab label="Trash" value="/trash" to="/trash" component={Link} />
      </Tabs>
      <Route exact path='/'><Drafts /></Route>
      <Route path='/drafts'><Drafts /></Route>
      <Route path='/trash'><Trash /></Route>
    </Container>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  )
}