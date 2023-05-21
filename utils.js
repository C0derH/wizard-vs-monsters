function getDiceRollArray(diceCount){
   return new Array(diceCount).fill(0).map(() => {
        return Math.floor(Math.random() * 6) + 1
    })
}


const getPercentage = (remainingHealth , maximumHealth) =>
    (100 * remainingHealth) / maximumHealth

export { getPercentage, getDiceRollArray}