import { getPercentage, getDiceRollArray } from "./utils.js"

function getPlaceHolderDiceHtml(diceCount){
    return new Array(diceCount).fill(0).map(() => {
        return '<div class="placeholder-dice"></div>'
    }).join("")
}

function Character(data){
    Object.assign(this,data)

    this.maxHealth = this.health
    let diceHtml = getPlaceHolderDiceHtml(this.diceCount)

    this.setDiceHtml = function(){
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        diceHtml = this.currentDiceScore.map((num) => {
            return `<div class="dice">${num}</div>`
        }).join("")

    }
    
    this.takeDamage = function(diceArray){
        const takenDamage = diceArray.reduce((total,num) => total + num)
        this.health = this.health - takenDamage
        if(this.health <= 0){
            this.health = 0
            this.dead = true
        }

    }

    this.getHealthBarHtml = function(){
        const percent = getPercentage(this.health,this.maxHealth)
        return `<div class="healthbar-outer">
                    <div class="healthbar-inner ${percent < 20 ? "danger":""}" style = "width:${percent}%" ></div>
                </div>`
    }

    this.getCharacterHtml = function() {

    const { name,avatar,health} = this

    const healthBarHtml = this.getHealthBarHtml()
    
    return `
        <div class="card">
            <h1>${name}</h1>
            <img class="card-avatar" src="${avatar}">
            <div class="health-container">
                <p>health:<strong>${health}</strong></p>
                ${healthBarHtml}
            </div>
            <div class="dice-container">
                ${diceHtml}
            </div>
        </div>
    `
    }
}

export default Character