let main = document.getElementById("main");
let makeArrow = document.getElementById("make_arrow");
let makeBox = document.getElementById("make_box");
let makeText = document.getElementById('make_text');
let second = document.getElementById("second");
let aem = new Hammer.Manager(makeArrow);
let bem = new Hammer.Manager(makeBox);
let tem = new Hammer.Manager(makeText); 
// add a regonizer
let dt = new Hammer.Tap({ event: "singletap", taps: 1 });
let t = new Hammer.Tap({event: "tap", taps:1})
let te = new Hammer.Tap({event:"Tap", taps:1})
aem.add(dt);
bem.add(t);
tem.add(te);
i = 1;
aem.on("singletap", () => {
  second.innerHTML =
    second.innerHTML +
    "<div id=arrow" +
    parseInt(i) +
    ' class="common arrow" id=arrow onclick="Move(this.id)"><p>&#8594;</p></div>';
  console.log("You're pressing me!");
  dragElement(document.getElementById(i), main.id);
  i += 1;
  
});
bem.on("tap", () => {
  second.innerHTML =
    second.innerHTML + "<div id=table" + parseInt(i) + ' class="common table" onclick="Move(this.id)"></div>';
  dragElement(document.getElementById("table" + i), main.id);
  i += 1;
});


tem.on("Tap", ()=>{
  console.log("HERE")
  let input = window.prompt("Enter text: ");
    second.innerHTML = second.innerHTML + "<div id=text" + parseInt(i) +  ' class="common text" onclick="Move(this.id)"><p>' + input + '</p></div>';
    dragElement(document.getElementById("text" + i), main.id);
    console.log(document.getElementById("text" + parseInt(i)))
    i += 1;
})
// Make the DIV element draggable:
function dragElement(elmnt, id) {
    console.log(elmnt)
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (elmnt) {
    // if present, the header is where you move the DIV from:
    elmnt.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    document.getElementById(id).onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function Move(id) {
  let rm_elemnt = new Hammer.Manager(document.getElementById(id));
  let rm_press = new Hammer.Press({event:"Press", time: 1000});
  rm_elemnt.add(rm_press);
  rm_elemnt.on("Press", ()=>{
    console.log("MY NAME IS: " + id)
    document.getElementById(id).remove()
    console.clear()
  })
  if(id){
    dragElement(document.getElementById(id), main.id);
  } 
  
}