const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");

$( () => {
  $("button.follow-toggle").each((idx, el) => {
    let toggle = new FollowToggle(el);
  });

  $("nav.users-search").each((idx, el) => {
    let search = new UsersSearch(el);
  });
});
