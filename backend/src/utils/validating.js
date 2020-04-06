const validator = require('validator');

module.exports={

  usernameVal(username){
    // Alphanumeric string that may include _ and – having a length of 3 to 25 characters.
    const regex=/^[a-z0-9_-]{3,25}$/igm;
    return regex.test(username);
  },

  passwordVal(password){
    //Moderate: Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 and at max 70 characters long
    const regex=/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,70}$/;
    return regex.test(password);
  },

  userVal(user){
    const { username, email, name, password } = user;
    return (this.usernameVal(username) && validator.isEmail(email) && validator.isByteLength(name, {min:1, max:255}) && this.passwordVal(password));
    /*
      -username: Alphanumeric string that may include _ and – having a length of 3 to 25 characters.
      -email: must BE AN EMAIL
      -name: must have at least 1 and at max 255 characters
      -password: Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 and at max 70 characters long
    */
  },

  logType(logger){
    if(validator.isEmail(logger)) return "email";
    else return "username";
  }

}