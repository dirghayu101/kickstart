// UPDATE reservation."privateOffice" SET "bookedBoolean"=false, "reservedUser"=null, "bookingStartTime"=null, "bookingEndTime"=null WHERE "bookingEndTime" <= timestamp '2022-9-28 15:0:20';


/*
 INSERT INTO reservation."privateOffice"(
	"seatID", "bookedBoolean", "reservedUser", "bookingStartTime", "bookingEndTime")
	VALUES (802, true, 69348573948, '2022-9-28 10:5:36', '2022-9-28 12:5:36'),(803, true, 89348573948, '2022-9-28 10:5:36', '2022-9-28 12:5:36');
 */


//! The makeReservationObj was making a successful reservation query while testing.
/*
let makeReservationObj = {
  space: 'privateOffice',
  start: '2022-9-28 10:5:36',
  end: '2022-9-28 12:5:36',
  phoneNumber: 7668722367,
  seatIDs: [401, 402, 403]
}
*/

//! The cancelReservationObj resets the row successfully.
/*
let cancelReservationObj = {
	space: "privateOffice",
	seatIDArr: [401, 402]
}
*/