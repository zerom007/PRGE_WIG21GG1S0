import React from "react";

function TodoItem({ id, zadanie, listItemRemover }) {
  console.log(id, zadanie);
  return (
    <div key={id}>
      Nr {id}. Opis zadania: {zadanie}
      <button onClick={(e) => listItemRemover(id)}>REMOVE</button>
    </div>
  );
}

export default TodoItem;
