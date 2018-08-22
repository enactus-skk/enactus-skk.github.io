(function () {
	// flexibility(document.documentElement || document.body);
	// 스크립트 중에서 nav에서 목록아이콘이 안드로이드에서 흰색으로 디폴트가 되지 않는 경우가 있다.
	var header = document.getElementById("mainHeader");

	function changeHeader() {
		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

		// header.classList.toggle("header-background", scrollTop >= 1 || document.body.classList.contains("nav-open"));
		if(scrollTop >= 1 || document.body.classList.contains("nav-open")){
			header.classList.add("header-background");
		}else{
				header.classList.remove("header-background");
		}

	}

	var didScroll = false;

	$(window).scroll(function () {
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			didScroll = false;
			changeHeader();
		}
	}, 100);

	changeHeader();

	document.getElementById("open-nav").addEventListener("click", function (event) {
		event.preventDefault();
		document.body.classList.toggle("nav-open");
		changeHeader();
	});

	$("a[href*=\\#]").on("click", function (event) {
		event.preventDefault();

		$("html, body").animate({
			 scrollTop: $(this.hash).offset().top
		}, 500);
	});
})();

  function resizeYoutube(){ $("iframe").each(function(){ if( /^https?:\/\/(www.youtube.com)|(fast.wistia.net)\/embed\//g.test($(this).attr("src")) ){ $(this).css("width","100%"); $(this).css("height",Math.ceil( parseInt($(this).css("width")) * 480 / 854 ) + "px");} }); }
	$(window).resize(function(){resizeYoutube();});
  $(function(){resizeYoutube();});

$(document).ready(function () {




		var $tabs = $('#horizontalTab');
		$tabs.responsiveTabs({
				rotate: false,
				startCollapsed: false,
				/* collapsible: 'accordion',*/
				collapsible: 'accordion',
				setHash: true,
				/*animation: 'slide',*/
				active: 0,
				disabled: [],
				click: function(e, tab) {
						// $('.info').html('Tab <strong>' + tab.id + '</strong> clicked!');
				},
				activate: function(e, tab) {
						// $('.info').html('Tab <strong>' + tab.id + '</strong> activated!');
				},
				activateState: function(e, state) {
						//console.log(state);
						// $('.info').html('Switched from <strong>' + state.oldState + '</strong> state to <strong>' + state.newState + '</strong> state!');
				}
		});

		$('#enable-tab').on('click', function() {
				$tabs.responsiveTabs('enable', 3);
		});
		$('#disable-tab').on('click', function() {
				$tabs.responsiveTabs('disable', 3);
		});
		$('.select-tab').on('click', function() {
				$tabs.responsiveTabs('activate', $(this).val());
		});

});
