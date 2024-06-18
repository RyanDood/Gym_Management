import { useState } from "react";
import "../../../../src/Components/style.css"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Register(){

    var [userName,setUserName]= useState("");
    var [password,setPassword]= useState("");
    var [email,setEmail]= useState("");
    var [confirmPassword,setConfirmPassword]= useState(""); 
    var [name,setName]= useState(""); 
    var [phoneNumber,setPhoneNumber]  = useState("");
    var [error,setError]= useState(false);
    var [errorMessage,setErrorMessage]= useState("");
    var [admin,setAdmin]= useState(true);
    var navigate = useNavigate();

    var newUser = {
        "userName": userName,
        "password": password,
        "name": name,
        "isAdmin": admin
      }

    async function registerUser(){
        await axios.post('https://localhost:7147/api/User/Register',newUser).then(function (response) {
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
        var username = eventargs.target.value;
        setUserName(username)
    }

    function checkAdminValidation(eventargs){
        var admin = eventargs.target.value;
        if(admin == "Admin"){
            setAdmin(true);
        }
        else{
            setAdmin(false)
        }
    }



    function checkPasswordValidation(eventargs){
        var password = eventargs.target.value;
        setPassword(password);
        if(password !== ""){
            if(password.length >= 8 && password.length <= 15){
                setError(false);
                if(userName !== ""){
                    document.getElementById("registerButton").classList.remove("disabled");
                }
            }
            else{
                document.getElementById("registerButton").classList.add("disabled");
                setError(true);
                setErrorMessage("Password length should be between 8-15 characters");
            }
        }
        else{
            document.getElementById("registerButton").classList.add("disabled");
            setError(true);
            setErrorMessage("Password cannot be empty");
        }
    }

    function confirmPasswordValidation(eventargs){
        var confirmPassword = eventargs.target.value;
        setConfirmPassword(confirmPassword);
        if(confirmPassword !== ""){
            if(password === confirmPassword){
                setError(false);
                if(userName !== "" && password !== "" && confirmPassword !== ""){
                    document.getElementById("registerButton").classList.remove("disabled");
                }
            }
            else{
                document.getElementById("registerButton").classList.add("disabled");
                setError(true);
                setErrorMessage("Passwords do not match");
            }
        }
        else{
            document.getElementById("registerButton").classList.add("disabled");
            setError(true);
            setErrorMessage("Confirm Password cannot be empty");
        }
    }

    function nameValidation(eventargs){
        var name = eventargs.target.value;
        setName(name);
    }

    function phoneValidation(eventargs){
        var phoneNumber = eventargs.target.value;
        setPhoneNumber(phoneNumber);
    }

    function navigateToLogin(){
        setTimeout(() => {
            navigate("/");
        }, 2000);
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
                            <span className="welcomeText3 marginRegisterCustomer">New Account</span>
                            <div className="scrolling">
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">UserName</span>
                                    <input className="form-control enterDiv" type="email" value={userName} onChange={checkUserNameValidation}></input>
                                </div>
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Password</span>
                                    <input className="form-control enterDiv" type="password" onChange={checkPasswordValidation}></input>
                                </div>
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Confirm Password</span>
                                    <input className="form-control enterDiv" type="password" onChange={confirmPasswordValidation}></input>
                                </div>
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Name</span>
                                    <input className="form-control enterDiv" type="text" value={name} onChange={nameValidation}></input>
                                </div>
                                <div className="marginRegisterCustomer">
                                    <span className="clickRegisterText">Registering as</span>
                                    <select className="form-control enterDiv" onChange={checkAdminValidation}>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {error ? <div className='flexRow margin6 errorText'>{errorMessage}</div> : null}
                        <div className="smallBox8">
                            <a id="registerButton"  onClick = {registerUser} className="btn btn-outline-warning smallBox9 disabled">
                                <span>Register</span>
                            </a>
                        </div>
                    </div>
                </div>);
}

export default Register;