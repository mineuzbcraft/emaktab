/* eslint-disable */
define('analytics/sessionUuid', function () {
  'use strict';

  const cookieName = 'session_uuid';

  function getParentDomain() {
    const hostname = window.location.hostname;
    const parts = hostname.split('.').filter(Boolean);
  
    if (parts.length <= 1 || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      return '';
    }
  
    return `.${parts.slice(-2).join('.')}`;
  }

  function setSessionCookie(name, value) {
    const cookieDomain = getParentDomain();
    document.cookie = `${name}=${value}; path=/; domain=${cookieDomain}; SameSite=Lax; Secure`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (var i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }

  function getUuid() {
    /* jshint ignore:start */
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    /* jshint ignore:end */
  }

  function deleteCookie(name) {
    const cookieDomain = getParentDomain();
    document.cookie = `${name}=; path=/; domain=${cookieDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;
  }


  return {
    getOrCreateSessionUuid: function() {
      var uuid = getCookie(cookieName);
  
      if (!uuid) {
        uuid = getUuid();
        setSessionCookie(cookieName, uuid);
      }
  
      return uuid;
    },
    getSessionUuid: function() {
      return getCookie(cookieName);
    },
    createSessionUuid: function() {
      var uuid = getUuid();
      setSessionCookie(cookieName, uuid);
      return uuid;
    },
    removeSessionUuid: function() {
      deleteCookie(cookieName);
    }
  };

});
