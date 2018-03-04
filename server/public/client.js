
// var count = 0;

$(document).ready(function() {
  var authors = [];

  // Get authors:
  $.ajax({
    type: 'get',
    url: "http://poetrydb.org/authors"
  }).done(function(data) {
    // console.log(data);
    data.authors.forEach(function(auth) {
      var author = auth.slice(auth.lastIndexOf(' ') + 1);
      authors.push(author);
    });
    // console.log(authors);

    var author, count;
    authors.forEach(function(auth) {
      $.ajax({
        type: 'get',
        url: "http://poetrydb.org/author/" + auth
      }).done(function(res) {
        // console.log(res);
        res.forEach(function(poem) {
          // console.log(poem);

          $.ajax({
            type: "POST",
            url: "/poems",
            data: poem
          });
          count = 0;
          lines = [];
          author = poem.author;
          poem.lines.forEach(function(line) {
            var regex = new RegExp(/man/);
            // console.log(regex);
            if ( regex.test(line) ) {
            // if (line.includes('the') || line.includes('The')) {
              count ++;
              lines.push(line);
            }
          });
        });
        // console.log(author, count);
        $('#list').append('<li> Author: ' + author + ' <br>Count: ' + count + '<br>Lines: ' + lines + '</li>');
      }).catch(function(err) {
        console.log(err);
      });
    });
  }).catch(function(err) {
    console.log(err);
  });

  // Get number of a given word in that author's works:
  $('#sub').on('click', function() {
    var author = $('#author').val();
    var term = $('#searchTerm').val();

    $.ajax({
      type: "get",
      // url: "http://poetrydb.org/author,title/Shakespeare;Sonnet"
      url: "http://poetrydb.org/author/" + author
    }).done(function(data) {
      console.log(data);
      count = 0;
      // console.log(term);

      // This works as intended:
      data.forEach(function(poem) {
        poem.lines.forEach(function(line) {
          // var regex = /[lL]ove/g;
          // var regex = / + term + /g;
          var regex = new RegExp(term);
          // console.log(regex);
          if ( regex.test(line) ) {
          // if (line.includes('love') || line.includes('Love')) {
            count ++;
          }
        });
      });
      console.log(count);
      $('#search').text(term);
      $('#count').text(count);

    }).catch(function(err) {
      console.log(err);
    });
  });


});
