import React, { useState } from 'react'
import Client from './Client'
import Clientnew from './Clientnew'

const Chclient = ({props}) => {
const [i, seti] = useState(1)

  return (
    <>
    {i===1&&
        <Client props={props} />

        }
        {i===2&&
        <Clientnew  props={props} />

        } 
    {i===0&&
<div className="empt">
    
        <>
        <div className="emp1" onClick={e=>seti(1)}>
            <p>Active <br /> Companies</p>

        </div>
        <div className="emp2" onClick={e=>seti(2)}>
<p>New <br /> Companies</p>
        </div>
        
      
        </>

       
        
        
            </div> }
    </>


  )
}

export default Chclient