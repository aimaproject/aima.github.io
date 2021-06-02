const sqlite3 = require('sqlite3').verbose();
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
const ID_COL = 15;
const INSTALLER_ICO_COL = 16;
const SIGN_IN_COL = 17;
const HOME_COL = 18;

let format_map = {
    'CD-ROM': 1,
    'Mini CD-ROM': 2,
    '3.5" Floppy': 3,
    '5.25" Floppy': 4
};

let home_screen_map = {
    '10-homescreen': 1,
    '25-homescreen': 2,
    '30-homescreen': 3,
    '40-homescreen': 4,
    '50-homescreen': 5,
    '60-homescreen': 6,
    '70-homescreen': 7,
    '80-homescreen': 8,
    '90-homescreen': 9,
    'SE-homescreen': 10
};

let hours_map = {
    '10': 1,
    '15': 2,
    '50': 3,
    '100': 4,
    '250': 5,
    '500': 6,
    '700': 7,
    '1000': 8,
    '1025': 9,
    '1045': 10,
    '1099': 11,
    '1175': 12,
    '3 Months': 13,
    '90 days': 13,
    '90 Days': 13,
    'Unknown': 14,
    '2 Months': 15,
    '2 months': 15
};

let installer_icon_map = {
    '10installer': 1,
    '25installer': 2,
    '30installer': 3,
    '40installer': 4,
    '50installer': 5,
    '60installer': 6,
    '70installer': 7,
    '80installer': 8,
    '90installer': 9,
    'SEinstaller': 10,
    'generic': 11
};

let os_map = {
    'Windows/Macintosh': 1,
    'Windows/Mac': 1,
    'Mac': 2,
    'Windows': 3,
    'Dos': 4
};

let version_map = {
    '1.0': 1,
    '1.1': 2,
    '1.6': 3,
    '2.0': 4,
    '2.5': 5,
    '2.6': 6,
    '2.7': 7,
    '3.0': 8,
    '4.0': 9,
    '5.0': 10,
    '6.0': 11,
    '7.0': 12,
    '8.0': 13,
    '8.0 Plus': 14,
    '9.0': 15,
    '9.0 Top Speed': 16,
    'SE': 17
};

let package_map = {
    'Wrapped Card Stock With Seat': 2,
    'Wrapped Card Stock Sleeve': 3,
    'Wrapped Card Stock Seat': 2,
    'Wrapped Card Stock': 1,
    'Unknown': 12,
    'Translucent Soft Case': 5,
    'Translucent Hard Case': 6,
    'Tall Format Case': 7,
    'Small Format Case': 8,
    'Sealed Card Stock': 1,
    'Metal Case With Lid': 9,
    'Heavy Particle Board Box': 10,
    'Hard Case': 8,
    'Card Stock With Seat': 2,
    'Card Stock Sleeve': 3,
    'Card Stock Fold-out With Sleeve': 4,
    'Card Stock Fold-out With Seat': 13,
    'Card Stock Box': 11,
    'Sealed Mylar Bag': 14,
    'Multiple': 15
};

function removeAllBackSlashes(val) {
    return val.replace(/\"/g, '');
}

function parseImageFileAndVersionFromUri(val) {
    return val.substring(val.lastIndexOf('\\') - 2, val.length);
}

var currentDoc = 0;
let totalDoc = 10;
var csvFile = '';
let db = new sqlite3.Database('aima.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the aima database.');
});

function migrateData() {
    currentDoc++;
    if (currentDoc == 10) {
        csvFile = '../csv/aol-catalog-' + 'SE' + '.csv';
    } else {
        csvFile = '../csv/aol-catalog-' + currentDoc + '.csv';
    }
    fs.readFile(csvFile, 'utf8', (csvErr, csv) => {
        if (csvErr) {
            console.error(csvErr)
            return
        }
        let csvLines = csv.split('symnewline');
        let startingIndex = 1; //skip row 0 because its a header
        //console.log("csv lines ",csvLines);
        for (var i = startingIndex; i < csvLines.length - 1; i++) {
            let row = csvLines[i];
            let columns = row.split(';')
            let values = [];
            for (var j = 0; j < columns.length - 1; j++) {
                var value = columns[j].trim();
                value = value.replace('�', '"');
                var regex = new RegExp('\\{' + j + '\\}', 'g');
                switch (j) {
                    case PACKAGING_VARIANTS_COL:
                    case FILE_LIST_COL:
                    case FILE_DETAILS_COL:
                        values.push(removeAllBackSlashes(value));
                        break;
                    case DISC_IMG_COL:
                    case PKG_FRONT_COL:
                    case PKG_BACK_COL:
                    case PKG_FRONT_ALT_COL:
                    case PKG_BACK_ALT_COL:
                        values.push(parseImageFileAndVersionFromUri(value));
                        break;
                    case INSTALLER_ICO_COL:
                        values.push(value.substring(value.lastIndexOf('\\') + 1, value.length - 4));
                        break;
                    case HOME_COL:
                        values.push(value.substring(value.lastIndexOf('\\') + 1, value.length - 4));
                        break;
                    default:
                        values.push(value);
                }
                //console.log('part ' + j + ' is ' + value);
            }
            let package_variants = values[5];
            var mapped_package_variants;
            //console.log('package_variants ' + package_variants);
            if (package_variants.includes('</br>')) {
                mapped_package_variants = package_map['Multiple'];
                //console.log('in the br if');
                //console.log('mapped_package_variants ' + package_variants);
            } else {
                mapped_package_variants = package_map[package_variants];
                //console.log('mapped_package_variants ' + package_variants);
            }
            let insert_query = `INSERT INTO discs (version,free_hours,format,os,packaging,packaging_variants,date,contents,details,
                                disc_image,package_front,package_back,package_alt_front,package_alt_back,description,installer_icon,home_screen) 
                                VALUES(${version_map[values[0]]},${hours_map[values[1]]},${format_map[values[2]]},${os_map[values[3]]},'${package_map[values[4]]}','${mapped_package_variants}','${values[6]}','${values[7]}','${values[8]}',
                                '${values[9]}','${values[10]}','${values[11]}','${values[12]}','${values[13]}','${values[14]}',${installer_icon_map[values[16]]},${home_screen_map[values[18]]});`;
            //console.log('insert_query ' + insert_query);
            db.serialize(() => {
                db.all(insert_query, (err, rows) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log(rows);
                });
            });
        };
        if (currentDoc < totalDoc) {
            migrateData();
        } else {
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('data migration completed');
            });
        }
    })
}
migrateData();