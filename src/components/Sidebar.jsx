// import React from 'react';
// //import './Sidebar.css';

// export default function Sidebar() {
//   return (
//     <div className="w-64 bg-gray-800 text-white h-screen p-5">
//       <h2 className="text-xl font-bold mb-6">BICYCLE MANAGEMENT</h2>
//       <ul className="space-y-4">
//         <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Dashboard</li>
//         <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Bicycles</li>
//         <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Rental Points</li>
//       </ul>
//     </div>
//   );
// }

import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-5">
      <h2 className="text-xl font-bold mb-6">BICYCLE MANAGEMENT</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:bg-gray-700 p-2 rounded block">Dashboard</Link>
        </li>
        <li>
          <Link to="/bicycles" className="hover:bg-gray-700 p-2 rounded block">Bicycles</Link>
        </li>
        <li>
          <Link to="/stations" className="hover:bg-gray-700 p-2 rounded block">Stations</Link>
        </li>
        <li>
          <Link to="/users" className="hover:bg-gray-700 p-2 rounded block">Users</Link>
        </li>
      </ul>
    </div>
  );
}

