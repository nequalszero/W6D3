const FollowToggle = require("./follow_toggle.js");

$( () => {
  $("button.follow-toggle").each((idx, el) => {
    let toggle = new FollowToggle(el);
  });

});
