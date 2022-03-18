//Знайти елемент із найбільшою частотою повторень
const mostRepeated = (array) => {
    const obj = array.reduce(function(acc, el) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});

    let resNum = 0;
    let resKey = '';
    for (const objKey in obj) {
        if(obj[objKey] > resNum){
            resNum = obj[objKey]
            resKey = objKey;
        }
        if(obj[objKey] === resNum){

        }
    }
    for (const objKey in obj) {
        if (obj[objKey] === resNum) {
            console.log(`Найбільше елeментів "${objKey}": ${resNum};`)
        }
    }
}

const array = [1, 7, 9, 2, 4, 9, 4, 2, 9, 5]

mostRepeated(array);