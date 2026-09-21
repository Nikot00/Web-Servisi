const students = [
    {
        ime: "John",
        fakultet: "FINKI",
        prosek: 8.2,
        grad: "Skopje"
    },
    {
        ime: "Jane",
        fakultet: "FIKT",
        prosek: 9.3,
        grad: "Bitola"
    },
    {
        ime: "Mile",
        fakultet: "Goce Delcev",
        prosek: 7.6,
        grad: "Stip"
    },
    {
        ime: "Oliver",
        fakultet: "FIKT",
        prosek: 8.9,
        grad: "Skopje"
    },
    {
        ime: "Timco",
        fakultet: "American College",
        prosek: 9.9,
        grad: "Struga"
    },
    {
        ime: "Trpe",
        fakultet: "FINKI",
        prosek: 10,
        grad: "Ohrid"
    },
    {
        ime: "Marija",
        fakultet: "FINKI",
        prosek: 9.2,
        grad: "Resen"
    },
    {
        ime: "Ana",
        fakultet: "FINKI",
        prosek: 7.2,
        grad: "Skopje"
    },
    {
        ime: "Elena",
        fakultet: "FIKT",
        prosek: 6.0,
        grad: "Bitola"
    },
]

const allFromSkopje = students
.filter(student => student.grad ==="Skopje")
.map(student => student.ime)
//console.log(allFromSkopje);

const allStudents = students
.sort((a,b) => a.prosek - b.prosek)
//console.log(allStudents);

const bestFromFinki = students
.filter(student => student.fakultet === "FINKI")
.reduce((a, b) => a.prosek > b.prosek ? a : b)
//console.log(bestFromFinki);

const worstFromBitola = students
.filter(student => student.grad === "Bitola")
.reduce((a, b) => a.prosek > b.prosek ? b : a)
//console.log(worstFromBitola);

const cities = students
.reduce((acc, s) =>{
    const existingCity = acc.find((g) => g.grad === s.grad)

    if(existingCity) {
        existingCity.sum += s.prosek
    } else {
        acc.push({grad: s.grad, sum: s.prosek})
    }

    return acc
}, [])

const avgCity = cities
.map((g) => ({grad: g.grad, 
    prosek: g.sum / students.filter((s) => g.grad === s.grad).length}))
.sort((a, b) => b.prosek - a.prosek)

console.log(avgCity);





