import React from 'react';
import { useParams } from 'react-router-dom';

export const Topic = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Topic ID: {id}</h1>
    </div>
  );
};
