$(document).ready(() => {
    $('input[type=file]').change(() => {
        console.log("tezr")

        let f = document.getElementById('file').files[0],
        r = new FileReader();
        r.onloadend = function(e){
            $('#la').html(e.target.result);
            $('#la').triggerHandler('input');
        }
        r.readAsBinaryString(f);
    });
});
