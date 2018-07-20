$(document).ready(function() {


  $("#select-option").on("change", function() {
    var selectedStory = $("#select-option").val();
    $(".loader").show();
    $('.page-cntr').addClass('header-changed');
    $(".news-section").empty();

    //url for api request
    var url =
      "https://api.nytimes.com/svc/topstories/v2/" + selectedStory + ".json";
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
        var onlyImageResults = data.results
          .filter(function(result) {
            return result.multimedia.length;
          })
          .slice(0, 12);

        $.each(onlyImageResults, function(key, value) {
          var html = "<div class='new-cell'>";

          html += "<a target='_blank' href=" + value.url + ">";

          html += "<img class='news-img' src=" + value.multimedia[4].url + ">";

          html += "<p class='abstract'>" + value.abstract + "</p>" + "</a>";

          html += "</div>";

          $(".news-section").append(html);
        });
      })
      .fail(function() {
        alert("Sorry, cannot retrieve data");
      })
      .always(function() {
        $(".loader").hide();
      });

      
  }); //#news-select change event
}); //end of document.ready
