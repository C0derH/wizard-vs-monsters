import Character  from "./Character.js";
import characterData from "./data.js";



const monstersArray = ["orc","demon","goblin"]

let isWaiting = false
let isGameEnded = false

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

function getNewMonster(){
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function endGame(){
    isWaiting = true
    isGameEnded = true
    const endMessage = hero.dead && monster.dead ? "Everyone is dead there are no victors"
        : hero.dead ? `${monster.name} is victorious` 
        : `${hero.name} is victorious`
    const endEmoji = hero.dead ? "☠️" : "🔮"
    setTimeout(()=> {
        document.body.innerHTML = `
        <h1>${endMessage}${endEmoji}</h1>
        <button class="btn" id = "restart-btn">Restart Game</button>
        `
        document.getElementById("restart-btn").addEventListener("click",handleRestartBtnClick)
    },1500)
}


function handleRestartBtnClick(){
    if(isGameEnded){
        isWaiting = false
        isGameEnded = false
        setTimeout(()=> {
            document.body.innerHTML = `
            <main>
                <div id="hero"></div>
                <div id="monster"></div>
            </main>
            <button class="btn" id="attack-btn">Attack</button>
            `
            monstersArray.push("orc","demon","goblin")
            monster = getNewMonster()
            hero = new Character(characterData.hero)
            renderCharacter()
            setupAttackBtnEventListener()
        },1500)
    }
}
function setupAttackBtnEventListener(){
    document.getElementById("attack-btn").addEventListener("click",handleAttackBtnClick)
}

let hero = new Character(characterData.hero)
let monster = getNewMonster()

function renderCharacter(){
    document.getElementById("hero").innerHTML = hero.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}
setupAttackBtnEventListener()
renderCharacter()