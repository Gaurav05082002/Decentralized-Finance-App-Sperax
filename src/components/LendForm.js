import React, { useState } from 'react';

function LendForm({ lend }) {
    const [amount, setAmount] = useState(0);

    const handleLend = () => {
        lend(amount);
        setAmount(0);
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                className="input"
                onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit" className="submit-button" onClick={handleLend}>Lend</button>
        </div>
    );
}

export default LendForm;
