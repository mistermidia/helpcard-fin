(function(b){var a,c,d,f,g,h,j,k,l,m={setNakedBarDelta:function(a,b){if("stickToSides"===a)l={toEndWidth:b,toBeginLeft:0,toBeginWidth:b};else if("middle"===a)l={toEndWidth:b/2,toBeginLeft:b/2,toBeginWidth:b/2};else throw new Error("unknown position of setNakedBarDelta: "+a)},getSliderValuesAtPositionPx:function(a,b){var c,d,e=this,f=e.data("pixel_to_value_mapping");if("undefined"!=typeof f)c=f(a),d=f(b);else{var g=m.getSliderWidthPx.call(e)-e.data("left_grip_width");c=m.inverse_rangemap_0_to_n.call(e,a,g),d=m.inverse_rangemap_0_to_n.call(e,b,g)}return[c,d]},validateAndMoveGripsToPx:function(a,b){var c=this,d=m.getSliderWidthPx.call(c)-c.data("left_grip_width");if(b<=d&&0<=a&&a<=d&&(!c.data("has_right_grip")||a<=b)){var e=c.data("cur_min"),f=c.data("cur_max");m.set_position_from_px.call(c,a,b),m.refresh_grips_style.call(c),m.notify_changed_implicit.call(c,"drag_move",e,f)}return c},updateAriaAttributes:function(){var a=this,b=a.data("settings"),c=a.find(b.left_grip_selector);if(a.data("has_right_grip")){var d=a.find(b.right_grip_selector);c.attr("aria-valuemin",a.data("range_min")).attr("aria-valuenow",n.get_current_min_value.call(a)).attr("aria-valuemax",n.get_current_max_value.call(a)),d.attr("aria-valuemin",n.get_current_min_value.call(a)).attr("aria-valuenow",n.get_current_max_value.call(a)).attr("aria-valuemax",a.data("range_max"))}else c.attr("aria-valuemin",a.data("range_min")).attr("aria-valuenow",n.get_current_min_value.call(a)).attr("aria-valuemax",a.data("range_max"));return a},getSliderWidthPx:function(){var a=this;return Math.round(a.width())},getGripPositionPx:function(a){return parseInt(a.css("left").replace("px",""),10)},getLeftGripPositionPx:function(){var a=this,b=a.data("settings"),c=a.find(b.left_grip_selector);return m.getGripPositionPx.call(a,c)},getRightGripPositionPx:function(){var a=this,b=a.data("settings");if(a.data("has_right_grip"))return m.getGripPositionPx.call(a,a.find(b.right_grip_selector));var c=m.getSliderWidthPx.call(a)-a.data("left_grip_width");return m.rangemap_0_to_n.call(a,a.data("cur_max"),c)},getLeftGripWidth:function(){var a=this,b=a.data("settings"),c=a.find(b.left_grip_selector);return Math.round(c.outerWidth())},getRightGripWidth:function(){var a=this,b=a.data("settings"),c=a.find(b.right_grip_selector);return Math.round(c.outerWidth())},binaryProcurarValueToPxCompareFunc:function(c,d,a){return c===d[a]?0:c<d[a]&&0===a?0:d[a-1]<=c&&c<d[a]?0:c>d[a]?1:c<=d[a-1]?-1:void b.error("cannot compare s: "+c+" with a["+a+"]. a is: "+d.join(","))},binaryProcurar:function(a,b,c,d){for(var e,f,g=0,h=a.length-1;g<=h;){e=0|(g+h)/2,f=c(a,e);var i=d(b,a,e);if(0<i)g=e+1;else if(0>i)h=e-1;else return e}return-1},haveLimits:function(){var a=this,b=a.data("lower-limit"),c=a.data("upper-limit"),d=!1;return"undefined"!=typeof b&&"undefined"!=typeof c&&(d=!0),d},refresh_grips_style:function(){var a=this,b=a.data("settings");if("undefined"!=typeof b.highlight){var c=a.data("highlightedRangeMin");if("undefined"!=typeof c){var d=a.find(b.left_grip_selector),e=a.find(b.right_grip_selector),f=a.data("highlightedRangeMax"),g=a.data("cur_min"),h=a.data("cur_max"),i=b.highlight.grip_class;g<c||g>f?d.removeClass(i):d.addClass(i),h<c||h>f?e.removeClass(i):e.addClass(i)}}},set_position_from_val:function(a,b){var c=this,d=c.data("range_min"),e=c.data("range_max");a<d&&(a=d),a>e&&(a=e),c.data("has_right_grip")?(b>e&&(b=e),b<d&&(b=d)):b=c.data("cur_max");var f=n.value_to_px.call(c,a),g=n.value_to_px.call(c,b);return m.set_handles_at_px.call(c,f,g),c.data("cur_min",a),c.data("has_right_grip")&&c.data("cur_max",b),c},set_position_from_px:function(a,b){var c=this;m.set_handles_at_px.call(c,a,b);var d=m.getSliderValuesAtPositionPx.call(c,a,b),e=d[0],f=d[1];return c.data("cur_min",e),c.data("has_right_grip")&&c.data("cur_max",f),c},set_handles_at_px:function(a,b){var c=this,d=c.data("settings"),e=d.left_grip_selector,f=d.right_grip_selector,g=d.value_bar_selector,h=c.data("left_grip_width");return c.find(e).css("left",a+"px"),c.find(f).css("left",b+"px"),c.data("has_right_grip")?c.find(g).css("left",a+"px").css("width",b-a+h+"px"):(!l&&m.populateNakedBarDeltas.call(c,a,b,h),b>a?c.find(g).css("left",a+"px").css("width",b-a+l.toEndWidth+"px"):c.find(g).css("left",b+l.toBeginLeft+"px").css("width",a-b+l.toBeginWidth+"px")),c},drag_start_func_touch:function(a,b,c,e,f){var g=this,h=a.originalEvent,i=h.touches[0],j=i.pageY,k=i.pageX,l=Math.abs(g.offset().top-j),n=g.offset().left,o=k-(n+g.width());l>b.touch_tolerance_value_bar_y||n-k>b.touch_tolerance_value_bar_x||o>b.touch_tolerance_value_bar_x||(h.preventDefault(),d=i.pageX,m.drag_start_func.call(g,i,b,c,e,f))},drag_start_func:function(d,e,g,h,i){var j=this;if(j.find(e.left_grip_selector+","+e.value_bar_selector+","+e.right_grip_selector).removeClass(e.animating_css_class),!!n.is_enabled.call(j)){var k=b(d.target),l=!1;if("object"==typeof e.highlight&&(l=k.is(e.highlight.panel_selector)),!1!==i||k.is(e.left_grip_selector)||k.is(e.right_grip_selector)||k.is(e.value_bar_selector)||l||k.is(j)){a=j;var o,p,q,r,s,t,u=m.getGripPositionPx.call(j,g),v=m.getSliderWidthPx.call(j)-j.data("left_grip_width"),w=g.offset().left,x=m.getRightGripPositionPx.call(j);p=Math.round(d.pageX)-j.data("left_grip_width")/2,q=Math.abs(w-p),s=p-w,j.data("has_right_grip")?(o=h.offset().left,r=Math.abs(o-p),t=p-o):(r=2*q,t=2*s),e.user_drag_start_callback.call(j,d),q===r?p<w?(u+=s,f=!0):(x+=t,f=!1):q<r?(u+=s,f=!0):(x+=t,f=!1),j.data("has_right_grip")?x>v&&(x=v):u>v&&(u=v),0>u&&(u=0),c=!0;var y=j.data("cur_min"),z=j.data("cur_max");m.set_position_from_px.call(j,u,x),m.refresh_grips_style.call(j),m.notify_changed_implicit.call(j,"drag_start",y,z),"[object Touch]"!==Object.prototype.toString.apply(d)&&d.preventDefault()}}},drag_move_func_touch:function(a){if(!0===c){var b=a.originalEvent;b.preventDefault();var d=b.touches[0];m.drag_move_func(d)}},drag_move_func:function(b){if(c){var e=a,g=e.data("settings"),h=m.getSliderWidthPx.call(e)-e.data("left_grip_width"),i=m.getLeftGripPositionPx.call(e),j=m.getRightGripPositionPx.call(e),k=Math.round(b.pageX),l=k-d,n=e.data("left_grip_width")/2,o=e.offset().left+e.data("left_grip_width")-n,p=o+h;!1===g.crossable_handles&&e.data("has_right_grip")&&(f?p=o+j:o+=i);var q=0,r=0;k<o&&(q=1,r=0),k>p&&(r=1,q=0),!0===g.crossable_handles&&e.data("has_right_grip")&&(f?j<=h&&i+l>j&&(f=!1,i=j):0<=i&&j+l<i&&(f=!0,j=i));var s=i,t=j;(0<l&&!q||0>l&&!r)&&(f?s+=l:t+=l),m.validateAndMoveGripsToPx.call(e,s,t),d=k,"[object Touch]"!==Object.prototype.toString.apply(b)&&b.preventDefault()}},drag_end_func_touch:function(a){var b=a.originalEvent;b.preventDefault();var c=b.touches[0];m.drag_end_func(c)},drag_end_func:function(){var b=a;if("undefined"!=typeof b){c=!1,d=void 0,m.notify_mouse_up_implicit.call(b,f),a=void 0;var e=b.data("settings");b.find(e.left_grip_selector+","+e.value_bar_selector+","+e.right_grip_selector).addClass(e.animating_css_class)}},get_rounding_for_value:function(a){var b=this,c=b.data("rounding"),d=b.data("rounding_ranges");if("object"==typeof d){var e=m.binaryProcurar.call(b,d,a,function(a,b){return a[b].range},function(a,b,c){return a<b[c].range?0<c?a>=b[c-1].range?0:-1:0:1});if(c=1,-1<e)c=parseInt(d[e].value,10);else{var f=d.length-1;a>=d[f].range&&(c=d[f].value)}}return c},notify_mouse_up_implicit:function(a){var b=this,c=n.get_current_min_value.call(b),d=n.get_current_max_value.call(b),e=!1;(b.data("beforestart_min")!==c||b.data("beforestart_max")!==d)&&(e=!0,b.data("beforestart_min",c),b.data("beforestart_max",d));var f=b.data("settings");return f.user_mouseup_callback.call(b,n.get_current_min_value.call(b),n.get_current_max_value.call(b),a,e),b},notify_changed_implicit:function(a,b,c){var d=this,e=!1;("init"===a||"refresh"===a)&&(e=!0);var f=n.get_current_min_value.call(d),g=n.get_current_max_value.call(d);return e||(b=n.round_value_according_to_rounding.call(d,b),c=n.round_value_according_to_rounding.call(d,c)),(e||f!==b||g!==c)&&(m.notify_changed_explicit.call(d,a,b,c,f,g),e=1),e},notify_changed_explicit:function(a,b,c,d,e){var f=this,g=f.data("settings");return f.data("aria_enabled")&&m.updateAriaAttributes.call(f),g.value_changed_callback.call(f,a,d,e,b,c),f},validate_params:function(a){var c=this,d=c.data("range_min"),e=c.data("range_max"),f=c.data("cur_min"),g=c.data("lower-limit"),h=c.data("upper-limit"),i=m.haveLimits.call(c);"undefined"==typeof d&&b.error("the data-range_min attribute was not defined"),"undefined"==typeof e&&b.error("the data-range_max attribute was not defined"),"undefined"==typeof f&&b.error("the data-cur_min attribute must be defined"),d>e&&b.error("Invalid input parameter. must be min < max"),i&&g>h&&b.error("Invalid data-lower-limit or data-upper-limit"),0===c.find(a.left_grip_selector).length&&b.error("Cannot find element pointed by left_grip_selector: "+a.left_grip_selector),"undefined"!=typeof a.right_grip_selector&&0===c.find(a.right_grip_selector).length&&b.error("Cannot find element pointed by right_grip_selector: "+a.right_grip_selector),"undefined"!=typeof a.value_bar_selector&&0===c.find(a.value_bar_selector).length&&b.error("Cannot find element pointed by value_bar_selector"+a.value_bar_selector)},rangemap_0_to_n:function(a,b){var c=this,d=c.data("range_min"),e=c.data("range_max");return a<=d?0:a>=e?b:Math.floor((b*a-b*d)/(e-d))},inverse_rangemap_0_to_n:function(a,b){var c=this,d=c.data("range_min"),e=c.data("range_max");if(0>=a)return d;if(a>=b)return e;return(e-d)*a/b+d}},n={teardown:function(){var a=this;return a.removeData(),b(document).unbind("mousemove.nstSlider").unbind("mouseup.nstSlider"),a.parent().unbind("mousedown.nstSlider").unbind("touchstart.nstSlider").unbind("touchmove.nstSlider").unbind("touchend.nstSlider"),a.unbind("keydown.nstSlider").unbind("keyup.nstSlider"),a},init:function(a){var c=b.extend({animating_css_class:"nst-animating",touch_tolerance_value_bar_y:30,touch_tolerance_value_bar_x:15,left_grip_selector:".nst-slider-grip-left",right_grip_selector:void 0,highlight:void 0,rounding:void 0,value_bar_selector:void 0,crossable_handles:!0,value_changed_callback:function(){},user_mouseup_callback:function(){},user_drag_start_callback:function(){}},a),d=b(document);return d.unbind("mouseup.nstSlider"),d.unbind("mousemove.nstSlider"),d.bind("mousemove.nstSlider",m.drag_move_func),d.bind("mouseup.nstSlider",m.drag_end_func),this.each(function(){var a=b(this),d=a.parent();a.data("enabled",!0);var e=a.data("range_min"),i=a.data("range_max"),l=a.data("cur_min"),o=a.data("cur_max");"undefined"==typeof o&&(o=l),""===e&&(e=0),""===i&&(i=0),""===l&&(l=0),""===o&&(o=0),a.data("range_min",e),a.data("range_max",i),a.data("cur_min",l),a.data("cur_max",o),m.validate_params.call(a,c),a.data("settings",c),"undefined"==typeof c.rounding?"undefined"==typeof a.data("rounding")?n.set_rounding.call(a,1):n.set_rounding.call(a,a.data("rounding")):n.set_rounding.call(a,c.rounding);var p=a.find(c.left_grip_selector)[0],q=b(p),r=b(a.find(c.right_grip_selector)[0]);"undefined"==typeof q.attr("tabindex")&&q.attr("tabindex",0);var s=!1;0<a.find(c.right_grip_selector).length&&(s=!0,"undefined"==typeof r.attr("tabindex")&&r.attr("tabindex",0)),a.data("has_right_grip",s),!0===a.data("aria_enabled")&&(q.attr("role","slider").attr("aria-disabled","false"),s&&r.attr("role","slider").attr("aria-disabled","false")),a.bind("keyup.nstSlider",function(b){if(a.data("enabled")){switch(b.which){case 37:case 38:case 39:case 40:if(g===j){var c,d,e,l=m.getSliderWidthPx.call(a);if(0>h-k){for(d=k;d<=l;d++)if(c=n.round_value_according_to_rounding.call(a,m.getSliderValuesAtPositionPx.call(a,d,d)[1]),c!==j){e=d;break}}else for(d=k;0<=d;d--)if(c=n.round_value_according_to_rounding.call(a,m.getSliderValuesAtPositionPx.call(a,d,d)[1]),c!==j){e=d;break}f?m.validateAndMoveGripsToPx.call(a,e,m.getRightGripPositionPx.call(a)):m.validateAndMoveGripsToPx.call(a,m.getLeftGripPositionPx.call(a),e),m.notify_mouse_up_implicit.call(a,f)}}g=void 0,h=void 0,j=void 0,k=void 0}}),a.bind("keydown.nstSlider",function(b){if(a.data("enabled")){var c=function(b,c){var d=m.getLeftGripPositionPx.call(a),e=m.getRightGripPositionPx.call(a);switch("undefined"==typeof g&&(h=f?d:e,g=f?n.get_current_min_value.call(a):n.get_current_max_value.call(a)),c.which){case 37:case 40:f?d--:e--,c.preventDefault();break;case 38:case 39:f?d++:e++,c.preventDefault();}k=f?d:e,m.validateAndMoveGripsToPx.call(a,d,e),j=f?n.get_current_min_value.call(a):n.get_current_max_value.call(a)};s&&a.find(":focus").is(r)?(f=!1,c.call(a,r,b)):(f=!0,c.call(a,q,b))}});var t=m.getLeftGripWidth.call(a),u=s?m.getRightGripWidth.call(a):t;if(a.data("left_grip_width",t),a.data("right_grip_width",u),a.data("value_bar_selector",c.value_bar_selector),!s){var v=o===i||o===e;m.setNakedBarDelta.call(a,v?"stickToSides":"middle",t)}e===i||l===o?n.set_range.call(a,e,i):m.set_position_from_val.call(a,a.data("cur_min"),a.data("cur_max")),m.notify_changed_implicit.call(a,"init"),a.data("beforestart_min",n.get_current_min_value.call(a)),a.data("beforestart_max",n.get_current_max_value.call(a)),a.bind("mousedown.nstSlider",function(b){m.drag_start_func.call(a,b,c,q,r,!1)}),d.bind("touchstart.nstSlider",function(b){m.drag_start_func_touch.call(a,b,c,q,r,!0)}),d.bind("touchend.nstSlider",function(b){m.drag_end_func_touch.call(a,b)}),d.bind("touchmove.nstSlider",function(b){m.drag_move_func_touch.call(a,b)});var w=a.data("histogram");"undefined"!=typeof w&&n.set_step_histogram.call(a,w)})},get_range_min:function(){var a=this;return a.data("range_min")},get_range_max:function(){var a=this;return a.data("range_max")},get_current_min_value:function(){var a,c=b(this),d=n.get_range_min.call(c),e=n.get_range_max.call(c),f=c.data("cur_min");if(a=d>=f?d:n.round_value_according_to_rounding.call(c,f),m.haveLimits.call(c)){if(a<=d)return c.data("lower-limit");if(a>=e)return c.data("upper-limit")}else{if(a<=d)return d;if(a>=e)return e}return a},get_current_max_value:function(){var a,c=b(this),d=n.get_range_min.call(c),e=n.get_range_max.call(c),f=c.data("cur_max");if(a=e<=f?e:n.round_value_according_to_rounding.call(c,f),m.haveLimits.call(c)){if(a>=e)return c.data("upper-limit");if(a<=d)return c.data("lower-limit")}else{if(a>=e)return e;if(a<=d)return d}return a},is_handle_to_left_extreme:function(){var a=this;return m.haveLimits.call(a)?a.data("lower-limit")===n.get_current_min_value.call(a):n.get_range_min.call(a)===n.get_current_min_value.call(a)},is_handle_to_right_extreme:function(){var a=this;return m.haveLimits.call(a)?a.data("upper-limit")===n.get_current_max_value.call(a):n.get_range_max.call(a)===n.get_current_max_value.call(a)},refresh:function(){var a=this,b=a.data("last_step_histogram");"undefined"!=typeof b&&n.set_step_histogram.call(a,b),m.set_position_from_val.call(a,n.get_current_min_value.call(a),n.get_current_max_value.call(a));var c=a.data("highlightedRangeMin");if("number"==typeof c){var d=a.data("highlightedRangeMax");n.highlight_range.call(a,c,d)}return m.notify_changed_implicit.call(a,"refresh"),a},disable:function(){var a=this,b=a.data("settings");return a.data("enabled",!1).find(b.left_grip_selector).attr("aria-disabled","true").end().find(b.right_grip_selector).attr("aria-disabled","true"),a},enable:function(){var a=this,b=a.data("settings");return a.data("enabled",!0).find(b.left_grip_selector).attr("aria-disabled","false").end().find(b.right_grip_selector).attr("aria-disabled","false"),a},is_enabled:function(){var a=this;return a.data("enabled")},set_position:function(a,b){var c=this,d=c.data("cur_min"),e=c.data("cur_max");a>b?m.set_position_from_val.call(c,b,a):m.set_position_from_val.call(c,a,b),m.refresh_grips_style.call(c),m.notify_changed_implicit.call(c,"set_position",d,e),c.data("beforestart_min",a),c.data("beforestart_max",b)},set_step_histogram:function(a){var c=this;c.data("last_step_histogram",a),"undefined"==typeof a&&(b.error("got an undefined histogram in set_step_histogram"),m.unset_step_histogram.call(c));var d=m.getSliderWidthPx.call(c)-c.data("left_grip_width"),e=a.length;if(!(0>=d)){var f,g=0;for(f=0;f<e;f++)g+=a[f];if(0===g)return n.unset_step_histogram.call(c),c;var h=parseFloat(g)/d;for(f=0;f<e;f++)a[f]/=h;var j=[a[0]];for(f=1;f<e;f++){var k=j[f-1]+a[f];j.push(k)}j.push(d);for(var l=[c.data("range_min")],o=0,p=l[0],q=0;o<=d;){var r=parseInt(j.shift(),10),s=m.inverse_rangemap_0_to_n.call(c,q+1,e+1);q++;var t=r-o,u=s-p;for(f=o;f<r;f++){var v=p+u*(f-o+1)/t;l.push(v),o++,p=v}if(o===d)break}l[l.length-1]=c.data("range_max");var w=function(a){return l[parseInt(a,10)]},x=function(a){var b=m.binaryProcurar.call(c,l,a,function(b,a){return b[a]},m.binaryProcurarValueToPxCompareFunc);return l[b]===a?b:Math.abs(l[b-1]-a)<Math.abs(l[b]-a)?b-1:b};return c.data("pixel_to_value_mapping",w),c.data("value_to_pixel_mapping",x),c}},unset_step_histogram:function(){var a=this;return a.removeData("pixel_to_value_mapping"),a.removeData("value_to_pixel_mapping"),a.removeData("last_step_histogram"),a},set_range:function(a,b){var c=this,d=n.get_current_min_value.call(c),e=n.get_current_max_value.call(c);return c.data("range_min",a),c.data("range_max",b),m.set_position_from_val.call(c,d,e),m.notify_changed_implicit.call(c,"set_range",d,e),c},highlight_range:function(a,c){var d=this,e=d.data("settings");"undefined"==typeof e.highlight&&b.error("you cannot call highlight_range if you haven' specified the \"highlight\" parameter in construction!"),a||(a=0),c||(c=0);var f=n.value_to_px.call(d,a),g=n.value_to_px.call(d,c),h=g-f+d.data("left_grip_width"),i=d.find(e.highlight.panel_selector);return i.css("left",f+"px"),i.css("width",h+"px"),d.data("highlightedRangeMin",a),d.data("highlightedRangeMax",c),m.refresh_grips_style.call(d),d},set_rounding:function(a){var c=this;"string"==typeof a&&-1<a.indexOf("{")&&(a=b.parseJSON(a)),c.data("rounding",a);var d=[];if("object"==typeof a){for(var e in a)if(a.hasOwnProperty(e)){var f=a[e];d.push({range:f,value:e})}d.sort(function(c,a){return c.range-a.range}),c.data("rounding_ranges",d)}else c.removeData("rounding_ranges");return c},get_rounding:function(){var a=this;return a.data("rounding")},round_value_according_to_rounding:function(a){var c=this,d=m.get_rounding_for_value.call(c,a);if(0<d){var e=a/d,f=parseInt(e,10),g=e-f;.5<g&&f++;var h=f*d;return h}return b.error("rounding must be > 0, got "+d+" instead"),a},value_to_px:function(a){var b=this,c=b.data("value_to_pixel_mapping");if("undefined"!=typeof c)return c(a);var d=m.getSliderWidthPx.call(b)-b.data("left_grip_width");return m.rangemap_0_to_n.call(b,a,d)}},o="nstSlider";b.fn[o]=function(a){if(n[a]){if(!0===this.data("initialized"))return n[a].apply(this,Array.prototype.slice.call(arguments,1));throw new Error("method "+a+" called on an uninitialized instance of "+o)}else{if("object"==typeof a||!a)return this.data("initialized",!0),n.init.apply(this,arguments);b.error("Cannot call method "+a)}}})(jQuery);