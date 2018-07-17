$(document).ready(function() {

    var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    url += '?' + $.param({
      'api-key': "ce812b641d764fcb9e91d0f15205783d"
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);
    }).fail(function(err) {
      throw err;
    });

    console.jog("hello");


});
