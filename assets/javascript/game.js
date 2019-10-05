let counterAttack = Math.floor(Math.random() * 15) + 15;
let attackPower =  Math.floor(Math.random() * 5) + 1;
let playerAttack;
let playerHealth;
let playerName;
let enemyHealth;
let enemyName;
let selectedFighter;
let playersSelected = false;
let gameOver = false;

playerAttackPoints = attackPower;

$(document).ready(function() {

    function updateHUD(message) {
        let messageText = $("<p>");
        messageText.text(message);
        $("#battle-stats").append(messageText);
    }

    function clearHUD() {
        $("#battle-stats").empty();
    }

    function checkDefeat(player,enemy){
        if(player <= 0 && enemy <= 0){
            console.log("tie game");
            $("#enemy-health").text("XXX");
            $("#player-health").text("XXX");
            updateHUD(`Game Over! You somehow managed to kill each other! Try again!`);
            $("#reset-btn").css("display","initial");
            return true;
        }
        else if(player <= 0){
            console.log("enemy wins");
            $("#player-health").text("XXX");
            updateHUD(`Game Over! ${enemyName} has defeated you!`);
            $("#reset-btn").css("display","initial");
            return true;
        }
        else if (enemy <=0){
            console.log("player wins");
            $("#enemy-health").text("XXX");
            updateHUD(`Game Over! You have defeated ${enemyName}!`);
            $("#reset-btn").css("display","initial");
            return true;
        }
    }

    function playerAttack(damage){
        enemyHealth = enemyHealth - damage;
        $("#enemy-health").text(enemyHealth);
        updateHUD(`You attacked ${enemyName} for ${damage} damage!`);
        playerAttackPoints = damage + attackPower;
    }

    function enemyAttack(damage){
        playerHealth = playerHealth - damage
        $("#player-health").text(playerHealth);
        updateHUD(`${enemyName} counter attack you for ${damage} damage!`);
    }

    //Track user selection and move fighters to next seleciton div
    $(document).on('click', '.fighters', function(){
        selectedFighter = $(this);
        $(".fighters").each(function(i, obj){
            if(obj === selectedFighter[0]){
                playerHealth = $(obj).children(".fighter-health").attr("data-health");
                playerName = $(obj).children(".fighter-name").text();
                $(obj).children(".fighter-health").attr("id","player-health"); //add id to health heading so we can easily update as needed
                updateHUD(`You have choosen: ${playerName}`);
            }
            else{
                $(obj).detach();
                $(obj).appendTo($("#enemy-select"));
                $(obj).addClass("enemies");
                $(obj).removeClass("fighters");
            }
        });
    });

    //Track enemy selection and move enemies to next seleciton div
    $(document).on('click', '.enemies', function(){
        selectedFighter = $(this);
        $(".enemies").each(function(i, obj){
            if(obj === selectedFighter[0]){
                enemyHealth = $(obj).children(".fighter-health").attr("data-health");
                $(obj).children(".fighter-health").attr("id","enemy-health"); //add id to health heading so we can easily update as needed
                enemyName = $(obj).children(".fighter-name").text();
                $(obj).detach();
                $(obj).appendTo($("#fight-selection"));
                $(obj).addClass("fighter");
                $(obj).removeClass("enemies");
                playersSelected = true;
                updateHUD(`The enemy choosen is: ${enemyName}`);
                updateHUD("It is time to fight! Click on the fight button to start your attack!");
            }
            else{
                $(obj).removeClass("enemies");
                $(obj).addClass("not-in-play");           
            }
        });
    });

    //Start fighting
    $(document).on('click', '#fight-btn', function(){
        if(gameOver != true){
            if(playersSelected){
                clearHUD();
                playerAttack(playerAttackPoints);
                enemyAttack(counterAttack);
                gameOver = checkDefeat(playerHealth,enemyHealth);
            }
            else{
                clearHUD();
                updateHUD(`You must select a player and enemy before you can fight!`);
            }
        }
    });

    //reset game
    $(document).on('click', '#reset-btn', function(){
        var resetObject = $(".hero-btn");
        clearHUD();
        resetObject.addClass("fighters");
        resetObject.removeClass("not-in-play fighter");
        resetObject.detach();
        resetObject.appendTo($("#user-select"));
        $("#enemy-health").removeAttr("id","enemy-health");
        $("#player-health").removeAttr("id","player-health"); 
        counterAttack = Math.floor(Math.random() * 15) + 15;
        attackPower =  Math.floor(Math.random() * 5) + 1;
        playerAttackPoints = attackPower;
        playersSelected = false;
        gameOver = false;
        $("#fighter-1").children(".fighter-health").text($("#fighter-1").children(".fighter-health").attr("data-health"));
        $("#fighter-2").children(".fighter-health").text($("#fighter-2").children(".fighter-health").attr("data-health"));
        $("#fighter-3").children(".fighter-health").text($("#fighter-3").children(".fighter-health").attr("data-health"));
        $("#fighter-4").children(".fighter-health").text($("#fighter-4").children(".fighter-health").attr("data-health"));
        $("#reset-btn").css("display","none");
    });

});
