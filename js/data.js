// Sourced from the "Website Requirements" Google Sheet. No rent column yet,
// so each listing shows "Price on request" until that's added.
const properties = [
  { id: 1, name: 'CRM', types: ['1 BHK', '2 BHK', '3 BHK'], location: 'Kadugodi', mapLink: '', amenities: ['Power Backup', 'Lift', 'Car Parking (2 cars)'], hasPhotos: false },
  { id: 2, name: 'Brindhavan', types: ['1 BHK', '2 BHK'], location: 'Kadugodi', mapLink: '', amenities: ['Power Backup', 'Lift', 'Car Parking (2 cars)', 'Caretaker'], hasPhotos: false },
  { id: 3, name: 'Sri Sai Nivas', types: ['1 BHK', '2 BHK'], location: 'Kadugodi', mapLink: 'https://maps.app.goo.gl/4HuvhhXrH6wvjC5b6?g_st=iw', amenities: ['Power Backup', 'Lift'], hasPhotos: false },
  { id: 4, name: 'Manvik Residency', types: ['1 BHK'], location: 'Nallurahalli, ARO City', mapLink: 'https://maps.app.goo.gl/WQEbm18KZKK3RAy58?g_st=aw', amenities: ['Power Backup (gen)', 'Lift', 'Caretaker'], hasPhotos: false },
  { id: 5, name: 'Sri Chennaraya Swamy Prasanna', types: ['1 BHK', '2 BHK', 'RK'], location: 'Munnekolala', mapLink: '', amenities: ['Power Backup', 'Lift', 'CCTV', 'Caretaker'], hasPhotos: false },
  { id: 6, name: 'SH Homes', types: ['1 BHK', 'RK'], location: 'Munnekolala', mapLink: 'https://maps.app.goo.gl/Qcyp13phZTKZRmdj8?g_st=aw', amenities: ['Power Backup', 'Lift'], hasPhotos: false },
  { id: 7, name: 'Krithik Crest', types: ['1 BHK'], location: 'Munnekolala', mapLink: '', amenities: ['Power Backup', 'Lift', 'CCTV', 'Caretaker'], hasPhotos: false },
  { id: 8, name: 'Yalamuri', types: ['1 BHK'], location: 'Electronic City', mapLink: '', amenities: ['Power Backup (gen)', 'Lift', 'CCTV', 'Caretaker'], hasPhotos: false },
  { id: 9, name: 'Sri Ganesh Residency', types: ['1 BHK'], location: 'Gunjur Palya', mapLink: 'https://maps.app.goo.gl/kjXoudeuanFCbmH79?g_st=aw', amenities: ['Power Backup (gen)', 'Lift', 'CCTV', 'Caretaker', 'Car Parking'], hasPhotos: true },
  { id: 10, name: 'CK Nivasa', types: ['1 BHK', '2 BHK'], location: 'Electronic City', mapLink: 'https://maps.app.goo.gl/E9U5nwUYsTd5gaZE8?g_st=ic', amenities: ['Power Backup (gen)', 'Lift', 'CCTV', 'Caretaker', 'Car Parking'], hasPhotos: true },
  { id: 11, name: 'GN Residency', types: ['1 BHK', '2 BHK'], location: 'Kadugodi', mapLink: 'https://maps.app.goo.gl/sM1UtDutkJGPenGi6?g_st=iw', amenities: [], hasPhotos: false },
  { id: 12, name: 'CK Nivas', types: ['1 BHK', '2 BHK'], location: 'Electronic City', mapLink: 'https://maps.app.goo.gl/LGog4KsRHj6qvYnP8', amenities: ['Power Backup (gen)', 'Lift', 'CCTV', 'Caretaker', 'Car Parking'], hasPhotos: false },
];

// Derived from the localities in the "Website Requirements" sheet — all
// current listings are in and around East Bengaluru.
const locations = [
  { id: 1, name: 'Kadugodi', city: 'Bengaluru', listings: 4, image: null },
  { id: 2, name: 'Munnekolala', city: 'Bengaluru', listings: 3, image: null },
  { id: 3, name: 'Electronic City', city: 'Bengaluru', listings: 3, image: null },
  { id: 4, name: 'Gunjur Palya', city: 'Bengaluru', listings: 1, image: null },
  { id: 5, name: 'Nallurahalli, ARO City', city: 'Bengaluru', listings: 1, image: null },
];

const testimonials = [
  { id: 1, name: 'Ananya Rao', role: 'Tenant, Koramangala', quote: 'I moved cities for work and found a home in three days flat — no agent fees, no back-and-forth. The whole process felt honest.' },
  { id: 2, name: 'Rahul Menon', role: 'Tenant, Powai', quote: 'Every listing matched what I actually saw on the visit. That alone made this better than every other portal I tried.' },
  { id: 3, name: 'Priya Nair', role: 'Building Owner, Indiranagar', quote: 'Listing our building took minutes and we started getting genuine, verified enquiries within the week.' },
];
