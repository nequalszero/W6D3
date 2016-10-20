/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__(1);
	const UsersSearch = __webpack_require__(3);
	const TweetCompose = __webpack_require__(4);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class FollowToggle {
	  constructor(el, options) {
	    this.$el = $(el);
	    this.userId = this.$el.data("user-id") || options.userId;
	    this.followState = (this.$el.data("initial-follow-state") || options.followState);
	
	    this.render();
	    this.$el.on("click", e => this.handleClick(e));
	    }
	
	  render() {
	    if (this.followState === "followed") {
	      this.$el.text("Unfollow!");
	      this.$el.prop("disabled", false);
	    } else if (this.followState === "unfollowed") {
	      this.$el.text("Follow!");
	      this.$el.prop("disabled", false);
	    } else if (this.followState === "following") {
	      this.$el.text("Following...");
	      this.$el.prop("disabled", true);
	    } else if (this.followState === "unfollowing") {
	      this.$el.text("Unfollowing...");
	      this.$el.prop("disabled", true);
	    }
	  }
	
	  handleClick(e) {
	    e.preventDefault();
	
	    if (this.followState === "unfollowed") {
	      this.followState = "following";
	      this.render();
	
	      $.ajax({
	        method: "POST",
	        url: `/users/${this.userId}/follow.json`,
	        success: () => {
	          this.followState = "followed";
	          this.render();
	        }
	      });
	    } else {
	      this.followState = "unfollowing";
	      this.render();
	
	      $.ajax({
	        method: "DELETE",
	        url: `/users/${this.userId}/follow.json`,
	        success: () => {
	          this.followState = "unfollowed";
	          this.render();
	        }
	      });
	    }
	  }
	}
	
	module.exports = FollowToggle;


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const FollowToggle = __webpack_require__ (1);
	
	class UsersSearch {
	  constructor(el) {
	    this.$el = $(el);
	    this.input = this.$el.find("input");
	    this.result = this.$el.find(".users");
	
	    this.input.on("keyup", e => this.handleInput(e));
	  }
	
	  handleInput(e) {
	    $.ajax({
	      method: "GET",
	      url: "/users/search",
	      dataType: "json",
	      data: {
	        query: this.input.val()
	      },
	      success: (users) => {
	        this.renderResults(users);
	      }
	    });
	  }
	
	  renderResults(users) {
	    this.result.empty();
	
	    users.forEach( (user) => {
	      let $li = $("<li>");
	
	      let $user = $(`<a href="/users/${user.id}">${user.username}</a>`);
	      $li.append($user);
	
	      let followed = user.followed ? "followed" : "unfollowed";
	
	      let options = {
	        userId: user.id,
	        followState: followed
	      };
	      let $buttonEl = $("<button>");
	      let button = new FollowToggle($buttonEl[0], options);
	      $user.after($buttonEl);
	
	      this.result.append($li);
	    });
	  }
	}
	
	module.exports = UsersSearch;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class TweetCompose {
	  constructor(el) {
	    this.$el = $(el);
	
	    this.$el.on("submit", e => this.submit(e));
	  }
	
	  submit(e) {
	    e.preventDefault();
	
	    let newTweet = this.$el.serializeJSON();
	
	    $.ajax({
	      method: "POST",
	      url: "/tweets",
	      dataType: "json",
	      data: newTweet,
	      success: (tweet) => {
	        this.renderResults(tweet);
	      }
	    });
	  }
	
	  renderResults(tweet) {
	
	  }
	
	}
	
	
	module.exports = TweetCompose;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map