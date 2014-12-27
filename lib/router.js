Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function () {
  this.route('chats', {
    path: '/',
    data: function () {
      if(this.ready()){
        
      }
    },
  });
  this.route('stats', {
    path: '/company/:id',
    data: function () {
      
    }
  });
});
