import React from 'react';
import {PropagateLoader} from "react-spinners";

const Loading = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh"}}>
            <PropagateLoader
                color="#0840ff"
                loading
                size={30}
                speedMultiplier={2}
            />
        </div>
    );
};

export default Loading;