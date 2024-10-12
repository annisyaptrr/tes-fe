import React, { useState, }from 'react';
import './Navbar.css';

function Navbar() {
  const [time, setTime] = useState(new Date());
 
//   useEffect(()=> {
//     const timerId = setInterval(()=>{
//         setTime(new Date());
//     }, 1500);

//     return () => clearInterval(timerId);
//   }, []);

//   const formatTime = (date) => {
//     return date.toLocaleTimeString();
//   };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Basic Test</h1>
      </div>
      {/* <div className="navbar-time">
        {formatTime(time)}
        </div> */}
      </nav>
  );
}

export default Navbar;
