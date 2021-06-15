let xhr = new XMLHttpRequest();
const versions_url = 'http://localhost:8080/versions';
const hours_url = 'http://localhost:8080/hours';
const formats_url = 'http://localhost:8080/formats';
const os_url = 'http://localhost:8080/os';
const packaging_url = 'http://localhost:8080/packaging';
const installer_icons_url = 'http://localhost:8080/installer-icons';
const home_screens_url = 'http://localhost:8080/home-screens';
const year_descriptions_url = 'http://localhost:8080/year-descriptions';
const disc_url = 'http://localhost:8080/disc/';

xhr.open("GET", versions_url);

xhr.onreadystatechange = (e) => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            let response = xhr.responseText;
            let versions = JSON.parse(response).version;
            let versionSelect = document.getElementById('version');
            versions.forEach((version) => {
                let option = document.createElement('option');
                option.value = version.id;
                option.name = version.value;
                option.id = version.value;
                option.innerHTML = version.value;
                versionSelect.appendChild(option);
            });
            getHours();
        } else {
            console.log(e);
        };
    };
};

function getHours() {
    xhr.open("GET", hours_url);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let response = xhr.responseText;
                let hours = JSON.parse(response).hours;
                let hoursSelect = document.getElementById('hours');
                hours.forEach((hour) => {
                    let option = document.createElement('option');
                    option.value = hour.id;
                    option.name = hour.value;
                    option.id = hour.value;
                    option.innerHTML = hour.value;
                    hoursSelect.appendChild(option);
                });
                getFormats();
            } else {
                console.log(e);
            };
        };
    };
    xhr.send();
};

function getFormats() {
    xhr.open("GET", formats_url);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let response = xhr.responseText;
                let formats = JSON.parse(response).formats;
                let formatSelect = document.getElementById('format');
                formats.forEach((format) => {
                    let option = document.createElement('option');
                    option.value = format.id;
                    option.name = format.value;
                    option.id = format.value;
                    option.innerHTML = format.value;
                    formatSelect.appendChild(option);
                });
                getOs();
            } else {
                console.log(e);
            };
        };
    };
    xhr.send();
};

function getOs() {
    xhr.open("GET", os_url);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let response = xhr.responseText;
                let os = JSON.parse(response).os;
                let osSelect = document.getElementById('os');
                os.forEach((system) => {
                    let option = document.createElement('option');
                    option.value = system.id;
                    option.name = system.value;
                    option.id = system.value;
                    option.innerHTML = system.value;
                    osSelect.appendChild(option);
                });
                getPackaging();
            } else {
                console.log(e);
            };
        };
    };
    xhr.send();
};

function getPackaging() {
    xhr.open("GET", packaging_url);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let response = xhr.responseText;
                let packaging = JSON.parse(response).packaging;
                let packagingSelect = document.getElementById('packaging');
                let packagingVariantsSselect = document.getElementById('packaging_variants');
                packaging.forEach((type) => {
                    let option = document.createElement('option');
                    option.value = type.id;
                    option.name = type.value;
                    option.id = type.value;
                    option.innerHTML = type.value;
                    packagingSelect.appendChild(option);
                    let option2 = document.createElement('option');
                    option2.value = type.id;
                    option2.name = type.value;
                    option2.id = type.value;
                    option2.innerHTML = type.value;
                    packagingVariantsSselect.appendChild(option2);
                });
                getInstallerIcons();
            } else {
                console.log(e);
            };
        };
    };
    xhr.send();
};

function getInstallerIcons() {
    xhr.open("GET", installer_icons_url);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let response = xhr.responseText;
                let icons = JSON.parse(response).icons;
                let iconsSelect = document.getElementById('installer_icon');
                icons.forEach((icon) => {
                    let option = document.createElement('option');
                    option.value = icon.id;
                    option.name = icon.value;
                    option.id = icon.value;
                    option.innerHTML = icon.value;
                    iconsSelect.appendChild(option);
                });
                getHomeScreens();
            } else {
                console.log(e);
            };
        };
    };
    xhr.send();
};

function getHomeScreens() {
    xhr.open("GET", home_screens_url);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let response = xhr.responseText;
                let screens = JSON.parse(response).screens;
                let homeScreenSelect = document.getElementById('home_screen');
                screens.forEach((screen) => {
                    let option = document.createElement('option');
                    option.value = screen.id;
                    option.name = screen.value;
                    option.id = screen.value;
                    option.innerHTML = screen.value;
                    homeScreenSelect.appendChild(option);
                });
                getYearDescriptions();
            } else {
                console.log(e);
            };
        };
    };
    xhr.send();
};

function getYearDescriptions() {
    xhr.open("GET", year_descriptions_url);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let response = xhr.responseText;
                let descriptions = JSON.parse(response).descriptions;
                let yearDescriptionSelect = document.getElementById('year_desc');
                descriptions.forEach((description) => {
                    let option = document.createElement('option');
                    option.value = description.id;
                    option.name = description.value;
                    option.id = description.value;
                    option.innerHTML = description.value;
                    yearDescriptionSelect.appendChild(option);
                });
                getDiscData();
            } else {
                console.log(e);
            };
        };
    };
    xhr.send();
};

function getDiscData() {
    let window_params = window.location.search.substr(1).split('?')[0].split('&');
    let disc_id = window_params[0];
    xhr.open("GET", disc_url + disc_id);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                let response = xhr.responseText;
                if (response == 'deleted') {
                    document.body.innerHTML = 'deleted';
                    return;
                }
                let disc = JSON.parse(response).disc;
                let idText = document.getElementById('id');
                idText.value = disc.id;
                let versionSelect = document.getElementById('version');
                setSelected(versionSelect, disc.version);
                let hoursSelect = document.getElementById('hours');
                setSelected(hoursSelect, disc.free_hours);
                let formatSelect = document.getElementById('format');
                setSelected(formatSelect, disc.format);
                let osSelect = document.getElementById('os');
                setSelected(osSelect, disc.os);
                let packagingSelect = document.getElementById('packaging');
                setSelected(packagingSelect, disc.packaging);
                let packagingVariantsSelect = document.getElementById('packaging_variants');
                setSelected(packagingVariantsSelect, disc.packaging_variants);
                let dateText = document.getElementById('date');
                dateText.value = disc.date;
                let contentsTextarea = document.getElementById('contents');
                contentsTextarea.value = disc.contents;
                let detailsTextarea = document.getElementById('details');
                detailsTextarea.value = disc.details;
                let discImageText = document.getElementById('disc_image');
                discImageText.value = disc.disc_image;
                let packageFrontText = document.getElementById('package_front');
                packageFrontText.value = disc.package_front;
                let packageBackText = document.getElementById('package_back');
                packageBackText.value = disc.package_back;
                let packageAltFrontText = document.getElementById('package_alt_front');
                packageAltFrontText.value = disc.package_alt_front;
                let packageAltBackText = document.getElementById('package_alt_back');
                packageAltBackText.value = disc.package_alt_back;
                let description = document.getElementById('description');
                description.value = disc.description;
                let installerIconSelect = document.getElementById('installer_icon');
                setSelected(installerIconSelect, disc.installer_icon);
                let homeScreenSelect = document.getElementById('home_screen');
                setSelected(homeScreenSelect, disc.home_screen);
                let yearDescriptionSelect = document.getElementById('year_desc');
                setSelected(yearDescriptionSelect, disc.year_desc);
            } else {
                console.log(e);
            };
            let deleteButton = document.getElementById('delete');
            deleteButton.addEventListener('click', () => {
                xhr.open("DELETE", disc_url + disc_id);
                xhr.send();
            });
        };
    };
    xhr.send();
};

function setSelected(el, value) {
    let options = el.options;
    for (var i = 0; i < options.length; i++) {
        let option = options[i];
        if (option.value == value) {
            option.selected = true;
            break;
        };
    };
};

xhr.send();