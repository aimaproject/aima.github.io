const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
const port = 8080;

const sqlite3 = require('sqlite3').verbose();

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
home_screen.value as home_screen
FROM discs 
JOIN os ON discs.os = os.id
JOIN format ON discs.format = format.id
JOIN version on discs.version = version.id
JOIN hours on discs.free_hours = hours.id
JOIN package p on discs.packaging = p.id
JOIN package pv on discs.packaging_variants = pv.id
JOIN home_screen on discs.home_screen = home_screen.id
JOIN installer_icon on discs.installer_icon = installer_icon.id;`;

const GET_ALL_ENTRIES_QUERY_DISC = `SELECT discs.id,
version.id as version,
hours.id as free_hours,
format.id as format,
os.id as os,
p.id as packaging,
pv.id as packaging_variants,
discs.date,
discs.contents,
discs.details,
discs.disc_image,
discs.package_front,
discs.package_back,
discs.package_alt_front,
discs.package_alt_back,
discs.description,
installer_icon.id as installer_icon,
home_screen.id as home_screen
FROM discs 
JOIN os ON discs.os = os.id
JOIN format ON discs.format = format.id
JOIN version on discs.version = version.id
JOIN hours on discs.free_hours = hours.id
JOIN package p on discs.packaging = p.id
JOIN package pv on discs.packaging_variants = pv.id
JOIN home_screen on discs.home_screen = home_screen.id
JOIN installer_icon on discs.installer_icon = installer_icon.id
WHERE discs.id = `;

const GET_VERSIONS_QUERY = `SELECT * FROM version`;
const GET_HOURS_QUERY = `SELECT * FROM hours`;
const GET_FORMATS_QUERY = `SELECT * FROM format`;
const GET_OS_QUERY = `SELECT * FROM os`;
const GET_PACKAGE_QUERY = `SELECT * FROM package`;
const GET_INSTALLER_ICONS_QUERY = `SELECT * FROM installer_icon`;
const GET_HOME_SCREENS_QUERY = `SELECT * FROM home_screen`;

const DELETE_DISC_QUERY = `DELETE from discs WHERE discs.id = `;

let db = new sqlite3.Database('db/aima.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the aima database.');
});

app.get('/discs', (req, res) => {
    db.serialize(() => {
        db.all(GET_ALL_ENTRIES_QUERY, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'discs': rows
            };
            res.send(result);
        });
    });
});

app.get('/discs/version/:version/date/:date', (req, res) => {
    db.serialize(() => {
        let normalizedDate = req.params.date.replace(/-/g, '/');
        db.all(`SELECT disc_image from discs
                WHERE discs.date = '${normalizedDate}'
                AND version = ${req.params.version}
                ORDER BY disc_image ASC;`, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'discs': rows
            };
            res.send(result);
        });
    });
});

app.get('/disc/:discId', (req, res) => {
    db.serialize(() => {
        db.all(GET_ALL_ENTRIES_QUERY_DISC + req.params.discId + ';', (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'disc': rows[0]
            };
            res.send(result);
        });
    });
});

app.delete('/disc/:discId', (req, res) => {
    db.serialize(() => {
        db.all(DELETE_DISC_QUERY + req.params.discId + ';', (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send('error');
            } else {
                res.send('deleted');
            }
        });
    });
});

app.get('/versions', (req, res) => {
    db.serialize(() => {
        db.all(GET_VERSIONS_QUERY, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'version': rows
            };
            res.send(result);
        });
    });
});

app.get('/hours', (req, res) => {
    db.serialize(() => {
        db.all(GET_HOURS_QUERY, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'hours': rows
            };
            res.send(result);
        });
    });
});

app.get('/formats', (req, res) => {
    db.serialize(() => {
        db.all(GET_FORMATS_QUERY, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'formats': rows
            };
            res.send(result);
        });
    });
});

app.get('/os', (req, res) => {
    db.serialize(() => {
        db.all(GET_OS_QUERY, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'os': rows
            };
            res.send(result);
        });
    });
});

app.get('/packaging', (req, res) => {
    db.serialize(() => {
        db.all(GET_PACKAGE_QUERY, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'packaging': rows
            };
            res.send(result);
        });
    });
});

app.get('/installer-icons', (req, res) => {
    db.serialize(() => {
        db.all(GET_INSTALLER_ICONS_QUERY, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'icons': rows
            };
            res.send(result);
        });
    });
});

app.get('/home-screens', (req, res) => {
    db.serialize(() => {
        db.all(GET_HOME_SCREENS_QUERY, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            let result = {
                'screens': rows
            };
            res.send(result);
        });
    });
});

app.post('/edit-disc', (req, res) => {
    let updateStatement = `UPDATE discs
                            SET version = ${req.body.version},
                                free_hours = ${req.body.hours},
                                format = ${req.body.format},
                                os = ${req.body.os},
                                packaging = ${req.body.packaging},
                                packaging_variants = ${req.body.packaging_variants},
                                date = '${req.body.date}',
                                contents = '${req.body.contents}',
                                details = '${req.body.details}',
                                disc_image = '${req.body.disc_image}',
                                package_front = '${req.body.package_front}',
                                package_back = '${req.body.package_back}',
                                package_alt_front = '${req.body.package_alt_front}',
                                package_alt_back = '${req.body.package_alt_back}',
                                description = '${req.body.description}',
                                installer_icon = ${req.body.installer_icon},
                                home_screen = ${req.body.home_screen}
                            WHERE
                                id = ${req.body.id};`;
    db.serialize(() => {
        db.all(updateStatement, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send('error');
            } else {
                res.redirect(`http://localhost:${port}/edit.html?` + req.body.id + '&state=success');
            }
        });
    });
});

app.post('/add-disc', (req, res) => {
    let insertStatement = `INSERT INTO discs
                            (version,free_hours,format,os,packaging,packaging_variants,date,contents,details,disc_image,package_front,package_back,
                            package_alt_front,package_alt_back,description,installer_icon,home_screen) 
                            VALUES(${req.body.version},
                                ${req.body.hours},
                                ${req.body.format},
                                ${req.body.os},
                                ${req.body.packaging},
                                ${req.body.packaging_variants},
                                '${req.body.date}',
                                '${req.body.contents}',
                                '${req.body.details}',
                                '${req.body.disc_image}',
                                '${req.body.package_front}',
                                '${req.body.package_back}',
                                '${req.body.package_alt_front}',
                                '${req.body.package_alt_back}',
                                '${req.body.description}',
                                ${req.body.installer_icon},
                                ${req.body.home_screen});`;
    db.serialize(() => {
        db.all(insertStatement, (err, rows) => {
            if (err) {
                console.error(err.message);
                res.send('error');
            } else {
                res.redirect(`http://localhost:${port}/add.html?state=success`);
            }
        });
    });
});

app.listen(port, () => {
    console.log(`aima admin app running on http://localhost:${port}`)
});

//dir /a-D /S /B