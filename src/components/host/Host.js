import React from 'react'
import "../../styles/Host.sass";
import Sidebar from "../utilities/sidebar";

import Dashboard from './dashboardCopoments/Dashboard';
import Posts from './dashboardCopoments/Posts';
import Statistics from './dashboardCopoments/Statistics';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Host() {
  return (
    <>
    <div className="dashbord">

      
         
        <Sidebar >
        </Sidebar>
         
        <Posts /> 
         <div></div>
        
        

    </div>


  
  
  </>
    
  )
}

export default Host