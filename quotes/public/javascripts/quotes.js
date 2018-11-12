$(document).ready(function() {
    $("#postQuote").click(function(event) {
        event.preventDefault();
        var myobj = { Name: $("#name").val(), Quote: $("#quote").val() };
        jobj = JSON.stringify(myobj);
        // $("#json").text(jobj);

        var url = "quote";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html("Quote Posted!");
                $("#quotes").html("");
            }
        })
    });

    $("#getQuotes").click(function() {
        $("#done").html("All Quotes Being Shown!");
        $.getJSON('quote', function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var quote in data) {
                quo = data[quote];
                everything += "<li> Name: " + quo.Name + " <br/> Quote: " + quo.Quote + "</li>";
            }
            everything += "</ul>";
            $("#quotes").html(everything);
        })
    })

    $("#deleteQuotes").click(function() {
        $("#done").html("All Quotes have been deleted!");
        $("#quotes").html("");
        $.ajax({
            url: "quote",
            type: "DELETE",
            contentType: "application/json; charset=utf-8"
        })
    })

    $("#randomQuote").click(function() {
        $("#done").html("The inspired quote for you is...");
        $.getJSON('quote', function(data) {
            console.log(data);
            var everything = "<ul>";
            var random = Math.floor((Math.random() * data.length));
            quo = data[random];
            everything += "<li> Name: " + quo.Name + " <br/> Quote: " + quo.Quote + "</li>";
            everything += "</ul>";
            $("#quotes").html(everything);
        })
    })
});
