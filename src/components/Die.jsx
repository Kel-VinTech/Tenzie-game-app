import React from 'react';


const Die = (props) => {

    const styles = {
        backgroundColor: props.isHeld ? "#169c3e" : "#fff",
        color: props.isHeld ? "#fff" : "#000"
    }

    return(
        <div className='dices_face'
         style={styles}
         onClick={props.holdDice}
         >
            <h2 className='dice_num'>{props.value}</h2>
        </div>
    )
}

export default Die;