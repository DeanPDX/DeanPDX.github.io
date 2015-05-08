/// <reference path="../typings/jquery/jquery.d.ts"/>
$( document ).ready(function() {
  $('a').filter(function() {
    return this.hostname && this.hostname !== location.hostname;
  }).attr("target","_blank");
});