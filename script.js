
const emailOutput = document.getElementById("email-output")
const configOutput = document.getElementById("config-output")
const cBtnEmail = document.getElementById("copy-email-btn")
const cBtnConf = document.getElementById("copy-conf-btn")

//for main input field
const mainInput = document.getElementById("mainInput")
const applyBtn = document.getElementById("mainInputBtn")

//Main function for gathering input,splitting and populating config and email fields
applyBtn.onclick = function(){

    mainValue = mainInput.value
    const mainArray = mainValue.split("\t")
    ciName = mainArray[0].toUpperCase()
    deviceType = mainArray[3].toUpperCase()
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
    config = `Config output:\nenable\nconfigure terminal\ninterface vlan1\nip address dhcp\nno shut\nend\n`;

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

//Database related code
async function getData(){
    const response = await fetch('database\db.csv');
    const data = await response.text();
    console.log(data)
}

getData()