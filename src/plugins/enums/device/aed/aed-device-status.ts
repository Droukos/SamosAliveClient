const deviceStatus = {
    AVAILABLE: 0,
    BROKEN: 1,
    STOLEN: 2,
    ON_REPAIR: 3,
    BORROWED: 4
}

export function getAedDeviceStatusColor(statusOption: number): string {
    if (statusOption == deviceStatus.BROKEN) return "red--text text--darken-4";
    else if(statusOption == deviceStatus.STOLEN) return "red--text text--darken-2";
    else if (statusOption == deviceStatus.ON_REPAIR) return "yellow--text text--lighten-1";
    else if (statusOption == deviceStatus.BORROWED) return "purple--text text--lighten-1";
    else if (statusOption == deviceStatus.AVAILABLE) return "blue--text text--lighten-2";
    else return "";
}

export function getAedDeviceStatusBackgroundColor(statusOption: number) {
    return getAedDeviceStatusColor(statusOption)
        .replaceAll("text","")
        .replaceAll("--", "");
}