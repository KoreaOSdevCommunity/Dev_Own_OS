function readfile(file)
{
    var rawFile = new XMLHttpRequest();
    var contenst = -1;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                contenst = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return contenst;
}

window.onload = function () {
	var i = 1;
	var tutorial = {};
	var tutorial_mark = 0;
	while (1) {
	  var temp=readfile("https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/step"+i+".md");
	  if(temp!=-1){
		var no = temp.split('\n')[0].split(' | ')[0];
		var name = temp.split('\n')[0].split(' | ')[1];
		tutorial[no]=name;
      }else{
		  break;
	  }
	  i++;
	}
	tutorial_mark="### 튜토리얼\n"
	for (i = 1; i < Object.keys(tutorial).length+1; i++) {
	  tutorial_mark+="[1. "+tutorial[i]+"](http://google.com/)\n";
	}
	document.getElementById('tutorial').innerHTML =
		marked(tutorial_mark);
}