import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";

import TagList from '../components/TagList';
import Flash from '../components/FlashMessages';

const Vets = (props) => {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    fetch('/api/admin/vets')
      .then(response => response.json())
      .then(data => setVets(data));
  }, []);

  return (
    <div className="vets">
      {props.location.state
        && <Flash flash={props.location.state} />
      }
      <div className="title">
        <h1>Vets List</h1>
        
      </div>
      <table className="table table-hover">
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
                <td className="text-center"><img src={`/public/uploads/vets_logos/${vetLogo}`} alt={vet.name}/></td>
                <td className="text-center">{(vet.vet_gallery.length > 0) ? vet.vet_gallery.length : ''}</td>
                <td className="text-center"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
}

export default withRouter(Vets);
