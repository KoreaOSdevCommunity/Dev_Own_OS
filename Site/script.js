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
