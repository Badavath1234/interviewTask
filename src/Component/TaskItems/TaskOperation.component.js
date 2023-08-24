import React from 'react';

function TaskOperation({ task }) {
  return (
    <div>
      <li>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        {!task.completed ? <button>Mark as Completed</button> : <p>Completed</p>}
        <button>Edit</button>
        <button>Delete</button>
      </li>
    </div>
  );
}

export default TaskOperation;
