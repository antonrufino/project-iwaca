$(document).ready(() => {
    $('input[type=file]').change(() => {
        let f = document.getElementById('file').files[0],
        r = new FileReader();
        r.onloadend = function(e){
            $('#la').val(e.target.result);
            $('#la').triggerHandler('change');
            $('input[type=file]').val('');
        }
        r.readAsBinaryString(f);
    });
});
