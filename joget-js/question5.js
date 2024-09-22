let array = []
let sum = 0
for (let i=0; i<10; i++){
    let x = Math.floor((Math.random() * 1000) + 1) // Random number 1 - 1000

    array.push(x)
    sum += x

}
console.log(sum)
console.log(array)




