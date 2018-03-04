
var count = 0;


$(document).ready(function() {

  $('#sub').on('click', function() {
    var author = $('#author').val();
    $.ajax({
      type: "get",
      // url: "http://poetrydb.org/author,title/Shakespeare;Sonnet"
      url: "http://poetrydb.org/author/" + author
    }).done(function(data) {
      console.log(data);
      count = 0;

      // This works as intended:
      data.forEach(function(poem) {
        poem.lines.forEach(function(line) {
          var regex = /[lL]ove/g;
          if ( regex.test(line) ) {
          // if (line.includes('love') || line.includes('Love')) {
            count ++;
          }
        });
      });
      console.log(count);



    }).catch(function(err) {
      console.log(err);
    });
  });


});
