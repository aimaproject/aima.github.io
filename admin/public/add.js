let xhr = new XMLHttpRequest();
const versions_url = 'http://localhost:8080/versions';
const hours_url = 'http://localhost:8080/hours';
const formats_url = 'http://localhost:8080/formats';
const os_url = 'http://localhost:8080/os';
const packaging_url = 'http://localhost:8080/packaging';
const installer_icons_url = 'http://localhost:8080/installer-icons';
const home_screens_url = 'http://localhost:8080/home-screens';
const disc_url = 'http://localhost:8080/disc/';
const discs_url = 'http://localhost:8080/discs';

xhr.open("GET", versions_url);

xhr.onreadystatechange = (e) => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            let response = xhr.responseText;
            let versions = JSON.parse(response).version;
            let version_select = document.getElementById('version');
            versions.forEach((version) => {
                let option = document.createElement('option');
                option.value = version.id;
                option.name = version.value;
                option.id = version.value;
                option.innerHTML = version.value;
                version_select.appendChild(option);
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
                console.log(hours);
                let hours_select = document.getElementById('hours');
                hours.forEach((hour) => {
                    let option = document.createElement('option');
                    option.value = hour.id;
                    option.name = hour.value;
                    option.id = hour.value;
                    option.innerHTML = hour.value;
                    hours_select.appendChild(option);
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
                console.log(formats);
                let format_select = document.getElementById('format');
                formats.forEach((format) => {
                    let option = document.createElement('option');
                    option.value = format.id;
                    option.name = format.value;
                    option.id = format.value;
                    option.innerHTML = format.value;
                    format_select.appendChild(option);
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
                console.log(os);
                let os_select = document.getElementById('os');
                os.forEach((system) => {
                    let option = document.createElement('option');
                    option.value = system.id;
                    option.name = system.value;
                    option.id = system.value;
                    option.innerHTML = system.value;
                    os_select.appendChild(option);
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
                console.log(packaging);
                let packaging_select = document.getElementById('packaging');
                let packaging_variants_select = document.getElementById('packaging_variants');
                packaging.forEach((type) => {
                    let option = document.createElement('option');
                    option.value = type.id;
                    option.name = type.value;
                    option.id = type.value;
                    option.innerHTML = type.value;
                    packaging_select.appendChild(option);
                    let option2 = document.createElement('option');
                    option2.value = type.id;
                    option2.name = type.value;
                    option2.id = type.value;
                    option2.innerHTML = type.value;
                    packaging_variants_select.appendChild(option2);
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
                console.log(icons);
                let icons_select = document.getElementById('installer_icon');
                icons.forEach((icon) => {
                    let option = document.createElement('option');
                    option.value = icon.id;
                    option.name = icon.value;
                    option.id = icon.value;
                    option.innerHTML = icon.value;
                    icons_select.appendChild(option);
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
                console.log(screens);
                let home_screen_select = document.getElementById('home_screen');
                screens.forEach((screen) => {
                    let option = document.createElement('option');
                    option.value = screen.id;
                    option.name = screen.value;
                    option.id = screen.value;
                    option.innerHTML = screen.value;
                    home_screen_select.appendChild(option);
                });
                setDefaults();
            } else {

            };
        };
    };
    xhr.send();
};

function setDefaults() {
    let generateButton = document.getElementById('generate');
    let dateText = document.getElementById('date');
    dateText.addEventListener('input', () => {
        if(dateText.value.length > 6){
            generateButton.disabled = false;
        } else {
            generateButton.disabled = 'disabled';
        }
    });
    let contents_textarea = document.getElementById('contents');
    contents_textarea.value = 'Unknown';
    let details_textarea = document.getElementById('details');
    details_textarea.value = 'Unknown';
    let description_textarea = document.getElementById('description');
    description_textarea.value = 'Unknown';
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
                    let imgPrefix = getImgPrefix(dateText, discs, versionSelect);
                    let disc_image_text = document.getElementById('disc_image');
                    disc_image_text.value = imgPrefix + '-disc.png';
                    let package_front_text = document.getElementById('package_front');
                    package_front_text.value = imgPrefix + '-p-front.png';
                    let package_back_text = document.getElementById('package_back');
                    package_back_text.value = imgPrefix + '-p-back.png';
                    let package_alt_front_text = document.getElementById('package_alt_front');
                    package_alt_front_text.value = imgPrefix + '-p-alt-front.png';
                    let package_alt_back_text = document.getElementById('package_alt_back');
                    package_alt_back_text.value = imgPrefix + '-p-alt-back.png';
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
    if(displayValue == 'SE'){
        folderValue = displayValue;
    }
    var nomarlizedVersionValue = displayValue.replace(/\./g, '');
    if(nomarlizedVersionValue == 'SE'){
        nomarlizedVersionValue = displayValue.toLowerCase();
    } else if (nomarlizedVersionValue == '90 Top Speed'){
        nomarlizedVersionValue = '90';
    } else if (nomarlizedVersionValue == '80 Plus'){
        nomarlizedVersionValue = '80';
    }
    return folderValue + '\\aol-' + nomarlizedVersionValue + '-' + nomralizedDate + nextLetter;
}

function getNextLetter(letter) {
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return alphabet[alphabet.indexOf(letter) + 1];
}

xhr.send();