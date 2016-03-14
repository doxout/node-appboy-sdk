var request = require('request');
var Promise = require('bluebird');

module.exports.sendPush = function sendPush(config) {
    if(!config.deepLinks) config.deepLinks = {};
     
    return new Promise(function(resolve, reject) {
        request({
            url: 'https://api.appboy.com/messages/send',
            method: 'POST',
            json: {
                "app_group_id": config.groupId,
                "external_user_ids": config.recipients,
                "segment_id": config.segmentId,
                "campaign_id": config.campaignId,
                "override_frequency_capping": config.freqCap,
                "recipient_subscription_state": config.subState,
                "messages": {
                    "apple_push": config.contentAvailable ?
                        {
                            "content-available": config.contentAvailable,
                            "badge": config.badge
                        } : {
                            "alert": config.text,
                            "title": config.title,
                            "badge": config.badge,
                            "sound": config.alert,
                            "custom_uri": config.deepLinks["ios"]
                        },
                    "android_push": config.contentAvailable ?
                        {
                            "send_to_sync": config.contentAvailable
                        } : {
                            "alert": config.text,
                            "title": config.title,
                            "sound": config.alert,
                            "custom_uri": config.deepLinks["android"]
                        },
                    "kindle_push": {
                        "alert": config.text,
                        "title": config.title,
                        "sound": config.alert,
                        "custom_uri": config.deepLinks["kindle"],
                    },
                    "web_push": {
                        "alert": config.text,
                        "title": config.title,
                        "custom_uri": config.deepLinks["web"],
                    }
                }
            }
        }, function(error, response, body) {
            if (error) {
                console.log(error, config);
                reject(error);
            } else {
                console.log(response.statusCode, body, config);
                resolve(body);
            }
        });
    });
}