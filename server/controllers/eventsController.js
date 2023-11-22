const Event = require("../models/events");
const mailTransporter = require("../config/mailer");

const path = require("path");
const fs = require("fs");
const mailTemplatePath = path.join(
  __dirname,
  "..",
  "mailTemplate",
  "event.html"
);
const eventTemplate = fs.readFileSync(mailTemplatePath, "utf8");

module.exports.addEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    if (!event) {
      throw new Error("Event not published");
    } else {
      res.status(201).json({ message: "Event published successfully", event });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

module.exports.getEvents = async (req, res) => {
  try {
    const currentDate = new Date(); // Get the current date and time
    currentDate.setHours(0, 0, 0, 0); // Set the time to the start of the day

    const events = await Event.find({ eventDate: { $gte: currentDate } });

    // events.eventDate
    if (!events || events.length === 0) {
      throw new Error("unable to fetch event");
    } else {
      res.status(200).json({ message: "Event fetched successfully", events });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports.getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.body.id);
    if (!event) {
      throw new Error("unable to fetch event");
    } else {
      res.status(200).json({ message: "Event fetched successfully", event });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

module.exports.deleteEvent = async (req, res) => {
  const { _id } = req.body;
  console.log(req.body);
  try {
    const event = await Event.findByIdAndDelete(_id);
    if (!event) {
      throw new Error("unable to delete event");
    } else {
      res.status(200).json({ message: "Event deleted successfully", event });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

module.exports.bookEvent = async (req, res) => {
  const { name, email, rollno, formattedDate, event } = req.body;
  const emailContent = eventTemplate
    .replace("[USER_NAME]", name)
    .replace("[USER_ROLLNO]", rollno)
    .replace("[EVENT_NAME]", event.eventName)
    .replace("[EVENT_PLACE]", event.eventPlace)
    .replace("[EVENT_DATE]", formattedDate);

  try {
    const eventDoc = await Event.findById(event._id);
    if (!eventDoc) {
      throw new Error("Unable to book event");
    }

    const availableSeats = parseInt(eventDoc.seats, 10);

    if (availableSeats <= 0) {
      throw new Error("No available seats for this event");
    }

    const isEmailOrRollnoExists = eventDoc.booked.some(
      (booking) => booking.email === email || booking.rollno === rollno
    );

    if (isEmailOrRollnoExists) {
      throw new Error("Email or rollno already exists in the booking list");
    }

    const bookingDetails = {
      name,
      email,
      rollno,
    };

    eventDoc.seats = (availableSeats - 1).toString();

    eventDoc.booked.push(bookingDetails);

    await eventDoc.save();

    let details = {
      from: "ubooking3@gmail.com",
      to: email,
      subject: 'Event booking update',
      html: emailContent,
    };

    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log(`Error sending ${item} email:`, err);
      } else {
        console.log(`${item} email sent to recipients:`, meal.recipients);
      }
    });

    res.status(201).json({ message: "Event booked successfully", event: eventDoc });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// const path = require("path");
// const fs = require("fs");
// const mealTemplatePath = path.join(
//   __dirname,
//   "..",
//   "mailTemplate",
//   "meal.html"
// );
// const mealTemplate = fs.readFileSync(mealTemplatePath, "utf8");

// module.exports.signIn = async (req, res) => {
//   try {
//   } catch (err) {}
// };

// module.exports.signUp = async (req, res) => {
//   try {
//   } catch (err) {}
// };

// module.exports.addUser = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     } else {
//       const userData = req.body;
//       const userImage = req.file.filename;
//       const newUser = await User.create({ ...userData, imgUrl: userImage });
//       res.status(200).json({ message: "File uploaded successfully", newUser });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
// };

// module.exports.getSingleUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       res.status(204).json({ message: "empty data", users: [] });
//     }

//     const currentDateStr = new Date().toISOString().split("T")[0];
//     const userFoodDataStr = user.foodData.toISOString().split("T")[0];

//     if (currentDateStr !== userFoodDataStr) {
//       user.foodData = new Date();
//       user.breakfast = false;
//       user.lunch = false;
//       user.dinner = false;
//       await user.save();
//     }

//     res.status(200).json({ message: "fetched successfully", user });
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding user" });
//   }
// };

// module.exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     if (!users) {
//       res.status(204).json({ message: "empty data", users: [] });
//     } else {
//       res.status(201).json({ message: "fetched successfully", users });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding users" });
//   }
// };

// module.exports.userMeal = async (req, res) => {
//   const { item, student } = req.body;

//   const emailContent = mealTemplate
//     .replace("[MEAL_TYPE]", item)
//     .replace("[STUDENT_NAME]", student.name)
//     .replace("[LINK]", `http://localhost:3000/feedback-form/${student._id}`)
//     .replace("[STUDENT_ROLLNO]", student.rollNo);

//   let details = {
//     from: "satyamchawla999@gmail.com",
//     to: [student.studentEmail, student.guardianEmail],
//     subject: `${item} Update and Feedback`,
//     html: emailContent,
//   };

//   try {
//     const user = await User.findById(student._id);
//     if (!user) {
//       res.status(204).json({ message: "empty data", users: [] });
//     }

//     if (item === "Breakfast") {
//       user.breakfast = true;
//       await user.save();
//     }

//     if (item === "Lunch") {
//       user.lunch = true;
//       await user.save();
//     }

//     if (item === "Dinner") {
//       user.dinner = true;
//       await user.save();
//     }

//     mailTransporter.sendMail(details, (err) => {
//       if (err) {
//         console.log(`Error sending ${item} email:`, err);
//       } else {
//         console.log(`${item} email sent to recipients:`, meal.recipients);
//       }
//     });

//     return res.status(200).json({ message: `${item} successfull`, user });
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding users" });
//   }
// };

// module.exports.deleteUser = async (req, res) => {
//   const { _id } = req.body;
//   console.log(_id);
//   try {
//     if (_id) {
//       const user = await User.findByIdAndDelete(_id);
//       res.status(200).json({ message: "deleted successfully!", user });
//     } else {
//       res.status(204).json({ message: "error in deleting user!" });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding users" });
//   }
// };

// module.exports.addFeedback = async (req, res) => {
//   // console.log(req.body);
//   const { feedback, studentForm } = req.body;

//   try {
//     const data = {
//       feedback,
//       email:studentForm.studentEmail,
//       name:studentForm.name,
//       imgUrl:studentForm.imgUrl
//     }
//     const newFeedback = await FeedbackSchema.create(data);

//     if(newFeedback) {
//       res.status(200).json({ message: "submitted successfully!" });
//     } else {
//       res.status(204).json({ message: "error in submitted feedback!" });
//     }

//   } catch (err) {
//     console.log(err)
//     return res.status(400).json({ message: "error in finding users" });
//   }
// };

// module.exports.getFeedbacks = async (req, res) => {
//   try {
//     const feedbacks = await FeedbackSchema.find();
//     if (!feedbacks) {
//       res.status(204).json({ message: "empty data", feedbacks: [] });
//     } else {
//       res.status(201).json({ message: "fetched successfully", feedbacks });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "error in finding feedbacks" });
//   }
// };
