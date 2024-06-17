import axios from 'axios';
import { useEffect, useState } from 'react';
import "../../../../src/Components/style.css"
import { Link, useNavigate } from 'react-router-dom';
import Member from '../Member/Member';

function AllMembers(){

    var [error,setError]= useState(false);
    var [errorMessage,setErrorMessage]= useState("");
    var [beneficiaries,setBeneficiaries] = useState([]);


    useEffect(() => {
        allBeneficiaries();
    },[])

    async function allBeneficiaries(){
        await axios.get('https://localhost:7173/api/Member/GetAllMembers').then(function (response) {
            setBeneficiaries(response.data);
            setError(false);
        })
        .catch(function (error) {
            console.log(error);
            setError(true);
            setErrorMessage(error.response.data);
        })  
    }

    return (
        <div className="smallBox17 col-md-12">
                <div className="smallBox21">
                    <ul className="smallBox22 nav">
                        <li className="nav-item highlight smallBox23">
                            <Link className="nav-link textDecoGreen smallBox23" to="/allMembers">All Members</Link>
                        </li>
                        <li className="nav-item highlight smallBox23">
                            <Link className="nav-link textDecoWhite smallBox23" to="/addMembers">Add Member</Link>
                        </li>
                        <li className="nav-item highlight smallBox23">
                            <Link className="nav-link textDecoWhite smallBox23" to="/">Signout</Link>
                        </li>
                    </ul>
                    {error ? 
                    <div className="smallBox48">
                        <div className="errorImage2 change-my-color2"></div>
                        <div className="clickRegisterText">{errorMessage}</div>
                    </div> :
                    <div className="scrolling">
                        {beneficiaries.map(beneficiary =>
                        <Member key = {beneficiary.memberID} beneficiary = {beneficiary}/>
                        )}
                    </div>}
                </div>
        </div>
    )
}

export default AllMembers;