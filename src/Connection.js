import { useState } from 'react';

function Connection(dataBase) {

    const [firstName, setFirstName] = useState('User');
    const [lastName, setLastName] = useState('Name');
    const [position, setPosition] = useState('Position');
    const [image, setImage] = useState(<img src="" alt="image"></img>); 
    const [interest, setInterest] = ''; //list

    function returnButton(){
        console.log()
    }

return(
    <div className="Connection">
        <button onClick={returnButton()}><img src="" alt="return button"></img></button>
        <div className="content">
            {dataBase.map((profile) => (
                <div className="Profile" key={dataBase.id}>

                    <img src="" alt="image"></img>
                    <h2>setfirstName{dataBase.firstName + " " + dataBase.lastName}</h2>
                    <p></p>
                    <h3>{dataBase.position}</h3>
                    <p></p>
                    <h4>{dataBase.interest}</h4>


                </div>
            ))}
        </div>
    </div>
);
}

export default Connection;
