const fs = require('fs')

var args = process.argv.slice(2);
console.log(args);


fs.readFile('index-template.html', 'utf8' , (indexErr, indexTemplate) => {
    if (indexErr) {
        console.error(indexErr)
        return
    }
    fs.readFile('content-template.html', 'utf8' , (contentErr, contentTemplate) => {
        if (contentErr) {
            console.error(contentErr)
            return
        }
        fs.readFile('aol-catalog-'+args[0]+'.csv', 'utf8' , (csvErr, csv) => {
            if (csvErr) {
                console.error(csvErr)
                return
            }
            var page = indexTemplate.replace("{caption}",args[0]);
            page = page.replace("{years}",args[1]);
            var csvLines = csv.split("symnewline");
            //console.log("csv lines ",csvLines);
            for(var i = 1; i < csvLines.length - 1; i++){
                var line = csvLines[i];
                var parts = line.split(";")
                var rendered = contentTemplate;
                for(var j = 0; j < parts.length - 1; j++){
                    var value = parts[j].trim();
                    var thmbValue = "";
                    value = value.replace("�",'"');
                    if(j==2){
                        console.log("format ", value);
                    }
                    if( j== 5 || j == 7 || j == 8){
                        value = value.replace(/\"/g,"");
                    }
                    if(j == 9 || j == 10 || j == 11 || j == 12 || j == 13 ){
                        value = value.substring(value.lastIndexOf("\\") - 2, value.length);
                        var valueParts = value.split("\\");
                        thmbValue = valueParts[0] + "\\thumbs\\" + valueParts[1];
                    }
                    var regex = new RegExp("\\{"+j+"\\}","g");
                    var regexThmb = new RegExp("\\{"+j+"b}","g");
                    if(j == 10 || j == 11 || j == 12 || j == 13){
                        if(value == "Unknown"){
                            rendered = rendered.replace(regex,"");
                            rendered = rendered.replace(regexThmb, "");
                        } else {
                            if(j == 10 || j == 11){
                                rendered = rendered.replace(/class=\"hidden1\"/g,'class=""')
                                rendered = rendered.replace(regex,value);
                                rendered = rendered.replace(regexThmb, thmbValue);
                            } else if(j == 12 || j == 13){
                                rendered = rendered.replace(/class=\"hidden2\"/g,'class=""')
                                rendered = rendered.replace(regex,value);
                                rendered = rendered.replace(regexThmb, thmbValue);
                            }
                            rendered = rendered.replace(/class=\"hidden\"/g,'class=""')
                        }
                    } else {
                        rendered = rendered.replace(regex,value);
                        rendered = rendered.replace(regexThmb, thmbValue);
                        console.log(regexThmb)
                    }
                    if(j == 16){
                        value = value.substring(value.lastIndexOf("\\") - 5, value.length);
                        page = page.replace("{installerIcon}", value);
                    }
                    console.log("part " + j +" is " + value);
                }
                page = page.replace("{content}", rendered + "\n" + "{content}")
            }
            page = page.replace("{content}","");
            page = page.replace("{nextLink}","index" + (parseInt(args[0]) +1) +".html");
            fs.writeFile('index'+args[0]+'.html', page, function (writeErr) {
                if (writeErr) {
                    console.error(writeErr)
                    return
                }
            });
        })
    })
})


