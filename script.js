var mousePressed = false;
var lastX, lastY;
var ctx1;
var tooltype = 'draw';
var mousedown = false;
var colorPick = "blue";
var nodeSelector = '#PanteneColor';

function changeb() {
  // Get the checkbox
  var checkBox = document.getElementById("checkbox");

  if (checkBox.checked == true){
    console.log("checkbox true");
    $(".sumback").css("display", "none");
    $(".subback").css("display", "initial");

  } else {
    $(".subback").css("display", "none");
    $(".sumback").css("display", "initial");
    console.log("checkbox false");
  }
}

$('.cb-value').click(function() {
  var mainParent = $(this).parent('.toggle-btn');
  if($(mainParent).find('input.cb-value').is(':checked')) {
    $(mainParent).addClass('active');
  } else {
    $(mainParent).removeClass('active');
  }

})


$(nodeSelector).click(
  function() {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      var currentCssColor = $('.maincolor').css('background-color');

      $(this).delegate('.PanteneColor', 'click',
        function() {
          var selectedColor = $(this).find('.color').css('background-color');
          $(this).find('.color').css('background-color', currentCssColor);
          $('.maincolor').css('background-color', selectedColor);

          /* BG with alpha*/
          var selectedColorBG = selectedColor.replace(')', ', .3)').replace('rgb', 'rgba');
          //$('body').css('background-color', selectedColorBG);

          $('.selectedColor .selectedColorText').html(selectedColor);
          $(nodeSelector).undelegate();
        }
      );
    }
  }
);

var mousePressed = false;
var lastX, lastY;
var ctx;
var tooltype = 'draw';
var mousedown = false;
var colorPick = "blue";

function InitThis() {
    // $('#myCanvas').css("width","800px");

    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        // Draw(e.pageX, e.pageY, false);
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            //Draw(e.pageX , e.pageY , true);
             Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });
	    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });

    $("#myCanvas").css("pointer-events", "none");
    $("#widget").css("zIndex", "100");

}

function Draw(x, y, isDown) {
    if (isDown && tooltype ==='draw') {
        ctx.beginPath();
        ctx.strokeStyle =$('.maincolor').css('background-color');;
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
       ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

//   $("#draw-button").click(function functionName() {
//     //ctx = document.getElementById('myCanvas').getContext("2d");
//     $("#widget").css("zIndex", "-100");
//     use_tool('draw');
//     $("#myCanvas").css("visibility", "visible");
//     $("#colourPicker").toggle();
//   });
//
// $("#interact-button").click(function functionName() {
//   $("#widget").css("zIndex", "100");
//   $("#myCanvas").css("visibility", "hidden");
// });

$("#er-button").click(function functionName() {
  //ctx = document.getElementById('myCanvas').getContext("2d");
  $("#draw-button").css("background-color", "#00bcd4");
  $("#er-button").css("background-color", "red");
  $("#interact-button").css("background-color", "#00bcd4");
  $("#widget").css("zIndex", "-100");
  $("#myCanvas").css("pointer-events", "initial");
  $("#myCanvas").css("cursor", "crosshair");

  use_tool('erase');

  //$("#myCanvas").css("visibility", "visible");

});
$("#draw-button").click(function functionName() {
  //ctx = document.getElementById('myCanvas').getContext("2d");

  $("#widget").css("zIndex", "-100");
  $("#myCanvas").css("pointer-events", "initial");
  $("#myCanvas").css("cursor", "crosshair");


  use_tool('draw');

  //$("#colourPicker").toggle();
  $("#draw-button").css("background-color", "red");
  $("#er-button").css("background-color", "#00bcd4");
  $("#interact-button").css("background-color", "#00bcd4");

});

$("#interact-button").click(function functionName() {
  $("#myCanvas").css("pointer-events", "none");
  $("iframe").css("cursor", "grab");
  $("#widget").css("zIndex", "100");
  $(".iframe-container").css("cursor", "grab");
  $("#draw-button").css("background-color", "#00bcd4");
  $("#er-button").css("background-color", "#00bcd4");
  $("#interact-button").css("background-color", "red");
//$("#myCanvas").css("visibility", "hidden");
});





var canvas = document.getElementById("myCanvas");

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);





var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var tooltype = 'draw';

//Mousedown
$(canvas).on('mousedown', function(e) {
    last_mousex = mousex = parseInt(e.clientX-canvasx);
	last_mousey = mousey = parseInt(e.clientY-canvasy);
    mousedown = true;
});

//Mouseup
$(canvas).on('mouseup', function(e) {
    mousedown = false;
});

//Mousemove
$(canvas).on('mousemove', function(e) {
    mousex = parseInt(e.clientX-canvasx);
    mousey = parseInt(e.clientY-canvasy);
    if(mousedown) {
        ctx.beginPath();
        if(tooltype=='draw') {
            ctx.globalCompositeOperation = 'source-over';
            //ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
        } else {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        }
        ctx.moveTo(last_mousex,last_mousey);
        ctx.lineTo(mousex,mousey);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
    }
    last_mousex = mousex;
    last_mousey = mousey;
    //Output
    $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);
});

//Use draw|erase
use_tool = function(tool) {
  if(tool == "erase")
  {
    $("#myCanvas").css("cursor", "crosshair");

    console.log("clicked erase");
  }
    tooltype = tool; //update
}


jQuery(document).ready(function($) {

	/* Some simple jQuery to switch the classes */
	$('.colourOption').on('click', function() {
		/* This line removes the selectedColour class from every element in the colouPicker, meaning that only one is selected at a time!

		 It basically saves me having to make them a check box, I should proabbly be told of for that...*/
		$('#colourPicker *').removeClass('selectedColour');
		/* This switches on the selectedColour class for that div. */
		$(this).toggleClass('selectedColour');

    /*Changing the body colours, its really ugly repeative code, I could probably improve it! */
		if ($(this).attr('id') == 'colourOne') {
			colorPick = "blue";
      use_tool("draw");
		} else if ($(this).attr('id') == 'colourTwo') {
			colorPick = "purple";
      use_tool("draw");
		} else if ($(this).attr('id') == 'colourThree') {
			colorPick = "green";
		} else if ($(this).attr('id') == 'colourFour') {
			colorPick = "red";
		} else if ($(this).attr('id') == 'colourFive') {
			colorPick = "orange";
		} else if ($(this).attr('id') == 'colourSix') {
			colorPick = "yellow";
		}

	});

});



/////////////////new code separatorrr

var element_pos = 0; // POSITION OF THE NEWLY CREATED ELEMENTS.
var iCnt = 0;


$(function() {
  $('#divContainer').draggable();
});
$(function() {
  $("#divResize").draggable().resizable();
});

// CREATE MORE DIV, WITH 'ABSOLUTE' POSITIONING.
$('#textbox-button').click(function() {


  var dynamic_div = $(document.createElement('div')).css({
    border: '1px dashed',
    position: 'absolute',
    left: '200px',
    top: '200px',
    width: '120',
    height: '120',
    padding: '3',
    margin: '0'
  });

  var handle = $(document.createElement('h1')).css({
    //border: '1px dashed',
    position: 'absolute',
    left: '-22px',
    top: '-45px',
    width: '30',
    height: '30',
  });

  var del = $(document.createElement('button')).css({
    //border: '1px dashed',
    position: 'relative',
    left: '30px',
    top: '-28px',
    width: '33',
    height: '33',
    background: "url('trash-light.svg') no-repeat 10px center red",
  });


  var text = $(document.createElement('h3')).css({

  });

  var icon = $(document.createElement('a'));
  var icon1 = $(document.createElement('a'));


  element_pos = element_pos + $('#divContainer').width() + 20;

  $(dynamic_div).appendTo('body').resizable().draggable();
  $(handle).appendTo(dynamic_div);
  $(del).appendTo(dynamic_div);
  $(del).click(function functionName() {
    $(this).parent('div').remove();
    console.log(iCnt);
  });

  //$(handle).appendTo(dynamic_div);
  $(text).appendTo(dynamic_div);

  $(icon).appendTo(handle);
  $(icon1).appendTo(del);

  $(dynamic_div).addClass('textbox');
  $(dynamic_div).attr('id', ("val" + iCnt));
  $("#val" + iCnt + "> h3").html("Click to Type");
  $("#val" + iCnt + "> h3").attr('contenteditable', 'true');

  $(".textbox > h1 > a").addClass("fas fa-arrows-alt");
  //$(".textbox > h1 > a").addClass("fas fa-arrows-alt");

  $(".textbox > h3").click(function functionName() {
      console.log("click");
      if ($("#val" + (iCnt - 1) + "> h3").html() == "Click to Type") {
        console.log("condition met");
        $("#val" + (iCnt - 1) + "> h3").html(" ");

      } else {
        console.log("the vaile of iCnt is: " + iCnt);
        console.log($("#val0 > h3").html());
      }
    }
  );
  handle = $(".textbox").draggable("option", "handle");

  // Setter


  // Setter
  $(".textbox").draggable("option", "handle", "h1");



  iCnt = iCnt + 1;

});



$(document).ready(function() {
  //generateNumber();
  $(".subback").css("display", "none");
  $(".sumback").css("display", "initial");
});


function myFunction() {
  // Get the checkbox
  var checkBox = document.getElementById("checkbox");

  if (checkBox.checked == true){
    console.log("checkbox true");
    $(".sumback").css("display", "none");
    $(".subback").css("display", "initial");

  } else {
    $(".subback").css("display", "none");
    $(".sumback").css("display", "initial");
    console.log("checkbox false");
  }
}

var thoucount = 0;
var huncount = 0;
var tencount = 0;
var onecount = 0;
var total = 0;
var t=0;

var state = [];
var arrval = [];
var arrtot = [];
var arrundorem = [];
var thouids = [];
var hunids = [];
var tenids = [];
var oneids = [];


function printStates() {
  return state;
}
function printones()
{
  return oneids;
}
function printtens()
{
  return tenids;
}
function printhuns()
{
  return hunids;
}
function printthous()
{
  return thouids;
}
function printrem()
{
  return arrtot;
}



$("#undo").click(function() {
  //console.log("undo click");
  if (state[state.length - 1] == 'addThou') {
    //console.log('last selected is addThou');
    $("#thou" + thouids[thouids.length - 1] + "").remove();
    //$(".i1000").remove();
    thouids.pop();
  }
  if (state[state.length - 1] == 'addHun') {
    //console.log('last selected is addHun');
    $("#hun" + hunids[hunids.length - 1] + "").remove();
    hunids.pop();
  }
  if (state[state.length - 1] == 'addTen') {
    //console.log('last selected is addTen');
    $("#ten" + tenids[tenids.length - 1] + "").remove();
    tenids.pop();
  }
  if (state[state.length - 1] == 'addOne') {
    console.log('last selected is addOne');
    $("#one" + oneids[oneids.length - 1] + "").remove();
    oneids.pop();
  }
  if (state[state.length - 1] == 'regroup1-10') {
    //console.log('last selected is regroup1-10');
    $("#ten" + tenids[tenids.length - 1] + "").remove();
    tenids.pop();
    for(var i = 0; i <= 9 ; i++){
      addOne();
    }
    for(var i = 0; i <= 9 ; i++){
      state.pop();
    }
  }
  if (state[state.length - 1] == 'regroup10-100') {
    //console.log('last selected is regroup10-100');
    $("#hun" + hunids[hunids.length - 1] + "").remove();
    hunids.pop();
    for(var i = 0; i <= 9 ; i++){
      addTen();
    }
    for(var i = 0; i <= 9 ; i++){
      state.pop();
    }
  }
  if (state[state.length - 1] == 'regroup100-1000') {
    //console.log('last selected is regroup100-1000');
    $("#thou" + thouids[thouids.length - 1] + "").remove();
    thouids.pop();
    for(var i = 0; i <= 9 ; i++){
      addHun();
    }
    for(var i = 0; i <= 9 ; i++){
      state.pop();
    }
  }
  if (state[state.length - 1] == 'remove')
  {
    //access last element of arrtot
    var last = arrtot[arrtot.length - 1];

    console.log(last.thou);
    console.log(last.hun);
    console.log(last.ten);
    console.log(last.one);
    var thou = last.thou;
    var hun=  last.hun;
    var ten=  last.ten;
    var one=  last.one;

    //replace blocks that were removes
    for(var i = 0; i < thou ; i++){
      addThou();
      state.pop();
    }
    for(var i = 0; i < hun ; i++){
      addHun();
      state.pop();
    }
    for(var i = 0; i < ten ; i++){
      addTen();

      state.pop();
    }
    for(var i = 0; i < one ; i++){
      addOne();
      state.pop();
    }



    //pop arrtot
    arrtot.pop();


  }
  if (state[state.length - 1] == 'ungroup1000-100'){
    for(var i = 0; i <= 9 ; i++){
      $("#hun"+ hunids[hunids.length - 1]+"").remove();
      hunids.pop();
    }
    addThou();
    //thouids.push(Math.floor(Math.random() * 100001));
    state.pop();
  }

  if (state[state.length - 1] == 'ungroup100-10'){
    for(var i = 0; i <= 9 ; i++){
      $("#ten"+ tenids[tenids.length - 1]+"").remove();
      tenids.pop();
    }
    addHun();
    //thouids.push(Math.floor(Math.random() * 100001));
    state.pop();
  }

  if (state[state.length - 1] == 'ungroup10-1'){
    for(var i = 0; i <= 9 ; i++){
      $("#one"+ oneids[oneids.length - 1]+"").remove();
      oneids.pop();
    }
    addTen();
    //thouids.push(Math.floor(Math.random() * 100001));
    state.pop();
  }


  state.pop();
});

// function to reload/reset page. This function is called when the reset board is clicked
function reloadPage() {
  location.reload(true);
  console.log("you clicked me!");
}

//this function removes all the selected elements off the screen
$("#delete").click(function() {
  removeSelected();
});

function removeSelected() {
  //call placeSelected to save number of elements that will be removed
  placeSelected();
  $(".ui-selected.i1000").each(function() {
    $("#thou"+ thouids[thouids.length - 1]+"").remove();
    thouids.pop();
  });
  for(var i = 0; i <= (thouids.length-1) ; i++){
    if ($("#thou"+ thouids[i]+"").hasClass("ui-selected")) {
      $("#thou"+ thouids[i]+"").removeClass("ui-selected");
    }
  }

  $(".ui-selected.i100").each(function() {
    $("#hun"+ hunids[hunids.length - 1]+"").remove();
    hunids.pop();
  });
  for(var i = 0; i <= (hunids.length-1) ; i++){
    if ($("#hun"+ hunids[i]+"").hasClass("ui-selected")) {
      $("#hun"+ hunids[i]+"").removeClass("ui-selected");
    }
  }

  $(".ui-selected.i10").each(function() {
    $("#ten"+ tenids[tenids.length - 1]+"").remove();
    tenids.pop();
  });
  for(var i = 0; i <= (tenids.length-1) ; i++){
    if ($("#ten"+ tenids[i]+"").hasClass("ui-selected")) {
      $("#ten"+ tenids[i]+"").removeClass("ui-selected");
    }
  }

  $(".ui-selected.i1").each(function() {
    $("#one"+ oneids[oneids.length - 1]+"").remove();
    oneids.pop();
  });
  for(var i = 0; i <= (thouids.length-1) ; i++){
    if ($("#one"+ oneids[i]+"").hasClass("ui-selected")) {
      $("#one"+ oneids[i]+"").removeClass("ui-selected");
    }
  }
  // $(".ui-selected").each(function() {
  //   $(".ui-selected").remove();
  // });
  state.push("remove");

}

function printLastAction() {
  console.log(state[state.length - 1]);

}

// function to update the numerical value of the actual count of all categories.Currently not used
function updateValues() {
  var arr = countSelected();
  console.log($("#v1000").html());
  // IDEA: a for loop for every value in the array
  for (var i = 0; i < arr[0]; i++) {
    $("#v1000").html($("#v1000").html() - 1000);
    thoucount--;
  }
  for (var i = 0; i < arr[1]; i++) {
    $("#v100").html($("#v100").html() - 100);
    huncount--;
  }
  for (var i = 0; i < arr[2]; i++) {
    $("#v10").html($("#v10").html() - 10);
    tencount--;
  }
  for (var i = 0; i < arr[3]; i++) {
    $("#v1").html($("#v1").html() - 1);
    onecount--;
  }
}

//this function pushes an object{thou: val, hun:val ....} into array
function placeSelected() {

  var object ={ thou: 0 , hun: 0, ten: 0 , one : 0};
  var numSelected = 0;
  var thouSelected = 0;
  var hunSelected = 0;
  var tenSelected = 0;
  var oneSelected = 0;
  $(".ui-selected").each(function() {
      if ($(this).hasClass("i1000")) {

        thouSelected++;
        //console.log("thou selected is: " + thouSelected);
      }
      if ($(this).hasClass("i100")) {
        hunSelected++;
        //console.log("hun selected is: " + hunSelected);
      }
      if ($(this).hasClass("i10")) {
        tenSelected++;
        //console.log("ten selected is: " + tenSelected);
      }
      if ($(this).hasClass("i1")) {
        oneSelected++;
        //console.log("one selected is: " + oneSelected);
      }
      numSelected++;
    }

  );


  arrval[0] = thouSelected;
  arrval[1] = hunSelected;
  arrval[2] = tenSelected;
  arrval[3] = oneSelected;

  object.one = oneSelected;
  object.ten = tenSelected;
  object.hun = hunSelected;
  object.thou = thouSelected;
  // console.log(numSelected);

  console.log(object);
  arrtot.push(object);
  return arrval;
}


//This function counts the number of selected items on the screen when called
function countSelected() {
  var numSelected = 0;
  var thouSelected = 0;
  var hunSelected = 0;
  var tenSelected = 0;
  var oneSelected = 0;



  $(".ui-selected").each(function() {
      if ($(".ui-selected").hasClass("i1000")) {

        thouSelected++;
        //console.log("thou selected is: " + thouSelected);
      }
      if ($(".ui-selected").hasClass("i100")) {
        hunSelected++;
        //console.log("hun selected is: " + hunSelected);
      }
      if ($(".ui-selected").hasClass("i10")) {
        tenSelected++;
        //console.log("ten selected is: " + tenSelected);
      }
      if ($(".ui-selected").hasClass("i1")) {
        oneSelected++;
        //console.log("one selected is: " + oneSelected);
      }

      numSelected++;
    }

  );
  arrval[0] = thouSelected;
  arrval[1] = hunSelected;
  arrval[2] = tenSelected;
  arrval[3] = oneSelected;
  // console.log(numSelected);
  return arrval;
}

function countTotal() {
  var numSelected = 0;
  var thouSelected = 0;
  var hunSelected = 0;
  var tenSelected = 0;
  var oneSelected = 0;



  $(".ui-selectable").each(function() {
      if ($(this).hasClass("i1000")) {

        thouSelected++;
        //console.log("thou selected is: " + thouSelected);
      }
      if ($(this).hasClass("i100")) {
        hunSelected++;
        //console.log("hun selected is: " + hunSelected);
      }
      if ($(this).hasClass("i10")) {
        tenSelected++;
        //console.log("ten selected is: " + tenSelected);
      }
      if ($(this).hasClass("i1")) {
        oneSelected++;
        //console.log("one selected is: " + oneSelected);
      }

      numSelected++;
    }

  );
  arrtot[0] = thouSelected;
  arrtot[1] = hunSelected;
  arrtot[2] = tenSelected;
  arrtot[3] = oneSelected;
  // console.log(numSelected);
  return arrtot;
}


//This function regroups
$("#regroup").click(function() {
  // IDEA: if number of selected items === 10 and all of the same class then regroup.
  var numItems = $('.ui-selected').length;
  console.log("numItems");
  console.log(total);
  console.log("addThou");
  var box = document.createElement("img");
  //box.innerHTML="new drag";
  box.src = "img/1000.png";
  box.id = "thou" + thoucount;

  $("#c1000").append(box);
  box.classList.add("i1000");

  $(function() {

    $(".i1000").draggable();

    $(".i1000").selectable();
  });

  console.log("thou" + thoucount);
  $("#thou" + thoucount).click(function() {
    console.log("hell");
    $(this).toggleClass("ui-selected");
  });

  $("#rem-button").click(function() {
    $(".ui-selected").remove();
  });

});

$("#regroup").click(function() {
  var count1 = 0;
  var count10 = 0;
  var count100 = 0;
  var count1000 = 0;
  $(".ui-selected").each(function() {

    // Test if the div element is empty
    if ($(this).hasClass("i1")) {
      //$(this).css("background", "yellow");
      console.log("one");
      count1 = count1 + 1;
    }
    if ($(this).hasClass("i10")) {
      //$(this).css("background", "yellow");
      console.log("one");
      count10 = count10 + 1;
    }
    if ($(this).hasClass("i100")) {
      //$(this).css("background", "yellow");
      console.log("one");
      count100 = count100 + 1;
    }
    if ($(this).hasClass("i1000")) {
      //$(this).css("background", "yellow");
      console.log("one");
      count1000 = count1000 + 1;
    }
  });
  if ((count1 == 10)) {
    console.log("condition met");
    //$(".ui-selected.i1").remove();
    for(var i = 0; i <= 9 ; i++){
      $("#one"+ oneids[oneids.length - 1]+"").remove();
      oneids.pop();
    }
    //this is pseudocode, not correct, iterate through remaining ones en remove selected class
    for(var i = 0; i <= (oneids.length-1) ; i++){
      if ($("#one"+ oneids[i]+"").hasClass("ui-selected")) {
        $("#one"+ oneids[i]+"").removeClass("ui-selected");
      }
    }
    addTen();
    state.pop();
    $("#v1").html(onecount - 10);
    onecount = onecount - 10;
    state.push('regroup1-10');
  }
  else if ((count10 == 10)) {
    console.log("condition met");
    //$(".ui-selected.i10").remove();
    for(var i = 0; i <= 9 ; i++){
      $("#ten"+ tenids[tenids.length - 1]+"").remove();
      tenids.pop();
    }
    //this is pseudocode, not correct, iterate through remaining ones en remove selected class
    for(var i = 0; i <= (tenids.length-1) ; i++){
      if ($("#ten"+ tenids[i]+"").hasClass("ui-selected")) {
        $("#ten"+ tenids[i]+"").removeClass("ui-selected");
      }
    }
    addHun();
    state.pop();
    $("#v10").html((tencount * 10) - 100);
    tencount = tencount - 10;
    state.push('regroup10-100');
  }
  else if ((count100 == 10)) {
    console.log("condition met");
    //$(".ui-selected.i100").remove();
    for(var i = 0; i <= 9 ; i++){
      $("#hun"+ hunids[hunids.length - 1]+"").remove();
      hunids.pop();
    }
    for(var i = 0; i <= (hunids.length-1) ; i++){
      if ($("#hun"+ hunids[i]+"").hasClass("ui-selected")) {
        $("#hun"+ hunids[i]+"").removeClass("ui-selected");
      }
    }
    addThou();
    state.pop();
    $("#v100").html((huncount * 100) - 1000);
    huncount = huncount - 10;
    state.push('regroup100-1000');
  }
  else {
    console.log("condition not met");
  }
  //state.push('regroup');
});

$("#ungroup").click(function() {
  var count1 = 0;
  var count10 = 0;
  var count100 = 0;
  var count1000 = 0;
  $(".ui-selected").each(function() {

    // Test if the div element is empty
    if ($(this).hasClass("i1")) {
      //$(this).css("background", "yellow");
      console.log("one");
      count1 = count1 + 1;
    }
    if ($(this).hasClass("i10")) {
      //$(this).css("background", "yellow");
      console.log("one");
      count10 = count10 + 1;
    }
    if ($(this).hasClass("i100")) {
      //$(this).css("background", "yellow");
      console.log("one");
      count100 = count100 + 1;
    }
    if ($(this).hasClass("i1000")) {
      //$(this).css("background", "yellow");
      console.log("one");
      count1000 = count1000 + 1;
    }
  });
  if ((count1000 == 1)) {
    console.log("condition met");
    $("#thou"+ thouids[thouids.length - 1]+"").remove();
    for(var i = 0; i <= (thouids.length-1) ; i++){
      if ($("#thou"+ thouids[i]+"").hasClass("ui-selected")) {
        $("#thou"+ thouids[i]+"").removeClass("ui-selected");
      }
    }
    thouids.pop();
    for(var i = 0; i <= 9 ; i++){
      addHun();
      state.pop();
    }
    state.push('ungroup1000-100');
  }
  else if ((count100 == 1)) {
    console.log("condition met");
    $("#hun"+ hunids[hunids.length - 1]+"").remove();

    for(var i = 0; i <= (hunids.length-1) ; i++){
      if ($("#hun"+ hunids[i]+"").hasClass("ui-selected")) {
        $("#hun"+ hunids[i]+"").removeClass("ui-selected");
      }
    }
    hunids.pop();
    for(var i = 0; i <= 9 ; i++){
      addTen();
      state.pop();
    }
    state.push('ungroup100-10');
  }
  else if ((count10 == 1)) {
    console.log("condition met");
    $("#ten"+ tenids[tenids.length - 1]+"").remove();
    for(var i = 0; i <= (tenids.length-1) ; i++){
      if ($("#ten"+ tenids[i]+"").hasClass("ui-selected")) {
        $("#ten"+ tenids[i]+"").removeClass("ui-selected");
      }
    }
    tenids.pop();
    for(var i = 0; i <= 9 ; i++){
      addOne();
      state.pop();
    }


    state.push('ungroup10-1');
  }
  else {
    console.log("condition not met");
  }
  //state.push('ungroup');
});



var currentNumber;
var enteredNumber;

var clearBlocks = function() {
  $('#c1000').html('');
  $('#c100').html('');
  $('#c10').html('');
  $('#c1').html('');
  $('#v1000').html('0000');
  $('#v100').html('000');
  $('#v10').html('00');
  $('#v1').html('0');
}

var generateNumber = function() {
  enteredNumber = 0;
  clearBlocks();
  currentNumber = Math.floor(Math.random() * 9999) + 1;
  $("#targetNumber").html(currentNumber);
}

var buildBlockString = function() {
  var val;
  var tempNumber = enteredNumber;
  clearBlocks();
  //console.log(tempNumber);
  for (var j = 1000; j > 0; j /= 10) {
    var htmlString = "";
    if (j <= tempNumber) {
      val = j;
      var valDecrement = 0
      var remainder = tempNumber - (Math.floor(tempNumber / val) * val);
      console.log(Math.floor(tempNumber / val) * val);
      for (var i = 0; i < (tempNumber - remainder); i += val) {
        console.log("for" + (tempNumber - remainder));
        htmlString += '<img src="img/' + val + '.png" class="i' + val + '" />';
        valDecrement += val;
        //tempNumber -= val;
      }
      $('#c' + val).html(htmlString);
      $('#v' + val).html(valDecrement);
      tempNumber -= valDecrement;
    }
  }
  //console.log(enteredNumber);
  $(".i1000").draggable();
  $(".i100").draggable();
  $(".i10").draggable();
  $(".i1").draggable();
}

function addThou() {
  var id = Math.floor(Math.random() * 100001);
  total = total + 1000;
  var box = document.createElement("img");
  box.src = "img/1000.png";
  box.id = "thou" + id;

  thouids.push(id);

  $(".thoudiv").append(box);
  box.classList.add("i1000");

  $(function() {

    $(".i1000").draggable();

    $(".i1000").selectable();
  });
  $("#thou" + id).click(function() {
    $(this).toggleClass("ui-selected");
  });
  thoucount++;
  $("#v1000").html(thoucount * 1000);
  state.push('addThou');
}

function addHun() {
  var id = Math.floor(Math.random() * 100001);
  total = total + 100;

  var box = document.createElement("img");
  //box.innerHTML="new drag";
  box.src = "img/100.png";
  box.id = "hun" + id;

  hunids.push(id);

  $(".hundiv").append(box);
  box.classList.add("i100");

  $(function() {

    $(".i100").draggable();

    $(".i100").selectable();
  });
  $("#hun" + id).click(function() {
    $(this).toggleClass("ui-selected");
  });
  huncount++;
  $("#v100").html(huncount * 100);
  state.push('addHun');

}

function addTen() {
  var id = Math.floor(Math.random() * 100001);
  total = total + 10;
  var box = document.createElement("img");
  box.src = "img/101.png";
  box.id = "ten" + id;

  tenids.push(id);

  $(".tendiv").append(box);
  box.classList.add("i10");

  $(function() {

    $(".i10").draggable();

    $(".i10").selectable();
  });
  $("#ten" + id).click(function() {
    console.log("hell");
    $(this).toggleClass("ui-selected");
  });
  tencount++;

  $("#v10").html(tencount * 10);
  state.push('addTen');

}

function addOne() {
  var id = Math.floor(Math.random() * 100001);
  total = total + 1;
  var box = document.createElement("img");
  //box.innerHTML="new drag";
  box.src = "img/1.png";
  box.id = "one" + id;

  oneids.push(id);

  $(".onediv").append(box);
  box.classList.add("i1");

  $(function() {
    $(".i1").draggable();

    $(".i1").selectable();
  });
  $("#one" + id).click(function() {
    $(this).toggleClass("ui-selected");
  });
  onecount++;

  $("#v1").html(onecount);
  state.push('addOne');

}


var testAnswer = function() {
  if (currentNumber == enteredNumber) {
    $("#feedback").html("Correct! You are the best!!!");
    winAnimation();
  } else {
    var feedback = enteredNumber + ' does not equal ' + currentNumber;
    $("#feedback").html(feedback);
    speakWord(feedback);
  }
}
