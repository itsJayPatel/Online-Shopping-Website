function validate(){
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var flag = true;

    document.getElementById("email-error").innerHTML = '';
    document.getElementById("password-error").innerHTML = '';

    var emailPattern = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    if(!emailPattern.test(email)){
        document.getElementById("email-error").innerHTML = "Invalid Email Address Pattern!";
        flag = false;
    }

    var passPattern = /(?=.*\d)(?=.*[A-Z])(?=.*[\!\@\#\%\$\^\&\*\-\_\|\?]).{8,20}/;
    if(!passPattern.test(password)){
        document.getElementById("password-error").innerHTML = 'Password length must be 8 to 20 and must contain at least One Capital letter, Small letter, Digit, Special Character!';
        flag = false;
    }

    return flag;
}