function reziseIframe(){
    var iframe = document.getElementById("ifrm");
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}
function emptyArr(arr){
    return arr.length === 0;
}
function elid(id) {
    return document.getElementById(id);
}   
function getResultFprm() {
    var elements = document.getElementById("myform").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    return obj
}
function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
function register(){

    if (document.getElementById('ifrm').contentWindow.document.getElementById('imgResult').alt !== "not found"){
        console.log(getResultFprm());
        resp = getResultFprm();
        var error = [];
        if(resp["Mdp"] !== resp["Confirm mdp"] ){
            error.push("Les mots de passe ne sont pas identique. ")
            elid("IconPassWord").hidden = false;
        }
        if(!validateEmail(resp["Email"])){
            error.push("L'email n'est pas valide. ")
            elid("IconMail").src = "images/icons/error.png"
            elid("IconMail").hidden = false;
        }
        else{
            elid("IconMail").src = "images/icons/valid.png"
        }
        console.log(error);
        if (!emptyArr(error)){
            alert(error.join());
            return false;
        }
        resp["Mdp"] = calcMD5(resp["Mdp"]);
        delete resp.submit;
        delete resp["Confirm mdp"];
        console.log(resp);
        axios.post('http://localhost:3000/createUser',null, {params : resp});
        return true;
            
    }
    else{
        alert("veuillez répondre aux capchat");
        return false;
    }

}