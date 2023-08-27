//gitpush
//push third

const h1ss = document.getElementById("h1s");
ele = document.getElementById("first div");
btn = document.getElementById("btn");
ele.className = "second";


function h1Func2() {
  document.getElementById("h1s").style.backgroundColor = "";
  document.getElementById("h1s").style.color = "Black";
  console.log("running");
}

let colors = ["red", "blue", "green", "brown"];
let x = 0;
h1ss.addEventListener("mouseover", function onClick() {
  if (x == colors.length) x = 0;
  h1ss.style.backgroundColor = colors[x];
  h1ss.style.color = "white";
  console.log(x);
  x = x + 1;
});
// -------------------------------------
let flag2 = 0;
btn.addEventListener("click", function myFunction() {
    if (flag2 == 0){
    
        let x = prompt("Enter Your Name ", "akka Bai");
              if (x == "akka Bai" || x == "taha") {
                ele.className = "firstly";
                ele.innerText = " Login Successfull\n All The Best For Your Exams";
                btn.style.color = "blue";
                btn.innerHTML = "Restore";
                console.log("second")
                flag2 = 1; //turn it into abnormal state 
            }
        }
    else {
        console.log("here", flag2);
        btn.style.color = "black";
        btn.innerHTML = "Click for a Good Message";
        // btn.style.font-style = ;?
        ele.innerHTML = "Enter Correct Password";
        ele.className = "second";
        // alert("second time");
        flag2 = 0;
    }
    
});

