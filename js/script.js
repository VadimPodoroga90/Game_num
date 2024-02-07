openPrompt()

let minValue
    , maxValue
    , answerNumber
    , phrase
    , orderNumber
    , gameRun = true;

const inputMin = document.querySelector('#inputMin')
    , inputMax = document.querySelector('#inputMax')
    , alertText = document.querySelector('#alertText')
    , alertTextDefault = document.querySelector('#alertTextDefault')
    , orderNumberField = document.querySelector('#orderNumberField')
    , answerField = document.querySelector('#answerField');

document.querySelector('#btnModal').addEventListener('click', () => {
    minValue = parseInt(inputMin.value);
    maxValue = parseInt(inputMax.value);
    defaultValues();
    $('#alertModal').modal('show');
    alertText.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    phraseRandomQues();

});

document.querySelector('#btnRetry').addEventListener('click', () => {
    $('#promptModal').modal('show');
    minValue = parseInt(inputMin.value);
    maxValue = parseInt(inputMax.value);
    defaultValues();
    answerNumber = Math.floor((minValue + maxValue) / 2);
    phraseRandomQues();
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    gameRun = true;
    inputMin.value = -999, inputMax.value = 999;

});

document.querySelector('#btnOver').addEventListener('click', () => {
    if (gameRun) {
        if (minValue === maxValue) {
            phraseRandomEnd();
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            phraseRandomQues();
        }
    }
})

document.querySelector('#btnLess').addEventListener('click', () => {

    if (gameRun) {
        if (minValue === maxValue) {
            phraseRandomEnd();
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.ceil((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            phraseRandomQues();

        }
    }
})


document.querySelector('#btnEqual').addEventListener('click', () => {
    if (gameRun) {
        phraseRandomEqual();
        setTimeout(gameEnd, 1500);
    };
    gameRun = false;

})




function numToPr(number) {
    const
        h = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот'
            , 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
        t = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят'
            , 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
        o = ['один', 'два', 'три', 'четыре', 'пять', 'шесть'
            , 'семь', 'восемь', 'девять', 'ноль'],
        p = ['одиннацать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать'
            , 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать', 'десять'];

    let str = Math.abs(number).toString(), out = '';

    if (str.length == 1) {
        return o.at(number - 1);
    } else if (str.length == 2) {
        if (str[0] == 1) {
            out = p.at(parseInt(str[1]) - 1);
        } else out = (t[parseInt(str[0]) - 1] + ((str[1] != '0') ? (' ' + o[parseInt(str[1]) - 1]) : ''));
    } else if (str.length == 3) {
        out = (h[parseInt(str[0]) - 1] + ((str[1] != '0') ? (' ' + t[parseInt(str[1]) - 1]) : '') + ((str[2] != '0') ? (' ' + o[parseInt(str[2]) - 1]) : ''));
    }

    let arr = out.split('');
    arr[0] = arr[0].toUpperCase();
    out = arr.join('');

    if (out.length > 25) return number;

    return (number < 0)
        ? `минуc ${out}`
        : out;

}

function phraseRandomEnd() {

    const phraseEnd = [`Чисти! Чисти вилкой!\n\u{1F62C}`
        , `Всё, Миша, вставай приплыли!\n\u{1F634}`
        , `Люмос максима, вжух!\n\u{1F4AB}`];

    const random = Math.round(Math.random() * 2);
    if (random === 0) {
        phrase = phraseEnd[0];
    } else if (random === 1) {
        phrase = phraseEnd[1];
    } else {
        phrase = phraseEnd[2];
    }

    answerField.innerText = phrase;
    setTimeout(gameEnd, 1500);

}

function phraseRandomQues() {
    const phraseQues = [`Кручу верчу запутать хочу \n${numToPr(answerNumber)} \nугадал?`
        , `Давай ни тебе ни мне \n${numToPr(answerNumber)}!`
        , `Чики-брики пальчик выкинь \n${numToPr(answerNumber)}?`];

    const random = Math.round(Math.random() * 2);
    if (random === 0) {
        phrase = phraseQues[0];
    } else if (random === 1) {
        phrase = phraseQues[1];
    } else {
        phrase = phraseQues[2];
    }

    answerField.innerText = phrase;
}

function phraseRandomEqual() {
    const phraseEqual = [`V - значит Vindetta!\n\u{1F60E}`
        , `ИИИХХХААА!\n\u{1F60E}`
        , `Хоп-хэй ла-ла-лэй!\n\u{1F60E}`];

    const random = Math.round(Math.random() * 2);

    if (random === 0) {
        phrase = phraseEqual[0];
    } else if (random === 1) {
        phrase = phraseEqual[1];
    } else {
        phrase = phraseEqual[2];
    }

    answerField.innerText = phrase;
}

function defaultValues() {
    if (isNaN(minValue) || isNaN(maxValue)) {
        minValue = -999, maxValue = 999;
        inputMin.value = -999, inputMax.value = 999;
        $('#alertDefaultValue').modal('show');
        alertTextDefault.innerText = 'Не корректное значение \nЗначение будет установлено по умолчанию';
    }

    if (minValue <= -1000 || minValue > 0) {
        $('#alertDefaultValue').modal('show')
        alertTextDefault.innerText = 'Не корректное значение \nЗначение будет установлено по умолчанию';
        minValue = -999;
        inputMin.value = -999
    }
    
    if (maxValue >= 1000 || maxValue < 0) {
        $('#alertDefaultValue').modal('show');
        alertTextDefault.innerText = 'Не корректное значение \nЗначениие будет установлено по умолчанию';
        maxValue = 999;
        inputMax.value = 999;
    }
}


function openPrompt() {
    const myPrompt = new bootstrap.Modal('#promptModal');
    window.addEventListener('DOMContentLoaded', () => {
        myPrompt.show();
    })

}


function openAlert() {
    const myAlert = new bootstrap.Modal('#alertModal');
    window.addEventListener('DOMContentLoaded', () => {
        myAlert.show();
    })

}


function openAlertDefault() {
    const myAlertDefault = new bootstrap.Modal('#alertDefaultValue');
    window.addEventListener('DOMContentLoaded', () => {
        myAlertDefault.show();
    });

}

function gameEnd() {
    const phraseGameEnd = ['Если тебе дано предугадывать мысли человека - случайностей не будет'
        , 'Я хочу сыграть с тобой в игру'
        , 'Ничего не закончилось, игра только начинается!']

    const random = Math.round(Math.random() * 2);

    if (random === 0) {
        phrase = phraseGameEnd[0];
    } else if (random === 1) {
        phrase = phraseGameEnd[1];
    } else {
        phrase = phraseGameEnd[2];
    }

    answerField.innerText = phrase;
    orderNumberField.innerText = '';
}