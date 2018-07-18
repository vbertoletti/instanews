$(document).ready(function() {


  $("#news-select").on("change", function() {


    var selectedStory = $("#news-select").val();
    console.log($("#news-select").val());

    $(".news-section").empty();
    
    
    //url for api request
    var url = "https://api.nytimes.com/svc/topstories/v2/" + selectedStory + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "ce812b641d764fcb9e91d0f15205783d"
      });

    //actual ajax request
    $.ajax({
      url: url,
      method: "GET"
    })
      .done(function(data) {
        console.log(data.results);

        $.each(data.results, function(key, value){
          var html = "<div class='new-cell'>";
          html += "<a target='_blank' href=" + value.url + ">";
          html += "<img class='news-img' src=" + value.multimedia[4].url + ">";
          html += "<p>" + value.abstract + "</p>" + "</a>";
          html += "</div>";


         $(".news-section").append(html);


        }  );

        var resultsArray = data.results;
        //data just represents the returned object

        //try using .each to loop through the data and check out the array in data called results and append the outpout to your html
      })
      .fail(function(err) {
          // console.log(url);

      })
      .always(function(){

        //remove loading gif 


      });









  }); //#news-select change event
}); //end of document.ready
