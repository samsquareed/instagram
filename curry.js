function sum(num){
    if(num === undefined)
        num = 0
    return function(num2,num3){
        // if(num3 === undefined)
        //     num3=0;
        return num+num2+num3;
    }
}

console.log(sum(5)(5,5));