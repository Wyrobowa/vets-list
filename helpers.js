const staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${
  process.env.MAP_KEY
}&markers=${lat},${lng}&scale=2`;

const dump = obj => JSON.stringify(obj, null, 2);

const menu = [
  { slug: '/vets', title: 'List of Vets', icon: 'fa-paw' },
  { slug: '/tags', title: 'Tags', icon: 'fa-tags' },
  { slug: '/top', title: 'Top Vets', icon: 'fa-thumbs-up' },
  { slug: '/contact', title: 'Contact', icon: 'fa-phone' },
];

const adminMenu = [
  { slug: '/admin/users', title: 'Users', icon: 'fa-user' },
  { slug: '/admin/vets', title: 'Vets', icon: 'fa-paw' },
  { slug: '/admin/tags', title: 'Tags', icon: 'fa-tags' },
  { slug: '/admin/contact', title: 'Contact Info', icon: 'fa-phone' },
];

module.exports = {
  menu, adminMenu, staticMap, dump,
};
