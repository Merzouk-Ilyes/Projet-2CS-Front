//rfce
import React, { useState } from "react";
import {FiLogOut} from "react-icons/fi"
import "../../styles/sidebar.sass";
import face from "../../assets/host.png";
import { sidebarData } from './sidebarData';
import {AiFillFileAdd ,FaAccessibleIcon, BsFilePost , FcStatistics} from "react-icons/fa"
//import { Item } from 'framer-motion/types/components/Reorder/Item';
function Sidebar() {
  const [selected, setSelected] = useState(0)
  return (
    <div className='sidebar'>

        <div className='logo'> logo  </div>

         <div className="image"> 
          <img src = {face} ></img>
         </div> 

         <div className="hostName" >
             
             name 
         
         </div>

      
      <div className='menu'>

        {sidebarData.map((item , index) => {
        
        return(

            <div className={selected === index ? "menuItem active" : "menuItem"}
            key={index} 
            onClick={() => setSelected(index)}
            >
            
                <item.icon /> 
                <span> {item.heading} </span>

            </div>
            
             ) ;  })}


          
    
    
        </div> 
        <div className="menuItem" >
        <FiLogOut />  
        </div>


       
       

    </div>
    
  )
}

export default Sidebar
