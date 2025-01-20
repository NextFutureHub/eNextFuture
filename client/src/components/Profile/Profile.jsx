import React from "react";
import { textSize  } from "../../styles";
import { boldStyle } from "../../styles";

const Profile = () => {
    return(
        <div className="hero">
            <p style={{...textSize.large, ...boldStyle}}>Profile</p>

        </div>
    )
}

export default Profile;