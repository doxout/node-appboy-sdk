# Appboy sdk

## Push notifications using appboy.

### sendPush(config);

#### Description

Sends push notification to list of appboy users, return the response from appboy server. Currently working for Android,iOS,kindle/fireOS,web push notifications.

#### Parameters
```
 config: {
        groupId: (required, string) see App Group Identifier below,
        recipients: (optional, array of strings) see External User ID,
        text: (required, string) the notification message,
        title: (required, string) the title that appears in the notification drawer,
        badge: (optional, int) the badge count after this message,
        alert: (optional, string) the location of a custom notification sound within the app
        contentAvalible: (optional, boolean) used for silent notifications
        segmentId: (optional, string) see Segment Identifier on appboy,
        campaignId: (optional, string) see Campaign Identifier on appboy,
        freqCap: (optional, bool) ignore frequency_capping for campaigns, defaults to false,
        subState: (optional, string) ('opted_in'), ('subscribed') ('all'). Defaults to 'subscribed',
    }
```

returns
        
        error || body

### FATAL ERRORS

The following status codes and associated error messages will be returned if your request encounters a fatal error. Any of these error codes indicate that no messages will be sent.

400 Bad Request - Bad syntax

400 No Recipients - There are no external IDs or segment IDs or no push tokens in the request

400 Invalid Campaign ID - No Messaging API Campaign was found for the campaign ID you provided

400 Message Variant Unspecified - You provide a campaign ID but no message variation ID

400 Invalid Message Variant - You provided a valid campaign ID, but the message variation ID doesn’t match any of that campaign’s messages

400 Mismatched Message Type - You provided a message variation of the wrong message type for at least one of your messages

400 Invalid Extra Push Payload - You provide the “extra” key for either “apple_push” or “android_push” but it is not a dictionary

400 Max input length exceeded - Caused by: More than 50 external ids

400 No message to send - No payload is specified for the message

400 Slideup Message Length Exceeded - Slideup message > 140 characters

400 Apple Push Length Exceeded - JSON payload > 1912 bytes

400 Android Push Length Exceeded - JSON payload > 4000 bytes

400 Bad Request - Cannot parse send_at datetime

400 Bad Request - in_local_time is true but time is less than 24 hours in the future

401 Unauthorized - Unknown or missing app group id

403 Forbidden - Rate plan doesn’t support or account is otherwise inactivated

404 Not Found - Unknown App Group ID

429 Rate limited - Over rate limit

5XX - Internal server error, you should retry your request with exponential backoff