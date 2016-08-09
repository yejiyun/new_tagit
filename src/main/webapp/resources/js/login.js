var uiFixer = {
    logo: function() {
        var wrap = $("article .wrap");
        wrap.css("top", ($("article").height() - wrap.height()) / 2 + "px");
    }
};

window.onload = function(){
    uiFixer.logo();
};
window.onresize = function() {
    uiFixer.logo();
};