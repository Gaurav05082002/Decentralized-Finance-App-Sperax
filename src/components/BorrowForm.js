import React, { useState } from 'react';

function BorrowForm({ borrow }) {
    const [amount, setAmount] = useState(0);

    const handleBorrow = () => {
        borrow(amount);
        setAmount(0);
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input"
            />
            <button type="submit" className="submit-button" onClick={handleBorrow}>Borrow</button>
        </div>
    );
}

export default BorrowForm;
