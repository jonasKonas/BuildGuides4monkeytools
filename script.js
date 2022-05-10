const genBtn = document.getElementById("button-addon2")
const emailOutput = document.getElementById("email-output")
const configOutput = document.getElementById("config-output")
const cBtnEmail = document.getElementById("copy-email-btn")
const cBtnConf = document.getElementById("copy-conf-btn")

var ciName = document.getElementById("ci-name")
var deviceType = document.getElementById("device-name")
var custNo = document.getElementById("customer-name")
var pmName = document.getElementById("pm-name")


// Main button to generate config and email
genBtn.onclick = function(){
    console.log(ciName.value)
    console.log(deviceType.value)
    console.log(custNo.value)
    console.log(pmName.value)
    return emailOutput.innerHTML = genEmail(), configOutput.innerHTML = genConf()
    
    // var eText = emailOutput.innerText("shudas")
    // return eText
}
// function for email
function genEmail(){
    gemail = `Hi ${pmName.value},\n\nFollowing has been configured, boxed, and placed on the shipping shelf:\n\n${ciName.value}\n${deviceType.value}\n\nKind regards,\nJonas`
    return gemail
}
//function for config
function genConf(){
    config = `Prashau:\n${ciName.value}\n${deviceType.value}\n${custNo.value}\n${pmName.value}`
    return config
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




function genConfig(){

}

