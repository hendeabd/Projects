var sillyName
var sillyWord
var verb
var noun
var bodyPart
var femaleName
var verb_ed
var plural_noun
var occupation
var number

function getInfo(){
    sillyName =$("#sillyName").val();
    sillyWord =$("#sillyWord").val();
    verb =$("#verb").val();
    noun =$("#noun").val();
    bodyPart =$("#bodyPart").val();
    femaleName =$("#femaleName").val();
    verb_ed =$("#verb_ed").val();
    plural_noun =$("#plural_noun").val();
    occupation =$("#occupation").val();
    number =$("#number").val();
}
function showInfo(){
    getInfo();
    var message = "Dear Mr. and Mrs." + sillyName + sillyWord + ", Will you let me" + verb + "your" + noun + "? Ever scince I have laid" + bodyPart + "on" + femaleName + ", I have" + verb_ed + ",adly in love with her. I wish that she will be the" + noun + "of my" + plural_noun + "and that someday we will" + verb + "happily ever after. I have a" + noun + "as a/an" + occupation + "that pays" + number + "each month. I promise to" + verb + + femaleName + "with kindness and respect."
}