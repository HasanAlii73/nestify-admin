export const stats = [
  { id: 1, title: "Total Listings", value: 124 },
  { id: 2, title: "Total Users",    value: 58  },
  { id: 3, title: "For Sale",       value: 89  },
  { id: 4, title: "For Rent",       value: 35  },
];

export const listings = [
  { id: 1, title: "Apartment in Mezzeh",      city: "Damascus", price: 185000, type: "sale",  status: "active" },
  { id: 2, title: "Villa in Abu Rummaneh",    city: "Damascus", price: 4200,   type: "rent",  status: "active" },
  { id: 3, title: "Studio in Kafr Sousa",     city: "Damascus", price: 95000,  type: "sale",  status: "sold"   },
  { id: 4, title: "Commercial in Al Hamra",   city: "Damascus", price: 55000,  type: "sale",  status: "active" },
  { id: 5, title: "Apartment in Al Malki",    city: "Damascus", price: 2400,   type: "rent",  status: "active" },
];

export const users = [
  { id: 1, name: "Ahmad Karimi",  email: "ahmad@email.com",  role: "seller", listings: 3 },
  { id: 2, name: "Sara Mousa",    email: "sara@email.com",   role: "buyer",  listings: 0 },
  { id: 3, name: "Hasan Ali",     email: "hasan@email.com",  role: "seller", listings: 5 },
  { id: 4, name: "Lena Qasim",    email: "lena@email.com",   role: "buyer",  listings: 0 },
];