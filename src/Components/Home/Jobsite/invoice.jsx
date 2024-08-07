import React, { useState } from 'react'
import { GiEnergyArrow } from 'react-icons/gi'
import { RiLightbulbFlashLine, RiTimerFlashFill } from 'react-icons/ri'
import { BiMailSend, BiTime } from 'react-icons/bi'
import { MdOutlinePayment, MdOutlineSave, MdOutlineSaveAlt, MdSnooze } from 'react-icons/md'
import { AiOutlineReload } from 'react-icons/ai'
import axios from 'axios'
import { useEffect } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { HiArrowLeft } from 'react-icons/hi'

import prof from '../../../images/prof.png'

import filea from '../../../images/filea.png'
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

import pdf from '../../../images/pdf.svg'

import email from '../../../images/email.svg'

import { BsBuilding, BsClockFill } from 'react-icons/bs'
import image4 from '../../../images/image4.png'

import Calendar from 'react-calendar'

import { IoClose } from 'react-icons/io5'
import { FaFileAlt, FaFileCsv, FaFileImage, FaFilePdf, FaSortDown } from 'react-icons/fa'
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import ReactPaginate from 'react-paginate';


import { FaBuilding } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { FaPencilAlt } from 'react-icons/fa'


import XLSX from 'sheetjs-style'
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';

import * as file from 'file-saver'
import { AiFillDelete } from 'react-icons/ai'
import html2canvas from 'html2canvas'
import { tz } from '../../apis'
import { useRef } from 'react'
import { async } from '@firebase/util'
import { addJobiste, addPayroll, deleteJobsite, findClientById, getAactiveSiteusers, getActiveClients, getAllJobsites, getAllTimesheets, getSiteUserDistance, loginAdmin2, sendClientInvoice, updateClientOnly, updateJobiste, updateSiteUserCPR, updateSiteUserHours, updateSiteUserPayRateType } from '../../../Utils/api'
const Invoice = (props) => {


const [showcalender, setshowcalender] = useState(false)

const [showcalenderx, setshowcalenderx] = useState(false)

const [value2, valuex] = useState(new Date());
const [inend, setinend] = useState('')
const [value2x, valuexx] = useState(new Date());
function onxhangex(e) {
    valuexx(e)
    var ustime = e.toLocaleString("en-US", { hour12: false })
    console.log(ustime)
    setshowcalenderx(false)
    var yt = ustime.split(', ')
    setinend(yt[0])
    console.log(yt[0])
    console.log(preparedata)
    console.log(allhours)
    const updatedData = allhours.map(item => ({ ...item, Date: yt[0] }));
    setallhours(updatedData);
    const updatedData2 = preparedata.map(item => ({ ...item, Date: yt[0] }));
    setpreparedata(updatedData2);
}
function onxhange(e) {
    valuex(e)
    var ustime = e.toLocaleString("en-US", { hour12: false })
    console.log(ustime)
    setshowcalender(false)
    var yt = ustime.split(', ')
    setindate(yt[0])
    console.log(yt[0])
}
    const mapContainer = useRef(null);
    mapboxgl.accessToken = 'pk.eyJ1IjoidXNhbWE3ODZhIiwiYSI6ImNsZXZwbDV5ZTF0M3Ezc3Axdmhmb2Z3bmwifQ.b3u24ezWs8--UJphBNY1rA'
function importthisx(val,val2){
    
    var tr={
        Client:currcompany,
        Date:val2,
        Employee:val.name,
        Hrs:0,
        Payrate:l===2? Number(val.payrate) + Number(val.payrate) * Number(mkup) / 100:val.payrate,
        OT_Pay_rate: l===2?Number(val.otpayrate) + Number(val.otpayrate) * Number(mkup) / 100:val.otpayrate,
        Ot_Hrs:0,
        cpr:val.cpr,
        cprapply:l!==2?'yes':'no',
        days:0,
        deductions:0,
        Taxes:'Yes',
        distance:0,
        nc_4:'-',
        net:0,
onperdiem: customperdiem,
onperdiemel: "No",

perdiem: customperdiem,

perdiemel: "Yes",

siteid: '193039',

skill: val.skill,

total: 0,

userid: val._id

    }
    console.log(tr)

    console.log(l)
    setpreparedata(pr => [...pr, tr])
    setadduserd2('adduser2')
    
}
function savepayroll(p){
var updatedata=preparedata
const updatedData = updatedata.map(element => {
    // Check if the element's siteid and userid match the provided values
    if (element.siteid  && element.userid) {
        // Find the site corresponding to siteid
        const site = data.find(site => site._id === element.siteid);
        if (site) {
            // Find the user corresponding to userid in the site's users array
            const user = site.user.find(user => user.userid === element.userid);
            
            if (user) {
                // Update OT_Pay_rate with user's otpayrate
                return {
                    ...element,
                    OT_Pay_rate: Number(user.otpayrate),
                    Payrate:Number(user.cpr==='0'?user.payrate:user.cpr),
                    total: ((Number(user.cpr==='0'?user.payrate:user.cpr)) * (Number(element.Hrs))) + (Number(element.Ot_Hrs) * (Number(user.otpayrate))),
                    net:
                    ((Number(user.cpr==='0'?user.payrate:user.cpr)) * Number(element.Hrs)) + (Number(element.Ot_Hrs) * (Number(user.otpayrate)))
                    +(element.onperdiemel==='Yes'?Number(element.onperdiem):0)
                    +(element.perdiemel==='Yes'?Number(element.perdiem)*Number(element.days):0)
-
                    (
                        element.nc_4 === 'no'|| element.nc_4 === '-'|| element.nc_4===0
                          ? 0
                          : (
                              (Number(user.cpr==='0'?user.payrate:user.cpr) * 0) +
                              (0 * parseInt(user.otpayrate))
                            ) * 4 / 100
                      )-(element.deductions)
                     
                };
            }
        }
        else{
            const user = empdata.find(user => user._id === element.userid);
            return {
                ...element,
                OT_Pay_rate: Number(user.otpayrate),
                Payrate:Number(user.cpr==='0'?user.payrate:user.cpr),
                total: ((Number(user.cpr==='0'?user.payrate:user.cpr,)) * (Number(element.Hrs))) + (Number(element.Ot_Hrs) * (Number(user.otpayrate))),
                net:
                ((Number(user.cpr==='0'?user.payrate:user.cpr,)) * Number(element.Hrs)) + (Number(element.Ot_Hrs) * (Number(user.otpayrate)))
                +(element.onperdiemel==='Yes'?Number(element.onperdiem):0)
                +(element.perdiemel==='Yes'?Number(element.perdiem)*Number(element.days):0)
-
                (
                    element.nc_4 === 'no'|| element.nc_4 === '-'|| element.nc_4===0
                      ? 0
                      : (
                          (Number(user.cpr==='0'?user.payrate:user.cpr,) * 0) +
                          (0 * parseInt(user.otpayrate))
                        ) * 4 / 100
                  )-(element.deductions)
                 
            };

        }
    }
    return element; // Return the original element if no update is made
});
console.log(updatedData)
  
console.log(updatedata)
var postData={
    data:updatedData,
    companyid:currid,
    status:'Pending',
    by:datax.name,
    createdon:new Date().toLocaleDateString('en-US'),
    date:inend,

}
  
   addPayroll(postData).then(rees=>{
console.log(rees)
setshowlistview(false)
alert("Payroll saved")
    })


}

    function importthis(val) {
        setpreparedata([])
        if (val.pdapplied === 'true') {
            setapplyperdiemx(true)
        } else {
            setapplyperdiemx(false)
        }
     
        setinend(val.weekno)
        val.invoicedetails.forEach(element => {
            setpreparedata(pr => [...pr, {
                Taxes: element.taxes,
                Client: incname,
                Date: '1-1-2023',
                Employee: element.empname,
                skill: element.skill,
                days: element.days,
                Hrs: Number(element.hrs),
                Payrate: Number(element.payrate),
                distance: parseInt(element.distance),
                Ot_Hrs: Number(element.othrs),
                OT_Pay_rate: Number(element.otpayrate),
                nc_4: element.nc === 'no' ? '-' : Number(element.nc),
                total: Number(element.total),
                deductions: Number(element.deductions),
                net: Number(element.net),
                perdiem: Number(element.perdiem),
                onperdiem: Number(element.onperdiem)




            }])
        })
        setadduserd('adduser2')
    }
    const mapContainer2 = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [inpex, setinpex] = useState('inpex')
    const [latlang, setlatlang] = useState()


    const [taskname, settaskname] = useState('')
    const [taskdesc, settaskdesc] = useState('')
    const [tasks, settasks] = useState([])
    function addtask() {

        settasks(tsk => [...tsk, { name: taskname, description: taskdesc }])
        settaskdesc('')
        settaskname('')
    }

    const mapContainer3 = useRef(null);
    const map3 = useRef(null);
    const [lng3, setLng3] = useState(-70.9);
    const [lat3, setLat3] = useState(42.35);
    const [zoom3, setZoom3] = useState(9);

    var marker3 = useRef()
    const map2 = useRef(null)

    var marker2 = useRef()
    const [lng2, setLng2] = useState(-70.9);
    const [lat2, setLat2] = useState(42.35);
    const [zoom2, setZoom2] = useState(9);
    const [adduserd, setadduserd] = useState('adduser2')
    const [adduserd2, setadduserd2] = useState('adduser2')
    var marker = useRef()
    function setmapxs() {
        setmapx('mapx3')
        setinpex('inpex')
    }
    const [chklatlang, setchklatlang] = useState()
    function ddd() {
        setinpex('mapxs')
        setmapx('map')

        setcfm(true)
        map.current = new mapboxgl.Map({
            container: mapContainer.current,

            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: false
        });

        // Add the geocoder to the map
        map.current.addControl(geocoder);

        map.current.on('style.load', function () {

            map.current.resize()
            geocoder.on('result', function (e) {

                setaddress(e.result.place_name)
                if (marker.current) marker.current.remove()
                marker.current = new mapboxgl.Marker()
                    .setLngLat(e.result.center)
                    .addTo(map.current)
                setlatlang(JSON.stringify({ lng: e.result.center[0], lat: e.result.center[1] }))

                setchklatlang({ lng: e.result.center[0], lat: e.result.center[1] })

            });

            map.current.on('click', function (e) {
                var coordinates = e.lngLat;
                if (marker.current) marker.current.remove()
                marker.current = new mapboxgl.Marker()
                    .setLngLat(coordinates)
                    .addTo(map.current)
                setlatlang(JSON.stringify(coordinates))

                setchklatlang(coordinates)

            });


        });

    }

    function ddd2(val) {
        map3.current = new mapboxgl.Map({
            container: mapContainer3.current,

            style: 'mapbox://styles/mapbox/streets-v12',
            center: JSON.parse(val.latlang),
            zoom: zoom
        });

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: false
        });

        // Add the geocoder to the map
        map3.current.addControl(geocoder);

        map3.current.resize()

        map3.current.on('style.load', function () {
            if (val.latlang) {
                marker3.current = new mapboxgl.Marker()
                    .setLngLat(JSON.parse(val.latlang))
                    .setPopup(
                        new mapboxgl.Popup({ offset: 0 }) // add popups
                            .setHTML(
                                `<h3>${val.clientname}</h3><p>${val.sitename}</p>`
                            )
                    )
                    .addTo(map3.current)
                setlatlang(JSON.parse(val.latlang))

            }
            geocoder.on('result', function (e) {
                if (marker3.current) marker3.current.remove()
                marker3.current = new mapboxgl.Marker()
                    .setLngLat(e.result.center)
                    .addTo(map3.current)
                setlatlang(JSON.stringify({ lng: e.result.center[0], lat: e.result.center[1] }))

                setchklatlang({ lng: e.result.center[0], lat: e.result.center[1] })

            });



        });

    }
    const [showlistviewx, setshowlistviewx] = useState(false)
    function showdepartments(val){
        if(val){
            setshowlistviewx(val)
            clients&&clients.forEach(element => {
                if(element._id===currid){
                    setdepartments(element.depts)
                }
            });

        }
        else{
            setshowlistviewx(val)
        }
    }
    function sendemail(val){
        const yx=document.getElementById('shareable').innerHTML

var postData={
    email:val.email,
    html:yx,
    key:uuidv4(),
}
        sendClientInvoice(postData).then(rees=>{
console.log(rees)

alert(`Email sent to ${val.dept} department`)
setshowlistviewx(false)
            })

    }
    const [itemOffset, setItemOffset] = useState(0);
    const [kshow, setkshow] = useState(false)
    const endOffset = itemOffset + 5;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const [currentItems, setcurrentItems] = useState([])
    const [pageCount, setpageCount] = useState(0)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 5) % data.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );

        setItemOffset(newOffset);

        setcurrentItems(data.slice(newOffset, newOffset + 5))

    };
    var styl1 =
    {
        border: {
            right: {
                style: "thin",
                color: "000000"
            },
            left: {
                style: "thin",
                color: "000000"
            },
            bottom: {
                style: "thin",
                color: "000000"
            },
            top: {
                style: "thin",
                color: "000000"
            },
        },
        font: {
            name: "arial",
            bold: true,
            sz: 10
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },							// set the style for target cell
        fill: {
            fgColor: {

                theme: 8,
                tint: 0.3999755851924192,
                rgb: '9CCEB8'
            }
        },
    };
    var styl2 =
    {
        border: {
            right: {
                style: "thin",
                color: "000000"
            },
            left: {
                style: "thin",
                color: "000000"
            },
            bottom: {
                style: "thin",
                color: "000000"
            },
            top: {
                style: "thin",
                color: "000000"
            },
        },
        font: {
            name: "arial",
            bold: true,
            sz: 10
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },
    };
    var styleforaddress =
    {
        border: {
            right: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
            left: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
            bottom: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
            top: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
        },
        font: {
            name: "arial",
            bold: true,
            sz: 10,

            color: { rgb: '4069A7' }
        },
        alignment: {
            vertical: "center",
            horizontal: "left",
        },
    };
    var styleforaddress2 =
    {
        border: {
            right: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
            left: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
            bottom: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
            top: {
                style: "thin",
                color: { rgb: 'FFFFFF' }
            },
        },
        font: {
            name: "arial",
            bold: true,
            sz: 10,

            color: { rgb: '4069A7' }
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },
    };
    var cstyl2 =
    {
        border: {
            right: {
                style: "thin",
                color: "000000"
            },
            left: {
                style: "thin",
                color: "000000"
            },
            bottom: {
                style: "thin",
                color: "000000"
            },
            top: {
                style: "thin",
                color: "000000"
            },
        },
        font: {
            name: "arial",
            bold: true,
            sz: 10
        },
        alignment: {
            vertical: "center",
            horizontal: "center",
        },
        numFmt: "$#,###.00"
    };
   const outside=useRef()
  
const [boxprojects, setboxprojects] = useState('boxprojects2')
    const [address, setaddress] = useState('')
    const [pno, setpno] = useState('')
    const [adduser, setadduser] = useState('adduser2')
    const [i, seti] = useState(0)
    const [taxes, settaxes] = useState('taxes')
    const [circle, setcircle] = useState('circle')
    const [is, setis] = useState(0)


    const [taxes2, settaxes2] = useState('taxes')
    const [circle2, setcircle2] = useState('circle')
    const [is2, setis2] = useState(0)
    const [data, setdata] = useState()
    const [sname, setsname] = useState('')
    const [userid, setuserid] = useState('')
    const [name, setname] = useState('')
    const [cname, setcname] = useState('')
    const [skill, setskill] = useState('')
    const [payrate, setpayrate] = useState('')
    const [otpayrate, setotpayrate] = useState('')
    const [data2, setdata2] = useState([])
    const [mkup, setmkup] = useState(0)
    const [currid, setcurrid] = useState('')


    const [filter, setfilter] = useState('jobsite')
    const [searchval, setsearchval] = useState('')

    const [preparedata, setpreparedata] = useState([])
const [currentWeekNumber2, setcurrentWeekNumber2] = useState(0)

    function save() {
        var postData={
            preparedata:preparedata
        }
        updateSiteUserHours(postData).then(rees=>{
console.log(rees)
        })


        const currentWeekNumber = Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1) + 1) / 604800000);
        const currentYear = new Date().getFullYear();

        var ts = []

        preparedata.forEach((val, index) => {


            ts.push({

                taxes: val.Taxes,
                date: inend,
                empname: val.Employee,
                skill: val.skill,
                hrs: val.Hrs,
                payrate: val.Payrate,
                distance: val.distance,
                othrs: val.Ot_Hrs,
                otpayrate: val.OT_Pay_rate,
                nc: val.nc_4,
                total: val.total,
                deductions: val.deductions,
                net: val.net,
                p_userid:val.userid,
                p_siteid:val.siteid,
                p_perdiemel:val.perdiemel,
                p_onperdiemel:val.onperdiemel,
                p_perdiem:val.perdiem,
                p_onperdiem:val.onperdiem,
 p_nc4:val.nc_4,
 p_deductions:val.deductions,
                perdiem: applyperdiemx ? val.perdiem : 0,
                onperdiem: applyperdiemx ? val.onperdiem : 0,
                days: applyperdiemx ? val.days : 0,
            })
            if (index === preparedata.length - 1) {

                if (l === 2) {
                    var postData= {

                        date: indate,
                        weekno: inend,
                        year: currentYear,
                        no: inno,
                        _id: currid,
                        due: indue,
                        total: Number(totalall).toFixed(2).toLocaleString('en'),
                        paid: 0,
                        balance: Number(totalall).toFixed(2).toLocaleString('en'),
                        status: 'pending',
                        reporttype: 'invoice',
                        perdiemapplied: applyperdiemx,

                        filename: inname + '-' + incname + '-' + new Date().toLocaleDateString('en-US'),
                        by:datax.name,
                        created:new Date().toLocaleDateString('en-US'),
                        createdtime:new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),

                        data: ts




                    }
                   updateClientOnly(postData).then(res => {
                        console.log(res)
                        alert('Saved')



                    })
                }
                else {
                    var postData= {


                        _id: currid,
                        reporttype: 'report',
                        perdiemapplied: applyperdiemx,
                        weekno: currentWeekNumber,
                        year: currentYear,
                        filename: inname + '-' + incname + '-' + new Date().toLocaleDateString('en-US'),
                        by:datax.name,
                        created:new Date().toLocaleDateString('en-US'),
                        createdtime:new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),







                        data: ts




                    }
                    updateClientOnly(postData).then(res => {
                        console.log(res)
                        alert('Saved')


                    })
                }
            }

        })





    }
    const [clientadd, setclientadd] = useState('')
    const [last2, setlast2] = useState('')
    function preparesheet(valx) {
        console.log()
        console.log(ind)
        console.log(lastselected)
        console.log(ind.search(lastselected))
        if (ind.search(lastselected) >= 0||lastcom===last2) {
     
     console.log(allhours)
            setk(1)
            setl(valx)
            if (valx === 2) {
      
                var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                setinno(seq)

                const date = new Date();

                const date3 = new Date();

                var result = date3.setDate(date.getDate() + 20);
                const date2 = new Date(result)

                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                
                let day2 = date2.getDate();
                let month2 = date2.getMonth() + 1;
                let year2 = date2.getFullYear();

                // This arrangement can be altered based on how we want the date's format to appear.
                let currentDate = `${month}-${day}-${year}`;
                setindate(currentDate)
                let currentDate2 = `${month2}-${day2}-${year2}`;
                setindue(currentDate2)
                var tempprepare = preparedata;
                setpreparedata([])
                var done=0
                data.forEach((val, index) => {

                    if (ind.search(' ' + index.toString() + ' ') >= 0) {


                        setinname(val.sitename)
                        var postData={
                            Client_id: val.clientid
                        }

                        findClientById(postData).then(res => {
                            setinadd(res.Client[0].address)
                      
         var t =Number(res.Client[0].weekend)+1

         const currentDate = new Date();
         const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
         let daysToLastFriday = dayOfWeek - (t===7?0:t); // Difference between current day and Friday (5)
       
         if (daysToLastFriday <= 0) {
           daysToLastFriday += 7; // Add 7 days to get the previous week's Friday
         }
       
         const lastFridayDate = new Date(currentDate);
         lastFridayDate.setDate(currentDate.getDate() - daysToLastFriday);
       
         const month = lastFridayDate.getMonth() + 1; // Adding 1 since getMonth() is 0-based
           const day = lastFridayDate.getDate();
           const year = lastFridayDate.getFullYear();
       
          setinend(`${month}/${day}/${year}`);
                        })

                        setinnum(val.no)
                        setmkup(val.markup)
                        setincname(val.clientname)
                        setperdiemamnt1(Number(val.perdiemamnt))
                        setperdiemamnt1(Number(val.perdiemamnt))


                        val.user.length > 0 && val.user.forEach((element, indx) => {
                            const user = empdata.find(user => user._id === element.userid);

                            console.log(val)
                            if (valx === 2) {

                                setcurrid(val.clientid)


                            }
                          

                            setpreparedata(pr => [...pr, {
                                Taxes: element.taxes,
                                Client: val.clientname,
                                Date: new Date(new Date().setDate(new Date().getDate() + ((clients.find((client) => client._id === val.clientid) || {}).weekend- (new Date().getDay() === 0 ? 7 : new Date().getDay()) + 1))).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '-'),
                                Employee: user.name,
                                skill: user.skill,
                                Hrs: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0,
                                Payrate: valx === 1 ? Number(user.payrate).toFixed(2) : Number(Number(user.payrate) + Number(user.payrate) * Number(val.markup) / 100).toFixed(2) ,
                                siteid:val._id,
                                perdiemmiles:Number(val.perdiemmiles?val.perdiemmiles:0),
                                onperdiemmiles:Number(val.onperdiemmiles?val.onperdiemmiles:0),
                                cpr:element.cpr,
                                cprapply:(allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.cprapply)||'no',
                                userid: element.userid,
                                distance: parseInt(element.distance),
                                days: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.days)||0,
                             //   perdiemel: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.perdiemel)||element.perdiem, 
                               // onperdiemel: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.onperdiemel)||element.onperdiem,
                              perdiemel:'No',
                              onperdiemel:'No',
                              
                                // perdiem: applyperdiemx ? (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.perdiem)||0 : 0,
                                //onperdiem: applyperdiemx ? (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.onperdiem)||0 : 0,
                                perdiem:applyperdiemx ?val.perdiemamnt:0, 
                                onperdiem:applyperdiemx ?val.perdiemamnt:0,


                                Ot_Hrs: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0,
                                OT_Pay_rate: Number(user.otpayrate) + Number(user.otpayrate) * Number(val.markup) / 100,
                                nc_4: element.nc === 'no' ? '-' : ((Number(user.payrate) * 0) + (0 * Number(user.otpayrate))) * 4 / 100,
                                total: ((Number(user.payrate)+Number(user.payrate) * Number(val.markup) / 100) * Number((allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0)) + (Number((allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0) *( Number(user.otpayrate)+Number(user.payrate) * Number(val.markup) / 100)),
                                deductions: 0,
                                net: ((Number(user.payrate)+Number(user.payrate) * Number(val.markup) / 100) * Number((allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0)) + (Number((allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0) * (Number(user.otpayrate)+Number(user.payrate) * Number(val.markup) / 100)) - 0 - (element.nc === 'no' ? 0 : ((Number(user.payrate) * 0) + (0 * parseInt(user.otpayrate))) * 4 / 100)




                            }])
                           if(indx===val.user.length-1&&done===0){
                                {/* empdata.forEach(elementx => {
                                    const itemExistsInArrayB = val.user.some((item) => item.userid === elementx._id);
                                  console.log(itemExistsInArrayB)
                                    if(elementx.clientid===currid&&!itemExistsInArrayB){
                                        importthisx(elementx,new Date(new Date().setDate(new Date().getDate() + ((clients.find((client) => client._id === val.clientid) || {}).weekend- (new Date().getDay() === 0 ? 7 : new Date().getDay()) + 1))).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '-'))
                                    }
                                });
                            */}
                                done=1
                            }


                        });
                    }
                    else if (done===0&&index===data.length-1){
                        clients.forEach(element => {
                            if(element._id===currid){
                                setincname(element.username)
                                setinadd(element.address)
                            }
                            
                        });
                     
                        empdata.forEach(elementx => {
                            
                            if(elementx.clientid===currid){
                               
                                

                                importthisx(elementx,'select')
                            }
                        });
                        done=1
                    }

                });
            }
            else {
                var tempprepare = preparedata;
                setpreparedata([])
                var done=0
                data.forEach((val, index) => {

                    if (ind.search(' ' + index.toString() + ' ') >= 0) {

                        setinadd(val.address)

                        setinname(val.sitename)

                        setinnum(val.no)
                        setmkup(val.markup)
                        setincname(val.clientname)
                        setperdiemamnt1(Number(val.perdiemamnt))
                        setperdiemamnt1(Number(val.perdiemamnt))


                        val.user.length > 0 && val.user.forEach((element, indx) => {
                            const user = empdata.find(user => user._id === element.userid);

                            console.log(val)
                            if (valx === 2) {

                                setcurrid(val.clientid)


                            }

                            setpreparedata(pr => [...pr, {
                                Taxes: element.taxes,
                                Client: val.clientname,
                                Date: new Date(new Date().setDate(new Date().getDate() + ((clients.find((client) => client._id === val.clientid) || {}).weekend- (new Date().getDay() === 0 ? 7 : new Date().getDay()) + 1))).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '-'),
                                Employee: user.name,
                                skill: user.skill,
                                Hrs: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Hrs)||0,
                                Payrate:  valx === 1 ? Number(user.payrate).toFixed(2) : Number(Number(element.user) + Number(user.payrate) * Number(val.markup) / 100).toFixed(2),
                                siteid:val._id,
                                perdiemmiles:Number(val.perdiemmiles?val.perdiemmiles:0),
                                onperdiemmiles:Number(val.onperdiemmiles?val.onperdiemmiles:0),
                                cpr:element.cpr,
                                cprapply:element.payratetype==='custom'?'yes':'no',
                                userid: element.userid,
                                distance: parseInt(element.distance),
                                days: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.days)||0,
                             //   perdiemel: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.perdiemel)||element.perdiem, onperdiemel: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.onperdiemel)||element.onperdiem,
                             perdiemel:'No',
                             onperdiemel:'No',
                             
                             perdiem:applyperdiemx ?val.perdiemamnt:0, 
                                onperdiem:applyperdiemx ?val.perdiemamnt:0,


                                Ot_Hrs: (allhours.find(obj => obj.userid === element.userid&& obj.siteid === val._id)?.Ot_Hrs)||0,
                                OT_Pay_rate: Number( user.otpayrate) + Number(user.otpayrate) * Number(val.markup) / 100,
                                nc_4: element.nc === 'no' ? '-' : ((Number(user.payrate) * 0) + (0 * Number(user.otpayrate))) * 4 / 100,
                                total:
                                (
                                  (Number(element.payratetype === 'custom' ? user.cpr : user.payrate) *
                                    (allhours.find(obj => obj.userid === element.userid && obj.siteid === val._id)?.Hrs || 0))
                                ) +
                                (
                                  (
                                    (allhours.find(obj => obj.userid === element.userid && obj.siteid === val._id)?.Ot_Hrs || 0) *
                                    Number(user.otpayrate)
                                  ) || 0 // Handle NaN cases
                                ),                                deductions: 0,
                                net:
  (
    (Number(element.payratetype === 'custom' ? user.cpr : user.payrate) *
      (allhours.find(obj => obj.userid === element.userid && obj.siteid === val._id)?.Hrs || 0))
  ) +
  (
    (
      (allhours.find(obj => obj.userid === element.userid && obj.siteid === val._id)?.Ot_Hrs || 0) *
      Number(user.otpayrate)
    ) || 0 // Handle NaN cases
  ) -
  0 - // This is always subtracting 0
  (
    element.nc === 'no'
      ? 0
      : (
          (Number(user.payrate) * 0) +
          (0 * parseInt(user.otpayrate))
        ) * 4 / 100
  )


                            }])
                            if(indx===val.user.length-1&&done===0){
                                 {/*empdata.forEach(elementx => {
                                    const itemExistsInArrayB = val.user.some((item) => item.userid === elementx._id);
                                  console.log(itemExistsInArrayB)
                                    if(elementx.clientid===currid&&!itemExistsInArrayB){
                                        importthisx(elementx,new Date(new Date().setDate(new Date().getDate() + ((clients.find((client) => client._id === val.clientid) || {}).weekend- (new Date().getDay() === 0 ? 7 : new Date().getDay()) + 1))).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '-'))
                                    }
                                });
                            */}
                                done=1
                            }

                        });
                    }
                    else if (done===0&&index===data.length-1){
                        clients.forEach(element => {
                            if(element._id===currid){
                                setincname(element.username)
                                setinadd(element.address)
                            }
                            
                        });
                        empdata.forEach(elementx => {
                            
                            if(elementx.clientid===currid){
                                importthisx(elementx,'select')
                            }
                        });
                        done=1
                    }
                });

            }
        }
        else {
            setpreparedata([])
            if (valx === 2) {
                var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                setinno(seq)
            }
            setl(valx)
            setpreparedata([])
            console.log(data)
            if (valx === 2) {
                var done =0
            
                data.forEach((val, index) => {
                    
                    if (valx === 2) {
                        console.log(val.address)
                        const date = new Date();
                        const date3 = new Date();
                        var result = date3.setDate(date.getDate() + 20);
                        const date2 = new Date(result)
                        let day = date.getDate();
                        let month = date.getMonth() + 1;
                        let year = date.getFullYear();
                        let day2 = date2.getDate();
                        let month2 = date2.getMonth() + 1;
                        let year2 = date2.getFullYear();
                        // This arrangement can be altered based on how we want the date's format to appear.
                        let currentDate = `${month}-${day}-${year}`;
                        setindate(currentDate)
                        let currentDate2 = `${month2}-${day2}-${year2}`;
                        setindue(currentDate2)
                    }
                    if (ind.search(' ' + index.toString() + ' ') >= 0) {
                        var postData={
                            Client_id: val.clientid
                        }
                        findClientById(postData).then(res => {
                            setinadd(res.Client[0].address)
                      
         var t =Number(res.Client[0].weekend)+1

         const currentDate = new Date();
         const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
         let daysToLastFriday = dayOfWeek - (t===7?0:t); // Difference between current day and Friday (5)
       
         if (daysToLastFriday <= 0) {
           daysToLastFriday += 7; // Add 7 days to get the previous week's Friday
         }
       
         const lastFridayDate = new Date(currentDate);
         lastFridayDate.setDate(currentDate.getDate() - daysToLastFriday);
       
         const month = lastFridayDate.getMonth() + 1; // Adding 1 since getMonth() is 0-based
           const day = lastFridayDate.getDate();
           const year = lastFridayDate.getFullYear();
       
          setinend(`${month}/${day}/${year}`);
                        })


                        setinname(val.sitename)

                        setinnum(val.no)
                        setmkup(val.markup)
                        setincname(val.clientname)
                        setperdiemamnt1(Number(val.perdiemamnt))
                        setperdiemamnt1(Number(val.perdiemamnt))


                        val.user.length > 0 && val.user.forEach((element,inex) => {
                            const user = empdata.find(user => user._id === element.userid);

                            console.log(val)
                            if (valx === 2) {

                                setcurrid(val.clientid)


                            }

                            setpreparedata(pr => [...pr, {
                                Taxes: element.taxes,
                                Client: val.clientname,
                                Date: new Date(new Date().setDate(new Date().getDate() + ((clients.find((client) => client._id === val.clientid) || {}).weekend- (new Date().getDay() === 0 ? 7 : new Date().getDay()) + 1))).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '-'),
                                Employee: user.name,
                                skill: user.skill,
                                userid: element.userid,
                                siteid:val._id,
                                perdiemmiles:Number(val.perdiemmiles?val.perdiemmiles:0),
                                onperdiemmiles:Number(val.onperdiemmiles?val.onperdiemmiles:0),
                                cpr:user.cpr,
                                cprapply:element.payratetype==='custom'?'yes':'no',
                                Hrs: 0,
                                Payrate: valx === 1 ? Number(user.payrate).toFixed(2) : Number(Number(user.payrate) + Number(user.payrate) * Number(val.markup) / 100).toFixed(2) ,

                                distance: parseInt(element.distance),
                                days: 0,
                               // perdiemel: element.perdiem, onperdiemel: element.onperdiem,
                                
                               perdiemel:'No',
                               onperdiemel:'No',
                               
                               perdiem:val.perdiemamnt,   onperdiem:val.perdiemamnt,

                                Ot_Hrs: 0,
                                OT_Pay_rate: Number(user.otpayrate) + Number(user.otpayrate) * Number(val.markup) / 100,
                                nc_4: element.nc === 'no' ? '-' : ((Number(user.payrate) * 0) + (0 * Number(user.otpayrate))) * 4 / 100,
                                total: (Number(user.payrate) * 0) + (0 * Number(user.otpayrate)),
                                deductions: 0,
                                net: (Number(user.payrate) * 0) + (0 * Number(user.otpayrate)) - 0 - (element.nc === 'no' ? 0 : ((Number(user.payrate) * 0) + (0 * parseInt(user.otpayrate))) * 4 / 100)




                            }])
                            if(inex===val.user.length-1&&done===0){
                             
                              {/*   empdata.forEach(elementx => {
                                    const itemExistsInArrayB = val.user.some((item) => item.userid === elementx._id);
                                  console.log(itemExistsInArrayB)
                                    if(elementx.clientid===currid&&!itemExistsInArrayB){
                                        importthisx(elementx,new Date(new Date().setDate(new Date().getDate() + ((clients.find((client) => client._id === val.clientid) || {}).weekend- (new Date().getDay() === 0 ? 7 : new Date().getDay()) + 1))).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '-'))
                                    }
                                });
                            */}
                                done=1
                            }

                        });
                    }
                  

                });
                setk(1)
                console.log(preparedata)
            }
            else {
                var done=0
                data.forEach((val, index) => {

                    if (valx === 2) {

                        setmkup(val.markup)
                        setinnum(val.no)
                        setinadd(val.address)
                        setinname(val.sitename)
                        console.log(val.address)

                        const date = new Date();

                        const date3 = new Date();

                        var result = date3.setDate(date.getDate() + 20);
                        const date2 = new Date(result)

                        let day = date.getDate();
                        let month = date.getMonth() + 1;
                        let year = date.getFullYear();


                        let day2 = date2.getDate();
                        let month2 = date2.getMonth() + 1;
                        let year2 = date2.getFullYear();

                        // This arrangement can be altered based on how we want the date's format to appear.
                        let currentDate = `${month}-${day}-${year}`;
                        setindate(currentDate)
                        let currentDate2 = `${month2}-${day2}-${year2}`;
                        setindue(currentDate2)

                    }
                    if (ind.search(' ' + index.toString() + ' ') >= 0) {


                        setperdiemamnt1(Number(val.perdiemamnt))
                        setperdiemamnt1(Number(val.perdiemamnt))


                        setinname(val.sitename)
                        setincname(val.clientname)
                        val.user.length > 0 && val.user.forEach((element,inex) => {
                            const user = empdata.find(user => user._id === element.userid);

                            console.log(val)

                            setcurrid(val.clientid)



                            setpreparedata(pr => [...pr, {
                                Taxes: element.taxes,
                                Client: val.clientname,
                                Date: new Date(new Date().setDate(new Date().getDate() + ((clients.find((client) => client._id === val.clientid) || {}).weekend- (new Date().getDay() === 0 ? 7 : new Date().getDay()) + 1))).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '-'),
                                Employee: user.name,
                                Hrs: 0,
                                days: 0,
                                distance: parseInt(element.distance),
                                cpr:user.cpr,
                                cprapply:'yes',
                                userid: element.userid,
                                siteid:val._id,
                                perdiemmiles:Number(val.perdiemmiles?val.perdiemmiles:0),
                                onperdiemmiles:Number(val.onperdiemmiles?val.onperdiemmiles:0),
                                perdiem:val.perdiemamnt,   onperdiem:val.perdiemamnt,
                                Payrate: valx === 1 ? parseInt(user.payrate) : parseInt(user.payrate),
                                Ot_Hrs: 0,
                                OT_Pay_rate: parseInt(user.otpayrate),
                                nc_4: element.nc === 'no' ? '-' : ((parseInt(user.payrate) * 0) + (0 * parseInt(user.otpayrate))) * 4 / 100,
                                total: (parseInt(user.payrate) * 0) + (0 * parseInt(user.otpayrate)),
                                deductions: 0,
                                net: (parseInt(user.payrate) * 0) + (0 * parseInt(user.otpayrate)) - 0 - (element.nc === 'no' ? 0 : ((parseInt(user.payrate) * 0) + (0 * parseInt(user.otpayrate))) * 4 / 100)


                                ,
                             //   perdiemel: element.perdiem, onperdiemel: element.onperdiem,
 perdiemel:'No',
                              onperdiemel:'No',
                              
                            }])
                            if(inex===val.user.length-1&&done===0){
                           
                               {/*  empdata.forEach(elementx => {
                                    const itemExistsInArrayB = val.user.some((item) => item.userid === elementx._id);
                                  console.log(itemExistsInArrayB)
                                    if(elementx.clientid===currid&&!itemExistsInArrayB){
                                        importthisx(elementx,new Date(new Date().setDate(new Date().getDate() + ((clients.find((client) => client._id === val.clientid) || {}).weekend- (new Date().getDay() === 0 ? 7 : new Date().getDay()) + 1))).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replace(/\//g, '-'))
                                    }
                                });
                            */}
                                done =1
                            }

                        });
                    }

                });
                setk(1)
                console.log(preparedata)
            }
        }

    }





    function setcurronex(val) {
        setcurrone(val)
        setkshow(true)
        ddd2(val)
    }
    function exports() {
        const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        var ext = '.xlsx'

        const myHeader = ["Taxes", "Client", "Date", 'Employee', 'Hrs', 'Payrate', 'Ot_Hrs', 'OT_Pay_rate', 'total', 'nc_4', 'deductions', 'net'];
        const ws = XLSX.utils.json_to_sheet(preparedata, { header: myHeader })

        var wscols = [
            { wch: 6 },
            { wch: 7 },
            { wch: 8 },
            { wch: 20 },
            { wch: 6 },
            { wch: 7 },
            { wch: 8 },
            { wch: 10 },
            { wch: 7 },
            { wch: 8 },
            { wch: 12 },
        ];
        for (var k = 0; k < preparedata.length + 1; k++) {
            if (k === 0) {

                ws[`B${k + 1}`].s = styl1
                ws[`A${k + 1}`].s = styl1
                ws[`C${k + 1}`].s = styl1
                ws[`D${k + 1}`].s = styl1
                ws[`E${k + 1}`].s = styl1
                ws[`F${k + 1}`].s = styl1
                ws[`G${k + 1}`].s = styl1
                ws[`H${k + 1}`].s = styl1
                ws[`I${k + 1}`].s = styl1
                ws[`J${k + 1}`].s = styl1
                ws[`K${k + 1}`].s = styl1
                ws[`L${k + 1}`].s = styl1
            }
            else {

                ws[`B${k + 1}`].s = styl2
                ws[`A${k + 1}`].s = styl2
                ws[`C${k + 1}`].s = styl2
                ws[`D${k + 1}`].s = styl2
                ws[`E${k + 1}`].s = styl2
                ws[`F${k + 1}`].s = cstyl2
                ws[`G${k + 1}`].s = styl2
                ws[`H${k + 1}`].s = cstyl2
                ws[`I${k + 1}`].s = styl2
                ws[`J${k + 1}`].s = styl2
                ws[`K${k + 1}`].s = styl2
                ws[`L${k + 1}`].s = cstyl2

            }
        }




        ws['!cols'] = wscols;
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        const excelbuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' })
        const dar = new Blob([excelbuffer], { type: filetype })
        file.saveAs(dar, 'asd.xlsx',)




    }

    const [totalall, settotalall] = useState(0)
    const [markupcuee, setmarkupcuee] = useState(0)
    const [multiple, setmultiple] = useState(false)
    function exports2() {

        setaduserl('adduser')
        var tx = []
        var alltotal = 0
        settxp([])
    
        preparedata.forEach((val, index) => {


      
            var tr = parseFloat(val.Payrate)

            var to = parseFloat(val.OT_Pay_rate)
if(val.Hrs>0){

    alltotal = alltotal + parseFloat(tr * val.Hrs + to * val.Ot_Hrs + Number(val.perdiem)*val.days+ Number(val.onperdiem))
    settotalall(alltotal)
}
            tx.push({
                ["NAME"]: val.Employee,
                ["REG HRS"]: val.Hrs,
                ["WEEKEND"]: val.Date,
                ["REG RTE"]: Number(tr).toFixed(2).toLocaleString('en'),
                ["OT HRS"]: val.Ot_Hrs,
                ["OT RTE"]: Number(to).toFixed(2).toLocaleString('en'),
                ["TOTAL"]: Number(tr * val.Hrs + to * val.Ot_Hrs + Number(val.perdiem)*val.days+ Number(val.onperdiem)).toFixed(2).toLocaleString('en'),
                ["SKILL"]: val.skill,
                ["site"]: ((found) => found ? found.sitename : 'Project not found')(data.find(project => project._id === val.siteid)), // Output: "Project 2" or "Project not found"
                
                ["P.D"]: Number(val.perdiem)  ,

                ["days"]: Number(val.days)+(val.onperdiemel==='Yes'?1:0),



            })
            if (preparedata.length - 1 === index) {
                
                settxp(tx)
                console.log(tx)
                var cstyl2x =
                {
                    border: {
                        right: {
                            style: "thin",
                            color: { rgb: "8DB2D5" }
                        },
                        left: {
                            style: "thin",
                            color: { rgb: "8DB2D5" }
                        },
                        bottom: {
                            style: "thin",
                            color: { rgb: "8DB2D5" }
                        },
                        top: {
                            style: "thin",
                            color: { rgb: "8DB2D5" }
                        },
                    },
                    font: {
                        name: "arial",
                        bold: false,
                        sz: 10,
                        color: { rgb: '3E5B77' }
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },
                    numFmt: "$#,###.00"
                };
                var styl2x =
                {
                    border: {
                        right: {
                            style: "thin",
                            color: { rgb: "8DB2D5" }
                        },
                        left: {
                            style: "thin",
                            color: { rgb: "8DB2D5" }
                        },
                        bottom: {
                            style: "thin",
                            color: { rgb: "8DB2D5" }
                        },
                        top: {
                            style: "thin",
                            color: { rgb: "8DB2D5" }
                        },
                    },
                    font: {
                        name: "arial",
                        bold: false,
                        sz: 10,
                        color: { rgb: '3E5B77' }
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },
                };
                var styl1x =
                {
                    border: {
                        right: {
                            style: "thin",
                            color: { rgb: '6899c7' }
                        },
                        left: {
                            style: "thin",
                            color: { rgb: '6899c7' }
                        },
                        bottom: {
                            style: "thin",
                            color: { rgb: '6899c7' }
                        },
                        top: {
                            style: "thin",
                            color: { rgb: '6899c7' }
                        },
                    },
                    font: {
                        name: "arial",
                        bold: true,
                        sz: 10,

                        color: { rgb: '4069A7' }
                    },
                    alignment: {
                        vertical: "center",
                        horizontal: "center",
                    },							// set the style for target cell
                    fill: {
                        fgColor: {

                            theme: 8,
                            tint: 0.3999755851924192,
                            rgb: 'FFFFFF'
                        }
                    },
                };
                const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
                var ext = '.xlsx'

                const myHeader = ["WEEKEND", "NAME", 'SKILL', "REG HRS", 'REG RTE', 'OT HRS', "OT RTE", 'TOTAL'];
                var prd2 = [
                    {

                        ["NAME"]: "val.Employee",
                        ["REG HRS"]: "val.Hrs",
                        ["WEEKEND"]: "val.Date",
                        ["REG RTE"]: "val.Payrate",
                        ["OT HRS"]: "val.Ot_Hrs",
                        ["OT RTE"]: "val.OT_Pay_rate",
                        ["TOTAL"]: "val.total",
                        ["SKILL"]: "val.skill",
                    },
                    {

                        ["NAME"]: "val.Employee",
                        ["REG HRS"]: "val.Hrs",
                        ["WEEKEND"]: "val.Date",
                        ["REG RTE"]: "val.Payrate",
                        ["OT HRS"]: "val.Ot_Hrs",
                        ["OT RTE"]: "val.OT_Pay_rate",
                        ["TOTAL"]: "val.total",
                        ["SKILL"]: "val.skill",
                    }, {

                        ["NAME"]: "val.Employee",
                        ["REG HRS"]: "val.Hrs",
                        ["WEEKEND"]: "val.Date",
                        ["REG RTE"]: "val.Payrate",
                        ["OT HRS"]: "val.Ot_Hrs",
                        ["OT RTE"]: "val.OT_Pay_rate",
                        ["TOTAL"]: "val.total",
                        ["SKILL"]: "val.skill",
                    }, {

                        ["NAME"]: "val.Employee",
                        ["REG HRS"]: "val.Hrs",
                        ["WEEKEND"]: "val.Date",
                        ["REG RTE"]: "val.Payrate",
                        ["OT HRS"]: "val.Ot_Hrs",
                        ["OT RTE"]: "val.OT_Pay_rate",
                        ["TOTAL"]: "val.total",
                        ["SKILL"]: "val.skill",
                    },

                ]
                console.log(preparedata)
                const ws = XLSX.utils.json_to_sheet(prd2, { header: myHeader })


                var wscols = [

                    { wch: 8 },
                    { wch: 13 },
                    { wch: 15 },

                    { wch: 8 },
                    { wch: 8 },
                    { wch: 8 },
                    { wch: 8 },
                    { wch: 10 },
                    { wch: 7 },
                    { wch: 8 },
                    { wch: 12 },
                ];



                var wscolsd = [
                    { hpx: 20 },

                    { hpx: 20 },

                    { hpx: 20 },

                    { hpx: 20 },

                    { hpx: 20 },

                    { hpx: 40 },
                ]

                ws['!rows'] = wscolsd

                ws['!cols'] = wscols;
                settxp(tx)

                var ws3 = XLSX.utils.sheet_add_json(ws,
                    tx
                    , {

                        header: myHeader,
                        skipHeader: false,
                        origin: 'A7'
                    });
                var wsx = XLSX.utils.sheet_add_aoa(ws3, [
                    [`${compnay}`, '', '', '', '', '', '', ''],

                    [`Date: ${indate}`, '', '', '', '', '', '', ''],

                    [`Invoice # ${inno}`, '', '', '', '', `${add}`, '', ''],

                    [`Project Number ${innum}`, '', '', '', '', `${zpi}`, '', ''],

                    [`Project Name: ${inname}`, '', '', '', '', '919-381-0394', '', ''],
                    [`${inadd}`, '', '', '', '', 'www.cfi-solutions.com', '', ''],

                ], {

                    header: ["note"],
                    skipHeader: true,
                    origin: 'A1'
                });

                var ws2 = XLSX.utils.sheet_add_aoa(wsx, [

                    ['', '', , '', , '', 'Total', alltotal],
                    ['', "Thanks for your business. Its a pleasure to work with you on your project."],
                ], {

                    header: ["note"],
                    skipHeader: true,
                    origin: -1
                });
                var g = tx.length + 7
                for (var k = 0; k < g; k++) {
                    if (k === 0 || k === 1 || k == 2 || k === 3 || k == 4 || k === 5) {

                        ws2[`B${k + 1}`].s = styleforaddress
                        ws2[`A${k + 1}`].s = styleforaddress
                        ws2[`C${k + 1}`].s = styleforaddress
                        ws2[`D${k + 1}`].s = styleforaddress
                        ws2[`E${k + 1}`].s = styleforaddress
                        ws2[`F${k + 1}`].s = styleforaddress
                        ws2[`G${k + 1}`].s = styleforaddress
                        ws2[`H${k + 1}`].s = styleforaddress
                    }
                    else if (k === 6) {

                        ws2[`B${k + 1}`].s = styl1x
                        ws2[`A${k + 1}`].s = styl1x
                        ws2[`C${k + 1}`].s = styl1x
                        ws2[`D${k + 1}`].s = styl1x
                        ws2[`E${k + 1}`].s = styl1x
                        ws2[`F${k + 1}`].s = styl1x
                        ws2[`G${k + 1}`].s = styl1x
                        ws2[`H${k + 1}`].s = styl1x
                    }
                    else {

                        ws2[`B${k + 1}`].s = styl2x
                        ws2[`A${k + 1}`].s = styl2x
                        ws2[`C${k + 1}`].s = styl2x
                        ws2[`D${k + 1}`].s = styl2x
                        ws2[`E${k + 1}`].s = cstyl2x
                        ws2[`F${k + 1}`].s = styl2x
                        ws2[`G${k + 1}`].s = cstyl2x
                        ws2[`H${k + 1}`].s = styl2x

                    }
                }

                ws2[`B${tx.length + 9}`].s = styleforaddress
                ws2[`G${tx.length + 8}`].s = styleforaddress2
                ws2[`H${tx.length + 8}`].s = styleforaddress2
                const merge = [
                    { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
                    { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
                    { s: { r: 2, c: 0 }, e: { r: 2, c: 3 } },
                    { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
                    { s: { r: 4, c: 0 }, e: { r: 4, c: 3 } },
                    { s: { r: 5, c: 0 }, e: { r: 5, c: 3 } },

                    { s: { r: 1, c: 5 }, e: { r: 1, c: 7 } },
                    { s: { r: 0, c: 5 }, e: { r: 0, c: 7 } },
                    { s: { r: 2, c: 5 }, e: { r: 2, c: 7 } },
                    { s: { r: 3, c: 5 }, e: { r: 3, c: 7 } },
                    { s: { r: 4, c: 5 }, e: { r: 4, c: 7 } },
                    { s: { r: 5, c: 5 }, e: { r: 5, c: 7 } },


                ];
                ws2["!merges"] = merge;
                const wb = { Sheets: { 'data': ws2 }, SheetNames: ['data'] }
                const excelbuffer = XLSX.write(wb, { booktype: 'xlsx', type: 'array' })
                const dar = new Blob([excelbuffer], { type: filetype })
                /* file.saveAs(dar, 'asd.xlsx',)*/


            }

        

        });


    }
    const [txp, settxp] = useState()
    function adddata() {
        setuserdata(userdata => [...userdata, {
            name: name,
            skill: skill,
            payrate: payrate,
            otpayrate: otpayrate,
            nc: nc,
            taxes: taxas,
            perdiem: 'No',
            onperdiem: 'No',
            distance: 0,
            food: 'No',




        }])
        setj(0)

    }
    const [userdata, setuserdata] = useState([])
    const [empdata, setempdata] = useState()
    function allemps(val) {
        var t = val.split('eiuka')
        setuserdata([])
        setcname(t[0])
        setclientid(t[2])
        setclientadd(t[3])
        console.log(t[2])
        setmarkupcuee(parseFloat(t[1]))
        empdata.forEach((element, index) => {
            if (t[0] === element.client) {


                setuserdata(userdata => [...userdata, {
                    name: element.name,
                    skill: element.skill,
                    payrate: element.payrate,
                    otpayrate: element.otpayrate,
                    nc: element.nc,
                    empno: element.idno,
                    taxes: element.taxes,
                    userid: element._id,
                    latlang: element.langlat,
                    distance: 0,
                    perdiem: 'No',
                    onperdiem: 'No',
                    food: 'No',




                }])


            }



        });


    }

    function selectthis(val) {
        setcurrone(val)
        if (val.latlang) {
            marker2.current = new mapboxgl.Marker()
                .setLngLat(JSON.parse(val.latlang))
                .setPopup(
                    new mapboxgl.Popup({ offset: 0 }) // add popups
                        .setHTML(
                            `<h3>${val.clientname}</h3><p>${val.sitename}</p>`
                        )
                )
                .addTo(map2.current)
        }


    }

const [datax, setdatax] = useState(null)
const [timesheets, settimesheets] = useState([])
const [activebtnn, setactivebtnn] = useState('timesheet')
    useEffect(() => {

console.log(props)
var postData={
    email:props.props
}

               loginAdmin2(postData).then(res=>
                    {
                        console.log(res
                            )
                            setdatax(res.Admin)
                    })
                
          
        getAactiveSiteusers().then(res => {
            console.log(res)
            res.Siteuserd.sort((a, b) => {
                // Convert names to lowercase for case-insensitive sorting
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
              
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              });
              
            setempdata(res.Siteuserd)
        })

        getAllTimesheets().then(res => {
            console.log(res)
            settimesheets(res.Timesheet)
        })
        getAllJobsites().then(res => {
            console.log(res)
            setdata(res.Jobsite)

            setcurrentItems(res.Jobsite.slice(itemOffset, endOffset))
            setpageCount(Math.ceil(res.Jobsite.length / 5))



            map2.current = new mapboxgl.Map({
                container: mapContainer2.current,

                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng2, lat2],
                zoom: zoom2
            });

            const geocoder2 = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
            });

            // Add the geocoder to the map
            map2.current.addControl(geocoder2);

            map2.current.on('style.load', function () {
                res.Jobsite.forEach(element => {
                    if (element.latlang) {
                        marker2.current = new mapboxgl.Marker()
                            .setLngLat(JSON.parse(element.latlang))
                            .setPopup(
                                new mapboxgl.Popup({ offset: 0 }) // add popups
                                    .setHTML(
                                        `<h3>${element.clientname}</h3><p>${element.sitename}</p>`
                                    )
                            )
                            .addTo(map2.current)


                    }

                });


                map2.current.resize()
                geocoder2.on('result', function (e) {
                    if (marker2.current) marker2.current.remove()
                    marker2.current = new mapboxgl.Marker()
                        .setLngLat(e.result.center)
                        .addTo(map2.current)
                    setlatlang(JSON.stringify(e.result.center))

                    setlatlang(e.result.center)

                });


            });




        })

        return () => {

        }
    }, [])

    function req() {
        if (actiontype === 'update') {
            var postData={
                clientid: clientid,
                clientname: cname,
                status: 'Active',
                sitename: sname,
                markup: markupcuee,
                user: userdata,
                no: pno,
                task: tasks,
                address: address,
                latlang: latlang,
                _id: currone._id




            }
            updateJobiste(postData).then(res => {
                getAllJobsites().then(res => {
                    setsteps(0)
                    setcheckinfo(false)
                    console.log(res)
                    setdata(res.Jobsite)
                    setadduser('adduser2')

                    setcurrentItems(res.Jobsite.slice(itemOffset, endOffset))
                    setpageCount(Math.ceil(res.Jobsite.length / 5))
                    setactiontype('edit')
                })

            })
        }
        else {
            var postData={

                clientid: clientid,
                clientname: cname,
                status: 'Active',
                sitename: sname,
                task: tasks,
                markup: markupcuee,
                user: userdata,
                no: pno,
                address: address,
                perdiemamnt: perdiemamnt,
                perdiemamnt: perdiemamnt,
                latlang: latlang
            }

           addJobiste(postData).then(resa => {
                getAllJobsites().then(res => {
                    setsteps(0)
                    setcheckinfo(false)
                    console.log(res)
                    setdata(res.Jobsite)
                    setadduser('adduser2')

                    setcurrentItems(res.Jobsite.slice(itemOffset, endOffset))
                    setpageCount(Math.ceil(res.Jobsite.length / 5))
                })
            })
        }

    }

    function turnon() {
        if (is === 0) {
            settaxas('yes')

            setcircle('circle2')
            settaxes('taxes2')
            setis(1)
        }
        else {

            settaxas('no')

            setcircle('circle')
            settaxes('taxes')
            setis(0)
        }

    }
    function turnon2() {
        if (is2 === 0) {
            setnc('4')

            setcircle2('circle2')
            settaxes2('taxes2')
            setis2(1)
        }
        else {

            setcircle2('circle')
            settaxes2('taxes')
            setis2(0)

            setnc('no')
        }

    }
    const [lastselected, setlastselected] = useState('XXXXXX')
    const [lastcom, setlastcom] = useState('')
    const [allhours, setallhours] = useState([])
    

    function backtop() {
        
        setk(0)
        setlastselected(ind)
        setlast2(lastcom)
        setallhours(prevData => [...prevData.map(existingObj => preparedata.find(newObj => newObj.siteid === existingObj.siteid&&newObj.userid === existingObj.userid) || existingObj), ...preparedata.filter(newObj => !prevData.find(existingObj => newObj.siteid === existingObj.siteid&&newObj.userid === existingObj.userid))]);
        preparesheet(2)
        console.log(ind)

    }

    function backtop2() {
        setlastselected(ind)
        setlast2(lastcom)
        setallhours(prevData => [...prevData.map(existingObj => preparedata.find(newObj => newObj.siteid === existingObj.siteid&&newObj.userid === existingObj.userid) || existingObj), ...preparedata.filter(newObj => !prevData.find(existingObj => newObj.siteid === existingObj.siteid&&newObj.userid === existingObj.userid))]);
console.log(allhours)
setpreparedata([])
setl(2)

    }

    function backtop1() {
        setlastselected(ind)
        setlast2(lastcom)
        setallhours(prevData => [...prevData.map(existingObj => preparedata.find(newObj => newObj.siteid === existingObj.siteid&&newObj.userid === existingObj.userid) || existingObj), ...preparedata.filter(newObj => !prevData.find(existingObj => newObj.siteid === existingObj.siteid&&newObj.userid === existingObj.userid))]);
console.log(allhours)

setpreparedata([])
setl(1)

    }

    const [jobn, setjobn] = useState('')
    const [nc, setnc] = useState('')
    const [taxas, settaxas] = useState('')
    const [pr, setpr] = useState('')
    const [otpr, setotpr] = useState('')
    const [j, setj] = useState(0)
    const [k, setk] = useState(1)

    const [ind, setind] = useState('')
    function addindex(index,val) {
        setlastcom(val.clientid)
        if (ind.search(' ' + index.toString() + ' ') >= 0) {

            console.log(ind)
            setind(ind.replace(' ' + index.toString() + ' ', ''))
        }
        else {
            setind(ind + ' ' + index.toString() + ' ')
            console.log(ind)
        }


    }

    const [steps, setsteps] = useState(0)
    const [adduser3, setadduser3] = useState('adduser2')
    const [tempjson, settempjson] = useState()
    const [upind, setupind] = useState(9999)
    
    function showadd(index) {
        setupind(index)
        {/*
    setadduser3('adduser')*/}
        console.log(preparedata[index])
        settempjson(preparedata[index])


    }

    function updatedata() {
        var p = preparedata
        p[upind] = tempjson
        p[upind].total = ( tempjson.cprapply==='yes'? tempjson.cpr* p[upind].Hrs:tempjson.Payrate* p[upind].Hrs) + (p[upind].Ot_Hrs * p[upind].OT_Pay_rate)
      


        if (tempjson.nc_4 !== '-') {

            p[upind].nc_4 = ((tempjson.cprapply==='yes'? tempjson.cpr* p[upind].Hrs:tempjson.Payrate* p[upind].Hrs) + (p[upind].Ot_Hrs * p[upind].OT_Pay_rate)) * 4 / 100

        }

        p[upind].net = p[upind].total - (tempjson.nc_4 !== '-' ? p[upind].nc_4 : 0) - p[upind].deductions + (applyperdiemx&&p[upind].perdiemel==='Yes' ? Number(p[upind].perdiem * p[upind].days) : 0) + (applyperdiemx&&p[upind].onperdiemel==='Yes' ? Number(p[upind].onperdiem) : 0)

        setpreparedata(p)

      if(l!==2){
        if(tempjson.siteid==='193039'){
            var postData={
                id:tempjson.userid,
           
                cprapply:tempjson.cprapply==='yes'?'custom':'normal'
    
    
    
            }
            updateSiteUserCPR(postData).then(res => {
                console.log(res)
    
            setadduser3('adduser2')
            })
        }else{
            var postData={
                id:tempjson.siteid,
                userid:tempjson.userid,
                payratetype:tempjson.cprapply==='yes'?'custom':'normal'
    
    
    
            }
            updateSiteUserPayRateType(postData).then(res => {
                console.log(res)
    
            setadduser3('adduser2')
            })

        }
     
      }
      else{

        setadduser3('adduser2')
      }
      setupind(9999)


    }
    const [l, setl] = useState(2)
    const [currone, setcurrone] = useState()
    const [mx, setmx] = useState(0)
    const [currproject, setcurrproject] = useState()
    function setms(val) {
        setcurrproject(val)
        if (mx === 0) {
            setmx(1)
        } else {
            setmx(0)
        }

    }
    function setnameq(val) {
        empdata.forEach(element => {
            if (element._id === val) {

                setname(element.name)
                setskill(element.skill)
                setpayrate(element.payrate)
                setotpayrate(element.otpayrate)
                setnc(val.nc)
                settaxas(val.taxes)

            }

        });



    }
    const [boxprojectsx, setboxprojectsx] = useState('boxprojects2')
    const [clients, setclients] = useState()
    useEffect(() => {
        getActiveClients().then(res => {
            console.log(res)
            setclients(res.Client)
        })

        return () => {

        }
    }, [])
    const [clientid, setclientid] = useState('')
    function skipthis(element) {

        var y = preparedata
        setpreparedata([])
        y.forEach((elemen, index) => {
            if (index === element) {

            }
            else {
                setpreparedata(pre => [...pre, elemen])
            }


        });
    }

    function skipthis2(element) {

        var y = userdata
        setuserdata([])
        y.forEach((elemen, index) => {
            if (index === element) {

            }
            else {
                setuserdata(pre => [...pre, elemen])
            }


        });
    }
    const [deleteids, setdeleteids] = useState([])
    function setadduserx() {
        setadduser('adduser2')
        setsteps(0)
        setcheckinfo(false)
        setactiontype('edit')
    }
    function deletedata() {

        console.log(ind)
        var r = []
        data.forEach((element, index) => {
            if (index === data.length - 1) {

                if (ind.search(' ' + index.toString() + ' ') >= 0) {
                    r.push(element._id)



                }
                var postData={
                    ids: r



                }
                deleteJobsite(postData).then(res => {
                    console.log(res)
                    setdeleteids([])
                    getAllJobsites().then(res2 => {
                        console.log(res2)
                        setdata(res2.Jobsite)
                        setind('')

                        setcurrentItems(res2.Jobsite.slice(itemOffset, endOffset))
                        setpageCount(Math.ceil(res2.Jobsite.length / 5))
                    })
                })
            } else {

                if (ind.search(' ' + index.toString() + ' ') >= 0) {
                    setdeleteids(del => [...del, element._id])
                    r.push(element._id)



                }
            }

        });


    }
    const [nameskill, setnameskill] = useState([])
    const [proval, setproval] = useState('')
    const [indue, setindue] = useState('')
   
    function setinnox(val){
        const newValue = val.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

   
        setinno(newValue)
    }

    const [indate, setindate] = useState('')
    const [inno, setinno] = useState('')
    const [inname, setinname] = useState('')
    const [innum, setinnum] = useState('')
    const [customperdiem, setcustomperdiem] = useState(0)
    const [inadd, setinadd] = useState('')
    const [mapx, setmapx] = useState('mapx')
    const [cfm, setcfm] = useState(true)
    const [showlistview, setshowlistview] = useState(false)
  
    const [currjobid, setcurrjobid] = useState('')
    const [currcompany, setcurrcompany] = useState('')
    const [departments, setdepartments] = useState([])
    function selectthiscompany(val,val2,val3){
        setmkup(val3)
        setcurrjobid(val)
        setcurrcompany(val2)
        setind('')
        setcurrid(val)
        setboxprojectsx('boxprojects2')
     

    }
 
   

    function turn3(val, index) {
        if (val === 'No') {
            setuserdata(Object.values({ ...userdata, [index]: { ...userdata[index], food: 'Yes' } }))
        }

        else {

            setuserdata(Object.values({ ...userdata, [index]: { ...userdata[index], food: 'No' } }))
        }
    }
    const [searval, setsearval] = useState('')
    const [checkinfo, setcheckinfo] = useState(false)
    const [incname, setincname] = useState('')
    const componentRef = useRef();


    function setstex() {

        if (steps === 0) {
            if (!sname || !pno || !cname) {
                setcheckinfo(true)

            } else {

                setcheckinfo(false)

                setsteps(steps => steps + 1)
            }
        }
        else if (steps === 1) {
            if (!chklatlang) {
                setcheckinfo(true)

            } else {

                setcheckinfo(false)

                setsteps(steps => steps + 1)
            }
        }

        else if (steps === 2) {
            if (tasks.length === 0) {
                alert('Add at least 1 task')

            } else {


                setsteps(steps => steps + 1)
            }
        }
        else if (steps === 3) {


            setsteps(steps => steps + 1)
            var t = userdata

            setuserdata([])
            const fetchData = async () => {
                const updatedObjects = await Promise.all(
                    t.map(async (obj) => {
                        const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${JSON.parse(obj.latlang).lng},${JSON.parse(obj.latlang).lat};${chklatlang.lng},${chklatlang.lat}?access_token=pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g`);

                        var di = ((res.data.routes[0].distance / 1000) * 0.62) + 6
                        console.log(di)
                        if (di >= perdiemmil && di >= onperdiemmil) {
                            const updatedObj = { ...obj, distance: di, onperdiem: 'Yes', perdiem: 'Yes', };
                            return updatedObj

                        }
                        else if (di >= perdiemmil && di < onperdiemmil) {
                            const updatedObj = { ...obj, distance: di, onperdiem: 'No', perdiem: 'Yes' };
                            return updatedObj

                        }
                        else if (di < perdiemmil && di >= onperdiemmil) {
                            const updatedObj = { ...obj, distance: di, onperdiem: 'Yes', perdiem: 'No' };
                            return updatedObj

                        }
                        else {
                            const updatedObj = { ...obj, distance: di, onperdiem: 'No', perdiem: 'No' };
                            return updatedObj

                        }
                    })
                )
                console.log(updatedObjects)
                setuserdata(updatedObjects)


            };
            fetchData()



        }
    }
    const [compnay, setcompnay] = useState('City Force LLC')
    const [adduser2, setadduser2] = useState('adduser2')
    const [add, setadd] = useState('1106 W CORNWALLIS RD, STE 105')
    const [actiontype, setactiontype] = useState('edit')
    function updateuser() {
        setactiontype('update')
        setadduser('adduser fixedarea')
        setclientid(currone.clientid)
        setcname(currone.clientname)
        setsname(currone.sitename)
        setmarkupcuee(currone.markup)
        setuserdata(currone.user)
        setpno(currone.no)
        setaddress(currone.address)
        setchklatlang(JSON.parse(currone.latlang))



    }
    function updateonel(val){
        if(val==='enableit'){
            settempjson(tempjson => ({
                ...tempjson,
                
                
                onperdiemel: 'Yes'
                
                }))
        }
        else{
            settempjson(tempjson => ({
                ...tempjson,
                
                
                onperdiemel: 'No'
                
                }))
        }
     
      }
    const [applyperdiemx, setapplyperdiemx] = useState(false)
    function appt(){
     
    }
    function handlecpr(val){
        if(val==='no'){
            settempjson((prevState) => ({ ...prevState, cprapply: 'yes' }));

        }else{
            settempjson((prevState) => ({ ...prevState, cprapply: 'no' }));

        }
    }
    const [comval, setcomval] = useState('')
    const [loadingperdiem, setloadingperdiem] = useState(false)
    function applyperdiem() {
        setloadingperdiem(true)
        console.log(preparedata)
        const extractedData = preparedata.map(item => {
            return {
                id: item.userid,
             
            };
        });
        var postData={
            users:extractedData,
            weekend:inend
         }
  
        getSiteUserDistance(postData).then(rees=>{
            console.log(rees)
            const updatedArray = preparedata.map((obj, index) => {

                const foundUser = rees.find(user => user.userid === obj.userid);
const elday=foundUser.dailymiles.some(val=>val>=obj.perdiemmiles)
const elon=foundUser.dailymiles.some(val=>val>=obj.onperdiemmiles)
if (index === preparedata.length - 1) {
    
    setapplyperdiemx(true)
}

    var updobj = {
        ...obj,
        perdiemel:'Yes',
        onperdiemel:'No',
        perdiem: Number(obj.perdiem),
        onperdiem:  Number(obj.onperdiem),
        days:obj.days,
        distance:foundUser.miles
    }
    updobj.total = Number(updobj.total) 
    updobj.net = Number(updobj.net) + Number(obj.onperdiem) * obj.days + 0
    return updobj
/*


                if (index === preparedata.length - 1) {
    
                    setapplyperdiemx(true)
                }
                if ( elday&& elon ) {
                    var updobj = {
                        ...obj,
                        perdiemel:'Yes',
                        onperdiemel:'Yes',

                        perdiem: Number(obj.perdiem),
                        onperdiem:  Number(obj.onperdiem),
                        days:obj.days,
                        distance:foundUser.miles
                    }
                    updobj.total = Number(updobj.total) 
                    updobj.net = Number(updobj.net) + Number(obj.perdiem) * obj.days + Number(obj.onperdiem) 
                    return updobj
                }
                else if (elon&& !elday) {
    
                    var updobj = {
                        ...obj,
                        perdiemel:'No',
                        onperdiemel:'Yes',
                        perdiem:  Number(obj.perdiem),
                        onperdiem: Number(obj.onperdiem),
                        days:obj.days,
                        distance:foundUser.miles
                    }
                    updobj.total = Number(updobj.total) 
                    updobj.net = Number(updobj.net) + Number(obj.perdiem) * obj.days + 0
                    return updobj
                }
                else if (elday && !elon) {
    
                    var updobj = {
                        ...obj,
                        perdiemel:'Yes',
                        onperdiemel:'No',
                        perdiem: Number(obj.perdiem),
                        onperdiem:  Number(obj.onperdiem),
                        days:obj.days,
                        distance:foundUser.miles
                    }
                    updobj.total = Number(updobj.total) 
                    updobj.net = Number(updobj.net) + Number(obj.onperdiem) * obj.days + 0
                    return updobj
                }
                else {
    
                    var updobj = {
                        ...obj,
                        perdiemel:'No',
                        onperdiemel:'No',
                        perdiem: Number(obj.perdiem),
                        onperdiem: Number(obj.onperdiem),
                        days:obj.days,
                        distance:foundUser.miles
                    }
                    updobj.total = Number(updobj.total) + 0 + 0
                    updobj.net = Number(updobj.net) + 0 + 0
                    return updobj
                }
**/


            });
    
            setpreparedata(updatedArray);
            console.log(updatedArray)
            console.log(perdiemamnt1)
            console.log(perdiemamnt1)
    
            setadduser2('adduser2')
            console.log(preparedata)
            setloadingperdiem(false)
        })


        /*
      const updatedArray = preparedata.map((obj, index) => {
            if (index === preparedata.length - 1) {

                setapplyperdiemx(true)
            }
            if (obj.perdiemel === 'Yes' && obj.onperdiemel === 'Yes') {
                var updobj = {
                    ...obj,
                    perdiem: Number(obj.perdiem),
                    onperdiem:  Number(obj.onperdiem),
                }
                updobj.total = Number(updobj.total) + Number(obj.perdiem) * updobj.days + Number(obj.onperdiem) * updobj.days
                updobj.net = Number(updobj.net) + Number(obj.perdiem) * updobj.days + Number(obj.onperdiem) * updobj.days
                return updobj
            }
            else if (obj.perdiemel === 'Yes' && obj.onperdiemel === 'No') {

                var updobj = {
                    ...obj,
                    perdiem:  Number(obj.perdiem),
                    onperdiem: 0,
                }
                updobj.total = Number(updobj.total) + Number(obj.perdiem) * updobj.days + 0
                updobj.net = Number(updobj.net) + Number(obj.perdiem) * updobj.days + 0
                return updobj
            }
            else if (obj.perdiemel === 'No' && obj.onperdiemel === 'Yes') {

                var updobj = {
                    ...obj,
                    perdiem: 0,
                    onperdiem:  Number(obj.onperdiem),
                }
                updobj.total = Number(updobj.total) + Number(obj.onperdiem) * updobj.days + 0
                updobj.net = Number(updobj.net) + Number(obj.onperdiem) * updobj.days + 0
                return updobj
            }
            else {

                var updobj = {
                    ...obj,
                    perdiem: 0,
                    onperdiem: 0,
                }
                updobj.total = Number(updobj.total) + 0 + 0
                updobj.net = Number(updobj.net) + 0 + 0
                return updobj
            }
        });

        setpreparedata(updatedArray);
        console.log(updatedArray)
        console.log(perdiemamnt1)
        console.log(perdiemamnt1)

        setadduser2('adduser2')
        console.log(preparedata)
        */




    }
    function importthissheet(vala){
        setpreparedata([])
        console.log(ind)
      setind('')
      let inda=''
        async function processData() {
         
        
                const indexes = vala.projects.map(elementa => data.findIndex(item => item._id === elementa.projectid));
          
                console.log(indexes)
            
                indexes.forEach(element => {
                   
                    inda=inda + ' ' + element.toString() + ' '
                });
                setind(inda)
          }
         
          
          processData();

          setinend(vala.Weekend)
          const date = new Date();

          const date3 = new Date();

          var result = date3.setDate(date.getDate() + 20);
          const date2 = new Date(result)

          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();


          let day2 = date2.getDate();
          let month2 = date2.getMonth() + 1;
          let year2 = date2.getFullYear();

          // This arrangement can be altered based on how we want the date's format to appear.
          let currentDate = `${month}/${day}/${year}`;
          setindate(currentDate)
          let currentDate2 = `${month2}/${day2}/${year2}`;
          setindue(currentDate2)
          var postData={
            Client_id: currid
        }
          findClientById(postData).then(res => {
            setinadd(res.Client[0].address)
        })

       var userdone=[]
       var users=vala.Data
       var pdata=[]
 data.forEach((val, index) => {
                    
                    
                    if (inda.search(' ' + index.toString() + ' ') >= 0) {
                     


                        setinname(val.sitename)

                        setinnum(val.no)
                        setmkup(val.markup)
                        setincname(val.clientname)
                        setperdiemamnt1(Number(val.perdiemamnt))
                        setperdiemamnt1(Number(val.perdiemamnt))


                        val.user.length > 0 && val.user.forEach((element,inex) => {

                            
                            console.log(val)
                        
                                setcurrid(val.clientid)

                                console.log(users)
var indx=users.length>0?users.findIndex(vl=>vl.userid===element.userid):-1
console.log(indx)

 
if(indx!==-1&&!(pdata.some(vl=>vl.userid===users[indx].userid))){
    console.log(users[indx])
var hrs=Number( users[indx].total.split(':')[0]==='-'?0:users[indx].total.split(':')[0])
var days=(Number(users[indx].hrs&&users[indx].hrs.length>0)?
    
users[indx].hrs.reduce((count, obj) => {
    const totalMinutes = obj.time.reduce((acc, time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return acc + hours * 60 + minutes;
    }, 0);
    
    if (totalMinutes > 8 * 60) {
      count++;
    }
    
    return count;
  }, 0):
0
)
var rhrs=hrs>40?40:hrs
var ohrs=hrs>40?hrs-40:0
console.log(days)

var prt=Number(Number(element.payrate) + Number(element.payrate) * Number(val.markup) / 100).toFixed(2) 
var oprt=Number(Number(element.otpayrate) + Number(element.otpayrate) * Number(val.markup) / 100).toFixed(2) 
    setpreparedata(pr => [...pr, {
        Taxes: element.taxes,
        Client: val.clientname,
        Date: users[indx].Weekend,
        
        Employee: element.name,
        skill: element.skill,
        userid: element.userid,
        siteid:val._id,
        perdiemmiles:Number(val.perdiemmiles?val.perdiemmiles:0),
        onperdiemmiles:Number(val.onperdiemmiles?val.onperdiemmiles:0),
        cpr:element.cpr,
        cprapply:element.payratetype==='custom'?'yes':'no',
        Hrs:rhrs,
        Payrate: prt ,

        distance: parseInt(element.distance),
        days: days,
       // perdiemel: element.perdiem, onperdiemel: element.onperdiem,
        
       perdiemel:'No',
       onperdiemel:'No',
       
       perdiem:val.perdiemamnt, 
    onperdiem:val.perdiemamnt,

        Ot_Hrs: ohrs,
        OT_Pay_rate: oprt,
        nc_4: element.nc === 'no' ? '-' : ((prt * 0) + (0 * oprt)) * 4 / 100,
        total: (prt * rhrs) + (ohrs * oprt),
        deductions: 0,
        net: (prt * rhrs) + (ohrs * oprt) - 0 - (element.nc === 'no' ? 0 : ((prt * 0) + (0 * oprt)) * 4 / 100)




    }])

 pdata.push({
        Taxes: element.taxes,
        Client: val.clientname,
        Date: users[indx].Weekend,
        
        Employee: element.name,
        skill: element.skill,
        userid: element.userid,
        siteid:val._id,
        perdiemmiles:Number(val.perdiemmiles?val.perdiemmiles:0),
        onperdiemmiles:Number(val.onperdiemmiles?val.onperdiemmiles:0),
        cpr:element.cpr,
        cprapply:element.payratetype==='custom'?'yes':'no',
        Hrs:hrs,
        Payrate: Number(Number(element.payrate) + Number(element.payrate) * Number(val.markup) / 100).toFixed(2) ,

        distance: parseInt(element.distance),
        days: days,
       // perdiemel: element.perdiem, onperdiemel: element.onperdiem,
        
       perdiemel:'No',
       onperdiemel:'No',
       
       perdiem:val.perdiemamnt, 
    onperdiem:val.perdiemamnt,

        Ot_Hrs: hrs,
        OT_Pay_rate: Number(element.otpayrate) + Number(element.otpayrate) * Number(val.markup) / 100,
        nc_4: element.nc === 'no' ? '-' : ((Number(element.payrate) * 0) + (0 * Number(element.otpayrate))) * 4 / 100,
        total: (Number(element.payrate) * hrs) + (hrs * Number(element.otpayrate)),
        deductions: 0,
        net: (Number(element.payrate) * hrs) + (hrs * Number(element.otpayrate)) - 0 - (element.nc === 'no' ? 0 : ((Number(element.payrate) * 0) + (0 * parseInt(element.otpayrate))) * 4 / 100)




    })
  
}

                            

                          

                        });
                    }
                  

                });

            var pro=data.find(vl=>vl._id===vala.projects[0].projectid)

          
             if(users.length>0){
               users.forEach((element,index2) => {
                var days=(Number(element.hrs&&element.hrs.length>0)?
    
element.hrs.reduce((count, obj) => {
    const totalMinutes = obj.time.reduce((acc, time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return acc + hours * 60 + minutes;
    }, 0);
    
    if (totalMinutes > 8 * 60) {
      count++;
    }
    
    return count;
  }, 0):
0
)
                var emp=empdata.find(vl=>vl._id===element.userid)
                var hrs=Number( element.total==='-'?0:element.total.split(':')[0])
             if(!(pdata.some(vl=>vl.userid===element.userid))){
                var prt=Number(Number(emp.payrate) + Number(emp.payrate) * Number(pro.markup) / 100).toFixed(2) 
                var oprt=Number(Number(emp.otpayrate) + Number(emp.otpayrate) * Number(pro.markup) / 100).toFixed(2) 
var rhrs=hrs>40?40:hrs
var ohrs=hrs>40?hrs-40:0
                setpreparedata(pr => [...pr, {
                    Taxes: 'No',
                    Client: vala.clientname,
                    Date: element.Weekend,
                    
                    Employee: element.username,
                    skill: emp.skill,
                    userid: element.userid,
                    siteid:pro._id,
                    perdiemmiles:Number(pro.perdiemmiles?pro.perdiemmiles:0),
                    onperdiemmiles:Number(pro.onperdiemmiles?pro.onperdiemmiles:0),
                    cpr:Number(emp.cpr),
                    cprapply:'no',
                    Hrs:rhrs,
                    Payrate: prt,
            
                    distance: 0,
                    days: days,
                   // perdiemel: emp.perdiem, onperdiemel: emp.onperdiem,
                    
                   perdiemel:'No',
                   onperdiemel:'No',
                   
                   perdiem:pro.perdiemamnt, 
                onperdiem:pro.perdiemamnt,
            
                    Ot_Hrs: ohrs,
                    OT_Pay_rate: oprt,
                    nc_4: emp.nc === 'no' ? '-' : ((prt * 0) + (0 *oprt)) * 4 / 100,
                    total: (prt * rhrs) + (ohrs *oprt),
                    deductions: 0,
                    net: (prt * rhrs) + (ohrs *oprt) - 0 - (emp.nc === 'no' ? 0 : ((prt * 0) + (0 * oprt)) * 4 / 100)
            
            
            
            
                }])
             }
               });
             }


              setadduserd('adduser2')


    }
    const [zpi, setzpi] = useState('Durham NC 27705')
    const [mail, setmail] = useState('admin@cfl-solution.com')
    const [aduserx, setaduserx] = useState('adduser2')
    const [perdiemamnt, setperdiemamnt] = useState(0)
    const [perdiemmil, setperdiemmil] = useState(0)

    const [onperdiemmil, setonperdiemmil] = useState(0)

    const [perdiemamnt1, setperdiemamnt1] = useState(34)
    const [perdiemmil1, setperdiemmil1] = useState(0)

    const [onperdiemmil1, setonperdiemmil1] = useState(0)
    const [aduserl, setaduserl] = useState('adduser2')
    function opm() {
        setaduserx('adduser')
    }
    return (


    <>
    {aduserl==='adduser'?
     <div className={`${aduserl} nobg`}>
     <div className="mainpage1"  >
         <ReactToPrint
         onBeforeGetContent={e=>showdepartments(false)}

             trigger={() => <button className='exportbtn'>
                <img src={pdf} className='pdficon' alt="" />
                Export To pdf!</button>}
             content={() => componentRef.current}
         />

         <button className='exportbtn3' style={{
            
         }} onClick={e => showlistviewx?showdepartments(false):showdepartments(true)}>
      
         <img src={email} className='pdficon' alt="" />
            Send Email!
            
            {showlistviewx&&
    <div className="listview" style={{
    }} onClick={(e) => e.stopPropagation()}>
  
{departments.length>0?
departments.map((val)=>(
  <div className="listviewsub"
    onClick={e => sendemail(val)}
    >
{val.dept}
    </div>
))
:
<div className="listviewsub">
    No department
</div>

}
       
</div>
}
            </button>
            <button className='exportbtn2' onClick={e => setaduserl('adduser2')}>Cancel</button>

         <div className="mainpage" ref={componentRef}>



             <div className="mainpage" id='shareable' >

                 <h1 className='invoiceh'>{compnay}<p className='invoicep' >Invoice</p></h1>
                 <div className="spanl">
                     <h3>
                         Date: <p>{indate}</p>
                     </h3>
                     <h3>
                         Invoice #: <p>{inno}</p>
                     </h3>
                    
                     <h3>
                         Due Date: <p>{indue}</p>
                     </h3>

                 </div>
                 <div className="billto">
                     <div className="bill1">
                         <h3>
                             Bill To:
                         </h3>
                         <h2>{incname?incname:currcompany}</h2>
                         {
                            inadd&&inadd.search('\n')>0?
                            <>
                            <h2>{inadd.split('\n')[0]}</h2>
                            <h2>{inadd.split('\n')[1]}</h2>
                            </>
:<>

<h2>
    {inadd}</h2></>

                         }
                        
{!multiple&&innum&&<>


<h2>Project # {innum}</h2>
                         <h2>
                             Project Name: {inname}
                         </h2></>

}

                     </div>
                     <div className="bill1">
                       
                         <h2 style={{
                          marginTop:10  
                         }} >{add}</h2>
                         <h2>{zpi}</h2>
                         <h2>919-381-0394</h2>
                         <h2>www.cfi-solutions.com</h2>


                     </div>
                 </div>
                 <div className="tavle">
                     <div className="tavhead">
                         <h6 style={{ width: '100px' }}>
                             WEEKEND
                         </h6>
                         <h6 style={{ width: '100px' }}>
                             NAME
                         </h6>
                         <h6 style={{ width: '100px' }}>
                             SKILL
                         </h6>

                         {applyperdiemx &&
                             <>
                                 <h6 style={{ width: '100px' }}>DAYS</h6>
                                 <h6 style={{ width: '100px' }}>P.D</h6>
                             </>
                         }
                         <h6>
                             REG HRS
                         </h6>
                         <h6>REG BILL RTE</h6>
                         <h6>
                             OT HRS
                         </h6>
                         <h6>OT BILL RTE</h6>
                         <h6>TOTAL</h6>




                     </div>

                     {txp && txp.map((val, index) => (
                        (val["REG HRS"]>0||val["OT HRS"]>0) && <>
                             {index % 2 === 0 ?
                                 <div className="tavbody">
                                     <h6 style={{ width: '100px' }}>
                                         {val["WEEKEND"]}
                                     </h6>
                                     <h6 style={{ width: '100px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' ,textAlign:'center'}}>
                                         {val["NAME"]}
                                         <br/>
                                       
                                        
                                     </h6>
                                     <h6 style={{ width: '100px'}}>
                                         {val["SKILL"]}
                                     </h6>
                                     {applyperdiemx &&
                                         <>

                                             <h6 style={{ width: '100px' }}> {val["days"]}</h6>
                                             <h6 style={{ width: '100px' }}>$ {val["P.D"]}</h6>
                                         </>
                                     }
                                     <h6>
                                        {val["REG HRS"]}
                                     </h6>
                                     <h6>$ {val["REG RTE"]}</h6>
                                     <h6>
                                          {val["OT HRS"]}
                                     </h6>
                                     <h6> $ {val["OT RTE"]}</h6>

                                     <h6> {Number(val["TOTAL"]).toLocaleString('en-US', {
style: 'currency',
currency: 'USD',
})}</h6>

                                 </div> :
                                 <div className="tavbody tavbo">
                                     <h6 style={{ width: '100px' }}>
                                         {val["WEEKEND"]}
                                     </h6>
                                     <h6 style={{ width: '100px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' ,textAlign:'center'}}>
                                         {val["NAME"]}
                                         <br/>
                                         
                                     </h6>
                                     <h6 style={{ width: '100px' }}>
                                         {val["SKILL"]}
                                     </h6>

                                     {applyperdiemx &&
                                         <>

                                             <h6 style={{ width: '100px' }}> {val["days"]}</h6>
                                             <h6 style={{ width: '100px' }}>$  {val["P.D"]}</h6>
                                         </>
                                     }
                                     <h6>
                                         {val["REG HRS"]}
                                     </h6>
                                     <h6> $ {val["REG RTE"]}</h6>
                                     <h6>
                                         {val["OT HRS"]}
                                     </h6>
                                     <h6>$ {val["OT RTE"]}</h6>
                                     <h6> {Number(val["TOTAL"]).toLocaleString('en-US', {
style: 'currency',
currency: 'USD',
})}</h6>

                                 </div>

                             }
                         </>
                     ))

                     }

                     <div className="tavbody tavbodyx">
                         <h6 style={{ width: '100px' }}>

                         </h6>
                         <h6 style={{ width: '100px' }}>

                         </h6>
                         <h6 style={{ width: '100px' }}>

                         </h6>
                         <h6>

                         </h6>
                         <h6></h6>
                         <h6>

                         </h6>
                         <h6>Total</h6>
                         <h6 style={{ width: 'max-content' }}>  {parseFloat(totalall.toFixed(2)).toLocaleString('en-US', {
style: 'currency',
currency: 'USD',
})} </h6>

                     </div>

                     <div className="special">
                         <h1>Special Notes & Instructions</h1>

                     </div>


                     <h1 className='h1h'>
                        Thank you for your business. It is a pleasure to work with you on your project.
                     </h1>
                 </div>






             </div>

         </div>




     </div>
 </div>:
 <>

           
          
 <div className={adduserd}>


     <div className="longsub">
        <div className="selectn">
            <button className={activebtnn==='invoice'?'selectnbtn':'selectnbtno'} onClick={e=>setactivebtnn('invoice')} >Invoices</button>
            <button  className={activebtnn==='timesheet'?'selectnbtn':'selectnbtno'} onClick={e=>setactivebtnn('timesheet')} >Timesheets</button>
        </div>
         <IoClose className='posif' onClick={e => setadduserd('adduser2')} />
         {
            activebtnn==='invoice'?
             clients && clients.map(val2 => (
                 val2._id === currid &&
                 val2.invoicedata .slice()
                 .reverse().map((val,index) => (
                 <>
                         <div className="rowval" key={index}>
                             <FaFileImage className='fami' />
                             <div className="midone">
                                 <h1>{val.filename}</h1>
                                 <p>Saved by {val.by?val.by:'Admin'} on {val.created&&val.created}</p>
                             </div>
                             <button onClick={e => importthis(val)} >Import</button>
                         </div>
                         <div className="linn"></div>
                     </>
                 ))
             )):
             timesheets&&timesheets.map(val=>(
               (val.companyid&&val.companyid===currid)&&
                <>
                <div className="rowval">
             
                    <img src={filea} className='faff' alt="" />
                    <div className="midone">
                        <h4>{val.filename?val.filename:'New timesheet'} <h6>           {val.projects.length>0&&val.projects[0].projectname+', '} {val.projects.length>0&&val.projects.length+'  more'} </h6></h4>
                        <h6>
                 
<h4>Created {val.createdon &&val.createdon}: Weekend : {val.Weekend &&val.Weekend}</h4>
                        </h6>
                    </div>
                    <button onClick={e => importthissheet(val)} >Import</button>
                </div>
                
                </>
             ))
         }

     </div>
 </div>
 <div className={adduserd2}>
     <div className="longsub">
         <input type="Search" placeholder='Search..' className='inkl' onChange={e=>setsearval(e.target.value)} />
         <IoClose className='posif' onClick={e => setadduserd2('adduser2')} />

         {
             searval? empdata && empdata.map(val2 => (
            
                 val2.clientid===currid&&  val2.name.toLowerCase().search(searval.toLowerCase())>=0&&<>
                         <div className="rowval">
                            <div className="imgh">
                             {!val2.imgurl?
                             <img src={prof} alt="" />:
                             <img src={val2.imgurl} alt="" />

                             }
                            </div>
                             <div className="midone">
                                 <h1>{val2.name}</h1>
                                 <p>{val2.skill}</p>
                             </div>
                             <button onClick={e => importthisx(val2)} >Add</button>
                         </div>
                         <div className="linn"></div>
                     </>
           
             )):empdata && empdata.map(val2 => (
                 val2.clientid===currid&&
                 <>
                     <div className="rowval">
                        <div className="imgh">
                         {!val2.imgurl?
                         <img src={prof} alt="" />:
                         <img src={val2.imgurl} alt="" />

                         }
                        </div>
                         <div className="midone">
                             <h1>{val2.name}</h1>
                             <p>{val2.skill}</p>
                         </div>
                         <button onClick={e => importthisx(val2)} >Add</button>
                     </div>
                     <div className="linn"></div>
                 </>
       
         ))
         
       
}
     </div>
 </div>

 {tempjson &&

     <div className={adduser3}>

         <div className="subadduser ">

             <>
                 <div className="inputname">
                     <h1>Name</h1>
                     <input value={tempjson.Employee} onChange={e => settempjson(tempjson => ({
                         ...tempjson,


                         Employee: e.target.value

                     }))} type="text" />




                 </div>

                 <div className="inputname">
                     <h1>Working Hrs</h1>
                     <input value={tempjson.Hrs} type="text"
                         onChange={e => settempjson(tempjson => ({
                             ...tempjson,


                             Hrs: e.target.value

                         }))}
                     />

                 </div>
                 <div className="inputname">
                     <h1>Pay rate (per/hr)</h1>
                     <input value={tempjson.Payrate} type="text"
                         onChange={e => settempjson(tempjson => ({
                             ...tempjson,


                             Payrate: e.target.value

                         }))}
                     />

                 </div>
                 <div className="inputname" >
                     <h1>OT Hrs</h1>
                     <input value={tempjson.Ot_Hrs} type="text"
                         onChange={e => settempjson(tempjson => ({
                             ...tempjson,


                             Ot_Hrs: e.target.value

                         }))}
                     />

                 </div>
                 <div className="inputname">
                     <h1>OT Pay rate (per/hr)</h1>
                     <input value={tempjson.OT_Pay_rate} type="text" onChange={e => settempjson(tempjson => ({
                         ...tempjson,


                         OT_Pay_rate: e.target.value

                     }))} />

                 </div>
                 <div className="inputname">
                     <h1>Deduction</h1>
                     <input value={tempjson.deductions} type="text" onChange={e => settempjson(tempjson => ({
                         ...tempjson,


                         deductions: e.target.value

                     }))} />

                 </div>
                 <div className="inputname">
                     <h1>Days</h1>
                     <input value={tempjson.days} type="text" onChange={e => settempjson(tempjson => ({
                         ...tempjson,


                         days: e.target.value

                     }))} />

                 </div>
                 <div className="inputname"></div>
                 <div className="inputname">
                     <h1>Taxes:  </h1>
                     <div className={taxes} onClick={e => turnon()}>
                         <div className={circle}>

                         </div>
                     </div>

                 </div>
                 <div className="inputname">
                     <h1>NC (4%):  </h1>
                     <div className={taxes2} onClick={e => turnon2()}>
                         <div className={circle2}>

                         </div>
                     </div>

                 </div>
               {l===1&&  <div className="inputname">
                     <h1>Apply custom payrate:  </h1>
                   {tempjson.cprapply==='yes'?  <div className="taxes2" onClick={e => handlecpr(tempjson.cprapply)}>
                         <div className="circle2">

                         </div>
                     </div>:  <div className="taxes" onClick={e => handlecpr(tempjson.cprapply)}>
                         <div className="circle">

                         </div>
                     </div>

                   }

                 </div>

               }

                 <button onClick={e => updatedata()} className='btn1'>Update</button>
                 <button style={{ marginBottom: '30px' }} onClick={e => setadduser3('adduser2')} className='btn2'>Cancel</button>

             </>




         </div>




     </div>

 }

 <div className={adduser2}>


     <div className="subadduser hadduser ">

         <IoClose className='iov' onClick={e => setadduser2('adduser2')} />
         <>


             <>
                 <h6>Perdiem & Other Expenses</h6>
                 <div className="inpex inpexs">
                     <h1>Perdiem ($)</h1>
                     <input type="number" onChange={e => setperdiemamnt1(e.target.value)} value={perdiemamnt1} />
                 </div>
                 <div className="inpex inpexs">
                     <h1>Minimum Distance (Mi)</h1>
                     <input type="number" onChange={e => setperdiemmil1(e.target.value)} value={perdiemmil1} />
                 </div>

                 <div className="inpex inpexs">
                     <h1>Overnight Perdiem ($)</h1>
                     <input type="number" onChange={e => setperdiemamnt1(e.target.value)} value={perdiemamnt1} />
                 </div>
                 <div className="inpex inpexs">
                     <h1>Minimum Distance (Mi)</h1>
                     <input type="number" onChange={e => setonperdiemmil1(e.target.value)} value={onperdiemmil1} />
                 </div>



             </>


             <div className="inpex2">


                 <button onClick={e => applyperdiem('')} className='btn1'>Apply</button>

                 <button onClick={e => setadduser2('adduser2')} className='btn1'>Cancel</button>
             </div>           <div className="inputname"></div>
         </>




     </div>



 </div>
 {i === 0 &&
     <>
         <div className={adduser}>
             {j === 1 &&
                 <div className="subadduser subadduser2">

                     <>
                         <div className="inputname">
                             <h1>Name</h1>


                             <input type="text" onChange={e => setnameq(e.target.value)} />
                         </div>

                         <div className="inputname">
                             <h1>Skill</h1>
                             <input value={skill} type="text" onChange={e => setskill(e.target.value)} />

                         </div>
                         <div className="inputname">
                             <h1>Pay rate (per/hr)</h1>
                             <input value={payrate} type="text" onChange={e => setpayrate(e.target.value)} />

                         </div>
                         <div className="inputname">
                             <h1>OT Pay rate (per/hr)</h1>
                             <input value={otpayrate} type="text" onChange={e => setotpayrate(e.target.value)} />

                         </div>

                         <div className="inputname">
                             <h1>Taxes:  </h1>
                             <div className={taxes} onClick={e => turnon()}>
                                 <div className={circle}>

                                 </div>
                             </div>

                         </div>
                         <div className="inputname">
                             <h1>NC (4%):  </h1>
                             <div className={taxes2} onClick={e => turnon2()}>
                                 <div className={circle2}>

                                 </div>
                             </div>

                         </div>
                         <div className="inputname">

                         </div>

                         <button onClick={e => adddata()} className='btn1'>Add</button>
                         <button onClick={e => setj(0)} className='btn2'>Back</button>

                     </>




                 </div>

             }
             {j === 0 &&
                 <div className="subadduser hadduser ">

                     <IoClose className='iov' onClick={e => setadduserx('adduser2')} />
                     <> <div className="prcs" >
                         <div className="circ1">
                             <div className="subcirc">

                             </div>
                         </div>
                         {steps >= 1 ?
                             <div className="bare">

                             </div> :

                             <div className="bare grbare">

                             </div>}
                         {steps >= 1
                             ?

                             <div className="circ1">
                                 <div className="subcirc">

                                 </div>
                             </div> :

                             <div className="circ1 grcirc">
                                 <div className="subcirc grcirc">

                                 </div>
                             </div>}
                         {steps >= 2 ?
                             <div className="bare">

                             </div> :

                             <div className="bare grbare">

                             </div>}

                         {steps >= 2
                             ?

                             <div className="circ1">
                                 <div className="subcirc">

                                 </div>
                             </div> :

                             <div className="circ1 grcirc">
                                 <div className="subcirc grcirc">

                                 </div>
                             </div>

                         }
                         {steps >= 3 ?
                             <div className="bare">

                             </div> :

                             <div className="bare grbare">

                             </div>}

                         {steps >= 3
                             ?

                             <div className="circ1">
                                 <div className="subcirc">

                                 </div>
                             </div> :

                             <div className="circ1 grcirc">
                                 <div className="subcirc grcirc">

                                 </div>
                             </div>

                         }

                     </div>

                         {steps === 0 ?
                             <>
                                 <h6>General info</h6>
                                 <div className="inpex">
                                     <h1>Project name</h1>
                                     <input onChange={e => setsname(e.target.value)} value={sname} type="text" />
                                     {checkinfo && steps === 0 && !sname &&
                                         <h6 className='redinfo'>Project name is required</h6>

                                     }
                                 </div>
                                 <div className="inpex">
                                     <h1>Project no:</h1>
                                     <input onChange={e => setpno(e.target.value)} value={pno} type="text" />
                                     {checkinfo && steps === 0 && !pno &&
                                         <h6 className='redinfo'>Number is required</h6>

                                     }
                                 </div>
                                 <div className="inpex">
                                     <h1>Company</h1>

                                     <select className='select2' name="cars" id="cars" onChange={e => allemps(e.target.value)}>

                                         {!cname && <option >Choose Company</option>

                                         }
                                         {
                                             clients && clients.map(val => (
                                                 <option value={val.username + 'eiuka' + val.markup + 'eiuka' + val._id + 'eiuka' + val.address}>{val.username}</option>
                                             ))
                                         }
                                     </select>
                                     {checkinfo && steps === 0 && !cname &&
                                         <h6 className='redinfo'> Select company</h6>

                                     }
                                 </div>

                             </> :
                             steps === 1 ?
                                 <>



                                     <div className={mapx} ref={mapContainer}></div>


                                     <>
                                         <div className={inpex}>
                                             <h1>Address</h1>
                                             <input onChange={e => setaddress(e.target.value)} value={address} type="text" />
                                             {checkinfo && steps === 1 && !chklatlang &&
                                                 <h6 className='redinfo'>Map location is required</h6>

                                             }
                                         </div>
                                         <div className={inpex}>
                                             <button onClick={e => ddd()}>Choose from map</button>
                                         </div>
                                     </>



                                 </>
                                 :

                                 steps === 2 ?
                                     <>
                                         <h6>Tasks</h6>
                                         <div className="alltasks">
                                             {tasks && tasks.map(val => (
                                                 <p>{val.name} <VscChromeClose onClick={e => settasks(tasks.filter(item => item.name !== val.name))} className='sff' /></p>
                                             ))}
                                         </div>

                                         <div className="inpex">

                                             <input onChange={e => settaskname(e.target.value)} value={taskname} type="text" placeholder='Task' />

                                         </div>
                                         <div className="inpex" style={{ marginTop: '-10px' }}>
                                             <input onChange={e => settaskdesc(e.target.value)} value={taskdesc} type="text" placeholder='Description' />

                                         </div>
                                         <div className="inpex">
                                             <button className='intbtn' onClick={e => addtask()}>+ task</button>
                                         </div>


                                     </> : steps === 3 ?
                                         <>
                                             <h6>Perdiem & Other Expenses</h6>
                                             <div className="inpex inpexs">
                                                 <h1>Perdiem ($)</h1>
                                                 <input type="number" onChange={e => setperdiemamnt(e.target.value)} value={perdiemamnt} />
                                             </div>
                                             <div className="inpex inpexs">
                                                 <h1>Minimum Distance (Mi)</h1>
                                                 <input type="number" onChange={e => setperdiemmil(e.target.value)} value={perdiemmil} />
                                             </div>

                                             <div className="inpex inpexs">
                                                 <h1>Overnight Perdiem ($)</h1>
                                                 <input type="number" onChange={e => setperdiemamnt(e.target.value)} value={perdiemamnt} />
                                             </div>
                                             <div className="inpex inpexs">
                                                 <h1>Minimum Distance (Mi)</h1>
                                                 <input type="number" onChange={e => setonperdiemmil(e.target.value)} value={onperdiemmil} />
                                             </div>

                                             <div className="inpex inpexs">
                                                 <h1>Other Expenses ($)</h1>
                                                 <input type="number" />
                                             </div>

                                         </> :

                                         <div className="tablerow trow">
                                             <div className="subtable">
                                                 <div className="headertable clop">
                                                     <h2 style={{ width: '50px', paddingLeft: '10px' }}>Action</h2>
                                                     <h1>Employee</h1>

                                                     <h6>Skill</h6>
                                                     <h4>Pay rate</h4>
                                                     <h5>OT Pay rate</h5>

                                                     <h5>Distance</h5>

                                                     <h2 style={{ width: '80px' }}>

                                                         Perdiem
                                                     </h2>
                                                     <h2 style={{ width: '100px' }}>

                                                         O.N Perdiem
                                                     </h2>

                                                     <h2 style={{ width: '80px' }}>

                                                         Food</h2>



                                                     <h3>Taxes</h3>
                                                     <h5>NC(%)</h5>


                                                 </div>
                                                 {userdata && userdata.map((val, index) => (
                                                     <>
                                                         <div className="headertable">
                                                             <h2 style={{ width: '50px', paddingLeft: '10px' }}>
                                                                 <AiFillDelete onClick={e => skipthis2(index)} /></h2>
                                                             <h1><img src='' alt="" className='valimg' /> {val.name}</h1>

                                                             <h6>{val.skill}</h6>

                                                             <h3>{val.payrate}</h3>
                                                             <h4>{val.otpayrate}</h4>

                                                             <h4>{parseInt(val.distance)} Miles</h4>
                                                             <h2 style={{ width: '80px' }}>
                                                                 {val.perdiem}
                                                             </h2>
                                                             <h2 style={{ width: '100px' }}>
                                                                 {val.onperdiem}
                                                             </h2>




                                                             <h2 style={{ width: '80px' }}>

                                                                 {val.food === 'No' ?
                                                                     <div className="taxes" onClick={e => turn3(val.food, index)}>
                                                                         <div className="circle">

                                                                         </div>
                                                                     </div> :
                                                                     <h4 className="taxes2" onClick={e => turn3(val.food, index)}>
                                                                         {<div className="circle2">

                                                                         </div>}
                                                                     </h4>

                                                                 }
                                                             </h2>

                                                             <h5>{val.taxes}</h5>
                                                             {
                                                                 val.nc !== 'no' ?

                                                                     <h5>{val.nc}%</h5>
                                                                     :

                                                                     <h5>NO</h5>
                                                             }


                                                         </div>
                                                     </>
                                                 ))

                                                 }
                                             </div>
                                         </div>
                         }


                         {
                             steps === 4 && <div className="inputname">
                                 <button onClick={e => setj(1)} className='pluadd'>+ Add Employee</button>

                             </div>
                         }

                         <div className="inpex2">

                             {mapx === 'mapx' || mapx === 'mapx3' ?
                                 <>

                                     <button className='btg' onClick={e => steps > 0 ? setsteps(steps => steps - 1) : ""}><HiArrowLeft className='btgp' /> Back</button>
                                     <button onClick={e => steps < 4 ? setstex() : req()} className='btn1'>{steps < 4 ? "Next" : "Finish"}</button>
                                 </>
                                 :


                                 <button onClick={e => setmapxs('mapx3')} className='btn1'>{steps < 4 ? "Save" : "Done"}</button>

                             }
                         </div>           <div className="inputname"></div>
                     </>




                 </div>

             }

         </div>
     </>

 }
 <div className="sitemap">
     {mx === 0 &&
         <>
             <div className="newst nbst" style={{ marginTop: '20px' }}>
                 <div className="newst1 " style={{ position: 'relative' }}>
                 <h6 className='btg' style={{

                    width:50,
                    cursor:'pointer'
                 }} onClick={e=>props.onCancel()}><HiArrowLeft className='btgp'/> Back</h6>


              
                     {
                         kshow &&
                         <IoClose className='iov hideondesk iov2' onClick={e => setkshow(false)} />

                     }
                 </div>

                 {!kshow && <div className="newsts nospacebw  hideondesk">
                     {
                         searchval.length === 0 ?

                             data && data.map(val => (
                                 <>{


                                     <div onClick={e => setcurronex(val)} className="cardl jobcardl">
                                         <div className="topl">
                                             <p>Jobsite</p>

                                             <button style={{ color: 'rgb(3, 143, 9', background: '#DBFFF8' }}>{val.clientname}</button>


                                         </div>
                                         <h3>{val.sitename}</h3>

                                         <h1>No. Of Users: {val.user && val.user.length}</h1>
                                         <h1>{val.user && val.address}</h1>
                                     </div>


                                 }
                                 </>
                             )) :

                             data && data.map(val => (
                                 <>{


                                     val.sitename && val.sitename.toLowerCase().search(searchval.toLowerCase()) >= 0 &&
                                     <div onClick={e => setcurronex(val)} className="cardl jobcardl">
                                         <div className="topl">
                                             <p>Jobsite</p>

                                             <button style={{ color: 'rgb(3, 143, 9', background: '#DBFFF8' }}>{val.clientname}</button>


                                         </div>
                                         <h3>{val.sitename}</h3>

                                         <h1>No. Of Users: {val.user && val.user.length}</h1>
                                         <h1>{val.user && val.address}</h1>
                                     </div>


                                 }
                                 </>
                             ))

                     }
                 </div>

                 }
                 <div className="newst2">
                
                     {
                         k === 0 &&
                         <>

                             <button className='hideonmobile' onClick={e => preparesheet(0)}>Export to excel</button>
                             <button className='hideonmobile' onClick={e => preparesheet(1)}>Enter Hours</button>
                             <button className='addemp3 hideonmobile ' onClick={e => preparesheet(2)}> Invoice</button>

                         </>

                     }
                     {
                         k === 1 &&

                         <>
                             <button  className='actionbtp' onClick={e => setadduserd('adduser')}>Import</button>
                          
                        {
                         l===2?
<>   
   <button  className='actionbtp' onClick={e => showlistview?setshowlistview(false):setshowlistview(true)}>Actions
<FaSortDown className='actionbt' style={{
 marginTop:0,
 fontSize:18,
}} />


{showlistview&&
    <div className="listview" onClick={(e) => e.stopPropagation()}>
    <div className="listviewsub"
    onClick={e => save()}
    >
 <MdOutlineSave style={{
fontSize:20,
marginRight:5,
 }}/> Save
    </div>
    <div className="listviewsub"
        onClick={e => exports2()}
    >
        <FaFilePdf style={{
fontSize:20,
marginRight:5,
 }} />
       Invoice preview
        </div>
       
       
       {/**
        *  <div className="listviewsub"  onClick={e=>savepayroll(preparedata)}  >   
       <MdOutlinePayment style={{
fontSize:20,
marginRight:5,
 }} /> Send to payroll
        </div>
        */

       }
</div>
}


 </button>

</>
                  
                        
                        
                        :

                 <></>
                        }
              

                          
                             {/*l === 0 &&

                                 <button className='addemp2 addemp' onClick={e => updateaccount()}>Update Account</button>

                     */}
                             {l === 2 &&
                                 <>

                                     {/*  <button className='addemp2 addemp' onClick={e => postclient()}>Update Account</button>*/}
                                 </>
                             }
                         </>
                     }

                 </div>
             </div>


             {k === 0 &&
                 <>
                     <div className="newst">
                         <div className="tablerow hideonmobile tablef" id='tablerow'>
                             <div className="subtable">
                                 <div className="headertable clop">
                                     <h2 className='sxx'> Select</h2>
                                     <h1>Project</h1>

                                     <h6>Company</h6>
                                     <h3>Total Employees</h3>
                                     <h3>Status</h3>


                                 </div>
                                 {searchval.length > 0 && filter === 'jobsite' && data && data.map((val, index) => (
                                     val.sitename.toLowerCase().search(searchval.toLowerCase()) >= 0 &&
                                     <>
                                         <div className="headertable" onClick={e => selectthis(val)} >
                                             <h2 className='sxx'> <input onClick={e => addindex(index,val)} type="checkbox" checked={ind.search(' ' + index.toString() + ' ') >= 0 ? true : false} /> </h2>
                                             <h1>{val.sitename}</h1>

                                             <h6>{val.clientname}</h6>
                                             <h3>{val.user.length}</h3>
                                             <h4>{val.status}</h4>





                                         </div>
                                     </>
                                 ))

                                 }
                                 {searchval.length > 0 && filter === 'company' && currentItems && currentItems.map((val, index) => (
                                     val.clientname.toLowerCase().search(searchval.toLowerCase()) >= 0 &&
                                     <>
                                         <div className="headertable" onClick={e => selectthis(val)} >
                                             <h2 className='sxx'> <input onClick={e => addindex(index,val)} type="checkbox" checked={ind.search(' ' + index.toString() + ' ') >= 0 ? true : false} /> </h2>
                                             <h1>{val.sitename}</h1>

                                             <h6>{val.clientname}</h6>
                                             <h3>{val.user.length}</h3>
                                             <h4>{val.status}</h4>





                                         </div>
                                     </>
                                 ))

                                 }
                                 {searchval.length === 0 && currentItems && currentItems.map((val, index) => (

                                     <>
                                         <div className="headertable" onClick={e => selectthis(val)} >
                                             <h2 className='sxx'> <input onClick={e => addindex(index,val)} type="checkbox" checked={ind.search(' ' + index.toString() + ' ') >= 0 ? true : false} /> </h2>
                                             <h1>{val.sitename}</h1>

                                             <h6>{val.clientname}</h6>
                                             <h3>{val.user.length}</h3>
                                             <h4>{val.status}</h4>





                                         </div>
                                     </>
                                 ))

                                 }

                             </div>
                             <ReactPaginate
                                 breakLabel="..."
                                 nextLabel="next >"
                                 onPageChange={handlePageClick}
                                 pageRangeDisplayed={5}
                                 pageCount={pageCount}
                                 previousLabel="< previous"
                                 renderOnZeroPageCount={null}
                             />
                         </div>

                         <div className="comdet hideonmobile">
                             {currone ?
                                 <>
                                     <h1> Project</h1>
                                     <div className="penh" onClick={e => updateuser()
                                     }>
                                         <FaPencilAlt className='fadd' />

                                     </div>
                                     <div className="divx">
                                         <div className="bcircle">
                                             <FaBuilding className='fabv' />

                                         </div>
                                         <p>{currone.sitename}</p>
                                     </div>
                                     <div className="divx2">
                                         <div className="prt prt2">
                                             <h1>{currone.user.length} </h1>
                                             <p>Users</p>
                                         </div>
                                         <div className="prt">
                                             <h1>9</h1>
                                             <p>Clocked inn</p>
                                         </div>
                                     </div>
                                     <div className="cinfo">
                                         <h1>
                                             <MdLocationOn className='mdl' />Company  </h1>
                                         <p>{currone.clientname}</p>
                                     </div>
                                     <div className="cinfo">
                                         <h1>
                                             <MdLocationOn className='mdl' />Site address</h1>
                                         <p>{currone.address}</p>
                                     </div>

                                     <div className="badge">{currone.status}</div>
                                 </>
                                 :
                                 <div className="divx">

                                     <p>Select Company to view</p>
                                 </div>}

                         </div>

                         {kshow && <div className="comdet">
                             {currone ?
                                 <>
                                     <h1> Project</h1>

                                     <div className="divx">
                                         <div className="bcircle">
                                             <FaBuilding className='fabv' />

                                         </div>
                                         <p>{currone.sitename}</p>
                                     </div>
                                     <div className="divx2">
                                         <div className="prt prt2">
                                             <h1>{currone.user.length} </h1>
                                             <p>Users</p>
                                         </div>
                                         <div className="prt">
                                             <h1>9</h1>
                                             <p>Clocked inn</p>
                                         </div>
                                     </div>
                                     <div className="cinfo">
                                         <h1>
                                             <MdLocationOn className='mdl' />Company  </h1>
                                         <p>{currone.clientname}</p>
                                     </div>
                                     <div className="cinfo">
                                         <h1>
                                             <MdLocationOn className='mdl' />Site address</h1>
                                         <p>{currone.address}</p>
                                     </div>

                                     <div className="badge">{currone.status}</div>
                                 </>
                                 :
                                 <div className="divx">

                                     <p>Select Company to view</p>
                                 </div>}

                         </div>

                         }
                     </div>

                     <div className="newst hideondesk">
                         <div className="comdetxx" ref={mapContainer3}></div>
                     </div>
                     <div className="newst hideonmobile">
                         <div className="comdetxx" ref={mapContainer2}></div>
                     </div>
                 </>

             }
             {k == 1 && l === 2 &&
                 <div className='sssw' style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>


                     <div className="subadduser subadduserx2 roundrad">

                         <>
                             <div className="inputname roundbord">
                                 <h1>Company </h1> 
                                 <div className="inputnamel">
                                     <p onClick={e=>setboxprojectsx('boxprojects')} style={{cursor:'pointer' }}>

                                       {!currcompany?  "Choose Company":currcompany

                                       }
                                     </p>
                                     <div className={boxprojectsx} >
                                        
                                         <IoClose onClick={e=>setboxprojectsx('boxprojects2')}  className='iocx' />
                                         <input type="text" placeholder='Search Company' onChange={e=>setcomval(e.target.value)} value={comval} />
                                         { 
comval?clients && clients.map(val => (
val.username.toLowerCase().search(comval.toLowerCase())>=0&&
<div className="rowss"  style={{cursor:'pointer'}}>
 <p onClick={e=>selectthiscompany(val._id,val.username,val.markup)}>{val.username} </p>
<p></p>
</div>
)):
clients && clients.map(val => (
 val.username.toLowerCase().search(comval.toLowerCase())>=0&&
   <div className="rowss"  style={{cursor:'pointer'}}>
       <p onClick={e=>selectthiscompany(val._id,val.username,val.markup)}>{val.username} </p>
 <p></p>
   </div>
))}


                                     </div>
                                 </div>

                             </div>
                             <div className="inputname roundbord">
                                 <h1>Project name</h1>
                                 <div className="inputnamel">
                                     <p onClick={e=>setboxprojects('boxprojects')} style={{cursor:'pointer' }}>{ind.split(" ").filter(Boolean).length>=1?`${ind.split(" ").filter(Boolean).length} projects selected`:'Select Project'}</p>
                                     <div className={boxprojects} >
                                     <input type="text" placeholder='Search project' onChange={e=>setproval(e.target.value)} value={proval} />
                                       
                                         <IoClose onClick={e=>setboxprojects('boxprojects2')}  className='iocx' />
                                         
                                         { proval?data && data.map((val,index) => (
val.clientid===currjobid&&val.sitename.toLowerCase().search(proval.toLowerCase())>=0&&
<div className="rowss" >
 <p>{val.sitename} - {val.no} </p>
 <input type="checkbox"  checked={ind.search(' ' + index.toString() + ' ') >= 0 ? true : false}   onClick={e=>addindex(index,val)}/>
</div>
)):data && data.map((val,index) => (
val.clientid===currjobid&&val.sitename.toLowerCase().search(proval.toLowerCase())>=0&&
<div className="rowss" >
 <p>{val.sitename} - {val.no} </p>
 <input type="checkbox"  checked={ind.search(' ' + index.toString() + ' ') >= 0 ? true : false}   onClick={e=>addindex(index,val)}/>
</div>
))

}
                                     </div>

                                 </div>

                           {/*      
                                 <select className='select2 inject' name="cars" id="cars"  onChange={e=>addindex(e.target.value)}>

{<option  >Choose Project</option>

}
{
data && data.map((val,index) => (
val.clientid===currjobid&&
<option value={`${val.clientid+'euika'+index}`}>{val.sitename}</option>
))
}
</select>*/}
                             </div>

                             <div className="inputname roundbord">
                                 <h1>Invoice #</h1>
                                 <input type="text"    onChange={setinnox} value={inno} />
                             </div>

                             <div className="inputname inuex roundbord">
                                 <h1>Date</h1>
                                   
                                 {showcalender ?
<div style={{position:'relative'}}>
<IoClose className='iocl' onClick={e=>setshowcalender(false)} />
 <Calendar onChange={onxhange}
     value={value2} />
</div> :
<input onClick={e=>setshowcalender(true)} value={indate}  type="text" />

}

                             </div>

                             <div className="inputname roundbord">
                                 <h1>Project no:</h1>
                                 <input type="text" onChange={e => setinnum(e.target.value)} value={innum} />

                             </div>
                             <div className="inputname roundbord">
                                 <h1>Address:</h1>
                                 <input type="text" onChange={e => setinadd(e.target.value)} value={inadd} />

                             </div> <div className="inputname roundbord">
                                 <h1>Due date:</h1>
                                 <input type="text" onChange={e => setindue(e.target.value)} value={indue} />


                             </div>
                             <div className="inputname inuex roundbord">
                                 <h1>Weekend</h1>
                                   
                                 {showcalenderx ?
<div style={{position:'relative'}}>
<IoClose className='iocl' onClick={e=>setshowcalenderx(false)} />
 <Calendar onChange={onxhangex}
     value={value2x} />
</div> :
<input onClick={e=>setshowcalenderx(true)} value={inend}  type="text" />

}

                             </div>
                             <div className="inputname roundbord">
                                 <h1>Perdiem (USD):</h1>
                                 <input type="text" onChange={e=>setcustomperdiem(e.target.value)} value={customperdiem} />


                             </div>
                         <div className="w100 w1002">
                      

                         <button className='btn1' onClick={e=>backtop()}>Generate</button>

                         </div>
                         </>




                     </div>

                   
                     <div className="subadduser subadduserx2 subadduserx3">

                         <>
                        
                         <div className="logopart">
                             <img src={image4} alt="" />
                             <h1>{compnay}</h1>
                         </div>
                         <div className="cinfo cinfocol"  >
<div className="mdl2">
<BsBuilding className='mdl' />
</div>
<div className="cinfo">
<h1>
{add} {zpi}</h1>


</div>

</div>
<div className="cinfo cinfocol"  >
<div className="mdl2">
<BiMailSend className='mdl' />
</div>
<div className="cinfo">
<h1>{mail}</h1>


</div>

</div>       
                           
                            
                         



                         </>




                     </div>


                 </div>

             }

{l!==2&&

<div className="subadduser " style={{width:'70%'}}>

<>
<div className="inputname roundbord" style={{width:'30%'}}>
<h1>Company </h1>  
<div className="inputnamel">
                                     <p onClick={e=>setboxprojectsx('boxprojects')} style={{cursor:'pointer' }}>

                                       {!currcompany?  "Choose Company":currcompany

                                       }
                                     </p>
                                     <div className={boxprojectsx} >
                                        
                                         <IoClose onClick={e=>setboxprojectsx('boxprojects2')}  className='iocx' />
                                         <input type="text" placeholder='Search Company' onChange={e=>setcomval(e.target.value)} value={comval} />
                                         { 
comval?clients && clients.map(val => (
val.username.toLowerCase().search(comval.toLowerCase())>=0&&
<div className="rowss"  style={{cursor:'pointer'}}>
 <p onClick={e=>selectthiscompany(val._id,val.username,val.markup)}>{val.username} </p>
<p></p>
</div>
)):
clients && clients.map(val => (
 val.username.toLowerCase().search(comval.toLowerCase())>=0&&
   <div className="rowss"  style={{cursor:'pointer'}}>
       <p onClick={e=>selectthiscompany(val._id,val.username,val.markup)}>{val.username} </p>
 <p></p>
   </div>
))}


                                     </div>
                                 </div>
</div>
<div className="inputname roundbord" style={{width:'30%'}}>
<h1>Project name</h1>
<div className="inputnamel">
 <p onClick={e=>setboxprojects('boxprojects')} style={{cursor:'pointer' }}>{ind.split(" ").filter(Boolean).length>=1?`${ind.split(" ").filter(Boolean).length} projects selected`:'Select Project'}</p>
 <div className={boxprojects} >
                                     <input type="text" placeholder='Search project' onChange={e=>setproval(e.target.value)} value={proval} />
                                       
                                         <IoClose onClick={e=>setboxprojects('boxprojects2')}  className='iocx' />
                                         { proval?data && data.map((val,index) => (
val.clientid===currjobid&&val.sitename.toLowerCase().search(proval.toLowerCase())>=0&&
<div className="rowss" >
 <p>{val.sitename} </p>
 <input type="checkbox"  checked={ind.search(' ' + index.toString() + ' ') >= 0 ? true : false}   onClick={e=>addindex(index,val)}/>
</div>
)):data && data.map((val,index) => (
val.clientid===currjobid&&val.sitename.toLowerCase().search(proval.toLowerCase())>=0&&
<div className="rowss" >
 <p>{val.sitename} </p>
 <input type="checkbox"  checked={ind.search(' ' + index.toString() + ' ') >= 0 ? true : false}   onClick={e=>addindex(index,val)}/>
</div>
))

}
                                     </div>


</div>


</div>


<button className='btn1' onClick={e=>preparesheet(1)}>Generate</button>

</>





</div>
}
<div className="newst nbst" style={{ marginTop: '20px' }}>
                 <div className="newst1 " style={{ position: 'relative',flexDirection:'row',display:'flex' }}>
                     <input type="text" placeholder='Search..' onChange={e => setsearchval(e.target.value)} />
                    {/*currcompany&&<button onClick={e=>setadduserd2('adduser')}>+ Add User</button>

*/}
{l===2&&

<button className='addemp2 prdm addemp' style={{marginTop:'10px'}} onClick={e => applyperdiem()}>
    {loadingperdiem&&
    <span class="loaderx3"></span>
}
     Apply Perdiem </button>

}
                     </div>
                     </div>
             {k === 1 &&
                 <>
                     <div className="tablerow">
                         <div className="subtable">
                             <div className="headertable clop">
                                 <span className='sxx'> </span>

                                 <h2 style={{ width: '80px', marginBottom: '0px' }}>Taxes</h2>
                                 <h1 style={{ width: '220px' }}>Company</h1>

                                 <h6 style={{ width: '80px', marginBottom: '0px' }} >Weekend</h6>
                                 <h3> Name</h3>
                                 <h4  style={{ width: '80px', marginBottom: '0px' }}  >Distance</h4>

                                          <h4 style={{ width: '80px', marginBottom: '0px' }}>Hrs</h4>

                                 <h4 style={{ width: '80px', marginBottom: '0px' }}>Pay rate</h4>

                                 <h4 style={{ width: '80px', marginBottom: '0px' }}>OT Hrs</h4>

                                 <h4 style={{ width: '80px', marginBottom: '0px' }}>OT Payrate</h4>

                                 <h4 style={{ width: '80px', marginBottom: '0px' }}>Total</h4>
                                 {
                                     applyperdiemx &&
                                     <>

                                         <h4 style={{ width: '80px', marginBottom: '0px' }}>Perdiem</h4>
                                         <h4 style={{ width: '80px', marginBottom: '0px' }}>ON Perdiem</h4>
                                         <h4 style={{ width: '80px', marginBottom: '0px' }}>Days</h4>


                                     </>
                                 }

                                 <h4 style={{ width: '80px', marginBottom: '0px' }}>NC 4%</h4>

                                 <h4 style={{ width: '80px', marginBottom: '0px' }}>Deductions</h4>

                                 <h4 style={{ width: '80px', marginBottom: '0px' }}>Net</h4>
                                 <h5>Action</h5>


                             </div>
                             {searchval.length>0&&preparedata &&
                              preparedata.map((val, index) => (
                                 <>
                                {index===upind?tempjson&&     <div className="headertable">

<span className='sxx'><AiFillDelete onClick={e => skipthis(index)} /> </span>
<h2 style={{ width: '80px', marginBottom: '0px' }}><img src='' alt="" className='valimg' />{val.Taxes} </h2>
<h1 className='flx' style={{ width: '180px' }}>{val.Client}
<div className="prjt">
    <div className="prjtc">
        
    </div>
    {data&&data.find(vala=>vala._id===val.siteid)?.sitename||''}
</div>
</h1>

<h6 style={{ width: '80px', marginBottom: '0px' }} >{val.Date}</h6>
<h3>{val.Employee}</h3>

<h4 className='boldit' style={{ width: '80px', marginBottom: '0px' }} >{parseInt(val.distance)} M</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  ><input className='hrsedit' type="text" value={tempjson.Hrs}  onChange={e => settempjson(tempjson => ({
                         ...tempjson,


                         Hrs: e.target.value

                     }))}  /></h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >$ 
{l===2?
tempjson.Payrate
:l===1&&val.cprapply==='yes'?tempjson.cpr:
                   tempjson.Payrate
                                                 }

</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >    <input className='hrsedit' type="text" value={tempjson.Ot_Hrs}  onChange={e => settempjson(tempjson => ({
                                                         ...tempjson,
                     
                     
                                                         Ot_Hrs: e.target.value
                     
                                                     }))} /></h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >$   {tempjson.OT_Pay_rate}</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{parseFloat(val.total)} </h4>
{
applyperdiemx &&
<>

<h4 style={{ width: '80px', marginBottom: '0px' }}>   {tempjson.siteid==='193039'?
<input className='hrsedit' type="text" value={tempjson.perdiem}  onChange={e => settempjson(tempjson => ({
...tempjson,


perdiem: e.target.value

}))} />
 :
 <>
<input className='hrsedit' type="text" value={tempjson.perdiem}  onChange={e => settempjson(tempjson => ({
...tempjson,


perdiem: e.target.value

}))} />
 </>
 } </h4>
<h4 style={{ width: '80px', marginBottom: '0px' }}>  

{tempjson.onperdiemel==='Yes'?
<div className='taxes' onClick={e => updateonel('disableit')}>
<div className='circle'>

</div>
</div>
    :
    <div className='taxes2' onClick={e => updateonel('enableit')}>
    <div className='circle2'>
    
    </div>
    </div>

}




 </h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}>    <input className='hrsedit' type="text" value={tempjson.days}  onChange={e => settempjson(tempjson => ({
                                                         ...tempjson,
                     
                     
                                                         days: e.target.value
                     
                                                     }))} /></h4>
</>
}

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.nc_4 === '-' ? <>0</>

:
parseFloat(val.nc_4.toFixed(2))
}</h4>
<h4 style={{ width: '80px', marginBottom: '0px' }}  >
$ {tempjson.deductions}
</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}>{parseFloat(val.net.toFixed(2))}</h4>
<h5 className='h5'>

<button className="man"  onClick={e => updatedata()}>
Save
</button>
</h5>




</div>:     
val.Employee.toLowerCase().search(searchval.toLowerCase())>=0&&
<div className="headertable">

<span className='sxx'><AiFillDelete onClick={e => skipthis(index)} /> </span>
<h2 style={{ width: '80px', marginBottom: '0px' }}><img src='' alt="" className='valimg' />{val.Taxes} </h2>
<h1 className='flx' style={{ width: '180px' }}>{val.Client}
<div className="prjt">
    <div className="prjtc">
        
    </div>
    {data&&data.find(vala=>vala._id===val.siteid)?.sitename||''}
</div>
</h1>

<h6 style={{ width: '80px', marginBottom: '0px' }} >{val.Date}</h6>
<h3>{val.Employee}</h3>

<h4 className='boldit' style={{ width: '80px', marginBottom: '0px' }} >{parseInt(val.distance)} M</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.Hrs}</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >$ {l===2?val.Payrate:l===1&&val.cprapply==='yes'?val.cpr:val.Payrate} </h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.Ot_Hrs}</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >$ {val.OT_Pay_rate} </h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{parseFloat(val.total)} </h4>
{
applyperdiemx &&
<>

<h4 style={{ width: '80px', marginBottom: '0px' }}>
<button className={`${val.perdiemel==='No'?'bgredbtn':'bggnbtn'}`}>


$ {parseFloat(val.perdiem).toFixed(2)} 
</button>
</h4>
<h4 style={{ width: '80px', marginBottom: '0px' }}>
    
 
    
    <button className={`${val.onperdiemel==='No'?'bgredbtn':'bggnbtn'}`}>


 $ {parseFloat(val.onperdiem)} 
 </button>
    </h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}>{val.days}</h4>
</>
}

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.nc_4 === '-' ? <>0</>

:
parseFloat(val.nc_4.toFixed(2))
}</h4>
<h4 style={{ width: '80px', marginBottom: '0px' }}  >
$ {val.deductions}
</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}>{parseFloat(val.net.toFixed(2))}</h4>
<h5 className='h5'>

<div className="manxx"  onClick={e => showadd(index)}>
<FaPencilAlt />
</div>
</h5>




</div>
                 

                                }
                                 </>
                             ))

                             }
                               {searchval.length===0&&preparedata && preparedata.map((val, index) => (
                                 <>
                                {index===upind?tempjson&&     <div className="headertable">

<span className='sxx'><AiFillDelete onClick={e => skipthis(index)} /> </span>
<h2 style={{ width: '80px', marginBottom: '0px' }}><img src='' alt="" className='valimg' />{val.Taxes} </h2>
<h1 className='flx' style={{ width: '180px' }}>{val.Client}
<div className="prjt">
<div className="prjtc">
</div>
{data&&data.find(vala=>vala._id===val.siteid)?.sitename||''}</div>
</h1>

<h6 style={{ width: '80px', marginBottom: '0px' }} >{val.Date}</h6>
<h3>{val.Employee}</h3>

<h4 className='boldit' style={{ width: '80px', marginBottom: '0px' }} >{parseInt(val.distance)} M</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  ><input className='hrsedit' type="text" value={tempjson.Hrs}  onChange={e => settempjson(tempjson => ({
                         ...tempjson,


                         Hrs: e.target.value

                     }))}  /></h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >$ 
{l===2?
tempjson.Payrate
:l===1&&val.cprapply==='yes'?
tempjson.cpr:
                  tempjson.Payrate
                                                 }

</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >    <input className='hrsedit' type="text" value={tempjson.Ot_Hrs}  onChange={e => settempjson(tempjson => ({
                                                         ...tempjson,
                     
                     
                                                         Ot_Hrs: e.target.value
                     
                                                     }))} /></h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >$ 
{ tempjson.OT_Pay_rate} </h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{parseFloat(val.total)} </h4>
{
applyperdiemx &&
<>

<h4 style={{ width: '80px', marginBottom: '0px' }}>
 
 {tempjson.siteid==='193039'?
<input className='hrsedit' type="text" value={tempjson.perdiem}  onChange={e => settempjson(tempjson => ({
...tempjson,


perdiem: e.target.value

}))} />
 :
 <>


<input className='hrsedit' type="text" value={tempjson.perdiem}  onChange={e => settempjson(tempjson => ({
...tempjson,


perdiem: e.target.value

}))} />
 </>
 }

 

 </h4>
<h4 style={{ width: '80px', marginBottom: '0px' }}> 
{tempjson.onperdiemel==='Yes'?
<div className='taxes2' onClick={e => updateonel('disableit')}>
<div className='circle2'>

</div>
</div>
    :
    <div className='taxes' onClick={e => updateonel('enableit')}>
    <div className='circle'>
    
    </div>
    </div>

}

   </h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}>    <input className='hrsedit' type="text" value={tempjson.days}  onChange={e => settempjson(tempjson => ({
                                                         ...tempjson,
                     
                     
                                                         days: e.target.value
                     
                                                     }))} /></h4>
</>
}

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.nc_4 === '-' ? <>0</>

:
parseFloat(val.nc_4.toFixed(2))
}</h4>
<h4 style={{ width: '80px', marginBottom: '0px' }}  >
$ {  tempjson.deductions
                                }
</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}>{parseFloat(val.net.toFixed(2))}</h4>
<h5 className='h5'>

<button className="man"  onClick={e => updatedata()}>
Save
</button>
</h5>




</div>:     

<div className="headertable">

<span className='sxx'><AiFillDelete onClick={e => skipthis(index)} /> </span>
<h2 style={{ width: '80px', marginBottom: '0px' }}><img src='' alt="" className='valimg' />{val.Taxes} </h2>
<h1 className='flx' style={{ width: '180px' }}>{val.Client}
<div className="prjt">
<div className="prjtc">
</div>
{data&&data.find(vala=>vala._id===val.siteid)?.sitename||''}</div>
</h1>

<h6 style={{ width: '80px', marginBottom: '0px' }} >{val.Date}</h6>
<h3>{val.Employee}</h3>

<h4 className='boldit' style={{ width: '80px', marginBottom: '0px' }} >{parseInt(val.distance)} M</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.Hrs}</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >$ {l===2?val.Payrate:l===1&&val.cprapply==='yes'?val.cpr:val.Payrate} </h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.Ot_Hrs}</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >$ {val.OT_Pay_rate} </h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{parseFloat(val.total)} </h4>
{
applyperdiemx &&
<>

<h4 style={{ width: '80px', marginBottom: '0px' }}> 
<button className={`${val.perdiemel==='No'?'bgredbtn':'bggnbtn'}`}>


$ {parseFloat(val.perdiem).toFixed(2)} 
</button>  </h4>
<h4 style={{ width: '80px', marginBottom: '0px' }}><button className={`${val.onperdiemel==='No'?'bgredbtn':'bggnbtn'}`}>


$ {parseFloat(val.onperdiem).toFixed(2)} 
</button>  </h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}>{val.days}</h4>
</>
}

<h4 style={{ width: '80px', marginBottom: '0px' }}  >{val.nc_4 === '-' ? <>0</>

:
parseFloat(val.nc_4.toFixed(2))
}</h4>
<h4 style={{ width: '80px', marginBottom: '0px' }}  >
$ {val.deductions}
</h4>

<h4 style={{ width: '80px', marginBottom: '0px' }}>{parseFloat(val.net.toFixed(2))}</h4>
<h5 className='h5'>

<div className="manxx"  onClick={e => showadd(index)}>
<FaPencilAlt />
</div>
</h5>




</div>
                 

                                }
                                 </>
                             ))

                             }
                         </div>
                     </div>
                 </>

             }
         </>

     }
     {mx === 1 &&
         <>  <div className="projectview">
             <h4>     <span></span> <p>Active</p></h4>
             <h1>Company : <p>{currproject.clientname}</p></h1>
             <h1>Site : <p className='greenp'>{currproject.sitename}</p></h1>
             <h1 className='teamm'>Supervisor: </h1>
             <div className="teamates">
                 <button>Alex Loop</button>



             </div>

             <h1 className='teamm'>Employees: </h1>

             <div className="tablerow">
                 <div className="subtable">
                     <div className="headertable clop">
                         <h1>Employee</h1>

                         <h6>Skill</h6>
                         <h3>Taxes</h3>
                         <h4>Pay rate</h4>
                         <h5>OT Pay rate</h5>
                         <h5>NC(%)</h5>


                     </div>
                     {currproject && currproject.user.map(val => (
                         <>
                             <div className="headertable">
                                 <h1><img src='' alt="" className='valimg' /> {val.name}</h1>

                                 <h6>{val.skill}</h6>

                                 <h5>{val.taxes}</h5>
                                 <h3>{val.payrate}</h3>
                                 <h4>{val.otpayrate}</h4>
                                 {
                                     val.nc !== 'no' ?

                                         <h5>{val.nc}%</h5>
                                         :

                                         <h5>NO</h5>
                                 }


                             </div>
                         </>
                     ))

                     }
                 </div>
             </div>

         </div>
         </>

     }

 </div>
 </>

    }
    </>
       
    )
}

export default Invoice