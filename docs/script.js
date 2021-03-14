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

function searchParam(key) {
  const query = new URLSearchParams(location.search);
  if(query.has(key)){
	return query.get(key);
  }else{
	  return -1;
  }
};

window.onload = function () {
	if(searchParam("stepno")===-1 && searchParam("conceptno")===-1){
		var i = 1;
		var tutorial = {};
		var tutorial_mark = 0;
		var concept = {};
		var concept_mark = 0;
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
		while (1) {
		  var temp=readfile("https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/concept"+i+".md");
		  if(temp!=-1){
			var no = temp.split('\n')[0].split(' | ')[0];
			var name = temp.split('\n')[0].split(' | ')[1];
			concept[no]=name;
		  }else{
			  break;
		  }
		  i++;
		}
		concept_mark="### 개념\n";
		tutorial_mark="### 튜토리얼\n"
		for (i = 1; i < Object.keys(tutorial).length+1; i++) {
		  tutorial_mark+="[1. "+tutorial[i]+"](http://www.osdev.kro.kr/?stepno="+i+")\n";
		}
		for (i = 1; i < Object.keys(concept).length+1; i++) {
		  concept_mark+="["+concept[i]+"](http://www.osdev.kro.kr/?conceptno="+i+")\n";
		}
		document.getElementById('content').innerHTML =
			marked(tutorial_mark+"\n"+concept_mark);
	}else{
		var stepno=searchParam("stepno");
		var conceptno=searchParam("conceptno");
		var temp = readfile("https://raw.githubusercontent.com/Developer-CoderK/Dev_Own_OS/main/Step/step"+stepno+".md").split("\n");
		var content = "";
		for(i=1; i < temp.length; i++){
			content+=temp[i];
		}
		document.getElementById('content').innerHTML =
			marked(content);
	}
}
