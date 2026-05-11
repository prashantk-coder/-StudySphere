// const mongoose = require("mongoose");
// require("dotenv").config();

// exports.connect = () => {
//     mongoose.connect(process.env.MONGODB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology:true,
//     })
//     .then(() => console.log("DB Connected Successfully"))
//     .catch( (error) => {
//         console.log("DB Connection Failed");
//         console.error(error);
//         process.exit(1);
//     } )
// };


const mongoose = require("mongoose");
require("dotenv").config();

async function backfillCourseStudentsEnrolled() {
  try {
    const Course = require("../models/Course")
    // Copy legacy typo field -> canonical field when missing/empty.
    // Uses MongoDB update-with-pipeline for safe server-side copy.
    const res = await Course.updateMany(
      {
        $or: [
          { studentsEnrolled: { $exists: false } },
          { studentsEnrolled: { $size: 0 } },
        ],
        studentsEnroled: { $exists: true },
      },
      [
        {
          $set: {
            studentsEnrolled: "$studentsEnroled",
          },
        },
      ]
    )
    if (res?.modifiedCount) {
      console.log(`Backfilled studentsEnrolled for ${res.modifiedCount} courses`)
    }
  } catch (e) {
    console.warn("studentsEnrolled backfill skipped:", e?.message || e)
  }
}

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(async () => {
      console.log("DB Connected Successfully")
      await backfillCourseStudentsEnrolled()
    })
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};