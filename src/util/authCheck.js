export const checkPhonenumber = (e) => {
    // var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
    let regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
    return regExp.test(e)
}

export const checkPassword = (e) => {
    //  8 ~ 10자 영문, 숫자 조합
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    // 형식에 맞는 경우 true 리턴
    return regExp.test(e)

}

// 이메일 유효성 검사
export const checkEmail = (e) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    // 형식에 맞는 경우 true 리턴

    return regExp.test(e)
}