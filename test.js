var t = require('blue-tape');
var appboySdk = require('./app.js');

var groupId = "<your-groupId>";
var recipients = ["311e1e74-fce0-4d7f-b264-e2c2cd3210b1"];
var text = "This is a test notification";
var title = "This is the title";
var badge = 1;
var alert = "default";
var contentAvailable = true;
var deepLinks = {
    "ios": "myapp://deeplink/openContent",
    "android": "myapp://deeplink/openContent",
    "kindle": "",
    "web": "",
};

t.test("Basic fields entered", function(t) {
    var config = {
        groupId: groupId,
        recipients: recipients,
        text: text,
        title: title,
        deepLinks: deepLinks
    }
    return appboySdk.sendPush(config).then(function(res) {
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
        alert: alert,
        deepLinks: deepLinks
    }
    return appboySdk.sendPush(config).then(function(res) {
        t.equals(res.message, "success", "OK");
    })
});
t.test("contentAvailable (silent push)", function(t) {
    var config = {
        groupId: groupId,
        recipients: recipients,
        text: text,
        title: title,
        contentAvailable: contentAvailable,
        badge: badge,
        deepLinks: deepLinks
    }
    return appboySdk.sendPush(config).then(function(res) {
        t.equals(res.message, "success", "OK");
    })
});
t.test("Missing fields", function(t) {
    var config = {
        groupId: groupId,
        text: text,
        title: title,
        deepLinks: deepLinks
    }
    return appboySdk.sendPush(config).then(function(res) {
        t.notEqual(res.message, "success", "OK");
    })
});