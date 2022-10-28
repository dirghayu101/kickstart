const client = require("../database/connection");
const forEachAsync = require("array-async").forEachAsync

const seatIDArr = []
seatIDArr.push(101)
const generateArray = () => {
    for(let i = 102; i <= 110; i++){
        seatIDArr.push(i)
    }
}
generateArray()
console.log(seatIDArr)

