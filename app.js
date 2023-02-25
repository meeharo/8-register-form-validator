var username = document.querySelector('#username')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var confirmPassword = document.querySelector('#confirm-password')
var form = document.querySelector('form')
var inputElements = document.querySelectorAll('.form-control input')

var parent
var textError


function showError (input, message) {
    parent = input.parentElement
    textError = parent.querySelector('.text-error')
    
    parent.classList.add('error')
    textError.innerText = message
}

Array.from(inputElements).forEach(function(input){
    input.addEventListener('input', () => {
        parent = input.parentElement
        textError = parent.querySelector('.text-error')
    
        parent.classList.remove('error')
        textError.innerText = ''
    })
})

function checkEmptyError (listInput) {
    let isEmptyError = false
    listInput.forEach(input => {
        input.value = input.value.trim()

        if (!input.value) {
            isEmptyError = true
            showError(input, `Vui lòng nhập trường này`)
        } 
    })
    return isEmptyError
}

function checkEmailError (input) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    input.value = input.value.trim()

    let isEmailError = false
    if (!regex.test(input.value)) {
        regex.test(input.value) = true
        showError(input, 'Email không hợp lệ')
    }
    return isEmailError
}

function checkLengthPassWordError(input, min, max) {
    input.value = input.value.trim()
    
    if(input.value.length < min) {
        showError(input, `Mật khẩu tối thiểu ${min} ký tự`)
        return true
    }

    if (input.value.length < max) {
        showError(input, `Mật khẩu tối đa ${max} ký tự `)
        return true
    }

    return false
}

function checkMatchPasswordError (passwordInput, cfPasswordInput) {
    let isMatchError = false
    if (passwordInput.value !== cfPasswordInput.value) {
        showError(cfPasswordInput, 'Mật khẩu không trùng khớp')
        return true
    }
    return isMatchError
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    
    // Kiểm tra 4 đứa xem có đứa nào bị dính lỗi hem? -> và return ra
    // không có lỗi - false, có lỗi -true
    checkEmptyError([username, email, password, confirmPassword])
    
    if (!checkEmptyError([username, email, password, confirmPassword])) {
        checkEmailError(email)
        checkLengthPassWordError(password, 3, 10)
        checkMatchPasswordError(password, confirmPassword)
    }
})


