
export function checkIfEmpty(value) {
    if (value === '') {
        return true
    }
    else {
        return false;
    }
}

export function checkTextLength(string, length) {

    const valueLength = string.length
    if ((valueLength.toString() < length) ||(valueLength.toString() > length)){
        return true
    }
    else
        return false;

}

export function checkEmailValid(value) {

    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(value) === true) {
        return false
    }
    else {
        return true
    }

}

export function isInputNumber(value) {

    if (!isNaN(value)) {

        return true
    } else {
        return false
    }

}




