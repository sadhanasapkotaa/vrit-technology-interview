# vrit-technology-interview



Documentation
Secret key generated from django secrets 


To do later:
env more variables
Created at updated at in services and appointments. 
Write tests
rate limiting, pagination and logging

  class Meta:
        ordering = ["-date", "-time"]



Service and Appointment
One to many relationship




frontend/
└── src/
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Sidebar.jsx
    │   ├── ServiceForm.jsx
    │   └── AppointmentForm.jsx
    │
    ├── layouts/
    │   └── DashboardLayout.jsx
    │
    ├── pages/
    │   ├── services/
    │   │   ├── ServicesPage.jsx
    │   │   ├── ServiceDetailsPage.jsx
    │   │   └── CreateServicePage.jsx
    │   │
    │   └── appointments/
    │       ├── AppointmentsPage.jsx
    │       └── AppointmentDetailsPage.jsx
    │
    ├── api/
    │   ├── services.js
    │   └── appointments.js
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css

    



                         React
                           │
                    ┌──────┴──────┐
                    │   Navbar    │
                    └──────┬──────┘
                           │
             ┌─────────────┴─────────────┐
             │                           │
         SERVICES                   APPOINTMENTS
             │                           │
        ┌────┴────┐                 ┌────┴────┐
        │ Sidebar │                 │ Sidebar │
        └────┬────┘                 └────┬────┘
             │                           │
     ┌───────┴────────┐          ┌───────┴────────┐
     │                │          │                │
   List             Create      List             Details
   Service           Service    Appointments
     │
     ↓
   Django REST API
     │
     ├── /api/services
     │
     └── /api/appointments
             │
             ↓
          SQLite