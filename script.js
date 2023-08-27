//gitpush 
function h1Func() {
    document.getElementById("h1").style.backgroundColor = "red"
}

function h1Func2() {
    document.getElementById("h1").style.backgroundColor =""
    document.getElementById("h1").style.color ="Black"
    console.log('running')
}

const btn = document.getElementById('h1');
let colors = ['red', 'blue', 'green', 'brown']
let x = 0;
btn.addEventListener('mouseover', function onClick() {
    if (x == colors.length) x = 0;
    btn.style.backgroundColor = colors[x]; 
    btn.style.color = 'white';
    console.log(x)
    x = x+1
});

ele = document.getElementById("first")
function myFunction(){
    let x = prompt("enter password", "Mufaddal")
    if(x == "muffu"){
        ele.className = "second"
        ele.innerText = " login successfull\nhere are your things from this website"
    }
    
    

}

