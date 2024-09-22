let array = []
let sum = 0
for (let i=0; i<10; i++){
    let x = Math.floor((Math.random() * 1000) + 1)
    // console.log(x)
    array.push(x)

    sum = sum + x

}
console.log(sum)
console.log(array)




