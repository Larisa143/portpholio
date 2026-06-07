document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const emailPhoneInput = document.getElementById('emailOrPhone');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');

    [nameInput, emailPhoneInput, passwordInput, messageInput].forEach(input => {
        input.style.fontFamily = "'Alumni Sans', sans-serif";
        input.style.fontSize = '16px';
    });

    const patterns = {
        name: /^[A-Za-zА-Яа-яЁё\s]{2,50}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone: /^\+7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
        password: {
            length: /^.{8,}$/,
            upper: /[A-Z]/,
            lower: /[a-z]/,
            digit: /\d/,
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            noSpaces: /^\S*$/,
            noSequential: /^(?!.*(.)\1{2})/ // Не более 2 одинаковых символов подряд
        }
    };

    //имя
    function validateName() {
        const value = nameInput.value.trim();
        const message = document.getElementById('nameMessage');
        message.style.fontFamily = "'Alumni Sans', sans-serif";
        message.style.fontSize = '16px';
        
        if (value === '') {
            showMessage(message, '*Поле обязательно для заполнения', 'invalid');
            setFieldStatus(nameInput, 'invalid');
            return false;
        }
        
        if (patterns.name.test(value)) {
            showMessage(message, '✓ Корректное имя', 'valid');
            setFieldStatus(nameInput, 'valid');
            return true;
        } else {
            showMessage(message, 'Имя должно содержать только буквы (2-50 символов)', 'invalid');
            setFieldStatus(nameInput, 'invalid');
            return false;
        }
    }

    //почта или телефон
    function validateEmailOrPhone() {
        const value = emailPhoneInput.value.trim();
        const message = document.getElementById('emailPhoneMessage');
        message.style.fontFamily = "'Alumni Sans', sans-serif";
        message.style.fontSize = '16px';
        
        if (value === '') {
            showMessage(message, '*Поле обязательно для заполнения', 'invalid');
            setFieldStatus(emailPhoneInput, 'invalid');
            return false;
        }
        
        if (patterns.email.test(value) || patterns.phone.test(value)) {
            showMessage(message, '✓ Корректный формат', 'valid');
            setFieldStatus(emailPhoneInput, 'valid');
            return true;
        } else {
            showMessage(message, 'Введите верный email или телефон', 'invalid');
            setFieldStatus(emailPhoneInput, 'invalid');
            return false;
        }
    }
    
    //пароль
    function validatePassword() {
        const value = passwordInput.value;
        const message = document.getElementById('passwordMessage');
        message.style.fontFamily = "'Alumni Sans', sans-serif";
        message.style.fontSize = '16px';
        
        let isValid = true;
        let strength = 0;

        if (value === '') {
            showMessage(message, '*Поле обязательно для заполнения', 'invalid');
            setFieldStatus(passwordInput, 'invalid');
            return false;
        }

        //проверка требований
        const requirements = {
            length: patterns.password.length.test(value),
            upper: patterns.password.upper.test(value),
            lower: patterns.password.lower.test(value),
            digit: patterns.password.digit.test(value),
            special: patterns.password.special.test(value),
            noSpaces: patterns.password.noSpaces.test(value),
            noSequential: patterns.password.noSequential.test(value)
        };

        //обновление идентификатора требований
        Object.keys(requirements).forEach(req => {
            const element = document.getElementById(`req${req.charAt(0).toUpperCase() + req.slice(1)}`);
            if (element) {
                element.style.fontFamily = "'Alumni Sans', sans-serif";
                element.style.fontSize = '14px';
                element.className = requirements[req] ? 'requirement met' : 'requirement unmet';
            }
            if (requirements[req]) strength++;
        });

        //сила пароля
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        strengthText.style.fontFamily = "'Alumni Sans', sans-serif";
        strengthText.style.fontSize = '14px';
        
        if (strength <= 2) {
            strengthFill.className = 'strength-fill weak';
            strengthText.textContent = 'Слабый пароль';
            isValid = false;
        } else if (strength <= 4) {
            strengthFill.className = 'strength-fill fair';
            strengthText.textContent = 'Средний пароль';
            isValid = false;
        } else if (strength <= 6) {
            strengthFill.className = 'strength-fill good';
            strengthText.textContent = 'Хороший пароль';
            isValid = true;
        } else {
            strengthFill.className = 'strength-fill strong';
            strengthText.textContent = 'Сильный пароль';
            isValid = true;
        }

        if (isValid) {
            showMessage(message, '✓ Надежный пароль', 'valid');
            setFieldStatus(passwordInput, 'valid');
        } else {
            showMessage(message, 'Пароль не соответствует требованиям', 'invalid');
            setFieldStatus(passwordInput, 'invalid');
        }

        return isValid;
    }

    //сообщение
    function validateMessage() {
        const value = messageInput.value.trim();
        const message = document.getElementById('messageMessage');
        message.style.fontFamily = "'Alumni Sans', sans-serif";
        message.style.fontSize = '16px';
        
        if (value === '') {
            showMessage(message, '', '');
            setFieldStatus(messageInput, '');
            return true; 
        }
        
        if (value.length >= 10 && value.length <= 1000) {
            showMessage(message, '✓ Корректное сообщение', 'valid');
            setFieldStatus(messageInput, 'valid');
            return true;
        } else {
            showMessage(message, 'Сообщение должно быть от 10 до 1000 символов', 'invalid');
            setFieldStatus(messageInput, 'invalid');
            return false;
        }
    }

    //отображение сообщений валидации
    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = `validation-message ${type}`;
        element.style.fontFamily = "'Alumni Sans', sans-serif";
        element.style.fontSize = '16px';
    }

    //изменение стиля строки надёжности пароля
    function setFieldStatus(field, status) {
        field.classList.remove('valid', 'invalid');
        if (status) {
            field.classList.add(status);
        }
    }

    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);
    
    emailPhoneInput.addEventListener('input', validateEmailOrPhone);
    emailPhoneInput.addEventListener('blur', validateEmailOrPhone);
    
    passwordInput.addEventListener('input', validatePassword);
    passwordInput.addEventListener('blur', validatePassword);
    
    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);

    //отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault(); //отмена стандартной отправки
        
        const isNameValid = validateName();
        const isEmailPhoneValid = validateEmailOrPhone();
        const isPasswordValid = validatePassword();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailPhoneValid && isPasswordValid) {
            alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            form.reset();

            //сброс стилей
            document.querySelectorAll('.form-control').forEach(field => {
                field.classList.remove('valid', 'invalid');
            });
            document.querySelectorAll('.validation-message').forEach(msg => {
                msg.textContent = '';
                msg.className = 'validation-message';
                msg.style.fontFamily = "'Alumni Sans', sans-serif";
            });
            document.querySelectorAll('.requirement').forEach(req => {
                req.className = 'requirement unmet';
                req.style.fontFamily = "'Alumni Sans', sans-serif";
            });
            document.getElementById('strengthFill').className = 'strength-fill';
            const strengthText = document.getElementById('strengthText');
            strengthText.textContent = 'Надежность пароля';
            strengthText.style.fontFamily = "'Alumni Sans', sans-serif";
        } else {
            alert('Пожалуйста, исправьте ошибки в форме перед отправкой.');
        }
    });
    validateName();
    validateEmailOrPhone();
    validatePassword();
    validateMessage();
});


document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const expandableContent = document.getElementById('expandableContent');
    const toggleText = toggleButton.querySelector('p');
    const arrow = toggleButton.querySelector('img');
    
    let isExpanded = false; //блок скрыт

    toggleButton.addEventListener('click', function() {
        isExpanded = !isExpanded;
        expandableContent.classList.toggle('collapsed', !isExpanded);
        toggleText.textContent = isExpanded ? 'Свернуть' : 'Подробнее';
        arrow.classList.toggle('rotate-arrow', !isExpanded);
    });
});