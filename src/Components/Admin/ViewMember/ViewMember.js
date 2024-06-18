import axios from 'axios';
import { useEffect, useState } from 'react';
import "../../../../src/Components/style.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ViewMember(){
    
    var navigate = useNavigate();

    var [profile,setProfile] = useState(
        {
            "eventID": "",
            "title": "string",
            "description": "string",
            "date": "2024-06-18T07:52:31.873Z",
            "location": "string",
            "maxAttendees": 0,
            "registrationFee": 0
          })

    var memberID = useSelector((state) => state.accountID);


    useEffect(() => {
        if(memberID === 0){
            navigate("/allMembers");
        }
        else{
            getCustomerDetails(memberID);
        }
    },[])

    async function getCustomerDetails(memberID){
        await axios.get('https://localhost:7147/api/Event/GetEvent?eventID=' + memberID)
        .then(function (response) {
            setProfile(response.data);
            convertJoiningDate(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    async function updateCustomerDetails() {
        await axios.put('https://localhost:7147/api/Event/UpdateEvent', profile)
        .then(function (response) {
            console.log("Updated");
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    async function closeAccount(){
        await axios.delete('https://localhost:7147/api/Event/DeleteEvent?eventID=' + profile.eventID)
        .then(function (response) {
            console.log("Deleted Successfully");
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    function confirm(){
        if(window.confirm("Are you sure you want to delete?")){
            closeAccount();
        }
        else{

        }
    }

    function titeValidation(eventargs){
        var name = eventargs.target.value;
        setProfile({...profile,title:name});
    }

    function descriptionValidation(eventargs){
        var phoneNumber = eventargs.target.value;
        setProfile({...profile,description:phoneNumber});
    }

    function dateValidation(eventargs){
        var phoneNumber = eventargs.target.value;
        setProfile({...profile,date:phoneNumber});
    }

    function locationValidation(eventargs){
        var phoneNumber = eventargs.target.value;
        setProfile({...profile,location:phoneNumber});
    }

    function maxValidation(eventargs){
        var phoneNumber = eventargs.target.value;
        setProfile({...profile,maxAttendees:phoneNumber});
    }

    function registrationValidation(eventargs){
        var phoneNumber = eventargs.target.value;
        setProfile({...profile,registrationFee:phoneNumber});
    }

    function convertJoiningDate(data){
        const date = new Date(data.date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate =  year + "-" + month + "-" + day;
        data.date = formattedDate;
        setProfile(data);
    }

    return (
        <div className="smallBox17 col-sm-12">
            <div className="smallBox18">
            <div className="upMargin3">
                        <Link to = "/allMembers">
                            <div className="leftArrow yellow"></div>
                        </Link>
                        <div className="closeAccount">
                            <span onClick={confirm}>
                                <div className="delete change-my-color2"></div>
                            </span>
                            <span className="clickRegisterText">Close Account</span>
                        </div>
                    </div>
                <div>
                    <div className="smallBox19"> 
                        <div className="margin1">
                            <span className="clickRegisterText">Title</span>
                            <input className="form-control enterDiv2" type="text" value={profile.title} onChange={titeValidation}></input>
                        </div>
                        <div className="margin1">
                            <span className="clickRegisterText">Description</span>
                            <input className="form-control enterDiv2" type="text" value={profile.description} onChange={descriptionValidation}></input>
                        </div>
                    </div>
                    <div className="smallBox19"> 
                        <div className="margin1">
                            <span className="clickRegisterText">Date</span>
                            <input className="form-control enterDiv2" type="date" value={profile.date} onChange={dateValidation}></input>
                        </div>
                        <div className="margin1">
                            <span className="clickRegisterText">Location</span>
                            <input className="form-control enterDiv2" type="text" value={profile.location} onChange={locationValidation}></input>
                        </div>
                    </div>
                    <div className="smallBox19"> 
                        <div className="margin1">
                            <span className="clickRegisterText">Max Members</span>
                            <input className="form-control enterDiv2" type="number" value={profile.maxAttendees} onChange={maxValidation} ></input>
                        </div>
                        <div className="margin1">
                            <span className="clickRegisterText">Registration Fee</span>
                            <input className="form-control enterDiv2" type="number" value={profile.registrationFee} onChange={registrationValidation}></input>
                        </div>
                    </div>
                </div>
                <span  className="btn btn-outline-warning smallBox9 margin1" onClick={updateCustomerDetails}>Update</span>
            </div>
        </div>
    );
}

export default ViewMember;