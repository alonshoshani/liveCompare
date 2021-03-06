﻿$(function () {
    Backbone.emulateHTTP = true;
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {},
        Helpers: {}
    };
    //App Helpers - Utils Functions
    App.Helpers.template = function (id) {
        return _.template($('#' + id).html());
    }
    //global event emitter
    App.Helpers.vent = _.extend({}, Backbone.Events);

    App.Helpers.socket =  io.connect();
    //parse array of mails to array of emails models
    App.Helpers.parseUserMails = function (mails) {
        var parsedMails = [];
        _.each(mails, function (e) {
            parsedMails.push(new App.Models.eMail({
                author: e.author,
                body: e.body,
                date: e.date,
                isRead: e.isRead,
                subject: e.subject,
                id: e._id
            }));
        });
        return parsedMails;
    }
    App.Helpers.getFormData = function (formId) {
        var o = {};
        var a = $(formId).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
});