//global

//generates random id;
// let guid = () => {
//     let s4 = () => {
//         return Math.floor((1 + Math.random()) * 0x10000)
//             .toString(16)
//             .substring(1);
//     }
//     //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
//     return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
// }

// var user = guid()
// var answer = []

function scrollToEnd(){
    if ($('#consent')[0].scrollHeight <= $('#consent')[0].scrollTop + $('#consent').height() + 100) {
        return true;
    }
    else
        return false;
}


function showContent(id){
    $(id).show(100)
}

function hideContent(id){
    $(id).hide(100)
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function flipImg(id, count){
    //show next
    var start = $(id).attr("src").split('img/')[1].split('.')[0]
    var index = start.split('-')[2]
    if(index<count){
        $(id).attr('src', 'img/'+ start.split('-')[0] + '-' +start.split('-')[1] + '-' + (parseInt(index)+1) +'.jpg');
    }else{
        $(id).attr('src', 'img/'+ start.split('-')[0] + '-' +start.split('-')[1] + '-' + 1 +'.jpg');
    }
}


function goNext(id){
    //check requried field
    $('#question-'+id).hide(0);
    $('#question-'+(id+1)).show(0);
}


