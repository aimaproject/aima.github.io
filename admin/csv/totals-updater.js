const fs = require('fs');

const NUM_DOCS = 9;

var totalDiscs = 0;
var currentDoc = 0;
var totalDoc = 10;

function getAndUpdate() {
    currentDoc++;
    var csvFile;
    if (currentDoc == 10) {
        csvFile = 'aol-catalog-' + 'SE' + '.csv';
    } else {
        csvFile = 'aol-catalog-' + currentDoc + '.csv';
    }
    fs.readFile(csvFile, 'utf8', (csvErr, csv) => {
        console.log('processing csv for version ' + currentDoc);
        if (csvErr) {
            console.error(csvErr)
            return
        }
        let csvLines = csv.split('symnewline');
        console.log('found ' + (csvLines.length - 1) + ' entries');
        totalDiscs += csvLines.length - 1;
        if (currentDoc < totalDoc) {
            getAndUpdate();
        } else {
            fs.readFile('../index.html', 'utf8', (csvErr, page) => {
                if (csvErr) {
                    console.error(csvErr)
                    return
                }
                page = page.replace(/\<span class=\"entries\"\>.*\<\/span\>/g, '<span class="entries">' + totalDiscs.toString() + '</span> <span>entries</span>');
                console.log('writing output ' + totalDiscs.toString());
                fs.writeFile('../index.html', page, function(writeErr) {
                    if (writeErr) {
                        console.error(writeErr)
                        return
                    }
                });
            });
        }
    });
};

getAndUpdate();