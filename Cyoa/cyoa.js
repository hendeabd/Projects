$(document).ready(function(){

    updateNarrative(N1)
    $("footer").html(createButton("button1", O1) + createButton("button2", O2) + createButton("button3", "not used"));
    $("button3").hide();

    $("button1").click(function(){

        if($("button1").text() === O1){
            updateNarrative(N2);
            updateButtons(O4, O5);
            $("#button3").show();
        }
    })
})

var N1 = "The boy went back to his school after dark to get his..."
var N2 = "While walking down a hall he started to feel like he was being followed by ..."
var N3 = "After getting his wallet he was suddenly approached by ..."
var N4 = ""
var N5 = ""
var N6 = ""
var N7 = ""
var N8 = ""
var N9 = ""
var N10 = ""
var O1 = "phone"
var O2 = "wallet"
var O3 = "charger"
var O4 = "a demon"
var O5 = "a ghost"
var O6 = ""
var O7 = ""