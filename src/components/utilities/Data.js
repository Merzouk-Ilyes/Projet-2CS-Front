//import {AiFillFileAdd , BsFilePost , FcStatistics} from "react-icons/fa"
import { ImHome , ImPodcast  } from "react-icons/im";
import { BsFilePost  } from "react-icons/bs";


export  const sidebarData = [

    {

        path : "/host/dashboard" ,
        icon : ImHome, 
        heading : "dashboard"

    } , 
    {

        path : "/host/posts" ,
        icon : BsFilePost  , 
        heading : "posts"

    } , 
    {
        path : "/host/statistics" ,
        icon : ImHome , 
        heading : "statistics"

    } 


    
]

export  const getHostPosts = [

     {key :0,
    imageUrl:"https://i.postimg.cc/Xqg2y0L7/farme.jpg",
    title:"title1",
    price : 20 , 
    baths : 2 ,
    beds :  6 ,
    rating :  3.6 ,
    verified : true,
    space: 200, 
    city : "mostaganem" 

     } , 
     {key :2,
        imageUrl:"https://i.postimg.cc/Xqg2y0L7/farme.jpg",
        title:"title2",
        price : "35", 
        baths : 2 ,
        beds :  6,
        rating :  5 ,
        verified : false,
        space: 180, 
        city :  "oran"  
    
         } ,
            {key :3,
            imageUrl:"https://i.postimg.cc/Xqg2y0L7/farme.jpg",
            title:"title1",
            price : 20 , 
            baths : 2 ,
            beds :  6,
            rating :  4 ,
            verified : true,
            space: 200, 
            city :  "alger" 
        
             } ,

             {key :4,
                imageUrl:"https://i.postimg.cc/Xqg2y0L7/farme.jpg",
                title:"title4",
                price : 20 , 
                baths : 2 ,
                beds :  6,
                rating :  4 ,
                verified : true,
                space: 200, 
                city :  "alger" 
            
                 } ,
                 {key :5,
                    imageUrl:"https://i.postimg.cc/Xqg2y0L7/farme.jpg",
                    title:"title",
                    price : 20 , 
                    baths : 2 ,
                    beds :  6,
                    rating :  4 ,
                    verified : true,
                    space: 200, 
                    city :  "alger" 
                
                     } 
            
            
]