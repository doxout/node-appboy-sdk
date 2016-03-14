var request = require('request');
var Promise = require('bluebird');

module.exports.sendPush = function sendPush(config) {
    if (config.contentAvalible) {
        return new Promise(function (resolve, reject) {
            request({
                url: 'https://api.appboy.com/messages/send', //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                json: {
                    // (required, string) see App Group Identifier below,
                    "app_group_id": config.groupId,
                    // You will need to include at least one of 'segment_id' and 'external_user_ids'
                    // Including 'segment_id' will send to members of that segment
                    // Including 'external_user_ids' will send to those users
                    // Including both will send to the provided user ids if they are in the segment 
                    // (optional, array of strings) see External User ID
                    "external_user_ids": config.recipients,
                    // (optional, string) see Segment Identifier
                    "segment_id": config.segmentId,
                    // (optional, string) see Campaign Identifier
                    "campaign_id": config.campaignId,
                    // (optional, bool) ignore frequency_capping for campaigns, defaults to false
                    "override_frequency_capping": config.freqCap,
                    // (optional, string) use this to send messages to only users who have opted in ('opted_in'), only users who have subscribed or are opted in ('subscribed') or to all users, including unsubscribed users ('all'), the latter being useful for transactional email messaging. Defaults to 'subscribed'
                    "recipient_subscription_state": config.subState,
                    "messages": {
                        // (optional, Apple Push Object)
                        "apple_push": {
                            // (optional, boolean) if set, Appboy will send down the "content-available" flag with the push token,
                            "content-available": config.contentAvalible,
                            // (optional, int) the badge count after this message
                            "badge": config.badge
                        },
                        // (optional, Android Push Object)
                        "android_push": {
                            // (optional, if set to True we will throw an error if "alert" or "title" is set)
                            "send_to_sync": config.contentAvalible
                        },                     
                    }
                }
            }, function (error, response, body) {
                if (error) {
                    console.log(error, config);
                    reject(error);
                } else {
                    console.log(response.statusCode, body, config);
                    resolve(body);
                }
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            request({
                url: 'https://api.appboy.com/messages/send', //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                json: {
                    // (required, string) see App Group Identifier below,
                    "app_group_id": config.groupId,
                    // You will need to include at least one of 'segment_id' and 'external_user_ids'
                    // Including 'segment_id' will send to members of that segment
                    // Including 'external_user_ids' will send to those users
                    // Including both will send to the provided user ids if they are in the segment 
                    // (optional, array of strings) see External User ID
                    "external_user_ids": config.recipients,
                    // (optional, string) see Segment Identifier
                    "segment_id": config.segmentId,
                    // (optional, string) see Campaign Identifier
                    "campaign_id": config.campaignId,
                    // (optional, bool) ignore frequency_capping for campaigns, defaults to false
                    "override_frequency_capping": config.freqCap,
                    // (optional, string) use this to send messages to only users who have opted in ('opted_in'), only users who have subscribed or are opted in ('subscribed') or to all users, including unsubscribed users ('all'), the latter being useful for transactional email messaging. Defaults to 'subscribed'
                    "recipient_subscription_state": config.subState,
                    "messages": {
                        // (optional, Apple Push Object)
                        "apple_push": {
                            // (required unless content- available is true in the Apple Push Object, string) the text of the alert message
                            "alert": config.text,
                            // (optional, string) a short string describing the purpose of the notification, displayed as part of the Apple Watch notification interface
                            "title": config.title,
                            // (optional, int) the badge count after this message
                            "badge": config.badge, 
                            // (required unless content-available is true, string or Apple Push Alert Object) the notification message,
                            // Specifying "default" in the sound field will play the standard notification sound
                            "sound": config.alert,
                        },
                        // (optional, Android Push Object)
                        "android_push": {
                            // (required, string) the notification message
                            "alert": config.text,
                            // (required, string) the title that appears in the notification drawer
                            "title": config.title,
                            // (optional, string) the location of a custom notification sound within the app
                            "sound": config.alert,
                        },
                        // (optional, Kindle/FireOS Push Object)
                        "kindle_push": {
                            // (required, string) the notification message
                            "alert": config.text,
                            // (required, string) the title that appears in the notification drawer
                            "title": config.title,
                            // (optional, string) the location of a custom notification sound within the app
                            "sound": config.alert,
                        },
                        // (optional, Web Push Object)
                        "web_push": {
                            // (required, string) the notification message
                            "alert": config.text,
                            // (required, string) the title that appears in the notification drawer
                            "title": config.title,
                        }
                    }
                }
            }, function (error, response, body) {
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
}