/* eslint-disable */
const googleMaps = () => {
  const input = document.querySelector('#address');
  const autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      document.querySelector('#address').value = place.formatted_address;
      document.querySelector('#lat').value = place.geometry.location.lat();
      document.querySelector('#lng').value = place.geometry.location.lng();
  });
  google.maps.event.addDomListener(window, 'load', googleMaps); 
}

export default googleMaps;
