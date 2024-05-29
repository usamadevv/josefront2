import React, { useState } from 'react'
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import { MdSnooze } from 'react-icons/md'
import { AiOutlineReload } from 'react-icons/ai'
import a from '../../../images/123/a.png'
import a2 from '../../../images/123/a2.png'
import a3 from '../../../images/123/a3.png'
import a4 from '../../../images/123/a4.png'
import a5 from '../../../images/123/a5.png'
import a6 from '../../../images/123/a6.png'
import a7 from '../../../images/123/a7.png'
import a8 from '../../../images/123/a8.png'
import a9 from '../../../images/123/a9.png'
import userr from '../../../images/userr.png'
import a10 from '../../../images/123/a10.png'
import as from '../../../images/219983.png'

import drop from '../../../images/dropd.png'
import {AiOutlineClose} from 'react-icons/ai'
import { Calendar } from 'react-calendar'
const Snapshot = () => {

var data=[{
    snapshot:a,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Docs Preparing',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a6,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'App development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a5,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'App development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a3,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Store design',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a4,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Store design',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a5,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Web development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a3,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Web development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a4,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Web development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a5,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Web development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a3,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Web development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a4,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Web development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a5,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Web development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a3,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Web development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
{
    snapshot:a4,
    Time:'10:45',
    Date:"12-12-2022",
    Location:'United states',
    User:'Jose Doe',
    project:'Web development',
    task:'design part',
    productivetime:'1 hr 20 mins',

},
]


const [showdrpdown, setshowdrpdown] = useState(false)

const [showdrpdowncalendar, setshowdrpdowncalendar] = useState(false)
const [showdrpdowntask, setshowdrpdowntask] = useState(false)
const [cimage, setcimage] = useState()
const [cloc, setcloc] = useState()
const [cprog, setcprog] = useState()
const [cuser, setcuser] = useState()
const [ctime, setctime] = useState()
const [cdate, setcdate] = useState()
function callset(val) {
    setcimage(val.snapshot)
    setcloc(val.Location)
    setctime(val.Time)
    setcdate(val.Date)
    setcuser(val.User)
setviewsnap('viewsnap')
    
}
const [viewsnap, setviewsnap] = useState('viewsnap2')

    return (
    <>
       <div className={viewsnap}>
        <div className="subview">
            <AiOutlineClose onClick={e=>setviewsnap('viewsnap2')} className='ais' />
            <img src={cimage} alt="" />
            <div className="basics">
                <p>{cuser}</p>
                <h3>{cloc}</h3>
                <h4>Microsoft Word</h4>
                <h2>Date: {cdate}</h2>
                <h2>Time: {ctime}</h2>
            </div>
        </div>


                
                </div>
        <div className="prodi">
            <div className="filterbar">
                <div className="filteroption1">
                    <h3>Projects </h3>
                    <div className="drpdown" onClick={e=>showdrpdown?setshowdrpdown(false):setshowdrpdown(true)}>
                        Select Project ...
                        <img src={drop} alt="" />
                        {showdrpdown&&
                        <div className="itemlist">
                            <input type="text" placeholder='Search project' />
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                        </div>
                        }
                    </div>
                </div>
                <div className="filteroption1">
                    <h3>Tasks </h3>
                    <div className="drpdown" onClick={e=>showdrpdowntask?setshowdrpdowntask(false):setshowdrpdowntask(true)}>
                        Select Task ...
                        <img src={drop} alt="" />
                        {showdrpdowntask&&
                        <div className="itemlist">
                            <input type="text" placeholder='Search task' />
                            <p>App UI</p>
                            <p>Brain storming</p>
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                            <p>Web Developmenmt</p>
                        </div>
                        }
                    </div>
                </div>
           <div className="filteroption1">
            <h3>Member</h3>
            <div className="userr">
                    <img src={userr} alt="" />
                    <p>+</p>
                </div>
           </div>
           <div className="filteroption1">
                    <h3>Date </h3>
                    <div className="drpdown" onClick={e=>showdrpdowncalendar?setshowdrpdowncalendar(false):setshowdrpdowncalendar(true)}>
                        Select Date ...
                        <img src={drop} alt="" />
                        {showdrpdowncalendar&&
                        <div className='itemlist2' >    <Calendar
                        value={new Date()} />
                            </div>
                 
                        }
                    </div>
                </div>

           
            </div>
      
            <div className="snapshots">
            {data.map(val=>(
                <>
                <div onClick={e=>callset(val)} className="itemsnap">
                    <h5>{val.project}</h5>
                    <h6>{val.task}</h6>
                    <img src={val.snapshot} alt="" />
                
                    <h3>{val.Time} - {val.Time}</h3>
                    <div className="prods">
                        <div className="prodssub"></div>

                    </div>
                    <h4>
                        Productive Time: <p>{val.productivetime}</p>
                    </h4>
                </div>
                </>
            ))

            }

            </div>
           

        </div>
        </>
    )
}

export default Snapshot