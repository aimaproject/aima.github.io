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
const discs_url = 'http://localhost:8080/discs';

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
                let packagingVariantsSelect = document.getElementById('packaging_variants');
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
                    packagingVariantsSelect.appendChild(option2);
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
                setDefaults();
            } else {
                console.log(e);
            };
        };
    };
    xhr.send();
};

function setDefaults() {
    let generateButton = document.getElementById('generate');
    let dateText = document.getElementById('date');
    dateText.addEventListener('input', () => {
        if (dateText.value.length > 6) {
            generateButton.disabled = false;
        } else {
            generateButton.disabled = 'disabled';
        };
    });
    let contentsTextarea = document.getElementById('contents');
    contentsTextarea.value = 'Unknown';
    let detailsTextarea = document.getElementById('details');
    detailsTextarea.value = 'Unknown';
    let descriptionTextarea = document.getElementById('description');
    descriptionTextarea.value = 'Unknown';
    generateButton.addEventListener('click', () => {
        let dateText = document.getElementById('date').value.replace(/\//g, '-');
        let versionSelect = document.getElementById('version');
        let version = versionSelect.value;
        xhr.open("GET", discs_url + '/version/' + version + '/date/' + dateText);
        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var status = xhr.status;
                if (status === 0 || (status >= 200 && status < 400)) {
                    let response = xhr.responseText;
                    let discs = JSON.parse(response).discs;
                    let sortedDiscs = discs.sort((left, right) => {
                        if (left.disc_image.split('-').length > right.disc_image.split('-').length) {
                            return true;
                        }
                        return left.disc_image > right.disc_image;
                    });
                    let imgPrefix = getImgPrefix(dateText, sortedDiscs, versionSelect);
                    let discImageText = document.getElementById('disc_image');
                    discImageText.value = imgPrefix + '-disc.png';
                    let packageFrontText = document.getElementById('package_front');
                    packageFrontText.value = imgPrefix + '-p-front.png';
                    let packageBackText = document.getElementById('package_back');
                    packageBackText.value = imgPrefix + '-p-back.png';
                    let packageAltFrontText = document.getElementById('package_alt_front');
                    packageAltFrontText.value = imgPrefix + '-p-alt-front.png';
                    let packageAltBackText = document.getElementById('package_alt_back');
                    packageAltBackText.value = imgPrefix + '-p-alt-back.png';
                } else {
                    console.log(e);
                };
            };
        };
        xhr.send();
    });
};

function getImgPrefix(dateText, discs, versionSelect) {
    var nextLetter = '';
    var nomralizedDate = dateText.replace(/-/g, '');
    if (nomralizedDate[0] == '0') {
        nomralizedDate = nomralizedDate.substring(1, nomralizedDate.length);
    };
    if(nomralizedDate.length == 5 && nomralizedDate[1] == 0){
        nomralizedDate = nomralizedDate[0] + nomralizedDate.substring(2,5);
    }
    if(nomralizedDate.length == 6 && nomralizedDate[2] == 0){
        nomralizedDate = nomralizedDate[0] + nomralizedDate[1] + nomralizedDate.substring(3,6);
    }
    if (discs.length != 0) {
        let last = discs[discs.length - 1];
        let parts = last.disc_image.split(nomralizedDate);
        let hyphens = parts[1].split('-');
        if (hyphens.length == 3) {
            let currentLetter = hyphens[1];
            nextLetter = '-' + getNextLetter(currentLetter);
        } else {
            nextLetter = '-b';
        };
    };
    let displayValue = versionSelect.options[versionSelect.selectedIndex].id;
    var folderValue = displayValue[0] + '0';
    if (displayValue == 'SE') {
        folderValue = displayValue;
    }
    var nomarlizedVersionValue = displayValue.replace(/\./g, '');
    if (nomarlizedVersionValue == 'SE') {
        nomarlizedVersionValue = displayValue.toLowerCase();
    } else if (nomarlizedVersionValue == '90 Top Speed') {
        nomarlizedVersionValue = '90';
    } else if (nomarlizedVersionValue == '80 Plus') {
        nomarlizedVersionValue = '80';
    }
    return folderValue + '\\aol-' + nomarlizedVersionValue + '-' + nomralizedDate + nextLetter;
}

function getNextLetter(letter) {
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return alphabet[alphabet.indexOf(letter) + 1];
}

xhr.send();