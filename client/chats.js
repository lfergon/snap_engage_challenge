Template.chats.helpers({
  userChat: function () {
    return arrayDataApi;
  },
  showDataSelection: function () {
    if(Session.get("dataChat")){
      //27.12.2014 LFG find the object with selected id in the array of data
      loadMap(Session.get("dataChat").latitude, Session.get("dataChat").longitude);
    }
  },
  showUserAgent: function () {
    if(Session.get("dataChat")){
      return getBrowser(Session.get("dataChat").user_agent);
    }
  },
  showChatHistory: function () {
    if(Session.get("dataChat")){
      return Session.get("dataChat").transcript;
    }
  },
  showChatInfo: function () {
    if(Session.get("dataChat")){
      return Session.get("dataChat");
    }
  },
  adminEngage: function (alias) {
    return alias==='' ? false:true;
  }
});

Template.chats.rendered = function () {
  
};

Template.chats.events({
  "click .show-pointer": function (event) {
    Session.set("selectedUser", event.currentTarget.attributes[1].value);
    Session.set("dataChat", findIdInArray(Session.get("selectedUser")));
  }
});