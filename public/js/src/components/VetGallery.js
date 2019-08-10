import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const VetGallery = ({ images, vetSlug, vetName }) => {
  return (
    images.map((image) => <img key={image} src={`/public/uploads/vets_galleries/${vetSlug}/${image}`} alt={vetName}/>)
  );
}

export default VetGallery;
