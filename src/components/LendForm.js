import React, { useState } from 'react';

function LendForm({ lend }) {
    const [amount, setAmount] = useState(1);

    const handleLend = () => {
        lend(amount);
        setAmount(1);
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                className="input"
                onChange={(e) => {
                    if(e.target.value < 0 || e.target.value == 0){
                         alert("please enter valid input");
                    }else{
                        setAmount(e.target.value)
                    }
                    }}
            />
            <button type="submit" className="submit-button" onClick={handleLend}>Lend</button>
        </div>
    );
}

export default LendForm;
