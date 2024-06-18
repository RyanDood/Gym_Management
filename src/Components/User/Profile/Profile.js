import axios from 'axios';
import { useEffect, useState } from 'react';
import "../../../../src/Components/style.css"
import { Link, useNavigate } from 'react-router-dom';

function Profile() {

    var [profile, setProfile] = useState(
        {
            "memberID": "",
            "name": "",
            "phone": "",
            "membershipExpiry": "",
            "dateOfJoining": "",
            "userID": "",
            "user": {
                "userID": "",
                "userName": "",
                "password": "",
                "email": "",
                "isAdmin": ""
            }
        })

    var memberID = sessionStorage.getItem('memberID');

    var updateCustomer = {
        "memberID": memberID,
        "name": profile.name,
        "phone": profile.phone,
    }


    useEffect(() => {
        var memberID = sessionStorage.getItem('memberID');
        getCustomerDetails(memberID);
    }, [])

    async function getCustomerDetails(memberID) {
        await axios.get('https://localhost:7173/api/Member/GetMember?memberID=' + memberID)
            .then(function (response) {
                setProfile(response.data);
                convertJoiningDate(response.data);
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

    function nameValidation(eventargs) {
        var name = eventargs.target.value;
        setProfile({ ...profile, name: name });
    }

    function phoneValidation(eventargs) {
        var phoneNumber = eventargs.target.value;
        setProfile({ ...profile, phone: phoneNumber });
    }

    function convertJoiningDate(data){
        const date = new Date(data.dateOfJoining);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate =  year + "-" + month + "-" + day;
        data.dateOfJoining = formattedDate;
        convertExpiryDate(data);
    }


    function convertExpiryDate(data){
        const date = new Date(data.membershipExpiry);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate =  year + "-" + month + "-" + day;
        data.membershipExpiry = formattedDate;
        setProfile(data);
        dateDifference(data);
    }

    var count = 0;
    
    function dateDifference(data){
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate =  year + "-" + month + "-" + day;
        console.log(formattedDate)
        var date1 = new Date(data.membershipExpiry);
        var date2 = new Date(formattedDate);
        let differenceMs = date1 - date2; // Convert milliseconds difference to days 
        console.log(differenceMs)
        let differenceDays = differenceMs / (1000 * 60 * 60 * 24);
        console.log(differenceDays);
        if(differenceDays <= 7 && count == 0){
            alert("Your membership is about to expire")
            count++;
        }
    }



    return (
        <div className="smallBox17 col-sm-12">
            <div className="smallBox18">
                <div className="upMargin3">
                    <div className="closeAccount">
                        <Link to="/">
                        <span className="clickRegisterText">Sign Out</span>
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="smallBox19">
                            <div className="margin1">
                                <span className="clickRegisterText">UserName</span>
                                <input className="form-control enterDiv2" type="text" value={profile.user.userName}></input>
                            </div>
                            <div className="margin1">
                                <span className="clickRegisterText">Name</span>
                                <input className="form-control enterDiv2" type="text" value={profile.name} onChange={nameValidation}></input>
                            </div>
                        </div>
                        <div className="smallBox19">
                            
                            <div className="margin1">
                                <span className="clickRegisterText">Phone Number</span>
                                <input className="form-control enterDiv2" type="text" value={profile.phone} onChange={phoneValidation}></input>
                            </div>
                        </div>
                        <div className="smallBox19">
                            <div className="margin1">
                                <span className="clickRegisterText">Joining Date</span>
                                <input className="form-control enterDiv2" type="text" value={profile.dateOfJoining}></input>
                            </div>
                            <div className="margin1">
                                <span className="clickRegisterText">Expiration Date</span>
                                <input className="form-control enterDiv2" type="text" value={profile.membershipExpiry}></input>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="btn btn-outline-warning smallBox9 margin1" onClick={updateCustomerDetails}>Update</span>
            </div>
        </div>
    );
}

export default Profile;