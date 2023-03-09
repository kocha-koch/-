//задание 1
function convertSpeed(v, dir) {
    if (dir=='toMS') {
        return(`${v} м/c км/ч соответствует ${v/3.6} м/c`); 
    }
    else if (dir=='toKMH') {
        return(`${v} м/c соответствует ${v*3.6} км/ч`);
    }
    else return "Ошибочное значение";
}

console.log(convertSpeed(36, 'toMS'));
console.log(convertSpeed(10, 'toKMH'));

//задание 2
console.log("");
function absValue(n) {
    if (n>=0) {
        return n;
    }
    return -n;
}
console.log(absValue(-2));
console.log(absValue(100.1));
console.log(absValue(0));

//задание 3
console.log("");

let student = {
    group: 324,
    last_name: "Кочнева",
    first_name: "Анастасия",
    };
console.log("Список свойств: ", Object.keys(student));
console.log(`Студент ${student.last_name} ${student.first_name} учится в ${student.group} группе`);


//задание 4
console.log("");
function randomNumber(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
console.log(randomNumber(-10,10));
console.log(randomNumber(0,10));

//задание 5
console.log("");
function sampleArray (arr, k) {
    let randomArr = [];
    for (let i=0; i<k; i++) {
        randomArr.push(arr[randomNumber(0,arr.length-1)]);
    }
    return randomArr;
}
console.log(sampleArray([1,9,3,4], 10));
console.log(sampleArray([4,8,5,7], 2));