// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import Dashboard from './components/Dashboard';
// import BikesList from './components/BikesList';
// import StationsList from './components/StationsList';
// import UsersList from './components/UsersList';

// function App() {
//   return (
//     <Router>
//       <div className="flex h-screen">
//         <Sidebar />
//         <div className="flex flex-col flex-1">
//           <Navbar />
//           <div className="p-6 flex-1 bg-gray-50">
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/bicycles" element={<BikesList />} />
//               <Route path="/stations" element={<StationsList />} />
//               <Route path="/users" element={<UsersList />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;




