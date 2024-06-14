import axios from 'axios';
import { useEffect, useState } from 'react';
import "../../../../src/Components/style.css"
import { Link, useNavigate } from 'react-router-dom';

function Profile(){
    
    var [profile,setProfile] = useState(
        {
            "name": "",
            "phone": "",
    })

    var customerID = sessionStorage.getItem('id');

    var updateCustomer = {
        "memberID": 1003,
        "name": profile.name,
        "phone": profile.phone,
    }


    useEffect(() => {
        const customerID = sessionStorage.getItem('id');
        getCustomerDetails(customerID);
    },[])

    async function getCustomerDetails(customerID){
        await axios.get('https://localhost:7173/api/Member/GetMember?memberID=' + 1003)
        .then(function (response) {
            setProfile(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    async function updateCustomerDetails() {
        await axios.put('https://localhost:7173/api/Member/UpdateMember', updateCustomer)
        .then(function (response) {
            console.log("Updated");
        })
        .catch(function (error) {
            console.log(error);
        })
    }    

    function nameValidation(eventargs){
        var name = eventargs.target.value;
        setProfile({...profile,name:name});
    }

    function phoneValidation(eventargs){
        var phoneNumber = eventargs.target.value;
        setProfile({...profile,phone:phoneNumber});
    }


    return (
        <div className="smallBox17 col-sm-9">
            <div className="smallBox18">
                <div>
                    <span className="textDecoGreen">Personal Details</span> 
                </div>
                <div>
                    <div className="smallBox19"> 
                        <div className="margin1">
                            <span className="clickRegisterText">Name</span>
                            <input className="form-control enterDiv2" type="text" value={profile.name} onChange={nameValidation}></input>
                        </div>
                        <div className="margin1">
                            <span className="clickRegisterText">Phone Number</span>
                            <input className="form-control enterDiv2" type="text" value={profile.phone} onChange={phoneValidation}></input>
                        </div>
                    </div>
                </div>
                <span  className="btn btn-outline-warning smallBox9 margin1" onClick={updateCustomerDetails}>Update</span>
            </div>
        </div>
    );
}

export default Profile;