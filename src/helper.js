function mixColors(a, b) {
    let hexCode = (parseInt(a.split('#')[1], 16) & parseInt(b.split('#')[1], 16)).toString(16) == 0 ?
        '000000' : (parseInt(a.split('#')[1], 16) & parseInt(b.split('#')[1], 16)).toString(16)
    if (a === '#000000' && b === '#FFFFFF') {
        return '#FFFFFF'
    }

    let zeros = ''
    if (hexCode.length !== 6) {
        for (let index = 0; index < 6 - hexCode.length; index++) {
            zeros += '0'
        }
        hexCode = zeros + hexCode
    }

    return `#${hexCode}`
}

export {
    mixColors
}