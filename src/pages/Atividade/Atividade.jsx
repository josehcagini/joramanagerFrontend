import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AtividadeForm from '../Atividade/AtividadeForm';

const Atividade = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activity = location.state?.activity || null;

  const handleSave = (savedActivity) => {
    // Save the activity (create or update)
    // Here you would typically make an API call to save the activity
    console.log('Saved activity:', savedActivity);
    navigate('/');
  };

  return (
    <div>
      <h1>{activity ? 'Edit Activity' : 'Create Activity'}</h1>
      <AtividadeForm activity={activity} onSave={handleSave} />
    </div>
  );
};

export default Atividade;
