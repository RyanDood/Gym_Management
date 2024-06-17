import axios from 'axios';
import { useEffect, useState } from 'react';
import "../../../../src/Components/style.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ViewMember(){
    
    var navigate = useNavigate();

    var [profile,setProfile] = useState(
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

    var memberID = useSelector((state) => state.accountID);

    var updateCustomer = {
        "memberID": memberID,
        "name": profile.name,
        "phone": profile.phone,
    }


    useEffect(() => {
        if(memberID === 0){
            navigate("/allMembers");
        }
        else{
            getCustomerDetails(memberID);
        }
    },[])

    async function getCustomerDetails(memberID){
        await axios.get('https://localhost:7173/api/Member/GetMember?memberID=' + memberID)
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
    
    async function closeAccount(){
        await axios.delete('https://localhost:7173/api/Member/DeleteMember?memberID=' + profile.memberID)
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

    function nameValidation(eventargs){
        var name = eventargs.target.value;
        setProfile({...profile,name:name});
    }

    function phoneValidation(eventargs){
        var phoneNumber = eventargs.target.value;
        setProfile({...profile,phone:phoneNumber});
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
                            <span className="clickRegisterText">UserName</span>
                            <input className="form-control enterDiv2" type="text" value={profile.user.userName}></input>
                        </div>
                        <div className="margin1">
                            <span className="clickRegisterText">Email</span>
                            <input className="form-control enterDiv2" type="text" value={profile.user.email}></input>
                        </div>
                    </div>
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
                <span  className="btn btn-outline-warning smallBox9 margin1" onClick={updateCustomerDetails}>Update</span>
            </div>
        </div>
    );
}

export default ViewMember;