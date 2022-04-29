// import { Checkbox } from '@chakra-ui/react';
import React , { useState } from 'react'
import "../../../styles/dashboardCompoments/Posts.sass";
import { toast } from "react-toastify";
import Checkbox from "react-custom-checkbox"; 
import * as Icon from "react-icons/fi";
import { BsFillCloudUploadFill } from "react-icons/bs";

function Posts() {

  const [postData, setPostData] = useState({
    title : "",
    city: "",
    street: "",
    nbBeds: "",
    nbBaths: "",
    space: "",
    description :"" , 
    pricePerNight :"" , 
    furnish: "false",
    gas :"false" , 
    electricty :"false" ,
    water :"false" , 
    
    
  });

  const [images , setPath ] = useState([]) ; 
  // console.log( images , "images")

  const handleSubmit =(e) =>{
    e.preventDefault();
    var pattern = new RegExp("[0-9][0-9]*"); 

    
    

    if (!pattern.test(postData.pricePerNight)) {
      toast.error("price  should contain only numbers ");
      return;
    }

    if (!pattern.test(postData.space)) {
      toast.error("Space should contain only numbers ");
      return;
    }


    // beds and Baths are not required do we check first if host introduced value 
    // for them then we check if they match with the pattern


    if ( postData.nbBeds != ""  && !pattern.test(postData.nbBaths) ) {
      toast.error(" number of baths  should contain only numbers ");
      return;
    }

    if ( postData.nbBeds != ""  && !pattern.test(postData.nbBeds ) ){
     
        toast.error("number of beds should contain only numbers ");
        return;
      
    }






  } 


  return (
      <div className='addpost'>

       <div className='div1' >
        <h3 className="title">Add post</h3>
        <form className="form" onSubmit={handleSubmit}>

        {/* _______________________________________title ______________________________________________________ */}
             <div>
             <div>
                <p>Title</p>
                <input
                  type="text"
                  value={postData.title}
                  className="form-control titre"
                  placeholder="title"
                  onChange={(e) => {
                    const data =  {
                      title: e.target.value,
                      city: postData.city,
                      street: postData.street,
                      nbBeds: postData.nbBeds,
                      nbBaths: postData.nbBaths,
                      space: postData.space,
                      description :postData.description, 
                      pricePerNight :postData.pricePerNight , 
                      furnish: postData.furnish,
                      gas : postData.gas, 
                      electricty :postData.electricty ,
                      water :postData.water
 
                    };
                    setPostData(data);
                  }}
                  required
                />
             </div>
             </div>

             {/* ___________________________ city + street __________________________________________ */}
             <div className='group'>
                  {/* ________city   */}

                  
                    <div>
                        <p>city</p>
                         <input
                          type="text"
                          value={postData.city}
                          className="form-control"
                          placeholder="city"
                          onChange={(e) => {
                          const data =  {
                         title: postData.title ,
                         city: e.target.value,
                         street: postData.street,
                         nbBeds: postData.nbBeds,
                         nbBaths: postData.nbBaths,
                         space: postData.space,
                         description :postData.description, 
                         pricePerNight :postData.pricePerNight , 
                         furnish: postData.furnish,
                         gas : postData.gas, 
                         electricty :postData.electricty ,
                         water :postData.water
 
                         };
                        setPostData(data);
                        }}
                         required
                       />
                    </div>
                    {/* ________street */}
                    <div>
                        <p>street </p>
                         <input
                          type="text"
                          value={postData.street}
                          className="form-control"
                          placeholder="street"
                          onChange={(e) => {
                          const data =  {
                         title: postData.title ,
                         city: postData.city ,
                         street: e.target.value,
                         nbBeds: postData.nbBeds,
                         nbBaths: postData.nbBaths,
                         space: postData.space,
                         description :postData.description, 
                         pricePerNight :postData.pricePerNight , 
                         furnish: postData.furnish,
                         gas : postData.gas, 
                         electricty :postData.electricty ,
                         water :postData.water
 
                         };
                        setPostData(data);
                        }}
                         required
                       />
                    </div>              
               
             </div> 


             {/* _______________beds+ baths _______________ */}
             <div className='group'>
             <div>
                        <p>beds </p>
                         <input
                          type="text"
                          value={postData.nbBeds}
                          className="form-control"
                          placeholder="beds"
                          onChange={(e) => {
                          const data =  {
                         title: postData.title ,
                         city: postData.city ,
                         street:  postData.street,
                         nbBeds : e.target.value,
                         nbBaths: postData.nbBaths,
                         space: postData.space,
                         description :postData.description, 
                         pricePerNight :postData.pricePerNight , 
                         furnish: postData.furnish,
                         gas : postData.gas, 
                         electricty :postData.electricty ,
                         water :postData.water
 
                         };
                        setPostData(data);
                        }}
                         
                       />
                    </div>
                    
                    <div>
                        <p>baths </p>
                         <input
                          type="text"
                          value={postData.nbBaths}
                          className="form-control"
                          placeholder="baths"
                          onChange={(e) => {
                          const data =  {
                         title: postData.title ,
                         city: postData.city ,
                         street: postData.street,
                         nbBeds: postData.nbBeds,
                         nbBaths: e.target.value,
                         space: postData.space,
                         description :postData.description, 
                         pricePerNight :postData.pricePerNight , 
                         furnish: postData.furnish,
                         gas : postData.gas, 
                         electricty :postData.electricty ,
                         water :postData.water
 
                         };
                        setPostData(data);
                        }}
                         
                       />
                    </div>                                  
                </div>
             {/* _______________space + price_______________ */}
             <div className='group'>
             <div>
                        <p>price </p>
                         <input
                          type="text"
                          value={postData.pricePerNight}
                          className="form-control"
                          placeholder="price per night "
                          onChange={(e) => {
                          const data =  {
                         title: postData.title ,
                         city: postData.city ,
                         street:  postData.street,
                         nbBeds : postData.nbBeds,
                         nbBaths: postData.nbBaths,
                         space: postData.space,
                         description :postData.description, 
                         pricePerNight :e.target.value , 
                         furnish: postData.furnish,
                         gas : postData.gas, 
                         electricty :postData.electricty ,
                         water :postData.water
 
                         };
                        setPostData(data);
                        }}
                        required 
                       />
                    </div>
                    
                    <div>
                        <p>space </p>
                         <input
                          type="text"
                          value={postData.space}
                          className="form-control"
                          placeholder="space"
                          onChange={(e) => {
                          const data =  {
                         title: postData.title ,
                         city: postData.city ,
                         street: postData.street,
                         nbBeds: postData.nbBeds,
                         nbBaths: postData.nbBaths,
                         space: e.target.value,
                         description :postData.description, 
                         pricePerNight :postData.pricePerNight , 
                         furnish: postData.furnish,
                         gas : postData.gas, 
                         electricty :postData.electricty ,
                         water :postData.water
 
                         };
                        setPostData(data);
                        }}
                        required
                         
                       />
                    </div>                                  
                </div>
 
                {/* ______gaz electricty water furnish ____ */}
             
             <div className='chekboxes'>

        <Checkbox
          className="cb"
         icon={<Icon.FiCheck color="#ff5F5A" size={17} />}
        name="gaz"
        checked={false}
        onChange={(e) => {
          const data =  {
         title: postData.title ,
         city: postData.city ,
         street:  postData.street,
         nbBeds :postData.nbBeds,
         nbBaths: postData.nbBaths,
         space: postData.space,
         description :postData.description, 
         pricePerNight :postData.pricePerNight , 
         furnish: postData.furnish,
         gas : ! postData.gas , 
         electricty :postData.electricty ,
         water :postData.water

         };
        setPostData(data);
        console.log(postData.gas)
        }}
        borderColor="#FF5A5F"
        style={{ cursor: "pointer"  ,marginRight: 5 }}
        labelStyle={{  userSelect: "none" }}
        label="gaz"
      />
      <Checkbox
        className="cb"
        icon={<Icon.FiCheck color="#ff5F5A" size={17} />}
        name="electricity"
        checked={false}
        onChange={(e) => {
          const data =  {
            title: postData.title ,
            city: postData.city ,
            street:  postData.street,
            nbBeds :postData.nbBeds,
            nbBaths: postData.nbBaths,
            space: postData.space,
            description :postData.description, 
            pricePerNight :postData.pricePerNight , 
            furnish: postData.furnish,
            gas : postData.gas, 
            electricty : ! postData.electricty,
            water :postData.water

         };
        setPostData(data);
        console.log(postData.gas)
        }}
        borderColor="#FF5A5F"
        style={{ cursor: "pointer" ,marginRight: 5 }}
        labelStyle={{ userSelect: "none" }}
        label="electricity"
      />

<Checkbox
  className="cb"
        icon={<Icon.FiCheck color="#ff5F5A" size={17} />}
        name="water"
        checked={false}
        onChange={(e) => {
          const data =  {
            title: postData.title ,
            city: postData.city ,
            street:  postData.street,
            nbBeds :postData.nbBeds,
            nbBaths: postData.nbBaths,
            space: postData.space,
            description :postData.description, 
            pricePerNight :postData.pricePerNight , 
            furnish: postData.furnish,
            gas : postData.gas, 
            electricty : postData.electricty,
            water : !postData.water 

         };
        setPostData(data);
        console.log(postData.gas)
        }}
        borderColor="#FF5A5F"
        style={{ cursor: "pointer" ,marginRight: 5 }}
        labelStyle={{ userSelect: "none" }}
        label="water"
      />

<Checkbox
        className="cb"
        icon={<Icon.FiCheck color="#ff5F5A" size={17} />}
        name="furnish"
        checked={false}
        onChange={(e) => {
          const data =  {
            title: postData.title ,
            city: postData.city ,
            street:  postData.street,
            nbBeds :postData.nbBeds,
            nbBaths: postData.nbBaths,
            space: postData.space,
            description :postData.description, 
            pricePerNight :postData.pricePerNight , 
            furnish: ! postData.furnish,
            gas : postData.gas, 
            electricty :  postData.electricty,
            water :postData.water

         };
        setPostData(data);
        console.log(postData.gas)
        }}
        borderColor="#FF5A5F"
        cursorColor = "#FF5A5F"
        style={{ cursor: "pointer" , marginRight: 5
       }}
        labelStyle={{  userSelect: "none" }}
        label="furniture"
      />




   </div>   
                

                {/* _____________________Descriptions  */}
                <div className='checkbox'>
                        <p>description </p>
                        <textarea 
                          type="text"
                          value={postData.description}
                          className="form-control"
                          placeholder="description"
                          onChange={(e) => {
                          const data =  {
                         title: postData.title ,
                         city: postData.city ,
                         street:postData.street,
                         nbBeds: postData.nbBeds,
                         nbBaths: postData.nbBaths,
                         space: postData.space,
                         description : e.target.value , 
                         pricePerNight :postData.pricePerNight , 
                         furnish: postData.furnish,
                         gas : postData.gas, 
                         electricty :postData.electricty ,
                         water :postData.water
 
                         };
                        setPostData(data);
                        }}
                         required
                       />
                    </div>                                 
              


              {/* submit btn  */}

              <button className="btn" type="submit">
              add post 
              </button>
        </form>
       </div> 
       <div className='div2'>
       <button 
              type="button"
              className="upload-file"
              onClick={() => {
                document.getElementById("file").click();
              }}
            >
              {" "}
              Upload images  &nbsp;&nbsp;&nbsp; <BsFillCloudUploadFill />{" "}
            </button>

            <input
              type="file"
              id="file"
              name="file"
              multiple accept="image/*"
              value={images}
              onChange={(e) => {
  
                setPath([ ...e.target.value ]);
                console.log(e.target.value)
               
              }}
            />

       </div>
     
      
      
      
      
      </div>

   
  )
}

export default Posts