const staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`;

const menu = [
    { slug: '/vets', title: 'List of Vets', icon: 'fa-paw', },
    { slug: '/tags', title: 'Tags', icon: 'fa-tags', },
    { slug: '/top', title: 'Top Vets', icon: 'fa-thumbs-up', },
    { slug: '/map', title: 'Map', icon: 'fa-map', },
    { slug: '/add', title: 'Add Vet', icon: 'fa-plus-square', },
];

module.exports = { menu, staticMap }