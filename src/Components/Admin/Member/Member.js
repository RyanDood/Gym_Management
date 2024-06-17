import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccountID } from "../../../accountSlice";

function Member(props){

    var dispatch = useDispatch();
    var navigate = useNavigate();

    function updateAccountId(){
        navigate("/viewMember");
        dispatch(
            updateAccountID(props.beneficiary.memberID)
        );
    }

    return (
        <div className="whiteOutlineBox8">
            <div className="whiteOutlineBoxMargin">
                <span className="clickRegisterText">Name: {props.beneficiary.name}</span>
                <div className="smallBox23">
                    <span className="clickRegisterText">Phone Number: {props.beneficiary.phone}</span>
                    <span className="pointer" onClick={updateAccountId}>
                        <div className="rightArrow2 yellow"></div>
                    </span>
                </div>
                <span className="clickRegisterText">Membership expiration Date: {props.beneficiary.membershipExpiry}</span>
            </div>
        </div>
    );
}

export default Member;