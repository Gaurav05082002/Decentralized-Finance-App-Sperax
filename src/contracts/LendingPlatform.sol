// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LendingPlatform {
    using SafeMath for uint256;

    address public owner;
    uint256 public interestRate; // Static interest rate for all loans
    uint256 public collateralRatio; // The ratio of collateral required for borrowing
    mapping(address => uint256) public balances;
    mapping(address => uint256) public collateral;

    event Borrowed(address indexed borrower, uint256 amount);
    event Lent(address indexed lender, uint256 amount);

    constructor(uint256 _interestRate, uint256 _collateralRatio) {
        owner = msg.sender;
        interestRate = _interestRate;
        collateralRatio = _collateralRatio;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function lend() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Lent(msg.sender, msg.value);
    }

    function borrow(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        uint256 requiredCollateral = (amount * collateralRatio) / 100;
        require(
            collateral[msg.sender] >= requiredCollateral,
            "Insufficient collateral"
        );

        balances[msg.sender] -= amount;
        balances[owner] += amount; // Transfer borrowed funds to the owner
        emit Borrowed(msg.sender, amount);
    }

    function depositCollateral() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        collateral[msg.sender] += msg.value;
    }

    function withdrawCollateral(uint256 amount) external {
        require(
            collateral[msg.sender] >= amount,
            "Insufficient collateral balance"
        );
        collateral[msg.sender] -= amount;
        payable(msg.sender).transfer(amount); // Transfer collateral back to the user
    }

    // Function to check the balance of a user
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    // Function to check the collateral balance of a user
    function getCollateralBalance() external view returns (uint256) {
        return collateral[msg.sender];
    }
}
