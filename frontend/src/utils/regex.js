// Alphanumeric string that may include _ and – having a length of 3 to 25 characters.
const usernameReg=/^[a-z0-9_-]{3,25}$/igm;
//Moderate: Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 and at max 70 characters long
const passwordReg=/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,70}$/;

/*
    -username: 
    -email: must BE AN EMAIL
    -name: must have at least 1 and at max 255 characters
    -password: Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 and at max 70 characters long
  */

export { usernameReg, passwordReg };