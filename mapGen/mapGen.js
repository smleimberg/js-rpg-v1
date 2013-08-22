

function getFile(file){
    var box = 50;
    $.get(file,function(txt){
        var count = 0;
        var lines = txt.split("\n");
        for (var i = 0, len = lines.length; i < len; i++) {
            console.log(lines[i]);
            for(var j=0;j<lines[i].length;j++){
                $('#map').append('<div id="r'+i+'_c'+j+'" num="'+count+'"class="step space '+spaceName(lines[i][j])+'" data-x="'+(j*box)+'" data-y="'+(i*box)+'" data-scale="1">'+itemName(lines[i][j])+'</div>');
                count++;
            }
            $('#map').append('<br />');
        }
        
    }); 
}

function spaceName(space){
    switch(space){
        case 'g': return 'grass';
        case 'f': return 'fence';
        case 't': return 'grass dead';
        case 'b': return 'grass';
        default: return 'blank';
    }
}
function itemName(space){
    switch(space){
        case 't': return '<div class="item tree"></div>';
        case 'b': return '<div class="item box"></div>';
        default: return '';
    }
}