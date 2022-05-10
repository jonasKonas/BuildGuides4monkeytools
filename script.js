
const emailOutput = document.getElementById("email-output")
const configOutput = document.getElementById("config-output")
const cBtnEmail = document.getElementById("copy-email-btn")
const cBtnConf = document.getElementById("copy-conf-btn")

//for main input field
const mainInput = document.getElementById("mainInput")
const applyBtn = document.getElementById("mainInputBtn")


//for secondary input field
// var ciName = document.getElementById("ci-name")
// var deviceType = document.getElementById("device-name")
// var custNo = document.getElementById("customer-name")
// var pmName = document.getElementById("pm-name")


applyBtn.onclick = function(){

    mainValue = mainInput.value
    const mainArray = mainValue.split("\t")
    ciName = mainArray[0].toUpperCase()
    deviceType = mainArray[3]
    pickRef = mainArray[5]
    custNo = mainArray[6]
    pmName = mainArray[9]   
    return emailOutput.innerHTML = genEmail(), configOutput.innerHTML = genConf();
}

// function for email
function genEmail(){
    gemail = `Hi ${pmName},\n\nThe following has been configured, boxed, and placed on the shipping shelf:\n\n${ciName}\n${deviceType}\n${pickRef}\n\nKind regards,\nJonas`
    return gemail;
}
//function for config
function genConf(){
    config = `Prashau:\n${ciName}\n${deviceType}\n${custNo}\n${pmName}`;
    return config;
}


// Two Copy buttons function
cBtnEmail.onclick = function(){
    emailOutput.select()
    navigator.clipboard.writeText(emailOutput.value)
}
cBtnConf.onclick = function(){
    configOutput.select()
    navigator.clipboard.writeText(configOutput.value)
}



