
var hard ={
    "gameStart":false,
    "movement":50,
    "fog":false
}
var hero ={
    "id":"#token",
    "page":"/rpg/index.html",
    "space_id":"#r5_c11",
    "facing":"s",
    "foot":'l'
};

$.cookie.json = true;
if($.cookie('sml_rpg')){
    hero = $.cookie('sml_rpg');
    url = document.URL.replace(location.protocol + '//' + location.host,'').split('#')[0];
    if(url != hero.page){
        window.location = hero.page;
    }
}else{
    $.cookie('sml_rpg',hero,{expires:365});
}

var animation = 200;

if(hard.fog){
    $('.space').addClass('hidden');
    hide(10);
}
impress().goto(hero.space_id.replace('#',''));
$(hero.space_id).append('<div id="'+hero.id.replace("#","")+'" class="'+hero.facing+'"></div>');
$(window).load(function() {
    $('#loading').animate({'opacity':0},1000,function(){
        hard.gameStart=true;
        $(this).addClass('done');
    });
});

function hide(radius){
    if(hard.fog){
        $('.space').addClass('hidden');
        var currentId = hero.space_id;
        var currentSpace = currentId.split("_");
        var row=parseInt(currentSpace[0].replace('#r', ''), 10);
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

function get_next_space(character,key){
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

function use(character){
    var nextId = get_next_space(character,character.facing);
    if($(nextId+" .item").length > 0){
        alert('ITEM!');
    }
}

function move(character,key){
    var nextId = get_next_space(character,key);
    if($(nextId).length > 0 && !$(nextId).hasClass('dead') && !$('#token').hasClass('moving') && hard.gameStart==true) {
        impress().goto(nextId.replace('#',''));
        character.space_id=nextId;
        $.cookie('sml_rpg',character,{expires:365});
        character.foot= (character.foot == 'r' ? 'l' : 'r');
        character.facing = key;
        
        placeToken(character);
        hide(10);
    }
    if($(nextId).hasClass('dead')){
        $(character.id).appendTo(character.space_id).removeAttr('class').addClass(key);
    }
}

function placeToken(character){
    if(!$(character.id).hasClass('moving') && hard.gameStart==true){
        $(character.id).removeAttr('class').addClass('moving').addClass(character.facing+''+character.foot);
        switch(character.facing){
            case 'n':
                $(character.id).stop().animate({"top": "-="+hard.movement+"px"}, animation, function(){
                    $(this).appendTo(character.space_id).removeAttr('class').removeAttr('style').addClass(character.facing);
                });
                break;
            case 'w':
                $(character.id).stop().animate({"left": "-="+hard.movement+"px"}, animation,function(){
                    $(this).appendTo(character.space_id).removeAttr('class').removeAttr('style').addClass(character.facing);
                });
                break;
            case 's':
                $(character.id).appendTo(character.space_id).css('top','-='+hard.movement+'px');
                $("#token").stop().animate({"top": "+="+hard.movement+"px"}, animation,function(){
                    $(this).removeAttr('class').addClass(character.facing);
                });
                break;
            case 'e':
                $(character.id).appendTo(character.space_id).css('left','-='+hard.movement+'px');
                $(character.id).stop().animate({"left": "+="+hard.movement+"px"}, animation,function(){
                    $(this).removeAttr('class').addClass(character.facing);
                });
                break;
            default:;
        }
        if($(character.space_id+' .step-event').length > 0){
            var classList =$(character.space_id+' .step-event').attr('class').split(/\s+/);
            $.each( classList, function(index, item){
                if (item == 'portal') {
                    character.page=$(character.space_id+' .step-event.'+item).data('url');
                    character.space_id=$(character.space_id+' .step-event.'+item).data('portal-id');
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
        move(hero,'w');
        break;
    case 68: //d=right
        move(hero,'e');
        break;
    case 81: //q=
        
        break;
    case 69: //e=
        use(hero);
        break;
    case 83: //s=down
        move(hero,'s');
        break;
    case 87: //w=up
        move(hero,'n');
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




