/* globals URLSearchParams */
/* eslint-disable */
define('analytics/loginYaMetrika', ['analytics/yaMetrikaTracker', 'analytics/sessionUuid', 'analytics/loginEsiaMetrika'], function(tracker, session, esiaMetrika) {
  'use strict';

  function parseUrl(urlString)
  {
    try
    {
      const url = new URL(urlString);
      const searchParams = new URLSearchParams(url.search);

      // 1. Получаем первое значение до точки в домене
      const domainName = url.hostname.split('.')[0];

      // 2. Получаем последний путь или 'root'
      const pathParts = url.pathname.split('/').filter(Boolean);
      const action = pathParts.length > 0 ? pathParts[pathParts.length - 1] : 'root';

      // 3. Получаем returnUrl (case-insensitive) или 'empty'
      const returnUrl = searchParams.get('returnUrl') || 
                        searchParams.get('ReturnUrl') || 
                        'empty';

      return {
        domainName,
        action,
        returnUrl
      };
    }
    catch (e)
    {
      return {
        domainName: '',
        action: 'root',
        returnUrl: 'empty'
      };
    }
  }

  function parseDnevnik()
  {
    if (!dnevnik.user)
    {
      return {
        userId: '',
        role: ''
      };
    }

    var userId = dnevnik.user.id;
    var role = dnevnik.user.commonRole || '';

    return {
      userId,
      role
    };

  }

  var sessionId = session.getSessionUuid();
  if (!sessionId && !dnevnik.user) {
    sessionId = session.createSessionUuid();
  }

  if (!sessionId) {
    return;
  }

  if (dnevnik.user) {
    esiaMetrika.sendLoginEsia('success');
  }

  var dnevnikUser = parseDnevnik();
  var urlParams = parseUrl(window.location.href);
  var timestamp = Date.now();

  var params = {
    LoginUser : {
      [sessionId] : {
        [timestamp] : {
          [urlParams.domainName] : {
            [urlParams.action] : {
              [dnevnikUser.userId] : {
                [dnevnikUser.role] : {
                  [urlParams.returnUrl] : null
                }
              }
            }
          }
        }
      }
    }
  };

  tracker.params(params);

  if (dnevnik.user && sessionId) {
    session.removeSessionUuid();
  }
});
