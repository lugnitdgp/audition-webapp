let UserModel = require("../models/user.model");
var jwt = require("jsonwebtoken");
let DashModel = require("../models/dash.model");
const fs = require("fs");
let RoundModel = require("../models/round.model");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require("path");
const { sendMail } = require("../../services/reportSender");

const upload = require("../../services/upload");
const { uploadImage, getImages } = require("../controller/appController");
const e = require("express");

module.exports = function (app, passport) {
 require("../../passport/passportjwt")(passport);
 require("../../passport/passportgoogle")(passport);
 require("../../passport/passportgithub")(passport);

 //////////////////////////////////////////////
 //          UPLOAD
 //////////////////////////////////////////

 app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file && req.file.path) {
   return res.status(200).json({ link: req.file.path });
  }
  else {
   return res.status(200).json({ link: false });
  }
 });

 //////////////////////////////////
 //        HOME
 //////////////////////////////////

 app.get("/", function (req, res) {
  res.json("welcome");
 });

 ////////////////////////////////
 //      FLAG
 ///////////////////////////////

 // app.post("/flag", (req, res) => {
 //   console.log("backend" + req.body._id);
 //   const id = req.body._id;
 //   UserModel.findByIdAndUpdate(id, { flag: true }, (err, user) => {
 //     if (err) throw err;
 //     else {
 //       return res.json("done");
 //     }
 //   });
 // });

 /////////////////////////////////////////////////
 //          Rounds
 ///////////////////////////////////////////////

 app.post(
  "/addRound",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
   if (req.user.role === "m" || req.user.role === "su") {
    var total = 0;
    await RoundModel.find().then((doc) => {
     if (!doc) total = 0;
     else total = doc.length;
    });
    console.log(total);
    console.log(req.body);
    var round = new RoundModel({
     roundNo: total + 1,
     time: req.body.time,
     questions: req.body.questions,
    });
    round.save().then(() => {
     res.json({ success: true });
    });
   } else return res.sendStatus(401);
  }
 );

 //Read

 app.get(
  "/getRounds",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
   if (req.user.role === "m" || req.user.role === "su") {
    await RoundModel.find().then((doc) => {
     if (!doc) return res.json({ success: false });
     else return res.send(doc);
    });
   } else return res.sendStatus(401);
  }
 );

 //Update

 app.put(
  "/updateRound",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
   if (req.user.role === "m" || req.user.role === "su") {
    await RoundModel.findByIdAndUpdate(
     req.body.round._id,
     req.body.round
    ).then(res.sendStatus(202));
   } else res.sendStatus(401);
  }
 );

 //Delete

 app.delete(
  "/updateRound",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
   if (req.user.role === "m" || req.user.role === "su") {
    await RoundModel.findByIdAndDelete(req.body.id).then(() => {
     res.sendStatus(200);
    });
   } else res.sendStatus(401);
  }
 );
 //////////////////////////////////////////////////////

 //                  AUTH

 /////////////////////////////////////////////

 app.post("/auth/signup", function (req, res) {
  var newUser = new UserModel({
   UserName: req.body.UserName,
   email: req.body.email,
   password: req.body.password,
   role: req.body.role,
  });
  UserModel.createUser(newUser, function (err, user) {
   if (err) {
    res.json({ success: false, message: "User is not registered.." });
   } else {
    if (user.role === "s") {
     var user = new DashModel({
      uid: user._id,
      name: user.UserName,
      email: user.email,
     });

     user.save();
    }

    res.json({ success: true, message: "User is registered.." });
   }
  });
 });

 app.post("/auth/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email + " " + password);
  UserModel.getUserByEmail(email, function (err, user) {
   if (err) {
    throw err;
   }
   if (!user) {
    return res.json({ success: false, message: "No user found" });
   }
   UserModel.comparePassword(
    password,
    user.password,
    function (err, isMatch) {
     if (err) {
      throw err;
     }
     if (isMatch) {
      const payload = {
       id: user._id,
       UserName: user.UserName,
       email: user.email,
       // password: user.password,
       role: user.role,
       clearance: user.clearance
      };
      var token = jwt.sign(payload, process.env.SECRET, {
       expiresIn: 600000,
      });

      if (user.role === "m" || user.role === "su") {
       res.json({
        success: true,
        token: "Bearer " + token,
        admin: user.UserName,
       });
      } else {
       res.json({
        success: true,
        token: "Bearer " + token,
       });
      }
     } else {
      return res.json({
       success: false,
       message: "Password does not match",
      });
     }
    }
   );
  });
 });

 app.get("/auth/logout", function (req, res) {
  req.logout();
  res.send("Logged out successfully");
 });

 app.get(
  "/auth/google",
  passport.authenticate("google", {
   scope: ["email", "profile"],
  })
 );

 app.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
   const payload = {
    id: req.user._id,
    UserName: req.user.UserName,
    email: req.user.email,
    //  password: req.user.password,
    role: req.user.role,
    clearance: req.user.clearance
   };
   var token = jwt.sign(payload, process.env.SECRET, { expiresIn: 600000 });
   DashModel.findOne({ email: req.user.email }).then((doc) => {
    if (!doc) {
     var user = new DashModel({
      uid: req.user._id,
      name: req.user.UserName,
      email: req.user.email,
     });
     user.save();
     res.redirect(`${process.env.FRONTEND}?token=${token}`);
    } else {
     if (req.user.mode === 'google')
      res.redirect(`${process.env.FRONTEND}?token=${token}`);
     else
      res.redirect(`${process.env.FRONTEND}register?error=email`);
    }
   })
  }
 );

 app.get(
  "/auth/github",
  passport.authenticate("github")
 );

 app.get(
  "/auth/github/redirect",
  passport.authenticate("github"),
  function (req, res) {
   const payload = {
    id: req.user._id,
    UserName: req.user.UserName,
    email: req.user.email,
    //  password: req.user.password,
    role: req.user.role,
    clearance: req.user.clearance
   };
   var token = jwt.sign(payload, process.env.SECRET, { expiresIn: 600000 });
   DashModel.findOne({ email: req.user.email }).then((doc) => {
    if (!doc) {
     var user = new DashModel({
      uid: req.user._id,
      name: req.user.UserName,
      email: req.user.email,
     });
     user.save();
     res.redirect(`${process.env.FRONTEND}?token=${token}`);
    } else {
     if (req.user.mode === 'github')
      res.redirect(`${process.env.FRONTEND}?token=${token}`);
     else
      res.redirect(`${process.env.FRONTEND}register?error=email`);
    }
   })
  }
 );

 /////////////////////////////////////

 //              USERMGMT

 /////////////////////////////////////

 app.get(
  "/protected/getUsers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   console.log(req.user);
   if (req.user.role === "m" || req.user.role === "su") {
    try {
     DashModel.find().then((doc1) => {
      return res.status(200).json({ doc: doc1, user: req.user.UserName });
     });
    } catch (err) {
     res.sendStatus(404);
    }
   } else {
    UserModel.findByIdAndUpdate(
     req.user._id,
     { flag: true },
     (err, user) => {
      if (err) throw err;
      else {
       res.sendStatus(401);
      }
     }
    );
   }
  }
 );

 app.post(
  "/protected/getUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "m" || req.user.role === "su") {
    try {
     DashModel.findById(req.body.id).then((doc1) => {
      res.json(doc1);
     });
    } catch (err) {
     res.sendStatus(404);
    }
   } else {
    UserModel.findByIdAndUpdate(
     req.user._id,
     { flag: true },
     (err, user) => {
      if (err) throw err;
      else {
       res.sendStatus(401);
      }
     }
    );
   }
  }
 );

 // UPDATE STUDENT STATUS AND FEEDBACK

 app.put(
  "/protected/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   var a = req.body;
   if (
    req.user.role === "su" ||
    (req.user.role === "m" && req.user.clearance >= a.round)
   ) {
    DashModel.replaceOne({ _id: req.body._id }, a).then((doc) => {
     return res.status(202).json({ message: "Changes have been saved" });
    });
   } else {
    return res.sendStatus(401);
   }
  }
 );

 app.put(
  "/protected/feedback",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   var a = req.body;
   if (
    req.user.role === "su" ||
    (req.user.role === "m")
   ) {
    DashModel.replaceOne({ _id: req.body._id }, a).then((doc) => {
     return res.status(202).json({ message: "Changes have been saved" });
    });
   } else {
    return res.sendStatus(401);
   }
  }
 );

 /// PURGE


 //////////////////////////////////
 //       SUPERUSER COMMANDS
 /////////////////////////////////

 app.put(
  "/protected/changerole",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "su") {
    console.log(req.user);
    var id = req.body._id;
    var role = req.body.role;
    UserModel.findByIdAndUpdate(id, { role: role }, (err, user) => {
     if (err) throw err;
     else {
      console.log(user);
     }
    }).then(() => {
     DashModel.findOneAndUpdate({ uid: id }, { role: role }, (err, dash) => {
      if (err) throw err;
      else {
       console.log(dash)
       res.sendStatus(202)
      }
     })
    });
   } else {
    res.sendStatus(401);
   }
  }
 );

 app.put(
  "/protected/setclearance",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "su") {
    var id = req.body._id;
    var clearance = req.body.clearance;
    UserModel.findByIdAndUpdate(
     id,
     { clearance: clearance },
     (err, user) => {
      if (err) throw err;
      else {
       res.sendStatus(202);
      }
     }
    );
   } else {
    res.sendStatus(401);
   }
  }
 );

 app.post(
  "/protected/pushround",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "su") {
    let save = JSON.parse(
     fs.readFileSync(
      path.resolve(__dirname + "../../../config/auditionConfig.json")
     )
    );

    save.round = save.round + 1;
    save.status = "ong";

    RoundModel.findOne({ roundNo: save.round }).then((doc) => {
     if (!doc) {
      res.sendStatus(400)
     } else {
      save.time = doc.time;
      save = JSON.stringify(save);
      fs.writeFileSync(
       path.resolve(__dirname + "../../../config/auditionConfig.json"),
       save
      );
      res.sendStatus(200);
     }
    });

   } else {
    res.sendStatus(401);
   }
  }
 );

 app.post(
  "/protected/stopround",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "su") {
    let save = JSON.parse(
     fs.readFileSync(
      path.resolve(__dirname + "../../../config/auditionConfig.json")
     )
    );

    save.round = save.round;
    save.status = "def";

    save = JSON.stringify(save);
    fs.writeFileSync(
     path.resolve(__dirname + "../../../config/auditionConfig.json"),
     save
    );
    res.sendStatus(200);
   } else {
    res.sendStatus(300);
   }
  }
 );

 app.post(
  "/protected/pushresult",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "su") {
    let save = JSON.parse(
     fs.readFileSync(
      path.resolve(__dirname + "../../../config/auditionConfig.json")
     )
    );
    var round = save.round
    save = JSON.stringify({
     round: save.round,
     status: "res",
    });
    var csvobject = []
    var rejected = "";
    DashModel.find({ $or: [{ status: "review" }, { status: "unevaluated" }], $and: [{ role: 's' }, { round: Number(round) }] }).then((userdoc) => {
     console.log(userdoc)
     if (!userdoc.length) {
      fs.closeSync(fs.openSync(path.resolve(__dirname + `../../../result/Result_${round}.csv`), 'w'))

      fs.writeFileSync(
       path.resolve(__dirname + "../../../config/auditionConfig.json"),
       save
      );
      DashModel.find()
       .then((doc) => {
        doc.forEach((user) => {
         if (user.status === "rejected") {
          rejected += user.email + ",";
         } else if (user.status === "selected") {
          csvobject.push(user)
          var userNew = user;
          userNew.status = "unevaluated";
          userNew.round = userNew.round + 1;
          userNew.time = 0;
          DashModel.findByIdAndUpdate(user._id, userNew).then((res) => {
           sendMail(
            "Congratulations!",
            `<html>Hi ${user.name}.<br/><br/>We are glad to inform you that you were shortlisted in Round ${round}.<br/> You will be moving ahead in the audition process.<br/>Further details will be let known very soon.<br/><br/>May The Source Be With You!<br/><br/>Thanking You,<br/>Your's Sincerely,<br/>GNU/Linux Users' Group, NIT Durgapur.</html>`,
            user.email
           );
          });
         }
        });
       })
       .then(() => {
        const csvWriter = createCsvWriter({
         path: path.resolve(__dirname + `../../../result/Result_${round}.csv`),
         header: [
          { id: 'name', title: 'Name' },
          { id: 'email', title: 'Email' },
          { id: 'phone', title: 'Phone' },
         ]
        });

        csvWriter
         .writeRecords(csvobject)
         .then(() => console.log('The CSV file was written successfully'));

        const rejectedones = rejected.slice(0, -1);
        sendMail(
         "Thank you for your participation.",
         "<html>Hi there.<br/>We announce with a heavy heart that you will not be moving ahead in the audition process.<br/><br/>However, the GNU/Linux User's Group will always be there to help your every need to the best of our abilities.<br/>May The Source Be With You!<br/><br/>Thanking You,<br/>Yours' Sincerely,<br/>GNU/Linux Users' Group, NIT Durgapur.</html>",
         rejectedones
        );
       })
       .then(() => {
        return res.status(201).send({ status: true });
       })
     } else {
      res.status(200).send({ status: false })
     }
    })

   } else {
    res.sendStatus(401);
   }
  }
 );

 app.post("/profile", passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "s") {
    DashModel.findOneAndUpdate(
     { uid: req.user._id },
     { roll: req.body.roll, profilebool: true, phone: req.body.phone },
     { upsert: true },
     (err, user) => {
      if (err) throw err;
      else {
       res.sendStatus(202);
      }
     }
    );
   } else res.sendStatus(401)
  })

 app.get("/profile", passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "s") {
    DashModel.findOne({ uid: req.user._id }).then(doc => {
     res.status(200).json({ phone: doc.phone, roll: doc.roll, profilebool: doc.profilebool })
    })
   }
  })

 app.get("/getResult", (req, res) => {
  let save = JSON.parse(
   fs.readFileSync(
    path.resolve(__dirname + "../../../config/auditionConfig.json")
   )
  );

  if (save.status === "res") {
   DashModel.find({ status: "unevaluated", round: save.round + 1 }).then((doc) => {
    res.status(200).send(doc)
   })
  }
  else {
   res.sendStatus(401)
  }
 })

 app.get("/auditionstatus", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../config/auditionConfig.json"));
 });

 //////////////////////////////////
 //        STUDENT ROUTES
 //////////////////////////////////

 app.put(
  "/student/answer",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "s") {
    var qid = req.body.qid;
    var qtype = req.body.qtype;
    var answer = req.body.answer;
    var roundNo = req.body.round;
    var ansLink = req.body.ansLink;

    var currenttime = new Date().getTime();

    let save = JSON.parse(
     fs.readFileSync(
      path.resolve(__dirname + "../../../config/auditionConfig.json")
     )
    );

    DashModel.findOne({ uid: req.user._id }).then((doc) => {

     if (save.round === roundNo && save.status === "ong" && doc.time >= currenttime && doc.round === roundNo) {
      if (doc.answers.length) {
       indexround = doc.answers.findIndex(round => round.roundNo === roundNo)
       if (indexround === -1) {
        doc.answers.push({ roundNo: roundNo, questions: [{ qid: qid, qtype: qtype, answer: answer }] })
        doc.save().then(() => {
         res.sendStatus(200)
        })
       } else {
        indexques = doc.answers[indexround].questions.findIndex(question => question.qid === qid)
        if (indexques === -1) {
         doc.answers[indexround].questions.push({ qid: qid, qtype: qtype, answer: answer })
         doc.save().then(() => {
          res.sendStatus(200)
         })
        } else {
         doc.answers[indexround].questions[indexques].answer = answer
         doc.save().then(() => {
          res.sendStatus(200)
         })
        }
       }

      } else {
       doc.answers = [{ roundNo: roundNo, questions: [{ qid: qid, qtype: qtype, answer: answer }] }]
       doc.save().then(() => {
        res.sendStatus(200)
       })
      }
     }
     else res.sendStatus(401)
    })



   } else {
    res.sendStatus(401);
   }
  }
 );

 app.get(
  "/student/getRound",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
   let save = JSON.parse(
    fs.readFileSync(
     path.resolve(__dirname + "../../../config/auditionConfig.json")
    )
   );
   await DashModel.findOne({ uid: req.user._id }).then((doc) => {
    if ((req.user.role === 's' && doc.round === save.round && save.status === "ong") || (req.user.role === 'su' || req.user.role === 'm')) {
     if (doc.time === 0) {
      var a = doc;
      a.time = new Date().getTime() + save.time * 60000 + 2000;
      DashModel.findOneAndUpdate({ uid: req.user._id }, a).then(() => {
       RoundModel.findOne({ roundNo: save.round }).then((round) => {
        if (!round) res.sendStatus(404);
        res.status(200).json({ round: round, time: a.time });
       });
      });
     } else {
      RoundModel.findOne({ roundNo: save.round }).then((round) => {
       if (!round) res.sendStatus(404);
       res.status(200).json({ round: round, time: doc.time });
      });
     }
    }
    else {
     res.sendStatus(401);
    }
   });

  }
 );

 app.get("/student/getAnswers", passport.authenticate("jwt", { session: false }), async function (req, res) {
  let save = JSON.parse(
   fs.readFileSync(
    path.resolve(__dirname + "../../../config/auditionConfig.json")
   )
  );

  await DashModel.findOne({ uid: req.user._id }).then((doc) => {
   if (!doc) res.sendStatus(401)
   doc.answers.forEach((round) => {
    if (round.roundNo === save.round) {
     var a = round.questions
     res.json({ answers: a })
    }
   })
   res.sendStatus(404)
  })

 })

 app.put(
  "/student/answerround",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   if (req.user.role === "s") {
    var currenttime = new Date().getTime();
    var round = req.body.round

    let save = JSON.parse(
     fs.readFileSync(
      path.resolve(__dirname + "../../../config/auditionConfig.json")
     )
    );

    console.log(round)

    DashModel.findOne({ uid: req.user._id }).then((doc) => {
     if (save.round === round.roundNo && save.status === "ong" && doc.time >= currenttime && doc.round === round.roundNo) {
      if (doc.answers.length) {

       console.log(doc)
       indexround = doc.answers.findIndex(findround => findround.roundNo === round.roundNo)
       if (indexround === -1) {
        doc.answers.push(round)
        console.log(doc)
        doc.save().then(() => {
         res.sendStatus(200)
        })
       } else {
        doc.answers[indexround] = round
        doc.save().then(() => {
         res.sendStatus(200)
        })
       }

      } else {
       doc.answers.push(round)
       doc.save().then(() => {
        res.sendStatus(200)
       })
      }
     } else res.sendStatus(401)
    }

    )

   } else res.sendStatus(401);
  }
 );

//  app.get("/mailcheck",(req,res)=>{
//   sendMail(
//     "Congratulations!",
//     `<html>Hello Rohan<br/>GG WP<br/><br/>Regards,<br/>GLUG</html>`,
//     "rohanrao.dec11@gmail.com"
//    );
//    res.sendStatus(200)
//  })

 app.get("/student/get", passport.authenticate("jwt", { session: false }),
  (req, res) => {
   DashModel.findOne({ uid: req.user._id }).then((kid) => {
    if (!kid) res.sendStatus(404);
    res.status(200).json({ studenttime: kid.time, studentround: kid.round });
   })
  }
 )

 app.post("/wildcard", passport.authenticate("jwt", { session: false }),
 (req, res) => {
  if(req.user.role === 'su'){
  let save = JSON.parse(
    fs.readFileSync(
     path.resolve(__dirname + "../../../config/auditionConfig.json")
    )
   );
  DashModel.findOne({ uid: req.body.uid }).then((kid) => {
   if (!kid) res.sendStatus(404);
    kid.round = save.round
    kid.status = "unevaluated"
    kid.save().then(()=>{
      res.sendStatus(200)
    })
  })
 }else{
   res.sendStatus(401)
 }
}
)
 
};
