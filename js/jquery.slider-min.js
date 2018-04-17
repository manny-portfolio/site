!function(a){var b={defaults:{animation:"fade",animationSpeed:600,pauseOnHover:!1,directionalNav:!0,captions:!0,captionAnimation:"none",captionAnimationSpeed:600,bullets:!0,bulletThumbs:!1,bulletThumbLocation:"",afterSlideChange:a.noop,fluid:!0,centerBullets:!0},activeSlide:0,numberSlides:0,orbitWidth:null,orbitHeight:null,locked:null,degrees:0,wrapperHTML:'<div class="orbit-wrapper" />',captionWrapperHTML:'<div class="caption-wrapper"></div>',captionHTML:'<div class="orbit-caption"></div>',directionalNavHTML:'<div class="slider-nav"><span class="right"><img src="/images/right-arrow.png" /></span><span class="left"><img src="/images/left-arrow.png" /></span></div>',bulletHTML:'<ul class="orbit-bullets"></ul>',init:function(b,c){var d,e=0,f=this;a(".orbit-wrapper").hide(),this.addBullet=a.proxy(this.addBullet,this),this.resetAndUnlock=a.proxy(this.resetAndUnlock,this),this.options=a.extend({},this.defaults,c),"false"===this.options.captions&&(this.options.captions=!1),"false"===this.options.directionalNav&&(this.options.directionalNav=!1),this.$element=a(b),this.$wrapper=this.$element.wrap(this.wrapperHTML).parent(),this.$wrapper.append(a(this.captionWrapperHTML)),this.$slides=this.$element.children("img, a, div"),this.options.fluid&&this.$wrapper.addClass("fluid"),this.$element.bind("orbit.next",function(){f.shift("next")}),this.$element.bind("orbit.prev",function(){f.shift("prev")}),this.$element.bind("orbit.goto",function(a,b){f.shift(b)}),d=this.$slides.filter("img"),0===d.length?this.loaded():d.bind("imageready",function(){e+=1,e===d.length&&f.loaded()})},loaded:function(){this.$element.addClass("orbit").css({width:"1px",height:"1px"}),this.setDimentionsFromLargestSlide(),this.updateOptionsIfOnlyOneSlide(),this.setupFirstSlide(),this.options.captions&&this.setupCaptions(),this.options.directionalNav&&this.setupDirectionalNav(),this.options.bullets&&(this.setupBulletNav(),this.setActiveBullet())},currentSlide:function(){return this.$slides.eq(this.activeSlide)},setDimentionsFromLargestSlide:function(){var c,b=this;b.$element.add(b.$wrapper).width(this.$slides.first().width()),b.$element.add(b.$wrapper).height(this.$slides.first().height()),b.orbitWidth=this.$slides.first().width(),b.orbitHeight=this.$slides.first().height(),c=this.$slides.first().clone(),this.$slides.each(function(){var d=a(this),e=d.width(),f=d.height();e>b.$element.width()&&(b.$element.add(b.$wrapper).width(e),b.orbitWidth=b.$element.width()),f>b.$element.height()&&(b.$element.add(b.$wrapper).height(f),b.orbitHeight=b.$element.height(),c=a(this).clone()),b.numberSlides+=1}),this.options.fluid&&("string"==typeof this.options.fluid&&(c=a('<img src="http://placehold.it/'+this.options.fluid+'" />')),b.$element.prepend(c),c.addClass("fluid-placeholder"),c.css({"z-index":3,opacity:1,display:"block"}),b.$element.add(b.$wrapper).css({width:"inherit"}),b.$element.add(b.$wrapper).css({height:"inherit"}),a(window).bind("resize",function(){b.orbitWidth=b.$element.width(),b.orbitHeight=b.$element.height()}))},lock:function(){this.locked=!0},unlock:function(){this.locked=!1},updateOptionsIfOnlyOneSlide:function(){1===this.$slides.length&&(this.options.directionalNav=!1,this.options.bullets=!1)},setupFirstSlide:function(){},setupCaptions:function(){this.$caption=a(this.captionHTML),a(".caption-wrapper").append(this.$caption),this.setCaption()},setCaption:function(){var c,b=this.currentSlide().attr("data-caption");if(!this.options.captions)return!1;if(b)switch(c=a(b).html(),this.$caption.attr("id",b).html(c),this.options.captionAnimation){case"none":this.$caption.show();break;case"fade":this.$caption.fadeIn(this.options.captionAnimationSpeed)}else switch(this.options.captionAnimation){case"none":this.$caption.hide();break;case"fade":this.$caption.fadeOut(this.options.captionAnimationSpeed)}},setupDirectionalNav:function(){var a=this;this.$wrapper.append(this.directionalNavHTML),this.$wrapper.find(".left").click(function(){a.$element.trigger("orbit.prev")}),this.$wrapper.find(".right").click(function(){a.$element.trigger("orbit.next")})},setupBulletNav:function(){this.$bullets=a(this.bulletHTML),a(".caption-wrapper").append(this.$bullets),a(".contact").appendTo(".caption-wrapper"),this.$slides.each(this.addBullet),this.$element.addClass("with-bullets")},addBullet:function(b,c){var f,d=b+1,e=a("<li>"+d+"</li>"),g=this;this.options.bulletThumbs&&(f=a(c).attr("data-thumb"),f&&e.addClass("has-thumb").css({background:"url("+this.options.bulletThumbLocation+f+") no-repeat"})),this.$bullets.append(e),e.data("index",b),e.click(function(){g.$element.trigger("orbit.goto",[e.data("index")])})},setActiveBullet:function(){return!!this.options.bullets&&void this.$bullets.find("li").removeClass("active").eq(this.activeSlide).addClass("active")},resetAndUnlock:function(){this.$slides.eq(this.prevActiveSlide).css({"z-index":1}),this.unlock(),this.options.afterSlideChange.call(this,this.$slides.eq(this.prevActiveSlide),this.$slides.eq(this.activeSlide))},shift:function(b){var c=b;if(this.prevActiveSlide=this.activeSlide,this.prevActiveSlide==c)return!1;if("1"==this.$slides.length)return!1;if(!this.locked){if(this.lock(),"next"==b?(this.activeSlide++,this.activeSlide==this.numberSlides&&(this.activeSlide=0)):"prev"==b?(this.activeSlide--,this.activeSlide<0&&(this.activeSlide=this.numberSlides-1)):(this.activeSlide=b,this.prevActiveSlide<this.activeSlide?c="next":this.prevActiveSlide>this.activeSlide&&(c="prev")),this.setActiveBullet(),this.$slides.eq(this.prevActiveSlide).css({"z-index":2,opacity:0,display:"none"}),"fade"==this.options.animation){this.$slides.eq(this.activeSlide).css({"z-index":3,opacity:1,display:"block"}),a("html, body").animate({scrollTop:0},this.options.animationSpeed,this.resetAndUnlock);var d=this.currentSlide().height();d=d>700?d:700,a("#responsive").css("height",d+"px")}this.setCaption()}}};a.fn.orbit=function(c){return this.each(function(){var d=a.extend({},b);d.init(this,c)})}}(jQuery),function(a){function b(b,c){var d=a(b);d.bind("load.imageready",function(){c.apply(b,arguments),d.unbind("load.imageready")})}var c={};a.event.special.imageready={setup:function(a,b,d){c=a||c},add:function(d){var f,e=a(this);1===this.nodeType&&"img"===this.tagName.toLowerCase()&&""!==this.src&&(c.forceLoad?(f=e.attr("src"),e.attr("src",""),b(this,d.handler),e.attr("src",f)):this.complete||4===this.readyState?d.handler.apply(this,arguments):b(this,d.handler))},teardown:function(b){a(this).unbind(".imageready")}}}(jQuery);