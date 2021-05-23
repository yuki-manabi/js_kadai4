let quiz;
let currentQuiz = 0;
let correctNum = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn_start').addEventListener('click', () => {

        const title = document.getElementById('title');
        const explain = document.getElementById('explain');
        title.textContent = '取得中';
        explain.textContent = '少々お待ちください';
        
        const btn_start = document.getElementById('btn_start');
        btn_start.remove();

        //問題を取得
        fetch('https://opentdb.com/api.php?amount=10&encode=url3986')
        .then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error();
                }
            }
        )
        .then(
            data => {
                if (data.response_code !== 0) {
                    throw new Error();
                }
                console.log(data);
                quiz = data;
                showQuiz(currentQuiz);
            }
        )
        .then(
            error => {
                console.log(error);
            }
        )
    });
});

function showQuiz(currentQuiz) {
    refresh();

    const parentNode = document.getElementById('parent');

    const title = document.createElement('h1');
    title.textContent = `問題${currentQuiz + 1}`;
    parentNode.appendChild(title);

    const quizType = document.createElement('h3');
    quizType.style.margin = '0px';
    quizType.textContent = `[ジャンル] ${unescape(quiz.results[currentQuiz].category)}`
    parentNode.appendChild(quizType);

    const difficulty = document.createElement('h3');
    difficulty.style.margin = '0px';
    difficulty.textContent = `[難易度] ${unescape(quiz.results[currentQuiz].difficulty)}`
    parentNode.appendChild(difficulty);

    const hrElement1 = document.createElement('hr');
    parentNode.appendChild(hrElement1);

    const question = document.createElement('p');
    question.textContent = unescape(quiz.results[currentQuiz].question);
    parentNode.appendChild(question);

    const hrElement2 = document.createElement('hr');
    parentNode.appendChild(hrElement2);

    //正解
    const btn1 = document.createElement('button');
    btn1.textContent = unescape(quiz.results[currentQuiz].correct_answer);
    btn1.addEventListener('click', () => {
        console.log('正解');
        correctNum++;
        nextQuiz();
    });

    //不正解1
    const btn2 = document.createElement('button');
    btn2.textContent = unescape(quiz.results[currentQuiz].incorrect_answers[0]);
    btn2.addEventListener('click', () => {
        console.log('不正解');
        nextQuiz();
    });

    //不正解2
    const btn3 = document.createElement('button');
    btn3.textContent = unescape(quiz.results[currentQuiz].incorrect_answers[1]);
    btn3.addEventListener('click', () => {
        console.log('不正解');
        nextQuiz();
    });

    //不正解3
    const btn4 = document.createElement('button');
    btn4.textContent = unescape(quiz.results[currentQuiz].incorrect_answers[2]);
    btn4.addEventListener('click', () => {
        console.log('不正解');
        nextQuiz();
    });

    const questionArray = [];
    questionArray.push(btn1, btn2, btn3, btn4);

    //ボタン並び替えのため配列（questionArrayの添字になる）をシャッフル
    let numbers = [0, 1, 2, 3];
    numbers = arrayShuffle(numbers);
    
    //ボタンの配置
    for (let i = 0; i < 4; i++) {
        parentNode.appendChild(questionArray[numbers[i]]);
        const brElement = document.createElement('br');
        parentNode.appendChild(brElement);
    }

}

function refresh() {
    const parentNode = document.getElementById('parent');
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}

//配列をランダムに並べ替え
function arrayShuffle(array) {  
    for (let i = (array.length - 1); 0 < i; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}

function nextQuiz() {
    currentQuiz++;
    if (currentQuiz < quiz.results.length - 1) {
        showQuiz(currentQuiz);
    } else {
        showResult();
    }
}

function showResult() {
    refresh();

    const parentNode = document.getElementById('parent');

    const title = document.createElement('h1');
    title.textContent = `あなたの正解数は${correctNum}です！！`;
    parentNode.appendChild(title);

    const hrElement1 = document.createElement('hr');
    parentNode.appendChild(hrElement1);

    const explain = document.createElement('p');
    explain.textContent = `再度チャレンジしたい場合は以下をクリック！！`;
    parentNode.appendChild(explain);

    const hrElement2 = document.createElement('hr');
    parentNode.appendChild(hrElement2);

    //ホームに戻るボタン
    const btn_go_home = document.createElement('button');
    btn_go_home.textContent = `ホームに戻る`;
    btn_go_home.addEventListener('click', () => {
        window.location.reload();
    });
    parentNode.appendChild(btn_go_home);
}