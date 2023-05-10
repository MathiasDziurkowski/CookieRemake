
let cookie_button = document.getElementById("cookie-button")
let cookies_displayer = document.getElementById("cookies-displayer")

function newPlayer() {
    let player = {
        cookies: 0,
        cookiePerClick: 1,
        upgrades: [],
    }

    return player
}


let playerData = localStorage.getItem("PlayerData") ? JSON.parse(localStorage.getItem("PlayerData")) : newPlayer()

function buyUpgrade(upgrade){
    if (playerData.cookies > upgrade.cost) {

    }
}

if (!localStorage.getItem("PlayerData")){
    console.log("Set")
    localStorage.setItem("PlayerData", JSON.stringify(playerData))
}

function updateCookieDisplay(){
    cookies_displayer.textContent = "Cookies: "+ playerData.cookies
}

function addCookie(amount){
    playerData.cookies += amount
    updateCookieDisplay()
}

updateCookieDisplay()

function cookie_Clicked(){
    addCookie(playerData.cookiePerClick)

    cookie_button.style.transform = "scale(1.1, 1.1)"
    setTimeout(function(){
        cookie_button.style.transform = "scale(1, 1)"
    }, 75) 
}
cookie_button.addEventListener("click", cookie_Clicked)
product1.addEventListener("click" , product1_Clicked)

function product1_Clicked(){
    
}

window.addEventListener('beforeunload', function (e) {
    localStorage.setItem("PlayerData", JSON.stringify(playerData))
});
