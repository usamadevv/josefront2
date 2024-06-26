import React from 'react'
import { FaCaretDown, FaEdit, FaRegBell } from 'react-icons/fa'

import { useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import { FiDownload, FiEdit } from 'react-icons/fi'
import Calendar from 'react-calendar';
import { RiCloseFill } from 'react-icons/ri'
import prof from '../../../images/prof.png'
import 'react-calendar/dist/Calendar.css';
import { FaRegBuilding } from 'react-icons/fa'
import { GrFormClose } from 'react-icons/gr'
import XLSX from 'sheetjs-style'
import jsPDF from 'jspdf';
import { TbBuildingFactory2 } from 'react-icons/tb'
import * as file from 'file-saver'
import axios from 'axios'

import { FiLogOut } from 'react-icons/fi'

import { FaUserCheck, FaUserTimes, FaUserEdit } from 'react-icons/fa'
import { useEffect } from 'react';
import { tz } from '../../apis';
import { TbFileInvoice } from 'react-icons/tb'
import { useRef } from 'react'
import { IoAnalytics } from 'react-icons/io5'
import { AiOutlineProfile, AiOutlineMessage } from 'react-icons/ai'
import date from 'date-and-time';
import { VscChromeClose } from 'react-icons/vsc'
import { addTimesheet, getActiveClients, getAllJobsites, getAllTimesheets, getAttByDate, getAttByDateAndProject, getSiteAttFromTo, getTime, updateSiteAttTime, viewProfile } from '../../../Utils/api';

const Sitepresence = ({ props }) => {

    function generateTimeArray(start, end) {
        const result = [];
        const startTime = new Date(`2000-01-01T${start}`);
        const endTime = new Date(`2000-01-01T${end}`);

        while (startTime < endTime) {
            result.push(formatTime(startTime));
            startTime.setMinutes(startTime.getMinutes() + 60);
        }

        return result;
    }

    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours < 12 ? 'AM' : 'PM';
        const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${hours}:${minutes} ${ampm}`;
    }
    function calculateInterval(startTime, endTime) {
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);
        const intervalInMilliseconds = end - start;
        const intervalInMinutes = intervalInMilliseconds / (1000 * 60); // Convert milliseconds to minutes
        return intervalInMinutes;
    }


    const [currtaskforinterval, setcurrtaskforinterval] = useState([])
    const [timeinterval, settimeinterval] = useState([])

    function intrvaltasks(val, date) {

        // sExample usage
        var foundobjs = val.objects.filter(obj => obj.date === date && obj.chkouttime !== '-') || []
        console.log(foundobjs)
        const startTime = foundobjs[0].time;
        const endTime = foundobjs[foundobjs.length - 1].chkouttime;

        const timeArray = generateTimeArray(`${startTime.split(':')[0]}:${startTime.split(':')[1]}`,
            `${endTime.split(':')[0]}:${endTime.split(':')[1]}`);
        console.log(timeArray);

        foundobjs.forEach((element, index) => {
            const updatedTasks = element.tasks.map(({ start, end, ...rest }) => ({
                start,
                mins: Number(start.split(':')[1]),
                end,
                interval: calculateInterval(start, end),
                ...rest
            }));


            foundobjs[index].tasks = updatedTasks
        });



        setcurrtaskforinterval(foundobjs)



        settimeinterval(timeArray)
    }


    const [openp, setopenp] = useState(false)
    const [showcalender, setshowcalender] = useState(false)
    const [prodata, setprodata] = useState()
    const [boxfixed, setboxfixed] = useState(false)
    const [fromcalendar, setfromcalendar] = useState(false)
    const [tocalendar, settocalendar] = useState(false)
    const [activetype, setactivetype] = useState('weekly')
    const [from, setfrom] = useState('')
    const [to, setto] = useState('')
    function viewprof(val) {
        var postData={Siteuserd_id:val}

        viewProfile(postData).then(res2 => {
            console.log(res2)
            setprodata(res2.Siteuserd[0])
            setopenp(true)

        })

    }
    function setactivetypes(val) {
        settimeinterval([])
        setclk([])
        setactivetype(val)
    }
    const [activebtn, setactivebtn] = useState('0')
    const [projects, setprojects] = useState()
    const [pending2, setpending2] = useState([])
    const [attr, setattr] = useState()
    const [datep, setdatep] = useState('')

    const [value, value2] = useState(new Date());

    function onChange(e) {


        value2(e)
        var ustime = e.toLocaleString("en-US", { hour12: false })
        console.log(ustime)
        setshowcalender(false)
        var yt = ustime.split(', ')
        setdatep(yt[0])
        mopenthis(activesite, yt[0])
    }
    const [editid, seteditid] = useState('')
    function editthis(val) {
        console.log(val)
        seteditid(val._id)
    }
    function onChangexd(e) {

        value2(e)

        var ustime = e.toLocaleString("en-US", { hour12: false })
        console.log(ustime)
        setfromcalendar(false)
        var yt = ustime.split(', ')
        setfrom(yt[0])
        settocalendar(true)
    }
    function onChangexd2(e) {


        value2(e)
        var ustime = e.toLocaleString("en-US", { hour12: false })
        console.log(ustime)
        settocalendar(false)
        var yt = ustime.split(', ')
        setto(yt[0])
        mopenthis(activesite, yt[0])
    }
    function onChangeweekly(e) {


        value2(e)
        var ustime = e.toLocaleString("en-US", { hour12: false })
        console.log(ustime)
        settocalendar(false)
        var yt = ustime.split(', ')
        setfrom(yt[0])
        mopenthisweekly(activesite, yt[0])
    }
    const [timesheet, settimesheet] = useState([])
    const [companies, setcompanies] = useState([])

    useEffect(() => {

        getTime().then(res => {

            var dateput = res.Date.split(', ')
            setdatep(dateput[0])
           getActiveClients().then(res2 => {
                console.log(res2)
                setcompanies(res2.Client)
                getAllTimesheets().then(res2a => {


                 
                 
         
                    console.log(res2)
                    var rt=res2a.Timesheet

                    var rt2=res2a.Timesheet
                    rt.forEach((element,index) => {

                        var totalhours=0
                        var totalmins=0
                
                        element.Data.forEach((x,inx) => {
                           if(x.total.length>2){
                            var hrsmins=(Number(x.total.split(':')[0])*60)+Number(x.total.split(':')[1])
                       
                            totalhours=hrsmins+totalhours 

                           }
                            
                        });
                        
                        rt2[index].th=`${Math.floor(totalhours/60)} hrs ${totalhours%60} mins`
                    });



                    settimesheet(rt2)
                })
            })

            getAllJobsites().then(resq => {
                console.log(resq)

                var postData={
                    date: dateput[0]
                }
               getAttByDate(postData).then(rex => {
                    console.log(rex)
                    setattr(rex.Siteatt)
                    setprojects(resq.Jobsite)




                })



            })


        })

        return () => {

        }
    }, [])
    function formatDatae(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, so add 1
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }

    function parseDate(inputDate) {
        const parts = inputDate.split('/');
        const month = parseInt(parts[0]);
        const day = parseInt(parts[1]);
        const year = parseInt(parts[2]);

        // Validate the date components
        if (isNaN(month) || isNaN(day) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31) {
            throw new Error('Invalid date format or out of range.');
        }

        // Swap the date and month if it seems to be in the 'dd/mm/yyyy' format
        if (day <= 12 && month > 12) {
            [month, day] = [day, month];
        }

        // Create a new Date object
        const date = new Date(year, month - 1, day); // Month is 0-indexed, so subtract 1

        // Subtract 7 days
        date.setDate(date.getDate() - 6);

        return formatDatae(date);
    }

    function viewtimesheet(val) {

        setactivesheet('create')
        setactivetype('weekly')
        var sel = []
        var pro = projects
        val.projects.forEach(element => {
            sel.push(projects.find((item) => item._id === element.projectid))
            pro.push(projects.filter((item) => item._id !== element.projectid))
        });
        setprojects(pro)
        setselectedjobsites(sel)
        var weekenda = parseDate(val.Weekend)


        mopenthisweekly(sel[0], weekenda)
    }
    const [boxfixeda, setboxfixeda] = useState(false)
    const [currcom, setcurrcom] = useState(null)
    function openthiscom(val) {


        setselectedjobsites([])
        setcurrcom(val)

        setselectedjobsites(projects.filter((item) => item.clientid === val._id))
        setprojects(projects.filter((item) => item.clientid !== val._id))


    }

    const [user, setuser] = useState()
    const [project, setproject] = useState()
    const [clk, setclk] = useState()
    const [chkou, setchkou] = useState(0)

    const [filter, setfilter] = useState('sitename')

    const [selectedjobsites, setselectedjobsites] = useState([])
    const [searchval, setsearchval] = useState('')
    function skipthis(val) {
        setprojects(projects => [...projects, val])
        setselectedjobsites(selectedjobsites.filter((item) => item !== val))
    }
    function totalhours(val){
    

    }
    function openthis(val) {

        setselectedjobsites(selectedjobsites => [...selectedjobsites, val])
        setprojects(projects.filter((item) => item !== val))
        setactivesite(val)
        setchkou(0)
        setpending2([])
        var postData=
        {
            date: datep,
            id: val._id
        }
        getAttByDateAndProject(postData).then(rex => {


            setboxfixed(false)


        })

    }
    const [updatedwh, setupdatedwh] = useState('')
    function updatethis(val, index, indx) {
        function calculateInterval(startTime, endTime) {
            const start = new Date(`2000-01-01T${startTime}`);
            const end = new Date(`2000-01-01T${endTime}`);
            const intervalInMilliseconds = end - start;
            const intervalInMinutes = intervalInMilliseconds / (1000 * 60); // Convert milliseconds to minutes
            return intervalInMinutes;
        }
        const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        if (regex.test(updatedwh)) {
            var hoursupdate = calculateInterval(val.time, updatedwh)
            var tempclk = clk
            tempclk[index].objects[indx].chkouttime = updatedwh

            tempclk[index].objects[indx].workinghours = `${Math.floor(hoursupdate / 60)}:${Math.floor(hoursupdate % 60)}`
var postData={
    _id: val._id,
    time: updatedwh,
    wh: `${Math.floor(hoursupdate / 60)}:${Math.floor(hoursupdate % 60)}`,
}
            updateSiteAttTime(postData).then(rex => {
                console.log(rex)
                seteditid('')
                setupdatedwh('')
                setclk(tempclk)

            }
            )


        }
        else {
            alert('Time format should be hh:mm:ss in 24 hours')
        }

    }
    const [usersearch, setusersearch] = useState('')
    const [datearr, setdatearr] = useState([])
    const [activesheet, setactivesheet] = useState('view')
    function mopenthisweekly(val, bn) {
        settimeinterval([])
        setdatearr([])
        const currentDate = new Date(bn); // Replace with your existing date
        const newDate = new Date(currentDate);

        newDate.setDate(currentDate.getDate() + 8);

        // Function to format the date as mm/dd/yyyy
        const formatDate = (date) => {
            const mm = String(date.getMonth() + 1).padStart(2, ''); // January is 0!
            const dd = String(date.getDate()).padStart(2, '');
            const yyyy = date.getFullYear();
            return `${mm}/${dd}/${yyyy}`;
        };
        const getDayName = (date) => {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[date.getDay()];
        };
        for (let i = 0; i < 7; i++) {
            const newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + i);
            const dayName = getDayName(newDate);
            setdatearr(datearr => [...datearr, { date: formatDate(newDate), name: dayName }])
        }




        setactivesite(val)
        setchkou(0)
        setpending2([])
        var postData={
            from: bn,
            to: formatDate(newDate),
            selectedjobsites: selectedjobsites,
        }
        getSiteAttFromTo(postData).then(rex => {
            console.log(rex)

            setfromcalendar(false)

            // Create a map to organize objects by date
            const classifiedByDate = new Map();

            // Iterate through the array and classify by date
            rex.Siteatt.forEach((obj) => {
                const { userid, workinghours, ...rest } = obj;
                if (!classifiedByDate.has(userid)) {
                    classifiedByDate.set(userid, { total: 0, objects: [{ ...rest, workinghours }] });
                } else {
                    classifiedByDate.get(userid).objects.push({ ...rest, workinghours });
                }

                // Calculate total working hours
                if (workinghours && workinghours !== '-') {
                    const [hours, minutes] = workinghours.split(':').map(Number);
                    classifiedByDate.get(userid).total += hours * 60 + minutes;
                }
            });

            // Convert the map to an array for easy usage and format the result
            const resultArray = Array.from(classifiedByDate, ([userid, { total, objects }]) => ({
                userid,
                total: total > 0 ? `${Math.floor(total / 60)}:${total % 60}` : '-',
                objects,
            }));

            console.log(resultArray);
            setclk(resultArray)


            val.user.forEach(ele => {
                var y = 0
                rex.Siteatt.forEach((ele2, index) => {
                    if (ele2.userid === ele.userid) {
                        y = 1
                    }

                    if (index === rex.Siteatt.length - 1) {
                        if (y === 0) {

                            setpending2(pending2 => [...pending2, ele])
                        }
                    }


                });
            });

            rex.Siteatt.forEach(element => {
                if (element.chkouttime !== '-') {
                    setchkou(chkou => chkou + 1)

                }
            });


        })

    }
    function mopenthis(val, bn) {
        setactivesite(val)
        setchkou(0)
        setpending2([])
        var postData={
            from: from,
            to: bn,
            selectedjobsites: selectedjobsites,
        }
        getSiteAttFromTo(postData).then(rex => {
            console.log(rex)

            // Create a map to organize objects by date
            const classifiedByDate = new Map();

            // Iterate through the array and classify by date
            rex.Siteatt.forEach((obj) => {
                const { date, ...rest } = obj;
                if (!classifiedByDate.has(date)) {
                    classifiedByDate.set(date, [rest]);
                } else {
                    classifiedByDate.get(date).push(rest);
                }
            });

            // Convert the map to an array for easy usage
            const resultArray = Array.from(classifiedByDate, ([date, objects]) => ({
                date,
                objects,
            }));

            console.log(resultArray);

            setclk(resultArray)

            val.user.forEach(ele => {
                var y = 0
                rex.Siteatt.forEach((ele2, index) => {
                    if (ele2.userid === ele.userid) {
                        y = 1
                    }

                    if (index === rex.Siteatt.length - 1) {
                        if (y === 0) {

                            setpending2(pending2 => [...pending2, ele])
                        }
                    }


                });
            });

            rex.Siteatt.forEach(element => {
                if (element.chkouttime !== '-') {
                    setchkou(chkou => chkou + 1)

                }
            });


        })

    }
    function savetimesheet() {
        const userInput = prompt('Please enter file name:');

        const projectss = selectedjobsites.map(obj => ({
            projectname: obj.sitename,
            projectid: obj._id
        }));

        var dataa = []
        clk && clk.forEach(val => {



            // Group objects by 'name' property
            const groupedData = [];

            // Group objects by 'name' property
            val.objects.forEach(obj => {
                // Find index of the group with the same name
                if (obj.chkouttime !== '-') {
                    const index = groupedData.findIndex(group => group.date === obj.date);

                    if (index === -1) {
                        // If not found, create a new group
                        groupedData.push({ date: obj.date, time: [obj.workinghours] });
                    } else {
                        // If found, append workinghours to existing group
                        groupedData[index].time.push(obj.workinghours);
                    }
                }
            });



            dataa.push({
                username: val.objects[0].username,
                userid: val.userid,
                total: val.total,
                clientname: currcom.username,
                clientid: currcom._id,
                Weekend: datearr[datearr.length - 1].date,
                hrs: groupedData,
                days: groupedData.length,

            })

        })

        var date = new Date()
        const datea = new Date(); // Month is 0-indexed, so we subtract 1

        // Extract month, day, and year from the Date object
        const mm = String(datea.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
        const dd = String(datea.getDate()).padStart(2, '0');
        const yyyy = datea.getFullYear();

        // Return formatted date string
        var tr = `${mm}/${dd}/${yyyy}`;

        var datetobesaved = {
            createdon: tr,
            companyid: currcom._id,
            clientname: currcom.username,
            filename: userInput,
            projects: projectss,
            Weekend: datearr[datearr.length - 1].date,
            Data: dataa





        }
        console.log(datetobesaved)
        var postData={
            datetobesaved
        }
        addTimesheet(postData).then(res => {
            console.log(res)
            getAllTimesheets().then(resa => {
                console.log(res)
                settimesheet(resa.Timesheet)
                alert('Timesheet saved')

            })

        })

    }

    const [activesite, setactivesite] = useState()
    const [o, seto] = useState(0)
    const [i, seti] = useState(0)
    function formatDatea(inputDate) {
        const parts = inputDate.split('/');
        const date = new Date(parts[2], parts[0] - 1, parts[1]); // Month is 0-indexed, so subtract 1

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthAbbreviation = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${monthAbbreviation} ${day}, ${year}`;
    }

    return (

        <div className="attside attddide">
            <div className="twside">
                <button className={activesheet === 'create' ? 'activesheet' : 'nonactivesheet'} onClick={e => setactivesheet('create')} >+ Create Timesheet</button>
                <button className={activesheet === 'view' ? 'activesheet' : 'nonactivesheet'} onClick={e => setactivesheet('view')}>Saved Timesheets</button>
            </div>

            {openp &&
                <div className="profio procio">
                    <div className="profilepage">
                        <RiCloseFill className='ioyt' onClick={e => setopenp(false)} />
                        <img src={prof} alt="" />
                        <h1>Name:</h1>
                        <h6>{prodata.name}</h6>
                        <h1>Skill:</h1>
                        <h6>{prodata.skill}</h6>
                        <h1>Address:</h1>
                        <h6>{prodata.address}</h6>
                        <h1>Phone :</h1>
                        <h6>{prodata.phone}</h6>
                        <h1>Status:</h1>
                        <h6>{prodata.status}</h6>


                    </div>
                </div>

            }
            <div className="tempe" style={{
                height: 10
            }}>

            </div>

            {activesheet === 'view' &&
            <>
          <div className="newst1">
          <input type="text" style={{width:'40%'}} value={usersearch} placeholder='Search..' onChange={e => setusersearch(e.target.value)} />

          </div>
                <div className="tablerow">
                    <div className="subtable">
                        <div className="headertable clop">
                            <span className='sxx'>  </span>

                            <h1>File name</h1>
                            <h3  >Company</h3>
                            <h2 className='cpp' style={{ width: '250px' }}> Projects</h2>
                            <h4>Total hrs</h4>
                            <h4>Users</h4>

                            <h4>Weekend</h4>
                            <h4>Date Created</h4>


                        </div>
                        { usersearch.length===0?timesheet && timesheet.map(val => (
                      
                            val.Data.length > 0 &&
                            <>
                                <div className="headertable" >
                                    <span className='sxx'> <input type="checkbox"
                                    /> </span>

                                    <h1 > {val.filename ? val.filename : 'New sheet'}</h1>
                                    <h3 className='cppg' >{val.clientname}</h3>
                                    <h2 className='cpp' style={{ width: '250px' }}>{val.projects.length > 0 && val.projects[0].projectname + ', '}
                                        {val.projects.length > 1 && val.projects.length + ' more '}
                                    </h2>
                                    <h4>{val.th}</h4>
                                    <h4 style={{
                                        display: 'flex',
                                        position: 'relative'
                                    }}>{val.Data.map((vl, index) => (
                                        index < 3 ?
                                            <div className="crl" style={{
                                                top: -15,
                                                left: 20 * index
                                            }} >
                                                {vl.username.charAt(0)}
                                            </div> : index === 3 ?
                                                <div className="crl" style={{
                                                    top: -15,
                                                    left: 20 * index
                                                }} >
                                                    {val.Data.length}
                                                </div> :
                                                <></>

                                    ))

                                        }</h4>
                                    <h4>{val.Weekend && formatDatea(val.Weekend)}</h4>

                                    <h4>{val.createdon && formatDatea(val.createdon)}</h4>
                                    <h4>
                                        <button onClick={e => viewtimesheet(val)}>View</button>

                                    </h4>


                                </div>
                            </>
                        ))
                        :
                        timesheet && timesheet.map(val => (
                      
                            val.Data.length > 0 &&val.filename&&val.filename.toLowerCase().search(usersearch.toLowerCase())>=0&&
                            <>
                                <div className="headertable" >
                                    <span className='sxx'> <input type="checkbox"
                                    /> </span>

                                    <h1 > {val.filename ? val.filename : 'New sheet'}</h1>
                                    <h3 className='cppg' >{val.clientname}</h3>
                                    <h2 className='cpp' style={{ width: '250px' }}>{val.projects.length > 0 && val.projects[0].projectname + ', '}
                                        {val.projects.length > 1 && val.projects.length + ' more '}
                                    </h2>
                                    <h4>{val.th}</h4>
                                    <h4 style={{
                                        display: 'flex',
                                        position: 'relative'
                                    }}>{val.Data.map((vl, index) => (
                                        index < 3 ?
                                            <div className="crl" style={{
                                                top: -15,
                                                left: 20 * index
                                            }} >
                                                {vl.username.charAt(0)}
                                            </div> : index === 3 ?
                                                <div className="crl" style={{
                                                    top: -15,
                                                    left: 20 * index
                                                }} >
                                                    {val.Data.length}
                                                </div> :
                                                <></>

                                    ))

                                        }</h4>
                                    <h4>{val.Weekend && formatDatea(val.Weekend)}</h4>

                                    <h4>{val.createdon && formatDatea(val.createdon)}</h4>
                                    <h4>
                                        <button onClick={e => viewtimesheet(val)}>View</button>

                                    </h4>


                                </div>
                            </>
                        ))
                        }
                    </div>
                </div>
                </>
                
                }
            {activesheet === 'create' && activetype === 'daily' &&

                <div className='clientpro clienttro' style={{
                    backgroundColor: 'transparent'

                }}>


                    <div className="attfilt">
                        <button className='light mlight' onClick={e => boxfixeda ? setboxfixeda(false) : setboxfixeda(true)}>{currcom ? currcom.username : 'Choose Company'}  <FaCaretDown className='fac' />
                            {

                                boxfixeda && <div className="boxfixed" >
                                    <input type="text" onClick={e => e.stopPropagation()} onChange={e => setsearchval(e.target.value)} placeholder='Search project' />
                                    {searchval.length === 0 && companies && companies.map(val => (
                                        <>
                                            <div className="headertablenewx" onClick={e => openthiscom(val)} >
                                                <div className="rond">
                                                    {val.username.charAt(0)}
                                                </div>
                                                <h1 style={{ width: "100%" }}>

                                                    {val.username}</h1>


                                            </div>
                                        </>
                                    ))

                                    }
                                </div>
                            }
                        </button>
                        <button
                            className='light'
                            onClick={e => boxfixed ? setboxfixed(false) : setboxfixed(true)}
                        >+ Project

                            {
                                boxfixed && <div className="boxfixed" >
                                    <input type="text" onClick={e => e.stopPropagation()} onChange={e => setsearchval(e.target.value)} placeholder='Search project' />
                                    {currcom && searchval.length === 0 && projects && projects.map(val => (
                                        val.clientid === currcom._id &&
                                        <>
                                            <div className="headertablenewx" onClick={e => openthis(val)} >
                                                <div className="rond">
                                                    {val.sitename.charAt(0)}
                                                </div>
                                                <h1 style={{ width: "100%" }}>

                                                    {val.sitename}</h1>


                                            </div>
                                        </>
                                    ))

                                    }
                                </div>
                            }

                        </button>
                        <p>Date range:</p>
                        <div className="boxfrom"
                            onClick={e => setfromcalendar(true)}
                        >
                            {fromcalendar &&
                                <Calendar onChange={onChangexd}
                                    value={value} />
                            }
                            {from ? from : 'Start date'}
                        </div>
                        <p>To:</p>
                        <div className="boxfrom" onClick={e => settocalendar(true)}>
                            {tocalendar &&
                                <Calendar onChange={onChangexd2}
                                    value={value} />
                            }
                            {to ? to : 'End date'}
                        </div>
                        <div className="activc"
                            style={{
                                position: 'absolute',
                                right: 20,


                            }}
                        >
                            <button onClick={e => setactivetypes('daily')} className={activetype === 'daily' ? 'onthis' : 'onother'}>Daily</button>

                            <button className={activetype === 'weekly' ? 'onthis' : 'onother'} onClick={e => setactivetypes('weekly')}>Weekly</button>
                        </div>
                    </div>
                    <div className="attfilt"
                        style={{
                            marginTop: 20,
                            justifyContent: 'flex-start'

                        }}
                    >
                        {selectedjobsites && selectedjobsites.map((val, index) => (
                            index < 5 ?
                                <button
                                    style={{

                                        width: 'max-content',
                                        paddingLeft: 10,

                                        paddingRight: 10,
                                    }}
                                >{val.sitename}
                                    <VscChromeClose onClick={e => skipthis(val)} />
                                </button> : index === 5 ?
                                    <button
                                        style={{

                                            width: 'max-content',
                                            paddingLeft: 10,

                                            paddingRight: 10,
                                        }}
                                    >{selectedjobsites.length - 5} more

                                    </button> :
                                    <></>
                        ))}

                        <div className="a">

                        </div>
                    </div>
                    {clk && clk.map((val3, index) => (
                        <div className="tablerow">
                            <div className="datebar">
                                {val3.date}

                                <div className="stasbtn">
                                    <div className={activebtn === `0` ? 'stas1' : 'stas'} onClick={e => setactivebtn(`0`)}>
                                        Clocked in

                                    </div>
                                    <div className={activebtn === `1` ? 'stas1' : 'stas'} onClick={e => setactivebtn(`1`)}>
                                        Clocked out
                                    </div>
                                    <div className={activebtn === `2` ? 'stas1' : 'stas'} onClick={e => setactivebtn(`2`)}>
                                        Leave
                                    </div>

                                </div>
                            </div>
                            <div className="frstrow">
                                <h1>User</h1>
                                <h2>Clock in</h2>
                                <h2>Clock out</h2>
                                <h2>Total hours</h2>
                                <h2>Status</h2>
                            </div>

                            {activebtn === `0` && val3.objects && val3.objects.map((val, indx) => (
                                selectedjobsites.some(obj => obj._id === val.projectid) &&

                                (val._id === editid ?

                                    <div className="otherrow">

                                        <h1>
                                            <div className="rond" style={{
                                                maxWidth: 30,
                                            }
                                            }>
                                                {val.username.charAt(0)}
                                            </div>
                                            {val.username}  <div className="jsite">
                                                <div className="nupoint">

                                                </div>
                                                {val.projectname}
                                            </div></h1>
                                        <h2>{val.time}</h2>
                                        <h2><input type="text" className='whn' onChange={e => setupdatedwh(e.target.value)} /></h2>
                                        <h2>{val.workinghours}</h2>
                                        <h2>Status</h2>
                                        <h2 >
                                            <button className='whnbutton' onClick={e => updatethis(val, index, indx)}>Save</button>
                                        </h2>

                                    </div>

                                    :
                                    <div className="otherrow">

                                        <h1>
                                            <div className="rond" style={{
                                                maxWidth: 30,
                                            }
                                            }>
                                                {val.username.charAt(0)}
                                            </div>
                                            {val.username}  <div className="jsite">
                                                <div className="nupoint">

                                                </div>
                                                {val.projectname}
                                            </div></h1>
                                        <h2>{val.time}</h2>
                                        <h2>{val.chkouttime}</h2>
                                        <h2>{val.workinghours}</h2>
                                        <h2>Status</h2>
                                        <h2 onClick={e => editthis(val)}> <FiEdit className='whnpen' /> </h2>

                                    </div>
                                )
                            ))

                            }
                            {activebtn === `1` && val3.objects && val3.objects.map(val => (

                                selectedjobsites.some(obj => obj._id === val.projectid) &&



                                val.chkouttime !== '-' &&

                                <div className="otherrow">

                                    <h1>
                                        <div className="rond" style={{
                                            maxWidth: 30,
                                        }
                                        }>
                                            {val.username.charAt(0)}
                                        </div>
                                        {val.username}
                                        <div className="jsite">
                                            <div className="nupoint">

                                            </div>
                                            {val.projectname}
                                        </div>
                                    </h1>
                                    <h2>{val.time}</h2>
                                    <h2>{val.chkouttime}</h2>
                                    <h2>{val.workinghours}</h2>
                                    <h2>Status</h2>

                                </div>
                            ))

                            }
                            {activebtn === `3` && pending2 && pending2.map(val => (
                                val.chkouttime !== '-' &&
                                <div className="otherrow">

                                    <h1>
                                        <div className="rond" style={{
                                            maxWidth: 30,
                                        }
                                        }>
                                            {val.name.charAt(0)}
                                        </div>
                                        {val.name}

                                    </h1>
                                    <h2></h2>
                                    <h2></h2>
                                    <h2></h2>
                                    <h2></h2>

                                </div>
                            ))

                            }
                        </div>
                    ))

                    }


                </div>

            }
            {activesheet === 'create' && activetype === 'weekly'
                &&
                <div className='clientpro clienttro' style={{
                    backgroundColor: 'transparent'

                }}>


                    <div className="attfilt"

                    >

                        <>
                            <button className='light mlight' onClick={e => boxfixeda ? setboxfixeda(false) : setboxfixeda(true)}>{currcom ? currcom.username : 'Choose Company'} <FaCaretDown className='fac' />
                                {
                                    boxfixeda && <div className="boxfixed" >
                                        <input type="text" value={searchval} onClick={e => e.stopPropagation()} onChange={e => setsearchval(e.target.value)} placeholder='Search company' />
                                        {searchval.length === 0 && companies && companies.map(val => (
                                            <>
                                                <div className="headertablenewx" onClick={e => openthiscom(val)} >
                                                    <div className="rond">
                                                        {val.username.charAt(0)}
                                                    </div>
                                                    <h1 style={{ width: "100%" }}>

                                                        {val.username}</h1>


                                                </div>
                                            </>
                                        ))

                                        }
                                    </div>
                                }
                            </button>
                            <button
                                className='light'
                                onClick={e => boxfixed ? setboxfixed(false) : setboxfixed(true)}
                            >+ Project

                                {
                                    boxfixed && <div className="boxfixed" >
                                        <input onClick={e => e.stopPropagation()} type="text" onChange={e => setsearchval(e.target.value)} placeholder='Search project' />
                                        {currcom && searchval.length === 0 && projects && projects.map(val => (
                                            val.clientid === currcom._id &&
                                            <>
                                                <div className="headertablenewx" onClick={e => openthis(val)} >
                                                    <div className="rond">
                                                        {val.sitename.charAt(0)}
                                                    </div>
                                                    <h1 style={{ width: "100%" }}>

                                                        {val.sitename}</h1>


                                                </div>
                                            </>
                                        ))

                                        }
                                    </div>
                                }

                            </button>


                            <p>Start date:</p>
                            <div className="boxfrom"
                                style={{
                                    width: 'max-content',
                                    paddingLeft: 15,
                                    paddingRight: 15
                                }}
                                onClick={e => setfromcalendar(true)}
                            >
                                {fromcalendar &&
                                    <Calendar onChange={onChangeweekly}
                                        value={value} />
                                }
                                {datearr.length > 0 ? `${datearr[0].date} - ${datearr[6].date}` : 'Select Date'}
                            </div>

                        </>
                        <div className="activc"
                            style={{
                                position: 'absolute',
                                right: 20,


                            }}
                        >
                            <button onClick={e => setactivetypes('daily')} className={activetype === 'daily' ? 'onthis' : 'onother'}>Daily</button>

                            <button className={activetype === 'weekly' ? 'onthis' : 'onother'} onClick={e => setactivetypes('weekly')}>Weekly</button>

                            <button className='onthis' onClick={e => savetimesheet()}>Save</button>
                        </div>

                    </div>
                    <div className="attfilt"
                        style={{
                            marginTop: 20,
                            justifyContent: 'flex-start'

                        }}
                    >
                        {selectedjobsites && selectedjobsites.map((val, index) => (

                            index < 5 ?
                                <button
                                    style={{

                                        width: 'max-content',
                                        paddingLeft: 10,

                                        paddingRight: 10,
                                    }}
                                >{val.sitename}
                                    <VscChromeClose onClick={e => skipthis(val)} />
                                </button> : index === 5 ?
                                    <button
                                        style={{

                                            width: 'max-content',
                                            paddingLeft: 10,

                                            paddingRight: 10,
                                        }}
                                    >{selectedjobsites.length - 5} more

                                    </button> :
                                    <></>
                        ))}

                        <div className="a">

                        </div>
                    </div>

                    {timeinterval.length == 0 && datearr &&
                        <div className="tablerow">

                            <div className="frstrow frstrowx">
                                <h1>User</h1>
                                {
                                    datearr.map(val => (
                                        <h2
                                            className='bogp'
                                        >

                                            {val.name.substring(0, 3)}
                                            <div className="bog">
                                                {val.date.split('/')[1]}
                                            </div>
                                        </h2>
                                    ))
                                }
                                <h2
                                    className='bogp'
                                >

                                    Total hours
                                </h2>
                            </div>

                            {clk && clk.map((val, index) => (
                                <div className="otherrow otherrow2">
                                    <h1
                                        className='bogc'
                                        style={{
                                            color: 'grey',
                                            fontSize: 14,
                                        }}
                                    >
                                        <div className="rond">
                                            {val.objects[0].username.charAt(0)}
                                        </div>

                                        {val.objects[0].username}</h1>
                                    {
                                        datearr.map(val33 => (


                                            val.objects.some(obj => obj.date === val33.date) &&
                                                (val.objects.find(obj => obj.date === val33.date) || {}).workinghours !== '-'
                                                ?
                                                <>
                                                    <h2
                                                        onClick={e => intrvaltasks(val, val33.date)}
                                                        className='bogc'
                                                        style={{
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        {(() => {
                                                            const val33WorkingHours = val.objects.filter(obj => (obj.date === val33.date && obj.chkouttime !== '-'));

                                                            // If no objects found, display 'N/A'
                                                            if (val33WorkingHours.length === 0) {
                                                                return 'N/A';
                                                            }

                                                            // Calculate total working hours
                                                            const totalWorkingHours = val33WorkingHours.reduce((acc, curr) => {
                                                                const [hours, minutes] = curr.workinghours.split(':').map(Number);
                                                                acc.hours += hours;
                                                                acc.minutes += minutes;
                                                                return acc;
                                                            }, { hours: 0, minutes: 0 });

                                                            // Normalize total working hours
                                                            totalWorkingHours.hours += Math.floor(totalWorkingHours.minutes / 60);
                                                            totalWorkingHours.minutes %= 60;

                                                            // Format total working hours as 'hh:mm'
                                                            return `${String(totalWorkingHours.hours).padStart(2, '0')} h ${String(totalWorkingHours.minutes).padStart(2, '0')} m`;
                                                        })()}   </h2>

                                                </> :

                                                <h2

                                                    className='bogc'
                                                    style={{
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >     -
                                                </h2>




                                        ))

                                    }
                                    <h2
                                        className='bogc'
                                        style={{

                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >

                                        <button className='bgc'>{val.total}</button>

                                    </h2>
                                </div>
                            ))

                            }

                        </div>


                    }


                    {
                        timeinterval.length > 0 &&
                        <div className="tablerow">

                            <div style={{
                                paddingLeft: 20
                                ,
                                position: 'relative'
                            }} className="frstrow frstrowx"

                            >
                                <h2>Time</h2>
                                <h2 style={{
                                    marginLeft: 40,
                                    display: 'flex',

                                }}>Task
                                    <div className="jsite">
                                        <div className="nupoint">

                                        </div>
                                        {currtaskforinterval && currtaskforinterval.map(val =>
                                        (
                                            <>{
                                                val.projectname}
                                            </>))}
                                    </div>

                                </h2>


                                <button
                                    className='sitehrs'
                                    style={{
                                        position: 'absolute',
                                        right: 20,

                                    }}
                                >
                                </button>

                            </div>
                            <div className="flxx"
                                style={{

                                    display: 'flex'
                                }}
                            >
                                <div style={{

                                    display: 'flex',
                                    flexDirection: 'column'
                                }} className="collt">
                                    {timeinterval && timeinterval.map((val, index) => (

                                        <h1 style={{
                                            width: 100,
                                            fontSize: 14,
                                            height: 60,


                                        }}>{val}</h1>

                                    ))

                                    }
                                </div>
                                <div className="colrt">
                                    {timeinterval && timeinterval.map((val, index) => (

                                        <h1 style={{

                                            fontSize: 14,
                                            height: 60,
                                            position: 'relative'

                                        }}>
                                            {currtaskforinterval.map(vala => (
                                                vala.tasks.length > 0 &&
                                                <div className={index % 2 === 0 ? 'fi' : 'fi2'} style={{
                                                    position: 'absolute',
                                                    marginTop: (vala.tasks.find(obj => (Number(obj.start.split(':')[0]) >= Number(val.split(':')[0]) && Number(obj.start.split(':')[0]) < Number((index < timeinterval.length - 1 ? timeinterval[index + 1] : timeinterval[index]).split(':')[0]))) || {}).mins - Number(val.split(':')[1].split(' ')[0]),
                                                    height: (vala.tasks.find(obj => (Number(obj.start.split(':')[0]) >= Number(val.split(':')[0]) && Number(obj.start.split(':')[0]) < Number((index < timeinterval.length - 1 ? timeinterval[index + 1] : timeinterval[index]).split(':')[0]))) || {}).interval

                                                }}
                                                >
                                                    {vala.tasks.some(obj => (Number(obj.start.split(':')[0]) >= Number(val.split(':')[0]) && Number(obj.start.split(':')[0]) < Number((index < timeinterval.length - 1 ? timeinterval[index + 1] : timeinterval[index]).split(':')[0]))) &&

                                                        <>


                                                            <div className='fr'>
                                                                {((vala.tasks.find(obj => (Number(obj.start.split(':')[0]) >= Number(val.split(':')[0]) && Number(obj.start.split(':')[0]) < Number((index < timeinterval.length - 1 ? timeinterval[index + 1] : timeinterval[index]).split(':')[0]))) || {}).task
                                                                )}
                                                                <p>
                                                                    Task
                                                                </p>
                                                            </div>
                                                            <div className='fr'>
                                                                {((vala.tasks.find(obj => (Number(obj.start.split(':')[0]) >= Number(val.split(':')[0]) && Number(obj.start.split(':')[0]) < Number((index < timeinterval.length - 1 ? timeinterval[index + 1] : timeinterval[index]).split(':')[0]))) || {}).start
                                                                )}
                                                                <p>
                                                                    Start Time
                                                                </p>
                                                            </div>
                                                            <div className='fr'>
                                                                {((vala.tasks.find(obj => (Number(obj.start.split(':')[0]) >= Number(val.split(':')[0]) && Number(obj.start.split(':')[0]) < Number((index < timeinterval.length - 1 ? timeinterval[index + 1] : timeinterval[index]).split(':')[0]))) || {}).end
                                                                )}
                                                                <p>
                                                                    End Time
                                                                </p>
                                                            </div>
                                                            <div className='fr'>
                                                                {(parseInt((vala.tasks.find(obj => (Number(obj.start.split(':')[0]) >= Number(val.split(':')[0]) && Number(obj.start.split(':')[0]) < Number((index < timeinterval.length - 1 ? timeinterval[index + 1] : timeinterval[index]).split(':')[0]))) || {}).interval / 60)
                                                                )} hr {(parseInt((vala.tasks.find(obj => (Number(obj.start.split(':')[0]) >= Number(val.split(':')[0]) && Number(obj.start.split(':')[0]) < Number((index < timeinterval.length - 1 ? timeinterval[index + 1] : timeinterval[index]).split(':')[0]))) || {}).interval % 60)
                                                                )} mins
                                                                <p>
                                                                    Total Time
                                                                </p>

                                                            </div>
                                                        </>


                                                    }

                                                </div>
                                            ))}
                                        </h1>

                                    ))

                                    }
                                </div>
                            </div>

                        </div>
                    }


                </div>



            }


            {
                o === 1 &&
                <>

                    <div className="clockhead">
                        <button onClick={e => setshowcalender(true)} className='cht'> Choose Date</button>
                        {showcalender &&
                            <div>
                                <Calendar onChange={onChange}
                                    value={value} />
                            </div>

                        }
                    </div>
                    <div className="clientpro clientproo clientproh">
                        <h1>User Stats</h1>
                        <div className="projectscard">
                            <div className="balance balancec">  <div className="mhg mhg3">

                                <FaUserCheck className='mhgf mhgf3' />
                            </div>
                                <div className="detbalance">
                                    <h1>Clocked in</h1>
                                    <h3>{clk && clk.length - chkou}</h3>
                                </div>
                            </div>
                            <div className="balance balancec">
                                <div className="mhg">

                                    <FaUserTimes className='mhgf' />
                                </div>
                                <div className="detbalance">
                                    <h1>Pending</h1>
                                    <h3>{activesite && clk && activesite.user.length - clk.length} </h3>
                                </div>
                            </div>
                            <div className="balance balancec">  <div className="mhg mhg2">

                                <FiLogOut className='mhgf mhgf2' />
                            </div>
                                <div className="detbalance">
                                    <h1>Clocked Out </h1>
                                    <h3>{chkou}</h3>
                                </div>
                            </div>
                            <div className="balance balancec">  <div className="mhg mhg2x">

                                <FaUserEdit className='mhgf mhgf2x' />
                            </div>
                                <div className="detbalance">
                                    <h1>On Leave </h1>
                                    <h3>{0} </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clientpro clientproo">
                        <h1>Clockedin Users</h1>
                        <>


                            <div className="usersdata">


                                {o === 1 &&

                                    <>

                                        <div className="tablerow">
                                            <div className="subtable">
                                                <div className="headertable clop cloo">
                                                    <h1 style={{ width: "200px" }}>User</h1>
                                                    <h2 style={{ width: "100px" }}>Date</h2>
                                                    <h3 style={{ width: "100px" }}>Clockin Time</h3>

                                                    <h3 style={{ width: "100px" }}>Clockout Time</h3>
                                                    <h3 style={{ width: "100px" }}>Working Time</h3>
                                                    <h4 style={{ width: "100px" }}>Status</h4>
                                                    <h5 style={{ width: "100px" }}>Late</h5>


                                                </div>
                                                {clk && clk.map(val => (
                                                    <>
                                                        <div className="headertable" >
                                                            <h1 style={{ width: "200px" }}>{val.username.substring(0, 50)}</h1>
                                                            <h2 style={{ width: "100px" }}> <div className="tinvoice">
                                                                {val.date}</div> </h2>
                                                            <h3 style={{ width: "100px" }} >{val.time}</h3>
                                                            <h3 style={{ width: "100px" }} >{val.chkouttime}</h3>
                                                            <h3 style={{ width: "100px" }} >{val.workinghours}</h3>
                                                            {val.status === 'Absent' ?
                                                                <div style={{ width: "100px" }} className="yellowlabel">

                                                                    <h6 >{val.status}</h6>
                                                                </div> :
                                                                <div style={{ width: "100px" }} className="greenlabel">

                                                                    <h6 >{val.status}</h6>
                                                                </div>

                                                            }
                                                            <h5 style={{ width: "100px" }} >{val.late}</h5>



                                                        </div>
                                                    </>
                                                ))

                                                }
                                            </div>
                                        </div>
                                    </>
                                }

                            </div></>
                    </div>
                    <div className="clientpro clientproo">
                        <h1>Pending Users</h1>
                        <>


                            <div className="usersdata">


                                {o === 1 &&

                                    <>

                                        <div className="tablerow">
                                            <div className="subtable">
                                                <div className="headertable clop cloo">
                                                    <h1 style={{ width: "200px" }}>User</h1>
                                                    <h2 style={{ width: "200px" }}>Skill</h2>


                                                </div>
                                                {clk && clk.length > 0 ? pending2 && pending2.map(val => (
                                                    <>
                                                        <div className="headertable" >
                                                            <h1 style={{ width: "200px" }}>{val.name.substring(0, 50)}</h1>
                                                            <h2 style={{ width: "200px" }}> <div className="tinvoice">
                                                                {val.skill}</div> </h2>

                                                            <h5 className='h5'><button className='manx man' onClick={e => viewprof(val.userid)}>View Profile</button></h5>



                                                        </div>
                                                    </>
                                                )) :
                                                    activesite && activesite.user.map(val => (
                                                        <>
                                                            <div className="headertable" >
                                                                <h1 style={{ width: "200px" }}>{val.name.substring(0, 50)}</h1>
                                                                <h2 style={{ width: "200px" }}> <div className="tinvoice">
                                                                    {val.skill}</div> </h2>

                                                                <h5 className='h5'><button className='manx man' onClick={e => viewprof(val.userid)}>View Profile</button></h5>



                                                            </div>
                                                        </>
                                                    ))

                                                }
                                            </div>
                                        </div>
                                    </>
                                }

                            </div></>
                    </div>
                </>
            }
        </div>
    )
}

export default Sitepresence