let input = document.querySelector(".searching-input"),
    search_lists_cont = document.querySelector(".search_lists_cont"),
    found_files = document.querySelector(".found_files");

input.value.toLowerCase()
console.log(input.value);

const request = fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((allElements) => {
        allElements.users.forEach((AllUsers) => {
            //get texts ,create new users, apend texts
            let nameLastnaem = `${AllUsers.firstName} ${AllUsers.lastName}`;
            let div = document.createElement("div");
            div.className = "user-cont";
            div.innerHTML = `
                <div class="found-files-top-cont">
                    <img class="user-img" src="${AllUsers.image}" alt="user-img">
                    <h1>${nameLastnaem}</h1>
                    <button class='btn-info'>View info</button>
                </div>
                <ul class="hide">
                    <li>university: <span>${AllUsers.university}</span></li>
                    <li>email: <span>${AllUsers.email}</span></li>
                    <li>phone: <span>${AllUsers.phone}</span></li>
                    <li>age: <span>${AllUsers.age}</span></li>
                    <li>address: <span>${AllUsers.address.address}</span></li>
                    <li>birthDate: <span>${AllUsers.birthDate}</span></li>
                    <li>city: <span>${AllUsers.address.city}</span></li>
                </ul>`
            found_files.appendChild(div)

            //create lists apend texts
            let li = document.createElement("li");
            li.textContent = nameLastnaem;
            search_lists_cont.appendChild(li);
        })
        Allevents()
    })

// drop down search
function input_serch_logic() {
    let search_lists_cont_li = document.querySelectorAll(".search_lists_cont>li")
    search_lists_cont_li.forEach((lists, index) => {
        let filter = ''

        filter = lists.textContent.match(input.value)
        if (filter !== null) {
            lists.classList.remove("hide");
            let str = lists.textContent;
            lists.innerHTML = insetrMark(str, lists.innerText.search(input.value), input.value.length)
        } else {
            lists.classList.add("hide");
        }

        lists.addEventListener('click', () => {
            input.value = search_lists_cont_li[index].textContent
            // input_serch_user()
        })
    })
}

// drop down users
function input_serch_user() {
    document.querySelectorAll(".user-cont").forEach(lists => {
        let filter = ''
        filter = lists.textContent.match(input.value)
        if (filter !== null) {
            lists.classList.remove("hide");
        } else {
            lists.classList.add("hide");
        }
    })
}

function Allevents() {
    input.oninput = () => {
        input_serch_logic()
        input_serch_user()
        if (input.value) {
            found_files.classList.remove("hide");
            search_lists_cont.classList.remove('hide')
        } else {
            found_files.classList.add("hide");
            search_lists_cont.classList.add('hide')
        }
    }

    document.querySelector('.All-categories').addEventListener('click', () => {
        input.value=' '
        search_lists_cont.classList.toggle('hide')
        found_files.classList.remove("hide");
    })

    document.querySelectorAll('.btn-info').forEach((elems, index) => {
        elems.addEventListener('click', () => {
            document.querySelectorAll('.user-cont ul')[index].classList.toggle('hide')
        })
    });

    document.querySelector('.searching-icon').addEventListener('click', () => {
        let popup = document.querySelector('.popup')
        if (input.value == '') {
            popup.setAttribute('style', 'opacity: 1; z-index: 50;')
            setTimeout(() => {
                popup.setAttribute('style', 'opacity: 0; z-index: -50;')
            }, 1200);
        }
        input_serch_logic()
        input_serch_user()
    })

    input_serch_logic()
    input_serch_user()
}

function insetrMark(str, pos, len) {
    return str.slice(0, pos) + `<u>${str.slice(pos, pos + len)}</u>${str.slice(pos + len)}`
}