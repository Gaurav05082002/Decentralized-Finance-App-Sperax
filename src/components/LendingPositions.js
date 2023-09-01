import React from 'react';

function LendingPositions({ positions }) {
    return (
        <div>
            <h3>Your Lending Positions</h3>
            <ul>
                {positions.map((position, index) => (
                    <li key={index}>
                        Amount: {position.amount} - Interest Rate: {position.interestRate}%
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LendingPositions;
