let sequence = [1,2]
for (let i=0; i<5; i++){
    // let formula
    let formula = i % 2 === 0 ? sequence[i]*sequence[i+1] : sequence[i]+sequence[i+1]
    // if(i%2==0){
    //     formula=sequence[i]*sequence[i+1]
    // }
    // else{
    //     formula=sequence[i]+sequence[i+1]
    // }

    // console.log(formula)
    sequence.push(formula)
}
console.log(sequence)

