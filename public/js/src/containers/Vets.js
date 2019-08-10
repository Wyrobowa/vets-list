import React, { useEffect, useState } from 'react';

import TagList from '../components/TagList';
import VetGallery from '../components/VetGallery';
import ActionButtons from '../components/ActionButtons';

const Vets = () => {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    fetch('/api/admin/vets')
      .then(response => response.json())
      .then(data => setVets(data));
  }, []);

  return (
    <div className="vets">
      <h1>Vets List</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Tags</th>
            <th scope="col">Address</th>
            <th scope="col">Logo</th>
            <th scope="col">Gallery</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vets.map((vet) => {
            const vetLogo = (vet.vet_logo) ? `${vet.slug}/${vet.vet_logo}` : 'logo.jpeg';
            return (
              <tr key={vet._id}>
                <td>{vet.name}</td>
                <td><TagList tags={vet.tags}/></td>
                <td>{vet.location.address}</td>
                <td><img src={`/public/uploads/vets_logos/${vetLogo}`} alt={vet.name}/></td>
                <td><VetGallery images={vet.vet_gallery} vetSlug={vet.slug} vetName={vet.name}/></td>
                <td><ActionButtons/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
}

export default Vets;
