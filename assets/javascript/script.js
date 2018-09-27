$(document).ready(function () {
  var topicsArray = ["Video Games", "Star Wars", "Dogs", "Cats"];

  topicsArray.forEach(function (element) {
    var topicButton = $("<button>");
    topicButton
      .attr({
        "type": "button",
        "data-topic": element
      })
      .addClass("btn btn-danger banner-btn mr-2 mb-2")
      .text(element);
    $("#button-banner").append(topicButton);
  })

  $("#search-btn").on("click", function (event) {
    event.preventDefault();

    var newTopic = $("#searchForm").val();
    console.log(newTopic);

    var topicButton = $("<button>");
    topicButton
      .attr({
        "type": "button",
        "data-topic": String(newTopic)
      })
      .addClass("btn btn-danger banner-btn mr-2 mb-2")
      .text(newTopic);

    $("#button-banner").append(topicButton);
  })

  $(document).on("click", ".banner-btn", function (event) {
    event.preventDefault();
    var topic = $(this).attr("data-topic");
    var apiKey = "NoCG0rlff62KODGBPvGAvfEHqizhX4wq"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=12&api_key=" + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      var gifData = response.data;
      $("#gif-container").empty();
      for (var i = 0; i < gifData.length; i++) {
        var gifDiv = $("<div>");
        var rating = gifData[i].rating.toUpperCase();
        var p = $("<p>").text("Rating: " + rating);
        var gif = $("<img>");
        gif
          .attr({
            "src": gifData[i].images.original_still.url,
            "data-active": gifData[i].images.original.url,
            "data-still": gifData[i].images.original_still.url,
            "data-state": "still"
          })
          .addClass("img-fluid img-thumbnail");
        gifDiv
          .addClass("col-4 my-auto")
          .append(p)
          .append(gif);
        $("#gif-container").append(gifDiv);
      }

      $(".img-thumbnail").on("click", function () {
        var gifState = $(this).attr("data-state");
        if (gifState === "still") {
          $(this).attr("src", $(this).attr("data-active"));
          $(this).attr("data-state", "active");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  });
});