const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");
const TweetCompose = require("./tweet_compose.js");

$( () => {
  $("button.follow-toggle").each((idx, el) => {
    let toggle = new FollowToggle(el);
  });

  $("nav.users-search").each((idx, el) => {
    let search = new UsersSearch(el);
  });

  $("form.tweet-compose").each((idx, el) => {
    let tweet = new TweetCompose(el);
  });
});
