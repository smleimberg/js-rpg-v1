
var hard ={
    "gameStart":false,
    "fog":false
}
var character ={
    "id":"#token",
    "page":"game.html",
    "space_id":"#r5_c11",
    "space_number":111,
    "facing":"s",
    "foot":'l'
};

$.cookie.json = true;
if($.cookie('sml_rpg')){
    character = $.cookie('sml_rpg');
}else{
    $.cookie('sml_rpg',character,{expires:365});
}

var animation = 200;

if(hard.fog){
    $('.space').addClass('hidden');
    hide(2);
}
impress().goto(character.space_number);
$(character.space_id).append('<div id="token" class="'+character.facing+'"></div>');
$(document).ready(function() {
    $('#loading').animate({'opacity':0},1000,function(){
        hard.gameStart=true;
        $(this).addClass('done');
    });
});

function hide(radius){
    if(hard.fog){
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
}

function get_next_space(key){
    var nextId='';
    var next_col=0;
    var next_row=0;
    var currentSpace = character.space_id.split("_");
    var row=parseInt(currentSpace[0].replace('#r', ''), 10);
    var col=parseInt(currentSpace[1].replace('c', ''), 10);
    if(key=='n'){
        next_row=row-1;
        nextId = "#r"+next_row+"_c"+col;
    }
    if(key=='w'){
        next_col=col-1;
        nextId = "#r"+row+"_c"+next_col;
    }
    if(key=='s'){
        next_row=row+1;
        nextId = "#r"+next_row+"_c"+col;
    }
    if(key=='e'){
        next_col=col+1;
        nextId = "#r"+row+"_c"+next_col;
    }
    return nextId;
}

function use(key){
    var nextId = get_next_space(key);
    if($(nextId+" .item").length > 0){
        alert('ITEM!');
    }
}

function move(key){
    nextId = get_next_space(key);
    if($(nextId).length > 0 && !$(nextId).hasClass('dead') && !$('#token').hasClass('moving') && hard.gameStart==true) {
        var nextSpace=parseInt($(nextId).attr('num'), 10);
        impress().goto(nextSpace);
        character.space_id=nextId;
        character.space_number=nextSpace;
        $.cookie('sml_rpg',character,{expires:365});
        character.foot= (character.foot == 'r' ? 'l' : 'r');
        character.facing = key;
        placeToken(character.space_id,character.facing,character.foot);
    }
    if($(nextId).hasClass('dead')){
        $('#token').appendTo(character.space_id).removeAttr('class').addClass(key);
    }
}

function placeToken(id,dir,foot){
    if(!$('#token').hasClass('moving') && hard.gameStart==true){
        $('#token').removeAttr('class').addClass('moving').addClass(dir+foot);
        switch(dir){
            case 'n':
                $("#token").stop().animate({"top": "-=50px"}, animation, function(){
                    $(this).appendTo(id).removeAttr('class').removeAttr('style').addClass(dir);
                });
                break;
            case 'w':
                $("#token").stop().animate({"left": "-=50px"}, animation,function(){
                    $(this).appendTo(id).removeAttr('class').removeAttr('style').addClass(dir);
                });
                break;
            case 's':
                $("#token").appendTo(id).css('top','-=50px');
                $("#token").stop().animate({"top": "+=50px"}, animation,function(){
                    $(this).removeAttr('class').addClass(dir);
                });
                break;
            case 'e':
                $("#token").appendTo(id).css('left','-=50px');
                $("#token").stop().animate({"left": "+=50px"}, animation,function(){
                    $(this).removeAttr('class').addClass(dir);
                });
                break;
            default:;
        }
        if($(id+' .step-event').length > 0){
            var classList =$(id+' .step-event').attr('class').split(/\s+/);
            $.each( classList, function(index, item){
                if (item === 'portal') {
                    character.space_id=$(id+' .step-event.'+item).data('portal-id');
                    character.space_number=$(id+' .step-event.'+item).data('portal-number');
                    character.page=$(id+' .step-event.'+item).data('url');
                    $.cookie('sml_rpg',character,{expires:365});
                    console.log($.cookie('sml_rpg'));
                    window.location = character.page;
                }
            });
        }
    }
}

$(window).keydown(function(e) {
    //81=q 87=w e=69 r=82 a=65 s=83 d=68
    switch(e.keyCode){
    case 65: //a=left
        move('w');
        break;
    case 68: //d=right
        move('e');
        break;
    case 81: //q=
        
        break;
    case 69: //e=
        use(character.facing);
        break;
    case 83: //s=down
        move('s');
        break;
    case 87: //w=up
        move('n');
        break;
    default:
    }
});


var popupWindow = null;
function centeredPopup(url,winName,w,h,scroll){
    LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
    TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
    settings ='height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll
    popupWindow = window.open(url,winName,settings)
}




