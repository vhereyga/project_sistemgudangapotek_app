// src/components/ParentComponent.jsx

import { useState } from 'react';
import DaftarStokObat from '../pages/DaftarStokObat';

const ParentComponent = () => {
  const [obatData, setObatData] = useState([]); // Mendefinisikan state untuk obatData

  return (
    <div>
      <DaftarStokObat obatData={obatData} setObatData={setObatData} />
    </div>
  );
};

export default ParentComponent;
