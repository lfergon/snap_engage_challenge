Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function () {
  this.route('chats', {
    path: '/',
    data: function () {
      
    }
  });
  this.route('stats', {
    path: '/stats',
    data: function () {
      
    }
  });
});
