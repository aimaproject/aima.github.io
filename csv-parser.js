const fs = require('fs');

const SOFTWARE_VERSION_COL = 0;
const FREE_HOURS_COL = 1;
const FORMAT_COL = 2;
const OS_COL = 3;
const PACKAGING_COL = 4;
const PACKAGING_VARIANTS_COL = 5;
const SOFTWARE_DATE_COL = 6;
const FILE_LIST_COL = 7;
const FILE_DETAILS_COL = 8;
const DISC_IMG_COL = 9;
const PKG_FRONT_COL = 10;
const PKG_BACK_COL = 11;
const PKG_FRONT_ALT_COL = 12;
const PKG_BACK_ALT_COL = 13;
const DESC_COL = 14;
const INSTALLER_ICO_COL = 16;

let args = process.argv.slice(2);

let version = args[0];
let years = args[1];

console.log(args);


function removeAllBackSlashes(val) {
    return val.replace(/\"/g, '');
}

function parseImageFileAndVersionFromUri(val) {
    let name = val.substring(val.lastIndexOf('\\') - 2, val.length);
    let valueParts = name.split('\\');
    return {
        value: name,
        thmbValue: valueParts[0] + '\\thumbs\\' + valueParts[1]
    }
}

function renderImgAndThumb(rendered, regex, regexThmb, value, thmbValue) {
    rendered = rendered.replace(regex, value);
    rendered = rendered.replace(regexThmb, thmbValue);
    return rendered;
}

function manageImgAndThumb(rendered, value, num, regex, regexThmb) {
    var parsed = parseImageFileAndVersionFromUri(value);
    value = parsed.value;
    thmbValue = parsed.thmbValue;
    if (value == 'Unknown') {
        renderImgAndThumb(rendered, regex, regexThmb, '', '');
    } else {
        let numberedRegex = new RegExp('class=\"hidden' + num + '\"', 'g');
        rendered = rendered.replace(numberedRegex, 'class=""');
        rendered = rendered.replace(regex, value);
        rendered = rendered.replace(regexThmb, thmbValue);
        rendered = rendered.replace(/class=\"hiddenAll\"/g, 'class=""');
    }
    return rendered
}

fs.readFile('index-template.html', 'utf8', (indexErr, indexTemplate) => {
    if (indexErr) {
        console.error(indexErr)
        return
    }
    fs.readFile('content-template.html', 'utf8', (contentErr, contentTemplate) => {
        if (contentErr) {
            console.error(contentErr)
            return
        }
        fs.readFile('aol-catalog-' + args[0] + '.csv', 'utf8', (csvErr, csv) => {
            if (csvErr) {
                console.error(csvErr)
                return
            }
            var page = indexTemplate.replace('{caption}', version);
            page = page.replace('{years}', years);
            let csvLines = csv.split('symnewline');
            let startingIndex = 1; //skip row 0 because its a header
            //console.log("csv lines ",csvLines);
            for (var i = startingIndex; i < csvLines.length - 1; i++) {
                let row = csvLines[i];
                let columns = row.split(';')
                var rendered = contentTemplate;
                for (var j = 0; j < columns.length - 1; j++) {
                    var value = columns[j].trim();
                    var thmbValue = '';
                    value = value.replace('�', '"');
                    var regex = new RegExp('\\{' + j + '\\}', 'g');
                    var regexThmb = new RegExp('\\{' + j + 'b}', 'g');
                    switch (j) {
                        case PACKAGING_VARIANTS_COL:
                        case FILE_LIST_COL:
                        case FILE_DETAILS_COL:
                            value = removeAllBackSlashes(value);
                            rendered = rendered.replace(regex, value);
                            break;
                        case DISC_IMG_COL:
                            var parsed = parseImageFileAndVersionFromUri(value);
                            value = parsed.value;
                            thmbValue = parsed.thmbValue;
                            rendered = renderImgAndThumb(rendered, regex, regexThmb, value, thmbValue);
                            break;
                        case PKG_FRONT_COL:
                            rendered = manageImgAndThumb(rendered, value, PKG_FRONT_COL, regex, regexThmb);
                            break;
                        case PKG_BACK_COL:
                            rendered = manageImgAndThumb(rendered, value, PKG_BACK_COL, regex, regexThmb);
                            break;
                        case PKG_FRONT_ALT_COL:
                            rendered = manageImgAndThumb(rendered, value, PKG_FRONT_ALT_COL, regex, regexThmb);
                            break;
                        case PKG_BACK_ALT_COL:
                            rendered = manageImgAndThumb(rendered, value, PKG_BACK_ALT_COL, regex, regexThmb);
                            break;
                        case INSTALLER_ICO_COL:
                            value = value.substring(value.lastIndexOf('\\') - 5, value.length);
                            page = page.replace('{installerIcon}', value);
                        default:
                            rendered = rendered.replace(regex, value);
                    }
                    //console.log('part ' + j + ' is ' + value);
                }
                page = page.replace('{content}', rendered + '\n' + '{content}');
            }
            page = page.replace('{content}', '');
            page = page.replace('{nextLink}', 'index' + (parseInt(args[0]) + 1) + '.html');
            page = page.replace(/\<span class=\"entries\"\>.*\<\/span\>/g, '<span class="entries">' + (csvLines.length - 2) + '</span> <span>entries</span>');
            fs.writeFile('index' + args[0] + '.html', page, function(writeErr) {
                if (writeErr) {
                    console.error(writeErr)
                    return
                }
            });
        })
    })
})