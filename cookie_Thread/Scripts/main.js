
let cookie_button = document.getElementById("cookie-button")
let cookies_displayer = document.getElementById("cookies-displayer")
let upgrade1 = document.getElementById("upgrade1")

function newPlayer() {
    let player = {
        cookies: 0,
        cookiePerClick: 1000000,
        upgrades: [],
        showedUpgrades: [],
    }

    return player
}

let playerData = localStorage.getItem("PlayerData") ? JSON.parse(localStorage.getItem("PlayerData")) : newPlayer()

let upgradesData = {
    "+1 click": {
        name: "+1 click",
        cost: 30,
        cookiesToDisplay: 10,
        callback: function () {
            playerData.cookiePerClick += 1
        }
    }
}


function buyUpgrade(upgrade) {
    if (playerData.cookies > upgrade.cost) {
        playerData.cookies -= upgrade.cost
        updateCookieDisplay()
        playerData.upgrades.push(upgrade.name)
        loadUpgradesStats(upgrade)
    }
}

function createUpgradeButton(upgrade) {
    let object = document.getElementById("store").appendChild(
        Object.assign(
            document.createElement('li'),
            {
                id: upgrade.name,
                className: "products",
                textContent: upgrade.name

            }
        )
    )

    console.log(object)
    object.addEventListener("click", function () {
        buyUpgrade(upgrade)
    })
}


function checkForUpgrades() {
    for (const [name, upgrade] of Object.entries(upgradesData)) {
        if (playerData.cookies > upgrade.cookiesToDisplay) {

            if (playerData.showedUpgrades.length == 0) {
                playerData.showedUpgrades.push(upgrade.name)
                createUpgradeButton(upgrade)
            } else {
                let found = false

                console.log(playerData.showedUpgrades)
                for (let showed = 0; showed < playerData.showedUpgrades.length; showed++){
                    if (playerData.showedUpgrades[showed] == name) {
                        found = true
                        break;
                    }
                }

                if (!found) {
                    playerData.showedUpgrades.push(upgrade.name)
                    createUpgradeButton(upgrade)
                }
                
                if (!document.getElementById(name)){
                    createUpgradeButton(upgrade)
                }
            }



        }

    }


}

checkForUpgrades()

function updateCookieDisplay() {
    cookies_displayer.textContent = "Cookies: " + playerData.cookies
}
updateCookieDisplay()

function loadUpgradesStats(upgrade) {
    upgrade.callback()
}



if (!localStorage.getItem("PlayerData")) {
    console.log("Set")
    localStorage.setItem("PlayerData", JSON.stringify(playerData))
}


function addCookie(amount) {
    playerData.cookies += amount
    updateCookieDisplay()
    checkForUpgrades()
}


function cookie_Clicked() {
    addCookie(playerData.cookiePerClick)

    cookie_button.style.transform = "scale(1.1, 1.1)"
    setTimeout(function () {
        cookie_button.style.transform = "scale(1, 1)"
    }, 75)
}
cookie_button.addEventListener("click", cookie_Clicked)


window.addEventListener('beforeunload', function (e) {
    localStorage.setItem("PlayerData", JSON.stringify(playerData))
});
