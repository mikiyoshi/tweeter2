/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: 'Newton',
        avatars: 'https://i.imgur.com/73hZDYK.png',
        handle: '@SirIsaac',
      },
      content: {
        text: 'If I have seen further it is by standing on the shoulders of giants',
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: 'Descartes',
        avatars: 'https://i.imgur.com/nlhLi3I.png',
        handle: '@rd',
      },
      content: {
        text: 'Je pense , donc je suis',
      },
      created_at: 1461113959088,
    },
  ];
  // const $tweet = timeago.format(1639419790688);
  // console.log('client.js: ', $tweet);
  const renderTweets = function (tweets) {
    // loops through tweets
    for (let obj of tweets) {
      let tweet = createTweetElement(obj);
      $('.new-tweet').append(tweet);
      console.log('OBJ: ', tweet);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };

  const createTweetElement = function (tweet) {
    // console.log('timenumber: ', timeago.format(1461113959088));
    // console.log('time: ', tweet.created_at);
    let $tweet = $(`
  <article class="messageBox">
          <div class="userCard">
            <div class="userCardBody">
              <div class="userCardHeader">
                <div class="userIcon">
                  <img style="width: 50px" src="${tweet.user.avatars}" />
                </div>
                <div class="userName">${tweet.user.name}</div>
                <div class="userId">${tweet.user.handle}</div>
              </div>
              <div class="userCardMain">
                <div class="userMessage">${tweet.content.text}</div>
              </div>
              <div class="userCardFooter">
                <div class="userDate">
                  <span class="userDays">${timeago.format(
                    tweet.created_at
                  )}</span>
                </div>
                <div class="userSocial">
                  <ul>
                    <li>
                      <a class="flag" href="#"><i class="fas fa-flag"></i></a>
                    </li>
                    <li>
                      <a class="retweet" href="#"><i class="fas fa-retweet"></i></a>
                    </li>
                    <li>
                      <a class="heart" href="#"><i class="fas fa-heart"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
  `); /* Your code for creating the tweet element */
    // ...
    return $tweet;
  };

  renderTweets(data);

  $('#newTweet').submit(function (event) {
    const str = $('#newTweet').serialize();
    if ($('#tweet-text').val() === '') {
      $('#resultPost').text('Not valid!').show().fadeOut(1000);
      console.log(str);
      return;
    }
    $('#resultPost').text(str).show().fadeOut(1000);
    console.log(str);

    $.ajax(
      '/tweets', // url
      { method: 'POST', data: $(this).serialize() } // data to be submit
    ).then(function () {
      console.log('you are successful', str);
    });
    event.preventDefault();
  });
  //
  // social button on / off
  //
  let socialBtns = ['flag', 'retweet', 'heart'];
  for (socialBtn of socialBtns) {
    $(`.${socialBtn}`).on('click', function (event) {
      $(this).toggleClass('active');
    });
  }
});
