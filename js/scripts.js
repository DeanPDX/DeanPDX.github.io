/// <reference path="../typings/jquery/jquery.d.ts"/>

// Make external links have blank target.
$('a').filter(function() {
  return this.hostname && this.hostname !== location.hostname;
}).attr("target","_blank");