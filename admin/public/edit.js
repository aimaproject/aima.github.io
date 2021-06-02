let xhr = new XMLHttpRequest();
const versions_url = 'http://localhost:8080/versions';
const hours_url = 'http://localhost:8080/hours';
const formats_url = 'http://localhost:8080/formats';
const os_url = 'http://localhost:8080/os';
const packaging_url = 'http://localhost:8080/packaging';
const installer_icons_url = 'http://localhost:8080/installer-icons';
const home_screens_url = 'http://localhost:8080/home-screens';
const disc_url = 'http://localhost:8080/disc/';

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
                if(response == 'deleted'){
                    document.body.innerHTML = 'deleted';
                    return;
                }
                let disc = JSON.parse(response).disc;
                console.log(disc);
                let id_text = document.getElementById('id');
                id_text.value = disc.id;
                let version_select = document.getElementById('version');
                setSelected(version_select, disc.version);
                let hours_select = document.getElementById('hours');
                setSelected(hours_select, disc.free_hours);
                let format_select = document.getElementById('format');
                setSelected(format_select, disc.format);
                let os_select = document.getElementById('os');
                setSelected(os_select, disc.os);
                let packaging_select = document.getElementById('packaging');
                setSelected(packaging_select, disc.packaging);
                let packaging_variants_select = document.getElementById('packaging_variants');
                setSelected(packaging_variants_select, disc.packaging_variants);
                let date_text = document.getElementById('date');
                date_text.value = disc.date;
                let contents_textarea = document.getElementById('contents');
                contents_textarea.value = disc.contents;
                let details_textarea = document.getElementById('details');
                details_textarea.value = disc.details;
                let disc_image_text = document.getElementById('disc_image');
                disc_image_text.value = disc.disc_image;
                let package_front_text = document.getElementById('package_front');
                package_front_text.value = disc.package_front;
                let package_back_text = document.getElementById('package_back');
                package_back_text.value = disc.package_back;
                let package_alt_front_text = document.getElementById('package_alt_front');
                package_alt_front_text.value = disc.package_alt_front;
                let package_alt_back_text = document.getElementById('package_alt_back');
                package_alt_back_text.value = disc.package_alt_back;
                let description = document.getElementById('description');
                description.value = disc.description;
                let installer_icon_select = document.getElementById('installer_icon');
                setSelected(installer_icon_select, disc.installer_icon);
                let home_screen_select = document.getElementById('home_screen');
                setSelected(home_screen_select, disc.home_screen);
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
        }
    }
}

xhr.send();