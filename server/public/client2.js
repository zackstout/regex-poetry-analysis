
var allAuthors = [];

$(document).ready(function() {
  console.log('we in');

  $.ajax({
    type: "get",
    url: "/totals"
  }).done(function(res) {
    res.rows.forEach(function(row) {
      var author = {
        author: row.author,
        count: row.count,
      };
      allAuthors.push(author);
      // $('#list').append('<li>' + row.author + ' has ' + row.count + ' lines in the DB.');
    });
    console.log(allAuthors);
  });


  // Get list of all lines with given line number:
  $('#allLines').on('click', function() {
    $('#all-lines').empty();
    num = parseInt($('#lineNo').val());
    console.log(num);
    // $('#all-lines').append();


    $.ajax({
      type: "GET",
      url: "/lineNumber/" + num
    }).done(function(res) {
      console.log(res.rows);
      res.rows.forEach(function(r) {
        $('#all-lines').append('<p>' + r.line + '</p>');
      });

    }).catch(function(err) {
      console.log(err);
    });

  });


  // Takes a good 15 seconds to run this monster: // well not really...? 5 ish.
  $('#sub').on('click', function() {
    // var author = $('#author').val();

    // Don't forget to empty out old stuff:
    $('#list').empty();
    var term = $('#searchTerm').val();
    var count = 0;
    var lines = [];
    // console.log(term);
    $.ajax({
      type: "get",
      url: "/search/" + term
    }).done(function(res) {
      // console.log(res.rows);

      res.rows.forEach(function(auth) {
        var count = 0;
        // remember pg or something is messing up capitalization:
        var lines = auth.all_lines.split(',');
        lines.forEach(function(line) {
          var regex = new RegExp(term);
          if (regex.test(line)) {
            count ++;
          }
        });

        for (var i=0; i < allAuthors.length; i++) {
          if (allAuthors[i].author == auth.author) {
            allAuthors[i].wordcount = count;
          }
        }

      });
      console.log(allAuthors);

      allAuthors.forEach(function(auth) {
        $('#list').append('<li>' + auth.author + ' used the word "' + term + '" ' + auth.wordcount + ' times!<br> Out of ' + auth.count + ' lines of poetry, assuming an average of 8 words per line, that\'s a frequency of ' + 100 * auth.wordcount/(8 * parseInt(auth.count)) + '%!<br>');
      });

      // console.log("count: ", count, "lines: ", lines);
    }).catch(function(err) {
      console.log(err);
    });
  });
});
