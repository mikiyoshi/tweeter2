/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const backupArr = [];
  const renderTweets = function (tweets) {
    console.log('TWEETS: ', tweets);
    if (backupArr.length === 1) {
      console.log('backup: ', backupArr[backupArr.length - 1]);
      for (let obj of tweets) {
        // console.log('OBJ: ', obj);
        // console.log('OBJ: ', obj.content.text);
        let tweet = createTweetElement(obj);
        // console.log('OBJ: ', tweet);
        $('.messageBox').append(tweet);
      }
    } else {
      console.log('backup else: ', backupArr[backupArr.length - 1][0]);
      const latestOne = [backupArr[backupArr.length - 1][0]];
      for (let obj of latestOne) {
        let tweet = createTweetElement(obj);
        $('.messageBox').prepend(tweet);
      }
    }
    // console.log('backup2: ', backupArr[0][0].content.text);
    // console.log('TWEETS: ', tweets);
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  };

  const createTweetElement = function (tweet) {
    // console.log('createTweet: ', tweet.content.text);
    // const backupArr = [];
    // if(tweet.content.text === )
    // return backupArr
    // console.log('createTweet: ', tweet.user.avatars);
    // console.log('timenumber: ', timeago.format(1461113959088));
    // console.log('time: ', tweet.created_at);
    let $tweet = $(`
          <div class="userCard">
            <div class="userCardBody">
              <div class="userCardHeader">
                <div class="userIcon">
                  <img src="${tweet.user.avatars}" />
                </div>
                <div class="userName">${tweet.user.name}</div>
                <div class="userId">${tweet.user.handle}</div>
              </div>
              <div class="userCardMain">
                <div class="userMessage">${escape(tweet.content.text)}</div>
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
  `); /* Your code for creating the tweet element */
    // ...
    return $tweet;
  };

  // renderTweets(data);

  const loadTweets = function () {
    // console.log($button);
    console.log('Button clicked, performing ajax call...');
    $.ajax('/tweets', { method: 'GET' }).then(function (jsonData) {
      const newOrder = jsonData.reverse();
      backupArr.push(newOrder);
      renderTweets(newOrder);
      // newData.push(jsonData);
      // console.log('jsonData', newOrder);
      // $button.replaceWith(morePostsHtml);
    });
  };
  // console.log('after Data', newData);

  $('form').submit(function (event) {
    event.preventDefault();
    // console.log('test test');
    const str = $('form').serialize();
    if ($('#tweet-text').val() === '') {
      $('label')
        .siblings('#resultPost')
        .addClass('alert')
        .text("You can't TWEET empty message")
        .show();
      // $('#resultPost').text("You can't TWEET empty message").show();
      // console.log(str);
    } else if ($('#tweet-text').val().length > 140) {
      $('label')
        .siblings('#resultPost')
        .addClass('alert')
        .text("You can't TWEET over 140 text message")
        .show();
    } else if ($('#tweet-text').val().length <= 140) {
      $('label')
        .siblings('#resultPost')
        .addClass('alert')
        .text('Please click TWEET button')
        .show();
      // console.log($('#tweet-text').val().length);
      $('#tweet-text').val('');
    }
    // console.log(str);

    $.post(
      '/tweets', // url
      str // data to be submit
    ).then(function () {
      console.log('all the load function', str);
      loadTweets(str);
    });
  });

  // $.ajax({
  //   url: url,
  //   method: 'GET',
  // })
  //   .done((result) => {
  //     console.log(result);
  //   })
  //   .fail((error) => {
  //     console.log(`Error: ${error.message}`);
  //   })
  //   .always(() => {
  //     console.log('request to TV Maze done');
  //   });
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
