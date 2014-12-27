Template.chats.helpers({
  userChat: function () {
    return arrayDataApi;
  },
  showDataSelection: function () {
    if(Session.get("selectedUser")){
      //27.12.2014 LFG find the object with selected id in the array of data
      loadMap(findIdInArray(Session.get("selectedUser")).latitude, findIdInArray(Session.get("selectedUser")).longitude);
    }
  },
  showUserAgent: function () {
    if(Session.get("selectedUser")){
      return getBrowser(findIdInArray(Session.get("selectedUser")).user_agent);
    }
  }
});

Template.chats.rendered = function () {
  
};

Template.chats.events({
  "click .show-pointer": function (event) {
    Session.set("selectedUser", event.currentTarget.attributes[1].value);
  }
});