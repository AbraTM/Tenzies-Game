import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor : props.isHeld=== true ? "#59E391" : "#FFFFFF"
    }

    return(
        <div className="die" 
             onClick={() => props.holdDie()}   
             style={styles}>
            <div className="die-num">{props.value}</div>
        </div>
    )
}