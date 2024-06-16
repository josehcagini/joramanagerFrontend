import React from 'react';

import PropTypes from 'prop-types';

const AtividadeDashBoard = ({ activities, onEdit, onCreate }) => {
  const statuses = ["PENDENTE", "ANDAMENTO", "TESTANDO", "PRONTO"];

  return (
    <div className="kanban-board">
      {statuses.map(status => (
        <div key={status} className="kanban-column">
          <h3>{status}</h3>
          <div className="kanban-items">
            {activities.filter(activity => activity.status === status).map(activity => (
              <div key={activity.id} className="kanban-item">
                <p>{activity.name}</p>
                <button onClick={() => onEdit(activity)}>Edit</button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={onCreate}>Create New Activity</button>
    </div>
  );
};

export default AtividadeDashBoard;


AtividadeDashBoard.propTypes = {
  activities: PropTypes.array,
  onEdit: PropTypes.func,
  onCreate: PropTypes.func
}
