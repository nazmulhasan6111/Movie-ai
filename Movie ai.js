 // Requiring module
var reques = require('requests')
var TelegramBot = require('node-telegram-bot-api')
token = "6746203213:AAFIYINKd2jRBK4ixD5429fAXFRtxki40LU"
movieapi = "http://www.omdbapi.com/?i=tt3896198&apikey=c9827a3c"
// Create a bot that uses 'polling' 
// to fetch new updates
var bot = new TelegramBot(token, { polling: true });
bot.on("polling_error", (err) => console.log(err));
bot.onText(/\/movie (.+)/, function (msg, match) {
    // The 'msg' is the received Message from
    // user and 'match' is the result of 
    // execution above on the text content
    // Getting the name of movie from the 
    // message sent to bot
    var movie = match[1];
    var chatId = msg.chat.id
    reques('http://www.omdbapi.com/?t=' 
        + movie + '&apikey=movieapi',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                bot.sendMessage(chatId, 
                    '_Looking for_ ' + movie + '...', 
                    { parse_mode: "Markdown" }).then(msg) {
                    res = JSON.parse(body)
                    bot.sendPhoto(chatId, res.Poster, {
                        caption: 'Result:\nTitle: ' 
                            + res.Title + '\nGenre: ' 
                            + res.Genre + '\nRated: ' 
                            + res.Rated + '  \nReleased: ' 
                            + res.Released
                    })
                    // Sending back response from the 
                    // bot to the user 
                    // Response has many other details, 
                    // which can be used or sent as per 
                    // requirement
                }
            }
        })
})
