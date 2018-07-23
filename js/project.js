$(document).ready(function() {
  //doc ready begins

  $("#select-option").selectric();


  $("#select-option").on("change", function() {
    var selectedStory = $("#select-option").val();

    //var to avoid alerting .fail when empty option is selected from select menu
    var selectedStoryExists = false;
    if (!selectedStory == "") {
      selectedStoryExists = true;
    } else {
      selectedStoryExists = false;
    }

    //adding new class to style header layout once option is selected.
    $(".header-wrapper").addClass("header-changed");
    $(".footer-container").addClass("footer-changed");
    $(".news-section").empty();

    //url for api request
    var url =
      "https://api.nytimes.com/svc/topstories/v2/" + selectedStory + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "ce812b641d764fcb9e91d0f15205783d"
      });

    //Check if select option has a value, if so run ajax request
    if (selectedStoryExists == true) {
      $(".loader").show();

      //actual ajax request
      $.ajax({
        url: url,
        method: "GET"
      })
        .done(function(data) {
          //only display 12 news and must contain images
          var onlyImageResults = data.results
            .filter(function(result) {
              return result.multimedia.length;
            })
            .slice(0, 12);

          //run .each function appending required information
          $.each(onlyImageResults, function(key, value) {
            var html =
              "<a class='new-cell' target='_blank' href=" + value.url + ">";
            html +=
              "<div class='div-cell' style='background: url(" +
              value.multimedia[4].url +
              "); background-size: cover; background-position: center;'>";

            html += "<p class='abstract'>" + value.abstract + "</p>";

            html += "</div>";

            html += "</a>";

            $(".news-section").append(html);
          });
        })

        //alert message is ajax request fails
        .fail(function() {
          alert("Sorry, cannot retrieve data");
        })

        //always hide the loader gif after showing it
        .always(function() {
          $(".loader").hide();
        });
    }
  }); //#news-select change event end
}); //end of document.ready
