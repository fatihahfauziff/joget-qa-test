let sequence = [1,2]
for (let i=0; i<5; i++){
    let formula = i % 2 === 0 ? sequence[i]*sequence[i+1] : sequence[i]+sequence[i+1]
    
    sequence.push(formula)
}
console.log(sequence)

