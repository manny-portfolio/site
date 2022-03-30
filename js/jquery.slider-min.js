! function(i) {
    var t = {
        defaults: {
            animation: "fade",
            animationSpeed: 600,
            pauseOnHover: !1,
            directionalNav: !0,
            captions: !0,
            captionAnimation: "none",
            captionAnimationSpeed: 600,
            bullets: !0,
            bulletThumbs: !1,
            bulletThumbLocation: "",
            afterSlideChange: i.noop,
            fluid: !0,
            centerBullets: !0
        },
        activeSlide: 0,
        numberSlides: 0,
        orbitWidth: null,
        orbitHeight: null,
        locked: null,
        degrees: 0,
        wrapperHTML: '<div class="orbit-wrapper" />',
        captionWrapperHTML: '<div class="caption-wrapper"></div>',
        captionHTML: '<div class="orbit-caption"></div>',
        bulletHTML: '<ul class="orbit-bullets"></ul>',
        init: function(t, e) {
            var s, n = 0,
                a = this;
            i(".orbit-wrapper").hide(), this.addBullet = i.proxy(this.addBullet, this), this.resetAndUnlock = i.proxy(this.resetAndUnlock, this), this.options = i.extend({}, this.defaults, e), "false" === this.options.captions && (this.options.captions = !1), "false" === this.options.directionalNav && (this.options.directionalNav = !1), this.$element = i(t), this.$wrapper = this.$element.wrap(this.wrapperHTML).parent(), this.$wrapper.append(i(this.captionWrapperHTML)), this.$slides = this.$element.children("img, a, div"), this.options.fluid && this.$wrapper.addClass("fluid"), this.$element.bind("orbit.next", function() {
                a.shift("next")
            }), this.$element.bind("orbit.prev", function() {
                a.shift("prev")
            }), this.$element.bind("orbit.goto", function(i, t) {
                a.shift(t)
            }), 0 === (s = this.$slides.filter("img")).length ? this.loaded() : s.bind("imageready", function() {
                (n += 1) === s.length && a.loaded()
            })
        },
        loaded: function() {
            this.$element.addClass("orbit").css({
                width: "1px",
                height: "1px"
            }), this.setDimentionsFromLargestSlide(), this.updateOptionsIfOnlyOneSlide(), this.setupFirstSlide(), this.options.captions && this.setupCaptions(), this.options.directionalNav && this.setupDirectionalNav(), this.options.bullets && (this.setupBulletNav(), this.setActiveBullet())
        },
        currentSlide: function() {
            return this.$slides.eq(this.activeSlide)
        },
        setDimentionsFromLargestSlide: function() {
            var t, e = this;
            e.$element.add(e.$wrapper).width(this.$slides.first().width()), e.$element.add(e.$wrapper).height(this.$slides.first().height()), e.orbitWidth = this.$slides.first().width(), e.orbitHeight = this.$slides.first().height(), t = this.$slides.first().clone(), this.$slides.each(function() {
                var s = i(this),
                    n = s.width(),
                    a = s.height();
                n > e.$element.width() && (e.$element.add(e.$wrapper).width(n), e.orbitWidth = e.$element.width()), a > e.$element.height() && (e.$element.add(e.$wrapper).height(a), e.orbitHeight = e.$element.height(), t = i(this).clone()), e.numberSlides += 1
            }), this.options.fluid && ("string" == typeof this.options.fluid && (t = i('<img src="http://placehold.it/' + this.options.fluid + '" />')), e.$element.prepend(t), t.addClass("fluid-placeholder"), t.css({
                "z-index": 3,
                opacity: 1,
                display: "block"
            }), e.$element.add(e.$wrapper).css({
                width: "inherit"
            }), e.$element.add(e.$wrapper).css({
                height: "inherit"
            }), i(window).bind("resize", function() {
                e.orbitWidth = e.$element.width(), e.orbitHeight = e.$element.height()
            }))
        },
        lock: function() {
            this.locked = !0
        },
        unlock: function() {
            this.locked = !1
        },
        updateOptionsIfOnlyOneSlide: function() {
            1 === this.$slides.length && (this.options.directionalNav = !1, this.options.bullets = !1)
        },
        setupFirstSlide: function() {},
        setupCaptions: function() {
            this.$caption = i(this.captionHTML), i(".caption-wrapper").append(this.$caption), this.setCaption()
        },
        setCaption: function() {
            var t, e = this.currentSlide().attr("data-caption");
            if (!this.options.captions) return !1;
            if (e) switch (t = i(e).html(), this.$caption.attr("id", e).html(t), this.options.captionAnimation) {
                case "none":
                    this.$caption.show();
                    break;
                case "fade":
                    this.$caption.fadeIn(this.options.captionAnimationSpeed)
            } else switch (this.options.captionAnimation) {
                case "none":
                    this.$caption.hide();
                    break;
                case "fade":
                    this.$caption.fadeOut(this.options.captionAnimationSpeed)
            }
        },
        setupDirectionalNav: function() {
            var i = this;
            $(".slider-nav .left").click(function() {
                i.$element.trigger("orbit.prev")
            }), $(".slider-nav .right").click(function() {
                i.$element.trigger("orbit.next")
            })
        },
        setupBulletNav: function() {
            this.$bullets = i(this.bulletHTML), i(".caption-wrapper").append(this.$bullets), i(".contact").appendTo(".caption-wrapper"), this.$slides.each(this.addBullet), this.$element.addClass("with-bullets")
        },
        addBullet: function(t, e) {
            var s, n = i("<li>" + (t + 1) + "</li>"),
                a = this;
            this.options.bulletThumbs && ((s = i(e).attr("data-thumb")) && n.addClass("has-thumb").css({
                background: "url(" + this.options.bulletThumbLocation + s + ") no-repeat"
            })), this.$bullets.append(n), n.data("index", t), n.click(function() {
                a.$element.trigger("orbit.goto", [n.data("index")])
            })
        },
        setActiveBullet: function() {
            return !!this.options.bullets && void this.$bullets.find("li").removeClass("active").eq(this.activeSlide).addClass("active")
        },
        resetAndUnlock: function() {
            this.$slides.eq(this.prevActiveSlide).css({
                "z-index": 1
            }), this.unlock(), this.options.afterSlideChange.call(this, this.$slides.eq(this.prevActiveSlide), this.$slides.eq(this.activeSlide))
        },
        shift: function(t) {
            var e = t;
            if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlide == e) return !1;
            if ("1" == this.$slides.length) return !1;
            if (!this.locked) {
                if (this.lock(), "next" == t ? (this.activeSlide++, this.activeSlide == this.numberSlides && (this.activeSlide = 0)) : "prev" == t ? (this.activeSlide--, this.activeSlide < 0 && (this.activeSlide = this.numberSlides - 1)) : (this.activeSlide = t, this.prevActiveSlide < this.activeSlide ? e = "next" : this.prevActiveSlide > this.activeSlide && (e = "prev")), this.setActiveBullet(), this.$slides.eq(this.prevActiveSlide).css({
                        "z-index": 2,
                        opacity: 0,
                        display: "none"
                    }), "fade" == this.options.animation) {
                    this.$slides.eq(this.activeSlide).css({
                        "z-index": 3,
                        opacity: 1,
                        display: "block"
                    }), i("html, body").animate({
                        scrollTop: 0
                    }, this.options.animationSpeed, this.resetAndUnlock);
                    var s = this.currentSlide().height();
                    s = s > 700 ? s : 700, i("#responsive").css("height", s + "px")
                }
                this.setCaption()
            }
        }
    };
    i.fn.orbit = function(e) {
        return this.each(function() {
            i.extend({}, t).init(this, e)
        })
    }
}(jQuery),
function(i) {
    function t(t, e) {
        var s = i(t);
        s.bind("load.imageready", function() {
            e.apply(t, arguments), s.unbind("load.imageready")
        })
    }
    var e = {};
    i.event.special.imageready = {
        setup: function(i, t, s) {
            e = i || e
        },
        add: function(s) {
            var n, a = i(this);
            1 === this.nodeType && "img" === this.tagName.toLowerCase() && "" !== this.src && (e.forceLoad ? (n = a.attr("src"), a.attr("src", ""), t(this, s.handler), a.attr("src", n)) : this.complete || 4 === this.readyState ? s.handler.apply(this, arguments) : t(this, s.handler))
        },
        teardown: function(t) {
            i(this).unbind(".imageready")
        }
    }
}(jQuery);