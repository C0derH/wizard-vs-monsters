import Character  from "./Character.js";
import characterData from "./data.js";

document.getElementById("attack-btn").addEventListener("click",handleAttackBtnClick)

const monstersArray = ["orc","demon","goblin"]

let isWaiting = false
function handleAttackBtnClick(){
    if(!isWaiting){
        hero.setDiceHtml()
        monster.setDiceHtml()
        hero.takeDamage(monster.currentDiceScore)
        monster.takeDamage(hero.currentDiceScore)
        renderCharacter()
        if(hero.dead){
            endGame()
        }else if(monster.dead){
            if(monstersArray.length){
                isWaiting = true
                setTimeout(() => {
                    monster = getNewMonster()
                    renderCharacter()
                    isWaiting = false
                },1500)
            }else {
                endGame()
            }
        }
    }
}

function endGame(){
    isWaiting = true
    const endMessage = hero.dead && monster.dead ? "Everyone is dead there are no victors"
        : hero.dead ? `${monster.name} is victorious` 
        : `${hero.name} is victorious`
    const endEmoji = hero.dead ? "☠️" : "🔮"
    setTimeout(()=> {
        document.body.innerHTML = `<h1>${endMessage}${endEmoji}</h1>`
    },1500)
}

function getNewMonster(){
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

const hero = new Character(characterData.hero)
let monster = getNewMonster()



function renderCharacter(){
    document.getElementById("hero").innerHTML = hero.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

renderCharacter()