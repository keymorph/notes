import React, {useEffect, useState} from "react";
import Note from "../../Components/Note/Note";

function Dashboard () {
    
      
  
    useEffect(()=>{
        axios.get(
            "http://localhost:5000/api/showNotes"
          ).then((res) => {
              console.log(res)
          }).catch((error) => {
            console.log(error);
          }); 
    }, [])
      
    
    
    return(
        <div>
            
            <Note/>
        </div>
    )
}

export default Dashboard;