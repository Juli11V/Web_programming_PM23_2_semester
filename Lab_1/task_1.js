//Реалізувати розбиття стрічки на слова у масив. Допустим є написання функцій.
let text = " Хочеться наголосити: Квіти - очі землі! Вони бачать нас, люблять, чарують, навіть лікують.";

console.log(getWords(text));

function getWords(text)
{
    let startWord = -1;
    let ar = [];

    for(let i = 0; i <= text.length; i++)
    {
        let c = i < text.length ? text[i] : " ";

        if (!isSeparator(c) && startWord < 0)
        {
            startWord = i;
        }

        if (isSeparator(c) && startWord >= 0)
        {
            let word = text.substring(startWord, i);
            ar.push(word);

            startWord = -1;
        }
    }

    return ar;
}

function isSeparator(c)
{
    let separators = [" ", ",", ".", " :", "!", "-"];
    return separators.includes(c);
}


