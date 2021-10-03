import './App.css';

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