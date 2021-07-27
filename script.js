var mainFunction = 
{
	galleryData: [

		{imageUrl 		: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?crop=entropy&fit=crop&fm=jpg&h=630&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=420"},
		{imageUrl 		: "https://images.unsplash.com/photo-1627225793904-a2f900a6e4cf?icrop=entropy&fit=crop&fm=jpg&h=630&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=420"},
		{imageUrl 		: "https://images.unsplash.com/photo-1627225925683-1da7021732ea?crop=entropy&fit=crop&fm=jpg&h=630&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=420"},
		{imageUrl 		: "https://images.unsplash.com/photo-1627225925129-daf115268cda?crop=entropy&fit=crop&fm=jpg&h=630&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=420"}

	],

	elements: {

		oldItem 		: ".old-item",
		newItem 		: ".new-item",
		rightArrow 		: ".arrow-right",
		leftArrow 		: ".arrow-left"

	},

	count 				: 0,
	speed 				: .7,
	KEYBOARD_RIGHT 		: 39,
	KEYBOARD_LEFT 		: 37,
	isAnimate 			: false,

	init: function(){
		mainFunction.createImages();
		mainFunction.clickedSettings();
	},

	createImages: function(){
		$(mainFunction.elements.oldItem).append("<img src='" + mainFunction.galleryData[mainFunction.count].imageUrl + "'>");
		$(mainFunction.elements.newItem).append("<img src='" + mainFunction.galleryData[mainFunction.count + 1].imageUrl + "'>");
	},

	clickedSettings: function(){
		$(mainFunction.elements.rightArrow).on("click", mainFunction.nextImage);
		$(mainFunction.elements.leftArrow).on("click", mainFunction.prevImage);
		$("body").on("keyup", function(e){ if(e.which == mainFunction.KEYBOARD_RIGHT) { mainFunction.nextImage(); } else if(e.which == mainFunction.KEYBOARD_LEFT) { mainFunction.prevImage(); } });
	},

	nextImage: function(){
		var newItem = $(mainFunction.elements.newItem);
		var oldItem = $(mainFunction.elements.oldItem);

		if(!mainFunction.isAnimate)
		{
      console.log(mainFunction.count);
			mainFunction.isAnimate = true;

			TweenMax.to(newItem, mainFunction.speed, {ease: Expo.easeOut, marginLeft:0, onComplete:function(){

				mainFunction.count++;
				mainFunction.count = (mainFunction.count == mainFunction.galleryData.length) ? 0 : mainFunction.count;
				newItem.find("img").attr("src", mainFunction.galleryData[ ( (mainFunction.count == mainFunction.galleryData.length-1) ? 0 : (mainFunction.count+1) ) ].imageUrl);
				oldItem.find("img").attr("src", mainFunction.galleryData[mainFunction.count].imageUrl);
				newItem.css("margin-left", "640px");
				mainFunction.isAnimate = false;
              console.log(mainFunction.count);
				
			}});
		}
	},

	prevImage: function(){
		var newItem = $(mainFunction.elements.newItem);
		var oldItem = $(mainFunction.elements.oldItem);

		if(!mainFunction.isAnimate)
		{
			mainFunction.isAnimate = true;
			mainFunction.count--;
			mainFunction.count = (mainFunction.count < 0) ? (mainFunction.galleryData.length-1) : mainFunction.count;
			newItem.css("margin-left", "0");
			newItem.find("img").attr("src", mainFunction.galleryData[ ( (mainFunction.count == mainFunction.galleryData.length-1) ? 0 : (mainFunction.count+1) ) ].imageUrl);
			oldItem.find("img").attr("src", mainFunction.galleryData[mainFunction.count].imageUrl);
			TweenMax.to(newItem, mainFunction.speed, {ease: Expo.easeOut, marginLeft:640, onComplete:function(){ mainFunction.isAnimate = false; }});
		}
	}
};

$(document).on("ready", mainFunction.init);