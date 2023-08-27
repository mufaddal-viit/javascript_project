//gitpush 
//push third

const h1s = document.getElementById('h1');
ele = document.getElementById("first div");
btn = document.getElementById("btn");

function h1Func() {
    document.getElementById("h1").style.backgroundColor = "red"
}
function h1Func2() {
    document.getElementById("h1").style.backgroundColor =""
    document.getElementById("h1").style.color ="Black"
    console.log('running')
}

let colors = ['red', 'blue', 'green', 'brown']
let x = 0;
h1s.addEventListener('mouseover', function onClick() {
    if (x == colors.length) x = 0;
    h1s.style.backgroundColor = colors[x]; 
    h1s.style.color = 'white';
    console.log(x)
    x = x+1
});


btn.addEventListener('click',function myFunction(){
    let x = prompt("Enter Your Name ", "akka Bai")
    if(x == "akka Bai" || x == "taha" ){
        ele.className = "second"
        ele.innerText = " login successfull\n All the best for you exams"
    }
    })

