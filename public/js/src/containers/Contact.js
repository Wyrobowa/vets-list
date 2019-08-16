import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import Flash from '../components/FlashMessages';

const Contact = (props) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    lng: '',
    lat: '',
  });

  useEffect(() => {
    fetch('/api/admin/contact')
      .then(response => response.json())
      .then((data) => {
        data.address = data.location.address;
        data.lng = data.location.coordinates[0];
        data.lat = data.location.coordinates[1];
        setContact(data);
      })
  }, []);

  const handleChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    })
  };

  const handleAddressChange = (event) => {
    geocodeByAddress(event.target.value)
      .then((results) => getLatLng(results[0]))
      .then((results) => {
        setContact({
          ...contact,
          lat: results.lat,
          lng: results.lng,
        });
      })
      .catch(error => console.error('Error', error));
  };

  const assignLocationFields = () => ({
    ...contact,
    location: {
      address: contact.address || '',
      coordinates: [contact.lng || '', contact.lat || ''],
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const {address, lng, lat, ...parsedData} = assignLocationFields();

    fetch('/api/admin/contact/edit', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ parsedData } )
     }).then(response => response.json());
  };

  return (
    <div className="contact">
      {props.location.state
        && <Flash flash={props.location.state} />
      }
      <h1>Contact Info</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" type="text" name="name" onChange={handleChange} value={contact.name} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="text" name="email" onChange={handleChange} value={contact.email} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input className="form-control" type="number" name="phone" onChange={handleChange} value={contact.phone} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" id="address" name="addressContact" onChange={handleAddressChange} placeholder="Full address" 
          className="form-control"  value={contact.address} />
        </div>
        <div className="form-group">
          <label>Address Lng</label>
          <input type="text" id="lng" name="latContact" className="form-control" readOnly
          placeholder="Longitude" required defaultValue={contact.lng} />
          <label>Address Lat</label>
          <input type="text" id="lat" name="lngContact" className="form-control" readOnly
          placeholder="Latitude" required defaultValue={contact.lat} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
    </div>
  );
};

export default withRouter(Contact);
