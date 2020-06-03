document.getElementById("image").onchange = function(e){
let fileReader = new FileReader();
let imageData;
fileReader.onloadend = function(){
  let resultReadFile = fileReader.result;
  //let c = document.getElementById("myCanvas");
  //let ctx = c.getContext("2d");
  let imgTag = document.createElement('img');
  imgTag.src = resultReadFile;
  imgTag.id = "img";
  document.getElementById("container").appendChild(imgTag);
  imgTag.onload = function(){
    // ctx.drawImage(imgTag, 0, 0, 800, 800);
    // imageData = ctx.getImageData(0, 0, c.width, c.height);
    // let gray = tracking.Image.grayscale(imageData.data, c.width, c.height, true);
    // let blurred4 = tracking.Image.blur(gray, c.width, c.height, 3);
    // let blurred1 = new Array(blurred4.length/4);
    // var corners = tracking.Fast.findCorners(blurred4, c.width, c.height);
    // for(let i = 0; i < blurred4.length; i++){
    //   if(i<corners.length)
    //     imageData.data[i] = corners[i];
    //   else imageData.data[i] = blurred4[i];
    // }
    // ctx.putImageData(imageData, 0, 0);
    var img = document.getElementById('img');
    var demoContainer = document.querySelector('.demo-container');
    tracking.ColorTracker.registerColor('green', function(r, g, b) {
      if (r >= 229 && r <= 232 && g >= 230 && g <= 234 && b >= 232 && b <= 236) {
        return true;
      }
      return false;
    });
    var tracker = new tracking.ColorTracker(['green']);
    tracker.setMinGroupSize(10);
    tracker.on('track', function(event) {
      console.log(event.data);
      event.data.forEach(function(rect) {
        window.plot(rect.x, rect.y, rect.width, rect.height, rect.color);
      });
    });
  
    tracking.track('#img', tracker);
  
    window.plot = function(x, y, w, h, color) {
      var rect = document.createElement('div');
      document.querySelector('.demo-container').appendChild(rect);
      rect.classList.add('rect');
      rect.style.border = '2px solid ' + color;
      rect.style.width = w + 'px';
      rect.style.height = h + 'px';
      rect.style.left = (img.offsetLeft + x) + 'px';
      rect.style.top = (img.offsetTop + y) + 'px';
    };
  }
}
fileReader.readAsDataURL(e.target.files[0]);
}