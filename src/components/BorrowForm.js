import React, { useState } from 'react';

function BorrowForm({ borrow }) {
    const [amount, setAmount] = useState(1);

    const handleBorrow = () => {
        borrow(amount);
        setAmount(1);
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={(e) => {
                    if(e.target.value < 0 || e.target.value == 0){
                         alert("please enter valid input");
                    }else{
                        setAmount(e.target.value)
                    }
                    }}
                className="input"
            />
            <button type="submit" className="submit-button" onClick={handleBorrow}>Borrow</button>
        </div>
    );
}

export default BorrowForm;
