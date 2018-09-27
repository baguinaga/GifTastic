$(document).ready(function () {
  var topicsArray = ["Star Wars", "Dogs", "Cats", "Video Games"];

  topicsArray.forEach(function (element) {
    var topicButton = $("<button>");
    topicButton
      .attr({
        "type": "button",
        "data-topic": element
      })
      .addClass("btn btn-danger mx-2")
      .text(element);
    console.log(topicButton);
    $("#button-banner").append(topicButton);
  })

  $("button").on("click", function (event) {
    event.preventDefault();

    var topic = $(this).attr("data-topic");
    var apiKey = "NoCG0rlff62KODGBPvGAvfEHqizhX4wq"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=12&api_key=" + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      var gifData = response.data;
      console.log(gifData);
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
          .addClass("col-4")
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