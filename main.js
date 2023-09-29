let name = document.getElementById("name")
let des = document.getElementById("des")
let cost = document.getElementById("cost")
const btn = document.getElementById("btn")
const url = 'http://localhost:3000/course'
const repain = document.getElementById("repain")
let idRepain





const getData = () => {
    fetch(url, {
        method: "GET"
    }).then((res) => {
        return res.json();

    }).then((data) => {
        const elements = data.map((value) => {
            console.log(value);
            return `
            <div>
                <h2>${value.title}</h2>
                <p>${value.description}</p>
                <p>${value.cost}</p>
                <button onClick="handleDelete(${value.id})">xoa</button>
                <button onClick="handleRepain(${value.id})">sua</button>
            </div>
            `;
        })
        const element = elements.join(" ");
        document.getElementById('abc').innerHTML = element
    })
};
btn.addEventListener("click", () => {
    const dataPost = {
        title: name.value,
        description: des.value,
        cost: cost.value

    };
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPost),
    })
})
const handleDelete = (id) => {
    fetch(url + "/" + id, {
        method: "DELETE",
    })
}
const handleRepain = (id) => {
    idRepain = id;
    repain.style.display = "block";
    fetch(url + "/" + id, {
        method: "GET"
    }).then((res) => {
        return res.json()
    }).then((data) => {
        name.value = data.title
        des.value = data.description
        cost.value = data.cost;


    })
};
repain.addEventListener("click", () => {
    const dataRepain = {
        title: name.value,
        description: des.value,
        cost: cost.value

    };
    fetch(url + "/" + idRepain, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRepain),
    })
})

const app = () => {
    getData()
}
app();