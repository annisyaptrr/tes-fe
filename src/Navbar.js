import React, { useState, }from 'react';
import './Navbar.css';

function Navbar({state}) {
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
    <nav className="flex items-center w-full h-auto justify-between w-full p-[15px] shadow-md bg-white">
      <div className="navbar-brand">
        <h1>Basic Test</h1>
      </div>
        <div className='flex items-center gap-[10px]'>
        <div>
          {state.timeRemaining}
        </div>
        <div>
          {state.index}
          /
          {state.data.length}
        </div>
        </div>
      </nav>
  );
}

export default Navbar;
