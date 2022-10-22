const spCheck = (string) => {

    let regex = /[`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?" "]+/;

    if(regex.test(string)){
        return true;
        }
     else {
        return false;
         }
  };



const phoneCheck = (numbers) => {

  let regex = /^[0-9]+$/;

  if(regex.test(numbers))
  {
      return true;
  }
  else
  {
    return false;
  }
}

const pwdCheck = (string) =>
{ 
  let regex = /(?=^.{6,}$)((?=.*\w)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[|!"$%&\/\(\)\?\^\'\\\+\-\*]))^.*/;
  if(regex.test(string)) 
  { 
  return true;
  }
  else
  { 
  return false;
  }
}


const emailCheck = (email) => {

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(regex.test(email)){
    return true;
  }
  else{
    return false;
  }
};

exports.spCheck = spCheck;
exports.phoneCheck = phoneCheck;
exports.pwdCheck = pwdCheck;
exports.emailCheck = emailCheck;




