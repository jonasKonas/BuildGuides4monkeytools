const emailOutput = document.getElementById("email-output")
const configOutput = document.getElementById("config-output")
const cBtnEmail = document.getElementById("copy-email-btn")
const cBtnConf = document.getElementById("copy-conf-btn")
//for main input field box
const mainInput = document.getElementById("mainInput")
const applyBtn = document.getElementById("mainInputBtn")
//Function to create classes for device:OS
class device {
    constructor(deviceName, operatingSystem){
        this.deviceName = deviceName
        this.operatingSystem = operatingSystem
    }
}
//new classes for device and os
const ciscoOne = new device("Cisco C927-4P","c927_4p_current.bin")
const ciscoTwo = new device("ISR4331/K9", "superduperISR43331.bin")

const totalOfDevices = [
    ciscoOne,
    ciscoTwo
]
console.log(totalOfDevices)
//BUTTON CLICK function
applyBtn.onclick = function(){
    //Split main input(mainInput) into differernt variables    
    const mainArray = (mainInput.value).split("\t")
    ciName = mainArray[0].toUpperCase()//CI Name
    deviceType = mainArray[3]
    pickRef = mainArray[5]
    pmName = mainArray[9]
    custDir = mainArray[6].split("/")
    custNo = custDir.pop()
    //Email output(Right side), never changes. Only variables
    email = `Hi ${pmName},\n\nThe following has been configured, boxed, and placed on the shipping shelf:\n\n${ciName}\n${deviceType}\n${pickRef}\n\nKind regards,\nJonas`
    //Below all to do with config output(left side)
    //For OS primary variable for for loop    
    osName = "Device is not defined in database"
    for (let i = 0; i < totalOfDevices.length; i++){
        if (deviceType === totalOfDevices[i].deviceName){
            osName = totalOfDevices[i].operatingSystem
            break
        }    
    }
    //To check if ISR or not, for different types of primary configs
    if(deviceType.substring(0,3) != "ISR"){
        //VLAN primary config
        primaryConfig = "en\nconf t\nint vlan 1\nip add dhcp\nno shut\nend\n"
    }
    else{
        //Gigabit primary config
        primaryConfig = "en\nconf t\nint gig 0/0/0\nip add dhcp\nno shut\nftp inerface gig 0/0/0\nend\n"
    }
    //Variables for different part of configs
    osDownload = `copy tftp://IOS/${osName} flash:\n`
    configDownload = `copy tftp://customer-conf/${custNo}\n`
    //ALL CONFIG generated to be outputed
    allConfigOutput = primaryConfig+osDownload+configDownload
    //Main return for outputs   
    return emailOutput.innerHTML = email, configOutput.innerHTML = allConfigOutput
}
