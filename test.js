var t = require('blue-tape');
var appboySdk = require('./app.js');
var groupId = "";
var recipients = ["2e8de969-3ab0-4344-b55f-bb7ffb912422", "2b711785-5f5a-4640-bf65-4771cc35cff1"];
var text = "This is a test notification";
var title = "This is the title";
var badge = 1;
var alert = "default";
var contentAvailable = true;

t.test("Basic fields entered", function(t) {
    var config = {
        groupId: groupId,
        recipients: recipients,
        text: text,        
        title: title,
    }
    return appboySdk.sendPush(config).then(function (res){
        t.equals(res.message, "success", "OK");       
    })
});
t.test("All fields entered", function(t) {  
    var config = {
        groupId: groupId,
        recipients: recipients,
        text: text,        
        title: title,
        badge: badge,
        alert: alert        
    }
    return appboySdk.sendPush(config).then(function (res){
        t.equals(res.message, "success", "OK");        
    })
});
t.test("contentAvalible (silent push)", function (t) {
    var config = {
        groupId: groupId,
        recipients: recipients,
        contentAvalible: contentAvailable,
        badge: badge
    }
    return appboySdk.sendPush(config).then(function (res) {
        t.equals(res.message, "success", "OK");
    })
});
t.test("Missing fields", function(t) {
     var config = {
        groupId: groupId,
        text: text,        
        title: title,       
     }
     return appboySdk.sendPush(config).then(function (res){
         t.notEqual(res.message, "success", "OK");   
     })
});