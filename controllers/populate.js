//! '2004-10-19 10:23:54+02' <- timestamp Format

const { spaces } = require("../data/userDataObject");
const client = require("../database/connection");

// Declared this array to use forEach loop throughout the code.
const allTableNames = ['conferenceRoom', 'cubicle', 'hotSeat', 'privateOffice']
const totalSpaces = [10, 80, 20, 10]

const spaceObj = {
    conferenceRoom: 10,
    cubicle: 80,
    hotSeat: 20,
    privateOffice: 10
}

// Generate IDs for conference room. The parameter is an array.
const generateIDsForConferenceRoom = (seatIDArr) => {
    for(let i = 101; i <= 110; i++){
        seatIDArr.push(i)
    }
}

// Insertion in the conference room table. An array needs to be passed as parameter.
const insertInConferenceRoom = async (seatIDArr) => {
  await seatIDArr.forEach((seat) => {
  let insertScript = `INSERT INTO reservation."conferenceRoom"(
    "seatID", "bookedBoolean")
    VALUES (${seat}, false);`
    client.query(insertScript)
  })
}

// Generates IDs for the cubicle table. The parameter is an array.
const generateIDsForCubicle =  (seatIDArr) => {
    for(let i = 201; i <= 280; i++){
        seatIDArr.push(i)
    }
}

// Insert in the cubicle table.
const insertInCubicle = async (seatIDArr) => {
    await seatIDArr.forEach((seat) => {
        let insertScript = `INSERT INTO reservation."cubicle"(
            "seatID", "bookedBoolean")
            VALUES (${seat}, false);`
        client.query(insertScript)
    })
}

// Generate IDs for the hot seat table.
const generateIDsForHotSeat = (seatIDArr) => {
    for(let i = 301; i <= 320; i++){
        seatIDArr.push(i)
    }
}

// Insert in the hot seat table.
const insertInHotSeat = async (seatIDArr) => {
    await seatIDArr.forEach((seat) => {
        let insertScript = `INSERT INTO reservation."hotSeat"(
            "seatID", "bookedBoolean")
            VALUES (${seat}, false);`
        client.query(insertScript)
    })
}

// Generate IDs for the private office table.
const generateIDsForPrivateOffice = (seatIDArr) => {
    for(let i = 401; i <= 410; i++){
        seatIDArr.push(i)
    }
}

// Insert in the private office table.
const insertInPrivateOffice = async (seatIDArr) => {
    await seatIDArr.forEach((seat) => {
        let insertScript = `INSERT INTO reservation."privateOffice"(
            "seatID", "bookedBoolean")
            VALUES (${seat}, false);`
        client.query(insertScript)
    })
}

// Delete all the rows in all the tables.
const deleteRowsInAllTable = async () => {
    await allTableNames.forEach((table) => {
        let deleteScript = `DELETE FROM reservation."${table}";`
        client.query(deleteScript)
    })
}

const deleteRowsInSingleTable = async (name) => {
    let deleteScript = `DELETE FROM reservation."${name}";`
    client.query(deleteScript)
}

// This will count the number of reserved seats in a table passed as parameter.
const countRowsReserved = async (space) => {
    let selectScript = `SELECT "bookedBoolean"
	FROM reservation."${space}" WHERE "bookedBoolean"=true;`
    let {rows} = await client.query(selectScript)
    return rows.length
}

const countRowsAvailable = async (space) => {
    let totalSpace = spaceObj[space]
    countRowsReserved(space).then((reserved) => {
        return totalSpace - reserved
    })
}

// This will populate space table.
const populateSpacesTable = async () => {
    console.log("At the top")
    let i = 0
    await allTableNames.forEach( async (name) => {
        let seatsReserved = await countRowsReserved(name)
        let insertScript = `INSERT INTO reservation.spaces(
            "spaceType", "totalSeats", "seatsReserved")
            VALUES ('${name}', ${totalSpaces[i]}, ${seatsReserved});`
        i++
        await client.query(insertScript)
    })
}

// This function is to generate the current time.
const getCurrentTime = () => {
    const d = new Date()
    let year = d.getFullYear()
    let date = d.getDate()
    let month = d.getMonth()
    let hour = d.getHours()
    let minute = d.getMinutes()
    let second = d.getSeconds()
    let currentTime = `${year}-${month}-${date} ${hour}:${minute}:${second}`
    return currentTime
}

// This table resets the table where the reservation has expired.
const refreshTable = async (name) => {
    let time = getCurrentTime()
    let updateTableScript = `UPDATE reservation."${name}" SET "bookedBoolean"=false, "reservedUser"=null, "bookingStartTime"=null, "bookingEndTime"=null WHERE "bookingEndTime" <= timestamp '${time}';`
    await client.query(updateTableScript)
}

// This function will refresh all tables.
const refreshAllTables = async () => {
    console.log("request received.")
    await allTableNames.forEach((table) => {
        refreshTable(table)
    })
}


/* 
    This should be the blueprint of the object:
    obj = {
        space: "cubicle",
        start: 'starTime',
        end: 'endTime',
        phoneNumber: value,
        seatIDs: []
    }
    Refer usefulQueries file in database directory.
*/
// Function to make reservations. 
// !This should also be used for making updates/reschedules in the table.
const makeReservation = async (obj) => {
    let {space, start, end, phoneNumber, seatIDs} = obj
    await seatIDs.forEach((seat) => {
        let updateTableScript = `UPDATE reservation."${space}" SET "bookedBoolean"=true, "reservedUser"=${phoneNumber}, "bookingStartTime"='${start}', "bookingEndTime"='${end}' WHERE "seatID" = ${seat};`
        client.query(updateTableScript)
    })
}

/* 
    let obj = {
        space: value,
        seatIDArr: [values]
    }
    This should be the blueprint of the object for cancel reservation method. Refer usefulQueries file in database directory.
*/
//This will cancel reservation.
const cancelReservation = async (obj) => {
    let {space, seatIDArr} = obj
    seatIDArr.forEach((seat) => {
        let resetRowScript = `UPDATE reservation."${space}" SET "bookedBoolean"=false, "reservedUser"=null, "bookingStartTime"=null, "bookingEndTime"=null WHERE "seatID" = ${seat};`
        console.log(resetRowScript)
    })
}

const populateFunctions = {
    generateIDsForConferenceRoom,
    insertInConferenceRoom,
    generateIDsForCubicle,
    insertInCubicle,
    generateIDsForHotSeat,
    insertInHotSeat,
    generateIDsForPrivateOffice,
    insertInPrivateOffice,
    deleteRowsInSingleTable,
    deleteRowsInAllTable,
    populateSpacesTable,
    countRowsReserved,
    populateSpacesTable,
    refreshTable,
    refreshAllTables,
    makeReservation,
    cancelReservation,
    countRowsAvailable
} 

module.exports = populateFunctions
