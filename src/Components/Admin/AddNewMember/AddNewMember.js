import { useState } from "react";
import "../../../../src/Components/style.css"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function AddNewMember(){

    var [title,setTitle]= useState("");
    var [description,setDescription]= useState("");
    var [date,setDate]= useState("");
    var [location,setLocation]= useState(""); 
    var [maxAttendees,setMaxAttendees]= useState(""); 
    var [registrationFee,setRegistrationFee]  = useState("");
    var [error,setError]= useState(false);
    var [errorMessage,setErrorMessage]= useState("");
    var navigate = useNavigate();

    var newUser = {
        "title": title,
        "description": description,
        "date": date,
        "location": location,
        "maxAttendees": maxAttendees,
        "registrationFee": registrationFee
      }

    async function registerUser(){
        await axios.post('https://localhost:7147/api/Event/AddEvent',newUser).then(function (response) {
                setError(false);
                navigateToLogin();
            })
            .catch(function (error) {
                console.log(error);
                setError(true);
                setErrorMessage(error.response.data);
            })
    }

    function checkUserNameValidation(eventargs){
        var title = eventargs.target.value;
        setTitle(title)
    }

    function checkEmailValidation(eventargs){
        var email = eventargs.target.value;
        setDescription(email)
    }

    function checkAdminValidation(eventargs){
        var email = eventargs.target.value;
        setDate(email)
    }

    function checkMaxValidation(eventargs){
        var email = eventargs.target.value;
        setMaxAttendees(email)
    }

    function checkFeeValidation(eventargs){
        var email = eventargs.target.value;
        setRegistrationFee(email)
    }

    function checkLocationValidation(eventargs){
        var email = eventargs.target.value;
        setLocation(email)
    }


    function navigateToLogin(){
        alert("Added Successfully")
    }
    
    return(
        <div className="smallBox4 col-sm-12">
                    <div className="smallBox7">
                        <div className="smallBox10">
                            <div className="smallBox14">
                                <div  className="smallBox13">
                                    <Link to="/">
                                        <div className="back change-my-color"></div>
                                    </Link>
                                </div>
                                <span className="welcomeText2">1 step away!</span>
                                <div className="flexRow">
                                    <span className="clickRegisterText">From becoming a</span>
                                    <span className="clickRegisterText2">Maverick</span>
                                </div>
                            </div>
                            <span className="welcomeText3 marginRegisterCustomer">Add Event</span>
                            <div className="scrolling">
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Title</span>
                                    <input className="form-control enterDiv" type="text" value={title} onChange={checkUserNameValidation}></input>
                                </div>
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Description</span>
                                    <input className="form-control enterDiv" type="text" value={description}  onChange={checkEmailValidation}></input>
                                </div>
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Date</span>
                                    <input className="form-control enterDiv" type="date" value={date} onChange={checkAdminValidation}></input>
                                </div>
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Location</span>
                                    <input className="form-control enterDiv" type="text" value={location}  onChange={checkLocationValidation}></input>
                                </div>
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Max Attendees</span>
                                    <input className="form-control enterDiv" type="number" value={maxAttendees}  onChange={checkMaxValidation}></input>
                                </div>
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Registration Fee</span>
                                    <input className="form-control enterDiv" type="number"  value={registrationFee} onChange={checkFeeValidation}></input>
                                </div>
                            </div>
                        </div>
                        {error ? <div className='flexRow margin6 errorText'>{errorMessage}</div> : null}
                        <div className="smallBox8">
                            <a id="registerButton"  onClick = {registerUser} className="btn btn-outline-warning smallBox9">
                                <span>Register</span>
                            </a>
                        </div>
                    </div>
                </div>);
}

export default AddNewMember;