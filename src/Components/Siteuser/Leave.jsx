import React, { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css';
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { MdOutlineDateRange, MdSnooze } from 'react-icons/md'
import { tz } from '../apis';
import {IoClose} from 'react-icons/io5'

import Calendar from 'react-calendar'
import { useEffect } from 'react';
const Leave = ({props}) => {
    
const [adduser, setadduser] = useState('adduser2')
const [value, onChange] = useState(new Date());

const [name, setname] = useState('')
const [email, setemail] = useState('')
const [pass, setpass] = useState('')
const [c, setc] = useState(0)

function onChanges(e) {
console.log(e)
    
}

const [date, setdate] = useState('')

const [dates, setdates] = useState('')
const [username, setusername] = useState('Lynda koo')
const [leave, setleave] = useState('')
const [supers, setsupers] = useState([])

const [showcalender, setshowcalender] = useState(false)

const [showcalenders, setshowcalenders] = useState(false)

const [value2, valuex] = useState(new Date());

const [value2s, valuexs] = useState(new Date());
function onxhange(e) {
    
    valuex(e)
    var ustime = e.toLocaleString("en-US", { hour12: false })
    console.log(ustime)
    setshowcalender(false)
    var yt = ustime.split(', ')
    setdate(yt[0])
    console.log(yt[0])
}
function onxhanges(e) {
    valuexs(e)
    var ustime = e.toLocaleString("en-US", { hour12: false })
    console.log(ustime)
    setshowcalenders(false)
    var yt = ustime.split(', ')
    setdates(yt[0])
    console.log(yt[0])
}
function setsuperss(val){
    var te=val.split('4sd')
    setrec(te[0])
    setrecid(te[1])
}
function submit() {
    
    axios.post(`${tz}/leave/add`,{
        username:props.user.name,
        status:'Pending',
        date:date,
        leave:leave,
        rec:rec,
        recid:recid,
        sender:props.user._id,


    }).then( res=>{
        console.log(res)
        
    }).then(()=>{
        axios.post(`${tz}/noti/add`, {
            message:`${props.user.name} requested for leave`,
            idp:props.user._id,
            time:date,
            type:'leave'
        }).then(resp1 => {
            console.log(resp1)

            setadduser('adduser2')
            axios.post(`${tz}/leave/finduserdata`,{
               sender:props.user._id
            }).then(res=>{
               console.log(res)
               setuserd(res.data.Leave)
       })

        })

      
    })
    
}
const [rec, setrec] = useState('')
const [recid, setrecid] = useState('')
const [userd, setuserd] = useState()
const [filter, setfilter] = useState('All')
useEffect(() => {
    axios.post(`${tz}/leave/finduserdata`,{
            sender:props.user._id
         }).then(res=>{
            console.log(res)
            setuserd(res.data.Leave)
    })
    axios.get(`${tz}/super/getall`).then(res => {
        console.log(res)
        setsupers(res.data.Supervisor)
    })

  return () => {
    
  }
}, [])
var data2=['Jose Ros','Lynda Game','Alex Kuu','John Voo','Tros poo']


var data=[
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",


]
const [task, settask] = useState('')
const [tasks, settasks] = useState([])
const [mem, setmem] = useState([])

const [mems, setmems] = useState('')
const [title, settitle] = useState('')
const [last, setlast] = useState('')
function addtask() {
settasks(tsk=>[...tsk,task])
settask('')
}
function addtask2() {
    setmem(tsk=>[...tsk,mems])

    }

    return (
        <div className='divleave'>
        
        <div className={adduser}>
            <div className="subadduser">

<IoClose className='iov' onClick={e=>setadduser('adduser2')} />
              {c===0&&
              <>
              <div className="xinp"
              style={{

                display:'flex',
                alignItems:'center'
              }}
              >
                <input style={{

height:15 ,marginLeft:10               }} type="radio" />
                <p>Full Day Leave</p>
                <input style={{

height:15 ,marginLeft:10               }} type="radio" />
                <p>
                    Half Day Leave</p>
              </div>
                <div className="inputname inui">

                    <h1>Message</h1>
                    <textarea onChange={e=>setleave(e.target.value)} />

                </div>
                <div className="inputname xin" style={{width:'60%'}}>
                    <h1>Leave Date</h1>
                   
<div className="xinp" style={{
    display:'flex'
}}>
{showcalender ?
        <div>
            <Calendar onChange={onxhange}
                value={value2} />
        </div> :
       <input onClick={e=>setshowcalender(true)} value={date}  type="text" />

    }
    <p>to</p>
    {showcalenders ?
        <div>
            <Calendar onChange={onxhanges}
                value={value2s} />
        </div> :
       <input onClick={e=>setshowcalenders(true)} value={dates}  type="text" />

    }
</div>

 
            </div>
             
                <div className="inputname xin inputname2">
                <h1>Send to</h1>
               
                <select onChange={e=>setsuperss(e.target.value)} className='select2' name="cars" id="cars">

                <option value=''>Select your supervisor</option>
                    {supers&&supers.map(val=>(
                        <>
                        
  <option value={val.name+'4sd'+val._id}>{val.name}</option>
                        </>
                    ))

                    }
</select>
                </div>
          
             <div className="inputname3">
             <button onClick={e=>submit()} className='lbtn lbtny'>Submit</button>

             </div>
              </>

              }


            </div>

        </div>
        <div className="usersdata">

            <div className="topusersdata hideonmobile">
                <BiUserCircle className='usio' />
                <h1>Leaves</h1>
              
                <button className='usiosub' onClick={e=>setadduser('adduser')}>Apply for Leave</button>
               



            </div>
            <div className="producheader hideonmobile">
                <span>
                    <div className="ricircle">
                        <div className="priconpar">
                            <RiLightbulbFlashLine className='pricon' />
                        </div>
                        <p className='sss'>{userd&&userd.length}</p>
                    </div>
                    <h1>Total Leaves</h1>

                </span>
                <span>
                    <div className="ricircle">
                        <div className="priconpar pricon2">
                            <BiTime className='pricon ' />
                        </div>
                        <p>{userd&&userd.length}</p>
                    </div>
                    <h1>Vacation</h1>

                </span>
                <span>
                    <div className="ricircle">
                        <div className="priconpar pricon3">
                            <MdSnooze className='pricon ' />
                        </div>
                        <p>12</p>
                    </div>
                    <h1>Sick Days</h1>

                </span>
                <span>
                    <div className="ricircle">
                        <div className="priconpar pricon4">
                            <RiTimerFlashFill className='pricon ' />
                        </div>
                        <p>{userd&&userd.length}</p>
                    </div>
                    <h1>Days Out</h1>

                </span>

            </div>
            <div className="hideondesk widthfull widthei ptopp">
            <div className="topl2 topl3 widtheisub">
    <div className="toplsub">
   {filter==='All'?
        <button className='buttonpur'>All</button>:
        <button  onClick={e=>setfilter('All')}>All</button>
 
   }
{filter==='Approved'?

<button className='buttonpur'>Approved</button>:

<button onClick={e=>setfilter('Approved')}>Approved</button>

}
{
    filter==='Declined'?

    <button className='buttonpur'>Cancelled</button>:

    <button onClick={e=>setfilter('Declined')}>Cancelled</button>
}
    </div>
    <button onClick={e=>setadduser('adduser')}>+ Leave</button>
</div>

            {userd&& filter!=='All'?userd.map(val=>(
<>{
   val.status===filter&&

<div className="cardl">
    <div className="topl">
        <p>Full Day Leave</p>
        {val.status==='Pending'?
                 
                 <button style={{color:'rgb(218, 167, 14)'}}>Day Out</button>
                 :val.status==='Approved'?
                 
                 <button style={{color:'rgb(3, 143, 9',background:'#DBFFF8'}}>Vacation</button>
                 :
                 
                 <button style={{color:'rgb(241, 94, 94)',background:'##FFDADA'}}>Sick Day</button>

                 }

    </div>
    <h3>{val.date}</h3>
    <h1>{val.leave}</h1>
</div>


}
</>
)):
userd&&userd.map(val=>(
    <>{
     
    
    <div className="cardl">
        <div className="topl">
            <p>Full Day Leave</p>
            {val.status==='Pending'?
                     
                     <button style={{color:'rgb(218, 167, 14)'}}>Day Out</button>
                     :val.status==='Approved'?
                     
                     <button style={{color:'rgb(3, 143, 9',background:'#DBFFF8'}}>Vacation</button>
                     :
                     
                     <button style={{color:'rgb(241, 94, 94)',background:'##FFDADA'}}>Sick Day</button>
    
                     }
    
        </div>
        <h3>{val.date}</h3>
        <h1>{val.leave}</h1>
    </div>
    
    
    }
    </>
    ))

}
         
            </div>
   

<div className="tablerow">
              <div className="subtable">
              <div className="headertable clop headerxtab">
                    <h1>Leave</h1>
                    <h2>Date</h2>
                    <h2>Username</h2>
                    <h3>Status</h3>


                </div>
                {userd&&userd.map(val=>(
                    <>
                     <div className="headertable headerxtab">
                    <h1>{val.leave.substring(0,15)}</h1>
                    <h2>{val.date}</h2>
                    <h2>{val.username}</h2>
                    {val.status==='Pending'?
                 
                 <h2 style={{color:'rgb(218, 167, 14)'}}>Day Out</h2>
                 :val.status==='Approved'?
                 
                 <h2 style={{color:'rgb(3, 143, 9'}}>Vacation</h2>
                 :
                 
                 <h2 style={{color:'rgb(241, 94, 94)'}}>Sick Day</h2>

                 }

                </div>
                    </>
                ))

                }

              </div>
            </div>


        </div></div>
    )
}

export default Leave