import React, { useState } from 'react';

const AtividadeEdit = ({ activity, onSave }) => {
  const [name, setName] = useState(activity?.name || '');
  const [status, setStatus] = useState(activity?.status || 'PENDENTE');
  const [artifacts, setArtifacts] = useState(activity?.artifacts || []);

  const addArtifact = () => {
    setArtifacts([...artifacts, { id: '', description: '' }]);
  };

  const updateArtifact = (index, field, value) => {
    const newArtifacts = [...artifacts];
    newArtifacts[index][field] = value;
    setArtifacts(newArtifacts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...activity, name, status, artifacts });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Activity Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PENDENTE">PENDENTE</option>
          <option value="ANDAMENTO">ANDAMENTO</option>
          <option value="TESTANDO">TESTANDO</option>
          <option value="PRONTO">PRONTO</option>
        </select>
      </div>
      <div>
        <h4>Artifacts</h4>
        {artifacts.map((artifact, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="ID"
              value={artifact.id}
              onChange={(e) => updateArtifact(index, 'id', e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={artifact.description}
              onChange={(e) => updateArtifact(index, 'description', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addArtifact}>Add Artifact</button>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default AtividadeEdit;