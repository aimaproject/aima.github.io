const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const _ = require('underscore');

const SOFTWARE_VERSION = 'version';
const FREE_HOURS = 'free_hours';
const FORMAT = 'format';
const OS = 'os';
const PACKAGING = 'packaging';
const PACKAGING_VARIANTS = 'packaging_variants';
const SOFTWARE_DATE = 'date';
const FILE_LIST = 'contents';
const FILE_DETAILS = 'details';
const DISC_IMG = 'disc_image';
const PKG_FRONT = 'package_front';
const PKG_BACK = 'package_back';
const PKG_FRONT_ALT = 'package_alt_front';
const PKG_BACK_ALT = 'package_alt_back';
const DESC = 'description';
const ID = 'id';
const INSTALLER_ICO = 'installer_icon';
const HOME = 'home_screen';
const YEAR_DESC = 'year_desc';

const GET_DISCS_TOTAL_QUERY = `SELECT COUNT(*) FROM discs;`;
const GET_ALL_ENTRIES_QUERY = `SELECT discs.id,
version.value as version,
hours.value as free_hours,
format.value as format,
os.value as os,
p.value as packaging,
pv.value as packaging_variants,
discs.date,
discs.contents,
discs.details,
discs.disc_image,
discs.package_front,
discs.package_back,
discs.package_alt_front,
discs.package_alt_back,
discs.description,
installer_icon.value as installer_icon,
home_screen.value as home_screen,
year_desc.value as year_desc
FROM discs 
JOIN os ON discs.os = os.id
JOIN format ON discs.format = format.id
JOIN version on discs.version = version.id
JOIN hours on discs.free_hours = hours.id
JOIN package p on discs.packaging = p.id
JOIN package pv on discs.packaging_variants = pv.id
JOIN home_screen on discs.home_screen = home_screen.id
JOIN year_desc on discs.year_desc = year_desc.id
JOIN installer_icon on discs.installer_icon = installer_icon.id;`;

let db = new sqlite3.Database('db/aima.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the aima database.');
});

function removeAllBackSlashes(val) {
    return val.replace(/\"/g, '');
}

function parseImageFileAndVersionFromUri(val) {
    let name = val.substring(val.lastIndexOf('\\') - 2, val.length);
    let valueParts = name.split('\\');
    return {
        value: name,
        thmbValue: valueParts[0] + '\\thumbs\\' + valueParts[1]
    };
};

function renderImgAndThumb(rendered, regex, regexThmb, value, thmbValue) {
    rendered = rendered.replace(regex, value);
    rendered = rendered.replace(regexThmb, thmbValue);
    return rendered;
};

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
    };
    return rendered;
};

function fetchPageTemplatesAndData() {
    fs.readFile('template/index-template.html', 'utf8', (indexErr, indexTemplate) => {
        if (indexErr) {
            console.error(indexErr)
            return
        }
        fs.readFile('template/content-template.html', 'utf8', (contentErr, contentTemplate) => {
            if (contentErr) {
                console.error(contentErr)
                return
            }
            db.serialize(() => {
                db.all(GET_ALL_ENTRIES_QUERY, (err, rows) => {
                    if (err) {
                        console.error(err.message);
                    }
                    let versions = _.groupBy(rows, (disc) => {
                        if (disc.version == 'SE') {
                            return 'SE';
                        }
                        return disc.version[0];
                    });
                    renderPageTemplates(versions, indexTemplate, contentTemplate);
                });
            });
        });
    });
};

function renderPageTemplates(versions, indexTemplate, contentTemplate) {
    _.each(Object.keys(versions), (version) => {
        let discs = versions[version];
        let sortedDiscs = _.sortBy(discs, (disc) => {
            var year = '0';
            var month = '0';
            var day = '0';
            if (disc.date !== 'Unknown') {
                let dateParts = disc.date.split('/');
                year = dateParts[2];
                if (year[0] == '0') {
                    year = '20' + year;
                } else {
                    year = '19' + year;
                }
                month = dateParts[0];
                day = dateParts[1];
            }
            return Date.UTC(year, month, day);
        });
        var page = indexTemplate.replace('{caption}', version);
        page = page.replace('{years}', getYears(sortedDiscs));
        _.each(sortedDiscs, (disc) => {
            var rendered = contentTemplate;
            _.each(Object.keys(disc), (key) => {
                var value = disc[key].toString().trim();
                var thmbValue = '';
                value = value.replace('�', '"');
                value = value.replace('”', '"');
                var regex = new RegExp('\\{' + key + '\\}', 'g');
                var regexThmb = new RegExp('\\{' + key + 'b}', 'g');
                switch (key) {
                    case PACKAGING_VARIANTS:
                    case FILE_LIST:
                    case FILE_DETAILS:
                        value = removeAllBackSlashes(value);
                        rendered = rendered.replace(regex, value);
                        break;
                    case DISC_IMG:
                        var parsed = parseImageFileAndVersionFromUri(value);
                        value = parsed.value;
                        thmbValue = parsed.thmbValue;
                        rendered = renderImgAndThumb(rendered, regex, regexThmb, value, thmbValue);
                        break;
                    case PKG_FRONT:
                        rendered = manageImgAndThumb(rendered, value, PKG_FRONT, regex, regexThmb);
                        break;
                    case PKG_BACK:
                        rendered = manageImgAndThumb(rendered, value, PKG_BACK, regex, regexThmb);
                        break;
                    case PKG_FRONT_ALT:
                        rendered = manageImgAndThumb(rendered, value, PKG_FRONT_ALT, regex, regexThmb);
                        break;
                    case PKG_BACK_ALT:
                        rendered = manageImgAndThumb(rendered, value, PKG_BACK_ALT, regex, regexThmb);
                        break;
                    case INSTALLER_ICO:
                        value = value.substring(value.lastIndexOf('\\') - 5, value.length);
                        page = page.replace('{installerIcon}', 'icons/' + value + '.ico');
                        break;
                    case HOME:
                        value = value.substring(value.lastIndexOf('\\') - 11, value.length);
                        page = page.replace('{homeScreen}', 'home-screen/' + value + '.png');
                        break;
                    case YEAR_DESC:
                        page = page.replace('{yearDesc}', value);
                        break;
                    default:
                        rendered = rendered.replace(regex, value);
                };
            });
            page = page.replace('{content}', rendered + '\n' + '{content}');
        });
        page = page.replace('{content}', '');
        var nextVersion = parseInt(version) + 1;
        if (version == '9') {
            nextVersion = 'SE';
        };
        console.log('version is ' + version);
        if (version == 'SE') {
            page = page.replace('class="links"', 'class="links hiddenAll"');
        } else {
            page = page.replace('{nextLink}', 'index' + nextVersion + '.html');
        }
        page = page.replace(/\<span class=\"entries\"\>.*\<\/span\>/g, '<span class="entries">' + sortedDiscs.length + '</span> <span>entries</span>');
        fs.writeFile('../index' + version + '.html', page, function(writeErr) {
            if (writeErr) {
                console.error(writeErr)
                return
            }
        });
    });
    updateIndexPageTotal();
}

function getYears(discs) {
    let allYears = _.chain(discs)
        .map((disc) => {
            if (disc.date != 'Unknown') {
                return disc.date.split('/')[2];
            }
            return disc.date;
        })
        .filter((date) => {
            return date != 'Unknown';
        })
        .uniq()
        .value();
    var startingYear = allYears[0];
    var endingYear = allYears[allYears.length - 1];
    if (startingYear[0] == '9') {
        startingYear = '19' + startingYear;
    } else {
        startingYear = '20' + startingYear;
    }
    if (endingYear[0] == '9') {
        endingYear = '19' + endingYear;
    } else {
        endingYear = '20' + endingYear;
    }
    if (startingYear == endingYear) {
        return startingYear;
    }
    return startingYear + '-' + endingYear;
}

function updateIndexPageTotal() {
    db.serialize(() => {
        db.all(GET_DISCS_TOTAL_QUERY, (err, rows) => {
            if (err) {
                console.error(err.message);
            };
            let count = rows[0]['COUNT(*)'];
            fs.readFile('../index.html', 'utf8', (csvErr, page) => {
                if (csvErr) {
                    console.error(csvErr);
                    return;
                };
                page = page.replace(/\<span class=\"entries\"\>.*\<\/span\>/g, '<span class="entries">' + count + '</span> <span>entries</span>');
                //console.log('writing output ' + page);
                fs.writeFile('../index.html', page, function(writeErr) {
                    if (writeErr) {
                        console.error(writeErr);
                    };
                    db.close();
                });
            });
        });
    });
};

fetchPageTemplatesAndData();