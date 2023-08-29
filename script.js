let username = ["20BAI4020", "20BAI4021", "20BAI4022"]
let password = ["Jagath123", "Kavin028", "Kavin2002"]
let page = ["20bai4020.html", "20bai4021.html", "20bai4022.html"]

let instu = ["mkce", "vsb", "Nsn"]
let instu_pas = ["001", "002", "003"]
let instu_page = ["mkce.html", "vsb.html", "nsn.html"]

function sub() {
  var vaildpass = document.getElementById("stpassword").value;
  var id = document.getElementById("stusername").value;
  console.log(id);
  let index = username.indexOf(id);
  if (index >= 0) {
    if (password[index] == vaildpass) {
      window.location.href = page[index];
    }
    else {
      alert("Please enter the correct password");
    }
  }
  else {
    alert("Please enter the corret username");
  }
}
function instit() {
  var vaildpass = document.getElementById("password").value;
  var id = document.getElementById("username").value;
  console.log(id);
  let index = instu.indexOf(id);
  if (index >= 0) {
    if (instu_pas[index] == vaildpass) {
      window.location.href = instu_page[index];
    }
    else {
      alert("Please enter the correct password");
    }
  }
  else {
    alert("Please enter the corret insitute id");
  }
}