import './App.css';

export default function Drafts() {

  const items = [1,2,3,4,5].map((x) =>
    <li key = {x}>
      {x}
    </li>
  )

  return (
    items
  );
}