import React from 'react'
import "../../styles/Host.sass";
import Sidebar from "../utilities/sidebar";
import Dashboard from './dashboardCopoments/Dashboard';
import Posts from './dashboardCopoments/Posts';
import Statistics from './dashboardCopoments/Statistics';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Host() {
  return (
  
  
    <div className="dashbord">
  

    
      
      
      
      <Sidebar /> 

{/* <Route path="/host/dashboard" element ={<Dashboard />} /> */}
{/* <Route path="/host/posts" component={Posts} /> */}

{/* <Route path="/host/statistics" element={<Statistics />} />  */}
{/* <Posts></Posts> */}


      
  <Posts />

        
        

    </div>


  
  
  
    
  )
}

export default Host