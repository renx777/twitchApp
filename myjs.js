$(document).ready(function () {



    var usernames = ["freecodecamp", "Hiko", "Krepo", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "cretetion", "OgamingSC2", "ESL_SC2", "brunofin"];

    var offliners = [];
    var onliners = [];

    console.log(usernames.length)
    $.each(usernames, function (index, value) {

        $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + value + "?callback=?", function (x) {



            console.log(x)

            var purl = x.logo;
            var idx = value;
            var ids = "s" + value;

            if (x.logo == null) {
                purl = "https://goo.gl/bKCtSo";
            }
            if (x.status == 422) {
                x.url = "";
                x.display_name = value;
                purl = "https://goo.gl/0xOVpk";
            }
            var j;



            $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + value + "?callback=?", function (c) {
                var j;
                if (c.status) {
                    j = "Account closed"
                }
                else if (c.stream == null && c.status != 422) {
                    j = "Offline"
                }
                else {

                    j = c.stream.game + ":" + c.stream.channel.status;

                }

                if (c.stream == null || c.stream == undefined) {
                    $('.all').append('<div class="container">' + '<div class="offliners">' + '<div class="row">' + '<div class="col-md-2 col-sm-12 col-xs-12">' + '<img src=' + purl + '></img>' + '</div>' + '<div class="col-md-4 col-sm-12 col-xs-12 ">' + '<a  data-toggle="toottip" title="Click to go to twitch stream channel" href=' + x.url + '>' + x.display_name + '</a>' + '</div>' + '<div class="col-md-6 col-sm-12 col-xs-12 ">' + '<span id>' + j + '</span>' + '</div></div></div>')
                }
                else {
                    $('.all').prepend('<div class="container">' + '<div class="onliners">' + '<div class="row">' + '<div class="col-md-2 col-sm-12 col-xs-12">' + '<img src=' + purl + '></img>' + '</div>' + '<div class="col-md-4 col-sm-12 col-xs-12 ">' + '<a  data-toggle="toottip" title="Click to go to twitch stream channel" href=' + x.url + '>' + x.display_name + '</a>' + '</div>' + '<div class="col-md-6 col-sm-12 col-xs-12 ">' + '<span id>' + j + '</span>' + '</div></div></div>')
                }


            });









        });



    });










    $('#on').on('click', function () {
        $('.offliners').hide()
        $('.onliners').show()

    })

    $('#off').on('click', function () {
        $('.offliners').show()
        $('.onliners').hide()
    })
    $('#all').on('click', function () {
        $('.onliners').show();
        $('.offliners').show();
    });

});

function growl(dxs) {
    var d = dxs;
    console.log(d);
    $.getJSON("https://api.twitch.tv/kraken/streams/" + d + ".json?callback=?", function (x) {
        console.log(x.stream);


    })
}
