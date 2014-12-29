//28.12.2014 LFG Session default value for order the chats by date
Session.set("sortDirection", 1);
Session.set("sortDirectionOffline", 1);
Template.chats.helpers({
  chatSelected: function () {
    return Session.get("selectedUser") ? true:false;
  },
  userChat: function () {
    var dataChats = [];
    arrayDataApi.forEach(function (chatInfo) {
      if(chatInfo.type==='chat'){
        dataChats.push({id: chatInfo.id, created_at: chatInfo.created_at }); 
      }
    });
    var sortedObjs = _.sortBy(dataChats, "created_at");
    if(Session.get("sortDirection")===-1){
      return sortedObjs.reverse();
    }
    if(Session.get("sortDirection")===1){
      return sortedObjs;
    }
  },
  userOffline: function () {
    var dataChats = [];
    arrayDataApi.forEach(function (chatInfo) {
      if(chatInfo.type==='offline'){
        dataChats.push({id: chatInfo.id, created_at: chatInfo.created_at }); 
      }
    });
    var sortedObjs = _.sortBy(dataChats, "created_at");
    if(Session.get("sortDirection")===-1){
      return sortedObjs.reverse();
    }
    if(Session.get("sortDirection")===1){
      return sortedObjs;
    }
  },
  showDataSelection: function () {
    if(Session.get("dataChat")){
      //27.12.2014 LFG find the object with selected id in the array of data
      Meteor.setTimeout(function () {
        loadMap(Session.get("dataChat").latitude, Session.get("dataChat").longitude);
      }, 50);
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
  description: function () {
    if(Session.get("dataChat")){
      return Session.get("dataChat");
    }
  },
  adminEngage: function (alias) {
    return alias==="" ? false:true;
  },
  isThisColumnSortedUp: function() {
    if(Session.get("sortDirection")===-1){
      return true;
    }
    if(Session.get("sortDirection")===1){
      return false;
    }
  },
  isThisColumnSortedUpOffline: function() {
    if(Session.get("sortDirectionOffline")===-1){
      return true;
    }
    if(Session.get("sortDirectionOffline")===1){
      return false;
    }
  }
});

Template.chats.rendered = function () {
  if(Session.get("selectedUser")){
    $("a[value={session}]".supplant({session: Session.get("selectedUser")})).css("background-color", "#aaa");
  }
};

Template.chats.events({
  "click .show-pointer": function (event, template) {
    Session.set("selectedUser", event.currentTarget.attributes[1].value);
    Session.set("dataChat", findIdInArray(Session.get("selectedUser")));
    template.$('.show-pointer').css("background-color", "");
    template.$('.show-pointer-offline').css("background-color", "");
    $( "a[value={session}]".supplant({session: Session.get("selectedUser")})).css("background-color", "#aaa");
  },
  "click #sort_by_date": function () {
    $('.show-pointer').css("background-color", "");
    $('.show-pointer-offline').css("background-color", "");
    $( "a[value={session}]".supplant({session: Session.get("selectedUser")})).css("background-color", "#aaa");
    if(Session.get("sortDirection")===-1){
      Session.set("sortDirection", 1);
    }else if(Session.get("sortDirection")===1){
      Session.set("sortDirection", -1);
    }
  },
  "click .show-pointer-offline": function (event, template) {
    Session.set("selectedUser", event.currentTarget.attributes[1].value);
    Session.set("dataChat", findIdInArray(Session.get("selectedUser")));
    template.$('.show-pointer-offline').css("background-color", "");
    template.$('.show-pointer').css("background-color", "");
    $( "a[value={session}]".supplant({session: Session.get("selectedUser")})).css("background-color", "#aaa");
  },
  "click #sort_by_date_offline": function () {
    $('.show-pointer-offline').css("background-color", "");
    $('.show-pointer').css("background-color", "");
    $( "a[value={session}]".supplant({session: Session.get("selectedUser")})).css("background-color", "#aaa");
    if(Session.get("sortDirectionOffline")===-1){
      Session.set("sortDirectionOffline", 1);
    }else if(Session.get("sortDirectionOffline")===1){
      Session.set("sortDirectionOffline", -1);
    }
  }
});