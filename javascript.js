var URL = window.URL || window.webkitURL;

document.querySelector('#videoSelector').value = "";
document.querySelector('#interval').value = 0.5;
document.querySelector('#startAt').value = 0;

var inputSelector = document.querySelector('#videoSelector')
inputSelector.addEventListener('change', function (event) {
    var file = this.files[0];
    var type = file.type;
    var videoElem = document.querySelector('video');
    var canPlay = videoElem.canPlayType(type);
    if (canPlay === '') canPlay = 'no';
      var message = 'Can play type "' + type + '": ' + canPlay;
      var isError = canPlay === 'no';
  
    if (isError) {
      return
    }
  
    var fileURL = URL.createObjectURL(file);
    videoElem.src = fileURL;
    sessionStorage.setItem('videoURL', fileURL);
    document.querySelector('#videoContainer').style.display = 'initial';
}, false);

function loadFrames() {
  var interval = Number(document.querySelector('#interval').value);
  var i = Number(document.querySelector('#startAt').value);
  var video = document.createElement('video');
  var thumbs = document.getElementById("thumbs");

  video.addEventListener('loadeddata', function() {
    thumbs.innerHTML = "";
    video.currentTime = i;
  }, false);

  video.addEventListener('seeked', function() {
      generateThumbnail(i);
      i += interval;
      if (i <= video.duration) {
          video.currentTime = i;
      }
      else {
        alert("done!");
      }

  }, false);

  video.preload = "auto";
  video.src = sessionStorage.getItem('videoURL');

  function generateThumbnail() {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    c.width = 240;
    c.height = 135;
    ctx.drawImage(video, 0, 0, 240, 135);
    thumbs.appendChild(c);
  }
};

function options() {
  let button = document.querySelector('#optionsButton');
  var options = document.querySelector('#options');
  if (options.style.display == 'none') {
    options.style.display = 'initial';
    button.innerHTML = 'Hide Options';
  } else {
    options.style.display = 'none';
    button.innerHTML = 'Show Options';
  }
}
