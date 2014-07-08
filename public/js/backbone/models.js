$(function() {
    //App Models
    //model for one email item
    App.Models.email = Backbone.Model.extend({
        defaults: {
            author: {
                firstName: 'Some',
                lastName: 'Guy',
                userName:'SomeGuy'
            },
            subject: 'New Email',
            body: 'This is a new Mail',
            date: (new Date()).getDate() +'/' + (new Date()).getMonth()+'/' + (new Date()).getFullYear() + '  ' + (new Date()).toLocaleTimeString(),
            isRead: false,
            recipient: ''
        },
        urlRoot:'/mail'
    });
	
	//model for one product
	App.Models.product = Backbone.Model.extend({
		urlRoot:'/getListProduct'
    });
})