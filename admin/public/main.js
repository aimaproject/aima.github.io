let xhr = new XMLHttpRequest();
const url = 'http://localhost:8080/discs';
xhr.open("GET", url);

xhr.onreadystatechange = (e) => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
            let response = xhr.responseText;
            let discs = JSON.parse(response).discs;
            let discs_table = document.getElementById('discs');
            discs.forEach((disc) => {
                let row = document.createElement('tr');
                let colEdit = document.createElement('td');
                let editLink = document.createElement('a');
                editLink.innerHTML = 'edit';
                editLink.href = 'http://localhost:8080/edit.html?' + disc.id;
                editLink.target = 'new';
                colEdit.appendChild(editLink);
                let col0 = document.createElement('td');
                col0.innerHTML = disc.id;
                let col1 = document.createElement('td');
                col1.innerHTML = disc.version;
                let col2 = document.createElement('td');
                col2.innerHTML = disc.free_hours;
                let col3 = document.createElement('td');
                col3.innerHTML = disc.format;
                let col4 = document.createElement('td');
                col4.innerHTML = disc.os;
                let col5 = document.createElement('td');
                col5.innerHTML = disc.packaging;
                let col6 = document.createElement('td');
                col6.innerHTML = disc.packaging_variants;
                let col7 = document.createElement('td');
                col7.innerHTML = disc.date;
                let col8 = document.createElement('td');
                col8.innerHTML = '<div><pre>' + disc.contents + '</pre></div>';
                let col9 = document.createElement('td');
                col9.innerHTML = '<div><pre>' + disc.details + '</pre></div>';
                let col10 = document.createElement('td');
                col10.innerHTML = disc.disc_image;
                let col11 = document.createElement('td');
                col11.innerHTML = disc.package_front;
                let col12 = document.createElement('td');
                col12.innerHTML = disc.package_back;
                let col13 = document.createElement('td');
                col13.innerHTML = disc.package_alt_front;
                let col14 = document.createElement('td');
                col14.innerHTML = disc.package_alt_back;
                let col15 = document.createElement('td');
                col15.innerHTML = disc.description;
                let col16 = document.createElement('td');
                col16.innerHTML = disc.installer_icon;
                let col17 = document.createElement('td');
                col17.innerHTML = disc.home_screen;
                row.appendChild(colEdit);
                row.appendChild(col0);
                row.appendChild(col1);
                row.appendChild(col2);
                row.appendChild(col3);
                row.appendChild(col4);
                row.appendChild(col5);
                row.appendChild(col6);
                row.appendChild(col7);
                row.appendChild(col8);
                row.appendChild(col9);
                row.appendChild(col10);
                row.appendChild(col11);
                row.appendChild(col12);
                row.appendChild(col13);
                row.appendChild(col14);
                row.appendChild(col15);
                row.appendChild(col16);
                row.appendChild(col17);
                discs_table.appendChild(row);
            });
        } else {
            console.log(e);
        };
    };
};

xhr.send();