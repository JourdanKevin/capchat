function getResultForm() {
    var elements = document.getElementById("myform").elements;
    var arr =[];
    for(var i = 0 ; i < elements.length -1 ; i++){
        var item = elements.item(i);
        arr.push(item.value);
    }
    return arr
}

function log(){
    resp = getResultForm();    
    resp[1] =  calcMD5(resp[1]);
    axios.get('http://localhost:3000/getUser',{params : resp}).then(res => {
        window.localStorage.setItem("token", res.data.token);
        // axios.defaults.headers.common['Authorization'] = res.data.token
        // axios.get('http://localhost:3000/')
        // axios.get('http://localhost:3000/', {
        //     headers: {
        //     Authorization: 'Bearer ' + res.data.token //the token is a variable which holds the token
        // }
    // }).then(res => {console.log(res);})
    
})
    // 
    // window.localStorage.setItem(key, value);
    // console.log(resp);
    return true;
}