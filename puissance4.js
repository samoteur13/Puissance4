//dome
var jouer1scor = document.querySelector('#joueur1')
var jouer2scor = document.querySelector('#joueur2')
var test = document.querySelector('#test')
var grille = document.querySelectorAll("#Grille button");
var reset = document.querySelector('#reset')
var img = document.querySelector('#img')
var audio = new Audio('fille.wav');



//player names
player1Name = document.querySelector('#player1Name')
player2Name = document.querySelector('#player2Name')

//dome form
var form = document.querySelector('#form')
var pseudo = document.querySelector('#pseudo')
var choicePlayer = document.querySelector('#joueur')
var player2 = document.querySelector('#formBis')
var pseudo2 = document.querySelector('#pseudo2')
//var choice = document.querySelector('#cpu').value

//var
let checkWin = false
var jouer1scor = 0;
var jouer2scor = 0;
var gamer = "gamer 1"
var player = ""
let pseudo2Value;
let pseudoInString;
let choiceValue
let soluce = [
    //les victoires horizontales
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
    //les victoires verticales
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
    //les victoires diagonales haut -> droite
    [0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
    [7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
    [14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],
    //les victoires diagonales haut -> gauche
    [6, 12, 18, 24], [5, 11, 17, 23], [4, 10, 16, 22], [3, 9, 15, 21],
    [13, 19, 25, 31], [12, 18, 24, 30], [11, 17, 23, 29], [10, 16, 22, 28],
    [20, 26, 32, 38], [19, 25, 31, 37], [18, 24, 30, 36], [17, 23, 29, 35]
]

//desactive la grille
for (let i = 0; i < grille.length; i++) {
    grille[i].disabled = true
}

//choix de joueur puis reactive la grille
function choice() {
    //recupére mes choix et nom de joueur
    pseudo2Value = pseudo2.value
    choiceValue = choicePlayer.value
    pseudoInString = pseudo.value
    if (choiceValue === "joueur2") {
        player2.style.display = "flex"
    }
    if (pseudoInString != "" && choiceValue === "cpu" || choiceValue === "joueur2" && pseudo.value != "" && pseudo2Value != "") {
        form.style.display = "none";
        for (let i = 0; i < grille.length; i++) {
            grille[i].disabled = false
        }
        if (choiceValue === "cpu") {
            pseudo2.value = "cpu"
        }
        reset.removeAttribute("disabled")
    }
}

//changement de joueur 1 et 2 ou ia
function clickGame(element) {
    if (element.innerHTML === "") {

        if (!checkWin) {
            if (gamer === "gamer 1") {
                element.style.color = "blue";
                element.style.backgroundColor = "blue"
                element.innerHTML = "X"
                player = "X"
                if (choiceValue === "joueur2") {
                    test.innerHTML = pseudo2.value;
                } else {
                    test.innerHTML = pseudo.value;
                }
                gamer = "gamer 2"
                victoiryif()
                if (!checkWin) {

                    //si le joueur joue contre l'ordinateur
                    if (choiceValue === "cpu" && gamer === "gamer 2") {

                        for (let i = 0; i < grille.length; i++) {
                            grille[i].disabled = true
                        }
                        test.innerHTML = pseudo2.value;
                        {
                            setTimeout(() => {// appelle ma fonction avec un delai de 1sec
                                ia()
                                gamer = "gamer 1"
                                victoiryif()
                            }, 1000); // delai toujours en milliseconde
                        }
                    }
                    victoiryif()
                }


            } else if (gamer === "gamer 2") {
                element.style.backgroundColor = "red"
                element.style.color = "red";
                element.innerHTML = "O"
                player = "O"
                test.innerHTML = pseudo.value;
                gamer = "gamer 1"
                victoiryif()
            }

        }
        //verifie si un  joueur a gagné

    }
}

//ia
function ia() {
    test.innerHTML = pseudo.value;
    for (let i = 0; i < grille.length; i++) {
        grille[i].disabled = false
    }
    for (let i = 0; i < grille.length; i++) {
        let random = Aleatoire(0, 41)
        if (grille[random].innerHTML == "") {
            grille[random].innerHTML = "O"
            grille[random].style.color = "red"
            grille[random] = grille[random].style.backgroundColor = "red"
            break;
        }
    }
}

//Condition de victoire
function victoiryif() {
    player1Name.innerHTML = pseudoInString
    if (choiceValue === "cpu") {
        player2Name.innerHTML = "cpu"
    } else {
        player2Name.innerHTML = pseudo2Value
    }
    for (let i = 0; i < soluce.length; i++) {
        let a = grille[soluce[i][0]].innerHTML
        let b = grille[soluce[i][1]].innerHTML
        let c = grille[soluce[i][2]].innerHTML
        let d = grille[soluce[i][3]].innerHTML
        if (a != "") {
            if (a === b && b === c && c === d) {
                if (a === "X") {
                    audio.play();
                    setTimeout(() => {// appelle ma fonction avec un delai de 1sec

                        img.style.display = "block";
                    }, 400); // delai toujours en milliseconde
                    jouer1scor++
                    jouer1.innerHTML = jouer1scor
                    gamer = "gamer 1"
                    checkWin = true
                    stop()
                } else if (a === "O") {
                    jouer2scor++
                    jouer2.innerHTML = jouer2scor
                    grille.disabled = "true";
                    gamer = "gamer 1"
                    checkWin = true
                    stop()
                    audio.play();
                    setTimeout(() => {// appelle ma fonction avec un delai de 1sec

                        img.style.display = "block";
                    }, 400); // delai toujours en milliseconde
                }
            }
        }
    }

    let reply = 0;
    for (let i = 0; i < grille.length; i++) {
        if (grille[i].innerHTML != "") {
            reply++
        }
    }
    if (reply === 42) {
        test.innerHTML = "Egalité"
        gamer = "gamer 1"
        for (let i = 0; i < grille.length; i++) {
            grille[i].disabled = true;
        }
        return
    }
}

//affiche le score
jouer1.innerHTML = jouer1scor
jouer2.innerHTML = jouer2scor

//stop le jeux
function stop() {
    console.log('hvbvbvbvv');
    for (let i = 0; i < grille.length; i++) {
        grille[i].disabled = true;
    }
}
//reset toute la grille
function restart() {
    checkWin = false
    for (var i = 0; i < grille.length; i++) {
        grille[i].innerHTML = "";
        grille[i].style.backgroundColor = "white"
        grille[i].disabled = false;
        img.style.display = "none";
        test.innerHTML = "Grille"
        gamer = "gamer 1"
    }
}

function Aleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function matchnul() {
//     var reply = 0;
//     for (let i = 0; i < grille.length; i++) {
//         if (grille[i].innerHTML != "") {
//             reply++
//         }
//     }
//     if (reply === 42) {
//         test.innerHTML = "Egalité"
//         gamer = "gamer 1"
//         return
//     }
// }



