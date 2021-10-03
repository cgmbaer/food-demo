import './App.css';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export default function Trash() {

  const items = [5,4,3,2,1].map((x) =>
    <li key = {x}>
      {x}
    </li>
  )

  return (
    items
  );
}