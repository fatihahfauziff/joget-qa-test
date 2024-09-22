let sequence = [1,2]

// Limit to 5 datasets
for (let i=0; i<5; i++){
    let formula = i % 2 === 0 ? sequence[i]*sequence[i+1] : sequence[i]+sequence[i+1] // Switch formula when iterator is either odd or even
    
    sequence.push(formula)
}
console.log(sequence)

