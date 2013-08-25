
var hard ={
    "gameStart":false
}
var character ={
    "page":"index.html",
    "id":"#r5_c11",
    "space":111,
    "facing":"s",
    "foot":1
};

var animation = 200;

impress().goto(character.space);
placeToken(character.id,character.facing);
$(document).ready(function() {
    $('#loading').animate({'opacity':0},1000,function(){
        hard.gameStart=true;  
    });
});

function move(key){
    var foot='';
    var direction='';
    var step=false;
    var currentId = $('.active').attr('id');
    var currentSpace = currentId.split("_");
    var row=parseInt(currentSpace[0].replace('r', ''), 10);
    var col=parseInt(currentSpace[1].replace('c', ''), 10);
    var nextId='';
    var next_col=0;
    var next_row=0;
    if(key=='w'){
        next_row=row-1;
        nextId = "#r"+next_row+"_c"+col;
        direction='n';
    }
    if(key=='a'){
        next_col=col-1;
        nextId = "#r"+row+"_c"+next_col;
        direction='w';
    }
    if(key=='s'){
        next_row=row+1;
        nextId = "#r"+next_row+"_c"+col;
        direction='s';
    }
    if(key=='d'){
        next_col=col+1;
        nextId = "#r"+row+"_c"+next_col;
        direction='e';
    }
    if(direction==character.facing){
        if($(nextId).length > 0 && !$(nextId).hasClass('dead')) {
            var nextSpace=parseInt($(nextId).attr('num'), 10);
            impress().goto(nextSpace);
            character.id=nextId;
            character.space=nextSpace;
            step=true;
            character.foot=character.foot*-1;
            if(character.foot==-1){
                foot='l';
            }else{
                foot='r';
            }
            //hide(1,next_row,next_col);
        }else{
            step=false;
        }
    }else{
        character.facing=direction;
    }
    placeToken(character.id,character.facing,step,foot);
}
/*
function hide(radius){
    var currentId = $('.active').attr('id');
    var currentSpace = currentId.split("_");
    var row=parseInt(currentSpace[0].replace('r', ''), 10);
    var col=parseInt(currentSpace[1].replace('c', ''), 10);
    console.log('start');
    if(radius<1){
        radius=1;
    }
    console.log('r='+row+' c='+col);
    for(var i=(row-radius);i<(row+radius+1);i++){
        for(var j=(col-radius);j<(col+radius+1);j++){
            console.log('#r'+i+'_c'+j);
            $('#r'+i+'_c'+j).removeClass('hidden');
        }
    }
}
*/

function placeToken(id,dir,step,foot){
    if(step){
        switch(dir){
            case 'n':
                $("#token").removeClass(dir).addClass(dir+foot);
                $("#token").stop().animate({"top": "-=50px"}, animation, function(){
                    $(this).appendTo(id).removeAttr('class').removeAttr('style').addClass(dir);
                });
                break;
            case 'w':
                $("#token").removeClass(dir).addClass(dir+foot);
                $("#token").stop().animate({"left": "-=50px"}, animation,function(){
                    $(this).appendTo(id).removeAttr('class').removeAttr('style').addClass(dir);
                });
                break;
            case 's':
                $("#token").appendTo(id).removeAttr('class').addClass('moving').addClass(dir+foot).css('top','-=50px');
                $("#token").stop().animate({"top": "+=50px"}, animation,function(){
                    $(this).removeAttr('class').addClass(dir);
                });
                break;
            case 'e':
                $("#token").appendTo(id).removeAttr('class').addClass('moving').addClass(dir+foot).css('left','-=50px');
                $("#token").stop().animate({"left": "+=50px"}, animation,function(){
                    $(this).removeAttr('class').addClass(dir);
                });
                break;
            default:;
        }
    }else{
        $('#token').remove();
        $(id).append('<div id="token" class="'+dir+'"></div>');
    }
}

$(window).keydown(function(e) {
    //81=q 87=w e=69 r=82 a=65 s=83 d=68
    if(!$('#token').hasClass('moving') && hard.gameStart==true){
        $('#token').addClass('moving');
        switch(e.keyCode){
        case 65: //a=left
            move('a');
            break;
        case 68: //d=right
            move('d');
            break;
        case 81: //q=
            
            break;
        case 69: //e=

            break;
        case 83: //s=down
            move('s');
            break;
        case 87: //w=up
            move('w');
            break;
        default:
        }
    }
});


var popupWindow = null;
function centeredPopup(url,winName,w,h,scroll){
    LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
    TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
    settings ='height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll
    popupWindow = window.open(url,winName,settings)
}




