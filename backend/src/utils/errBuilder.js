module.exports={

  database(err, status){
    const { name, errors} = err;
    return {name, errors, status};
  },

  normal(name, message, status){
    return {
      name,
      message,
      status
    }
  }

}