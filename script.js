const emailOutput = document.getElementById("email-output")
const configOutput = document.getElementById("config-output")
const cBtnEmail = document.getElementById("copy-email-btn")
const cBtnConf = document.getElementById("copy-conf-btn")
//for main input field box
const mainInput = document.getElementById("mainInput")
const applyBtn = document.getElementById("mainInputBtn")

//FTP server IP
const ftpServerIp = "192.168.1.1"
//Function to create classes for device:OS
class device {
    constructor(deviceName, operatingSystem,firmware, bootString){
        this.deviceName = deviceName
        this.operatingSystem = operatingSystem
        this.firmware = firmware
        // this.bootString = bootString
    }
}
//new classes for device and os
let totalOfDevices = [
    c927_4p = new device(
    "Cisco C927-4P","c900-universalk9-mz.SPA.159-3.M3.bin", "c900_VA_A_39x3_B_39x3_26u.bin"),
    isr4331 = new device(
    "Cisco ISR4331/K9", "isr4300-universalk9.16.09.06.SPA.bin", ""),
    ws_c2960_24pc_s = new device(
    "Cisco WS-C2960-24PC-S","c2960-lanlitek9-mz.122-55.SE12.bin"),
    ws_c2960l_48ps_ll = new device(
    "Cisco WS-C2960L-48PS-LL", "c2960l-universalk9-mz.152-7.E0a.bin"),
    ws_c2960x_48lps_l = new device(
    "Cisco WS-C2960X-48LPS-L","c2960x-universalk9-mz.152-7.E4.bin"),
    c891_k9 = new device(
    "Cisco C891-K9", "c890-universalk9-mz.158-3.M6.bin"),
    c1111_4p = new device(
    "Cisco C1111-4P", "c1100-universalk9_ias.16.09.06.SPA.bin"),

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
    osName = `"Device is not defined in database"`
    for (let i = 0; i < totalOfDevices.length; i++){
        if (deviceType === totalOfDevices[i].deviceName){
            osName = totalOfDevices[i].operatingSystem
            break
        }    
    }
    console.log(deviceType.substring(6,9))
    //To check if ISR or not, for different types of primary configs
    if(deviceType.substring(6,9) != "ISR"){
        //VLAN primary config
        primaryConfig = "enable\nconfigure terminal\ninterface vlan 1\nip address dhcp\nno shutdown\nend\ndir\ndel flash:\n\n"
        bootString = `conf t\nboot system flash:${osName}\nend\nwr mem\nreload\n\n`
    }
    else{
        //Gigabit primary config
        primaryConfig = "en\nconf t\nIp tftp source-interface GigabitEthernet0\nint GigabitEthernet0\nip add dhcp\nno shut\nend\ndir\ndel flash:\n\n"
        bootString = `conf t\nboot system flash bootflash:${osName}\nend\nwr mem\nreload\n\n`
    }
    //Variables for different part of configs
    osDownload = `copy tftp://${ftpServerIp}/${osName} flash:\n\n`
    configDownload = `copy tftp://${ftpServerIp}/customer-conf/${custNo}/${ciName}.cfg startup-config\n\n`
    licenseInstall = `license install tftp://${ftpServerIp}/licenses/.lic`
    //ALL CONFIG generated to be outputed
    allConfigOutput = primaryConfig+osDownload+bootString+configDownload+licenseInstall
    //Main return for outputs   
    return emailOutput.innerHTML = email, configOutput.innerHTML = allConfigOutput
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
