/* eslint-disable */
define('analytics/loginEsiaMetrika', ['analytics/yaMetrikaTracker', 'analytics/sessionUuid'], function(tracker, session) {
  'use strict';

  function getRegion() {
    const regex = /^https?:\/\/login.[a-zA-Z.-]+\/login\/esia\/([\w\d-]+)/;
    const currentUrl = window.location.href;
    const match = currentUrl.match(regex);
    return match ? match[1] : 0;
  }

  function getRole() {
    if (!dnevnik.user) { 
      return 0;
    }
    else {
      return dnevnik.user.commonRole || 0;
    }
  }

  function getUserId() {
    if (!dnevnik.user) { 
      return 0;
    }
    else {
      return dnevnik.user.id || 0;
    }
  }

  const region = getRegion();
  const role = getRole();
  const userid = getUserId();

  return {
    sendLoginEsia : function(action) {
      const sessionId = session.getOrCreateSessionUuid();
      const timestamp = Date.now();
      const params = {
        loginESIA : {
          [sessionId] : {
            [timestamp] : {
              [region] : {
                [role] : {
                  [userid] : {
                    [action] : null
                  }
                }
              }
            }
          }
        }
      };

      tracker.params(params);
    }
  };
});
