//중괄호 = 큰 객체(주머니)

// var user = {
//     name:"김지원",
//     age:25,
//     getname:function(){
//         return this.name //김지원
//     }
// } 

// console.log(user.name);
// console.log(user.getname());

var $select={
    body:$('body'), // var body = $()
    overlay:$('#blackout'),
    modal:$('#trailerModal'),
    showButton:$('#showTrailer'),
    hideButton:$('#hideTrailer'),
}

var play = {
    obj:null,
    query:{
        autoplay:1,
        iv_load_policy:3,
        controls:0,
    }
}

// $select.showButton.click(function(){
//     showPlayer();
// })

$select.showButton.click(showPlayer);
$select.hideButton.click(hidePlayer);

// Youtube API를 이용해서 iframe을 생성
function setPlayer(id) {
    play.obj = new YT.Player('trailer', {
      videoId: id,
      playerVars: play.query,
    });
    resizePlayer();
    //리사이즈, 화면이 회전되거나 화면의 사이즈가 바뀔 때 다시 설정
    $(window).on("resize orientationchange",function(){
      resizePlayer();
    })
  }

  function resizePlayer(){
      var viewport_w = $(window).width(); //현재 화면의 넓이
      var viewport_h = $(window).height(); //현재 화면의 높이

      var frame_w = viewport_w;     //16 (16:10)
      var frame_h = frame_w / 1.6;  //10 (16:10)

      var modal_t = (viewport_h - frame_h)/2 + 'px';
      var modal_l = 0;
      $select.modal.css({top: modal_t, left: modal_l})

      play.obj.setSize(frame_w, frame_h);

  }


function showPlayer(){
    if(!play.obj){ // null이 아니면, 유튜브의 frame이 생성됐다면
        setPlayer($select.showButton.data('youtube'))
    }
    $select.overlay.show();
};

function hidePlayer(){
	play.obj.stopVideo();
	$select.overlay.hide();
}