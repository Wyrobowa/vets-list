import React, { useEffect, useState } from 'react';

import { withRouter } from "react-router";

const Vet = (props) => {
  const [vetData, setVet] = useState({
    vet: {
      name: '',
      description: '',
      tags: [],
      address: '',
      lng: '',
      lat: '',
      vet_logo: '',
      vet_gallery: '',
      editors: [],
    },
    tags: [],
    editors: [],
  });

  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch(`/api/admin/vet/${props.match.params.slug}/edit`)
      .then(response => response.json())
      .then((data) => {
        data.vet.address = data.vet.location.address;
        data.vet.lng = data.vet.location.coordinates[0];
        data.vet.lat = data.vet.location.coordinates[1];
        setVet(data);

        const tags = data.vet.tags.reduce((prev, cur) => {
          prev.push(cur._id);
          return prev;
        }, []);
        setTags(tags);
      })
  }, []);

  const handleChange = (event) => {
    // setVet({
    //   ...vetData,
    //   [event.target.name]: event.target.value
    // })
  };

  const handleAddressChange = (event) => {
    geocodeByAddress(event.target.value)
      .then((results) => getLatLng(results[0]))
      .then((results) => {
        setVet({
          ...vet,
          lat: results.lat,
          lng: results.lng,
        });
      })
      .catch(error => console.error('Error', error));
  };

  const assignLocationFields = () => ({
    ...vet,
    location: {
      address: vet.address || '',
      coordinates: [vet.lng || '', vet.lat || ''],
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const {address, lng, lat, ...parsedData} = assignLocationFields();

    fetch('/api/admin/vet/:slug/edit', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ parsedData } )
     }).then(response => response.json());
  };

  return (
    <div className="vet-container">
      <h1>Vet</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={vetData.vet.name} className="form-control" placeholder="Name" 
          onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea type="text" name="description" className="form-control" placeholder="Description" 
          onChange={handleChange} value={vetData.vet.description} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" id="address" name="address" value={vetData.vet.address} placeholder="Full address" 
          className="form-control" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label>Address Lng</label>
          <input type="text" id="lng" name="lng" value={vetData.vet.lng} className="form-control" placeholder="Longitude" 
          required readOnly />
          <label>Address Lat</label>
          <input type="text" id="lat" name="lat" value={vetData.vet.lat} className="form-control" placeholder="Latitude" 
          required readOnly />
        </div>
        <div className="form-group">
          <label>Tags </label>
          <div className="clearfix"></div>
          {vetData.tags.map((tag) => {
            // console.log(tag._id, vetData.vet.tags);
            return (
            <div className="form-group form-check form-check-inline" key={tag._id}>
              <input type="checkbox" id={tag._id} value={tag._id} name="tags" className="form-check-input" 
              checked={tags.includes(tag._id)} onChange={handleChange} />
              <label htmlFor={tag._id} className="form-check-label">{tag.name}</label>
            </div>
            );
          })}
        </div>
        <div className="form-group">
              {/* .input-group
                  .input-group-prepend
                      span.input-group-text(for="vet_logo") Logo
                  .custom-file
                      input(type="file" class="custom-file-input" id="vet_logo" name="vet_logo")
                      label.custom-file-label Choose file
              if vet.vet_logo 
                  img(src=`/public/uploads/vets_logos/${vet.slug}/${vet.vet_logo}` alt=vet.name width=200) */}
        </div>
        <div className="form-group">
              {/* .input-group.gallery
                  .input-group-prepend
                      span.input-group-text(for="vet_gallery") Gallery
                  .custom-file
                      input(type="file" class="custom-file-input" id="vet_gallery" name="vet_gallery" multiple)
                      label.custom-file-label Choose files
              if vet.vet_gallery
                  each image in vet.vet_gallery
                      .gallery-small(id=image)
                          img.image-small(src=`/public/uploads/vets_galleries/${vet.slug}/${image}` alt=vet.name width=200)
                          span.js-removeGalleryImage.trash-small.trash-icon.fas.fa-trash(data-id=image) */}
        </div>
        <div className="form-group">
              {/* .input-group
                  - const vetEditors = vet.editors || []
                  - const parsedVetEditors = vetEditors.join(',').split(',')
                  .input-group-prepend
                      label.input-group-text.font-weight-light Assign editor(s)
                  select.custom-select(name='editors' size=5 multiple)
                      each editor in editors
                          option.text-uppercase(name=editor._id value=editor._id selected=(parsedVetEditors.includes(editor._id.toString())))= `${editor.first_name} ${editor.last_name}` */}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
    </div>
  );
};

export default withRouter(Vet);
