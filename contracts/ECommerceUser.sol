// SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;
contract ECommerceUser{
    /**
     * User. struct to store information uinique
     * ie `userId`,`username`,`email` and 
     * boolean `isRegistered`.
     */
    struct User{
        uint256 userId;
        string username;
        string email;
        bool isRegistered;
    }
    //users mapping:mapm ethereum address to their
    //corresponding information
    mapping(address =>User) public users;
    uint256 public totalUsers;
    /**
     * UserRegistered & UserLoggedIn events:notify client-side appication
     * about user registration and 
     * login events
    
    */
    event UserRegistered(address indexed userAddress,uint256 indexed userId,string username,string email);
    event UserLoggedIn(address indexed userAddress);
    /**
     *notRegistered & registered modifiers: ensure certain function
     *can only be accessed by registered
     * or registered users 
     
    */
    modifier notRegistered(){
        require(!users[msg.sender].isRegistered,"User already registered");
        _;
    }
    modifier registered(){
        require(users[msg.sender].isRegistered,"User not registered");
        _;
    }
    //registerUser:allow users to register
    //with username and email by setting
    //user information and emits
    //the `UserRegistered` event
    function registeredUser(string memory _username,string memory _email) external notRegistered{
        totalUsers++;
        users[msg.sender]=User(totalUsers,_username, _email, true);
        emit UserRegistered(msg.sender,totalUsers, _username, _email);

    }
    //getUserData allow registered users to fetch
    //their profile information
    function getUserData() external view registered returns(uint256,string memory,string memory){
        User memory user = users[msg.sender];
        return(user.userId,user.username,user.email);
    }
}