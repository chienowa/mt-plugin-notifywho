/*
# NotifyWho?! plugin for Movable Type
# Author: Jay Allen, Six Apart (http://www.sixapart.com)
# Released under the Artistic License
#
# $Id: notifywho.js 504 2008-02-28 02:11:03Z jallen $
*/

function toggle_notifications() {
    var auto = document.forms.entry_form.auto_notifications;
    var text = getByID('auto_notifications_link');
    log.debug(auto);
    if (auto.value == 1) {
        auto.value = 0
        text.innerHTML = 'Disabled'
    } else {
        auto.value = 1;
        text.innerHTML = 'Enabled'
    }
    log.debug(auto.value);
}

function add_recipient(addr) {
    emails = document.forms.notify_form.send_notify_emails;
    if (emails.value != '') {
        emails.value = emails.value+', '+addr;
    } else {
        emails.value = addr;
    }
}


var dirty = 0;
function trimString (str) {
  str = this != window? this : str;
  return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
}


// Email Validation Javascript
// copyright 23rd March 2003, by Stephen Chapman, Felgall Pty Ltd

// You have permission to copy and use this javascript provided that
// the content of the script is not changed in any way.

function validateEmail(addr,man,db) {
    if (addr == '' && man) {
       if (db) alert('email address is mandatory');
       return false;
    }
    var invalidChars = '\/\'\\ ";:?!()[]\{\}^|';
    for (i=0; i<invalidChars.length; i++) {
       if (addr.indexOf(invalidChars.charAt(i),0) > -1) {
          if (db) alert('<MT_TRANS phrase="email address contains invalid characters">');
          return false;
       }
    }
    for (i=0; i<addr.length; i++) {
       if (addr.charCodeAt(i)>127) {
          if (db) alert('<MT_TRANS phrase="email address contains non-ascii characters">');
          return false;
       }
    }

    var atPos = addr.indexOf('@',0);
    if (atPos == -1) {
       if (db) alert('<MT_TRANS phrase="email address must contain an @">');
       return false;
    }
    if (atPos == 0) {
       if (db) alert('<MT_TRANS phrase="email address must not start with @">');
       return false;
    }
    if (addr.indexOf('@', atPos + 1) > - 1) {
       if (db) alert('<MT_TRANS phrase="email address must contain only one @">');
       return false;
    }
    if (addr.indexOf('.', atPos) == -1) {
       if (db) alert('<MT_TRANS phrase="email address must contain a period in the domain name">');
       return false;
    }
    if (addr.indexOf('@.',0) != -1) {
       if (db) alert('<MT_TRANS phrase="period must not immediately follow @ in email address">');
       return false;
    }
    if (addr.indexOf('.@',0) != -1){
       if (db) alert('<MT_TRANS phrase="period must not immediately precede @ in email address">');
       return false;
    }
    if (addr.indexOf('..',0) != -1) {
       if (db) alert('<MT_TRANS phrase="two periods must not be adjacent in email address">');
       return false;
    }
    var suffix = addr.substring(addr.lastIndexOf('.')+1);
    if (suffix.length != 2 && suffix != 'com' && suffix != 'net' && suffix != 'org' && suffix != 'edu' && suffix != 'int' && suffix != 'mil' && suffix != 'gov' & suffix != 'arpa' && suffix != 'biz' && suffix != 'aero' && suffix != 'name' && suffix != 'coop' && suffix != 'info' && suffix != 'pro' && suffix != 'museum') {
       if (db) alert('<MT_TRANS phrase="invalid primary domain in email address">');
       return false;
    }
    return true;
}

function multiEmail(email_field) {
    if (email_field == '') return true;
    var email = email_field.split(/[,\s]+/);
    for (var i = 0; i < email.length; i++) {
        var em = trimString(email[i]);
        if (!validateEmail(em, 1, 0)) {
            alert(email[i]+' <MT_TRANS phrase="INVALID_EMAIL">');
            return false;
        }
    }
    return true;
}

function recipient_reminder(f) {
    if ((! f.nw_entry_notify_list.checked) && (f.nw_entry_notify_emails.value == '')) {
        alert('You must define recipients for the automatic notification feature to send to.');
    }
}
