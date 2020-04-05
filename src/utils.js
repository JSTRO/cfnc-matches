// Format as all possible permutations of matches
export const allPermutations = array => {
  let output = []
  for (let i=0; i<array.length; i++) {
    const a = array[i][0]
    const b = array[i][1]
    if (b.length > 1) {
      for (let j=0; j<b.length; j++) {
        output.push([a, b[j]])
      }
    } else {
      output.push([a, b[0]])
    }
  }
  return output
} 

// Only include one side of matches
export const oneSided = output => {
  for (let i=0; i<output.length; i++) {
    for (let j=0; j<output.length; j++) {
      if (output[i][0] === output[j][1] && output[i][1] === output[j][0]) {
        output.splice(output.indexOf(output[j]), 1)
      }
    }
  }
  return output
}