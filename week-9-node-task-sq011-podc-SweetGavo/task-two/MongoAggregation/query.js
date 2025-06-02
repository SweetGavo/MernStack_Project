import db from "./restaurants.json";
// find Id, name, borough and cuisine for those restaurants with 'Reg'
db.find(
  { address: { $regex: /Reg/ } },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
);

// find  borough Bronx , American || Chinese dish.
db.rest.find(
  { borough: "Bronx", cuisine: { $in: ["American ", "Chinese"] } },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
);

// find Id, name, borough and cuisine for borough Staten Island || Queens || Bronxor Brooklyn.
db.rest.find(
  {
    $or: [
      { borough: "Staten Island" },
      { borough: "Bronxor Brooklyn" },
      { borough: "Queens" },
    ],
  },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
);

// find Id, name, borough and cuisine for those  not in borough Staten Island || Queens || Bronxor Brooklyn.
db.rest.find(
  { borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
);

// find Id, name, borough and cuisine ,where score is <= 10.
db.rest.find(
  { "grades.score": { $lte: 10 } },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
);

// find Id, name, borough and cuisine for dish except 'American' and 'Chinees' || restaurant's name begins with 'Wil'
db.rest.find(
  {
    $nor: [{ cuisine: { $in: ["American ", "Chinese"] } }, { name: /^Wil.*/ }],
  },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 },
);

// find Id, name, a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z"
db.rest.find(
  {
    grades: {
      $elemMatch: {
        date: ISODate("2014-08-11T00:00:00Z"),
        grade: "A",
        score: 11,
      },
    },
  },
  { _id: 0, restaurant_id: 1, name: 1, grades: 1 },
);

// find Id, name and grades ,where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".
db.rest
  .find(
    {
      $and: [
        { "grades.1.grade": "A" },
        { "grades.1.score": 9 },
        { "grades.1.date": ISODate("2014-08-11T00:00:00Z") },
      ],
    },
    { _id: 0, restaurant_id: 1, name: 1, grades: 1 },
  )
  .pretty();

// find Id, name, address and geographical location, where 2nd element of coord array contains a value > 42 and upto <= 52..
db.rest.find(
  {
    $and: [
      { "address.coord.1": { $gt: 42 } },
      { "address.coord.1": { $lte: 52 } },
    ],
  },
  { _id: 0, restaurant_id: 1, name: 1, address: 1 },
);

// name resturants in ascending order.
db.rest.find({}, { _id: 0, name: 1 }).sort({ name: 1 });

// name resturants in descending order.
db.rest.find({}, { _id: 0, name: 1 }).sort({ name: -1 });

// arranged the name of the cuisine in ascending order and cuisine borough in descending order.
db.rest
  .find({}, { _id: 0, cuisine: 1, borough: 1 })
  .sort({ cuisine: 1, borough: -1 });

// all the addresses contains the street or Not
db.rest.find({ "address.street": { $regex: /Street/ } }).pretty();
db.rest.find({ "address.street": { $ne: { $regex: /Street/ } } }).pretty();
