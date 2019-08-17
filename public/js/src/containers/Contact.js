import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";

import Flash from '../components/FlashMessages';
import Button from '../components/Button';
import Icon from '../components/Icon';

const Contact = (props) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    location: {
      address: '',
      coordinates: {
        lng: '',
        lat: '',
      },
    },
  });

  const [flash, setFlash] = useState(false);

  useEffect(() => {
    fetch('/api/admin/contact')
      .then(response => response.json())
      .then((data) => {
        setContact(data);
        if (props.location.state) {
          setFlash(props.location.state);
        }
      })
  }, []);

  const handleChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value
    })
  };

  const googleMaps = (event) => {
    setContact({
      ...contact,
      location: {
        address: event.target.value,
        coordinates: ['', ''],
      }
    });
    const autocomplete = new google.maps.places.Autocomplete(event.target);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        setContact({
          ...contact,
          location: {
            address: place.formatted_address,
            coordinates: [place.geometry.location.lng() || '', place.geometry.location.lat() || ''],
          }
        });
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/admin/contact/edit', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contact } )
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setFlash(data);
    });
  };

  return (
    <div className="contact-container">
      {flash
        && <Flash flash={flash}/>
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
          <input type="text" id="address" name="addressContact" onChange={googleMaps} placeholder="Full address" 
          className="form-control"  value={contact.location.address} />
        </div>
        <div className="form-group">
          <label>Address Lng</label>
          <input type="text" id="lng" name="latContact" className="form-control" readOnly
          placeholder="Longitude" required defaultValue={contact.location.coordinates[1]} />
          <label>Address Lat</label>
          <input type="text" id="lat" name="lngContact" className="form-control" readOnly
          placeholder="Latitude" required defaultValue={contact.location.coordinates[0]} />
        </div>
        <Button buttonType="button" type="submit" size="normal" model="success" handleClick={handleSubmit}>
          <Icon type="edit" />
          Edit contact info
        </Button>
      </form>
      
    </div>
  );
};

export default withRouter(Contact);
