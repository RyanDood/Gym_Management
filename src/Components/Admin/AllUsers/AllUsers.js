import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccountID } from "../../../accountSlice";

function AllUsers(props) {
    const date = new Date(props.beneficiary.date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = year + "-" + month + "-" + day;
    props.beneficiary.date = formattedDate;

    return (
        <div className="whiteOutlineBox8">
            <div className="whiteOutlineBoxMargin">
                <span className="clickRegisterText">Name: {props.beneficiary.user.name}</span>
                <div className="smallBox23">
                    <span className="clickRegisterText">UserName: {props.beneficiary.user.userName}</span>
                </div>
            </div>
        </div>
    );
}

export default AllUsers;