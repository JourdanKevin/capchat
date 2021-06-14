var timerStart = 30;
var currentTimer = timerStart;
var neutres;
var singuliers;
var poseSing;
var startT;
        function elid(id) {
            return document.getElementById(id);
        }        
        function GetData(url) {
            var xhr = new XMLHttpRequest();
            var myArr;
            xhr.onreadystatechange = function() {            
            if (this.readyState == 4 && this.status == 200) {
                myArr = JSON.parse(this.responseText);                
            }};
            xhr.open("GET", url, false);
            xhr.send();
            return myArr;        
            }
        function st(){
            elid("capchat").hidden = true;
            elid("loading").hidden = false;
            GetImages();
            loadCap();
            startT = setInterval(() =>{
            if(--currentTimer === 0){
                if(timerStart === 5){
                    failCapchat()
                }     
                recharge();
            }
            elid("timer").innerHTML = "temps restant : "+ currentTimer;
            }, 1000);
        }
        function failCapchat(){
                clearInterval(startT);
                elid("capchat").remove()
                elid("result").hidden = false
                elid("imgResult").src = "images/icons/error.png"
                elid("imgResult").alt = "error"
        }
        function recharge(){
            if (timerStart === 5){
                failCapchat()
            }
            else{
                loadCap();           
                timerStart = timerStart - 5;
                currentTimer = timerStart;
            }
            
        }
        function GetImages(){
            neutres = GetData("http://localhost:3000/getImages/neutres");
            singuliers = GetData("http://localhost:3000/getImages/singuliers");  
        }
        function validate(){
            elid("capchat").remove()
            elid("result").hidden = false
            elid("imgResult").src = "images/icons/valid.png"
            elid("imgResult").alt = "valid"
        }
        function verif(index){
            if (index === poseSing){
                elid("bvalidate").hidden = false;
                clearInterval(startT);
                elid("img"+index).style.border = "solid 4px green";
            }
            else{
                // elid("img"+index).style.border = "solid 4px red";
                alert("erreur le capchat va être rechargé");
                recharge();
            } 
        }     
        function loadCap() {                 
            var randNeutres = neutres.sort(() => 0.5 - Math.random()).slice(0, 8);
            var randSinguliers = singuliers[Math.floor(Math.random()*singuliers.length)];
            poseSing = Math.floor(Math.random() * 8);
            elid("indice").innerHTML = randSinguliers.indice
            let i;
            for (let index = 0, i = 0; index < 9; index++, i++) {
                if (index === poseSing){
                    elid("img"+index).src = randSinguliers.url;
                    i--;
                    continue;
                }
                elid("img"+index).src = randNeutres[i].url;                
            }
            elid("loading").hidden = true;       
            elid("capchat").hidden = false;    
    }