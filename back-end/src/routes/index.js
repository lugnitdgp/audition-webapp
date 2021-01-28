let UserModel = require("../models/user.model");
var jwt = require("jsonwebtoken");
let DashModel = require("../models/dash.model");
const fs = require("fs");
let RoundModel = require("../models/round.model");
const path = require("path");
const { sendMail } = require("../../services/reportSender");

const upload = require("../../services/upload");
const { uploadImage, getImages } = require("../controller/appController");

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
    else{ 
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
      var user = new DashModel({
        uid: req.user._id,
        name: req.user.UserName,
        email: req.user.email,
      });

      user.save();

      res.redirect(`${process.env.FRONTEND}?token=${token}`);
    }
  );

  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
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
      var user = new DashModel({
        uid: req.user._id,
        name: req.user.UserName,
        email: req.user.email,
      });

      user.save();

      res.redirect(`${process.env.FRONTEND}?token=${token}`);
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
        save = JSON.stringify({
          round: save.round,
          status: "res",
        });
        var rejected = "";
        DashModel.find({ $or: [{ status: "review" }, { status: "unevaluated" }], $and:[{role: 's'}] }).then((userdoc) => {
          console.log(userdoc)
          if (!userdoc.length) {
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
                    var userNew = user;
                    userNew.status = "unevaluated";
                    userNew.round = userNew.round + 1;
                    userNew.time = 0;
                    DashModel.findByIdAndUpdate(user._id, userNew).then((res) => {
                      sendMail(
                        "Congratulations!",
                        `Hi ${user.name}.\nWe are glad to inform you that you will be moving ahead in the audition process. Further details will be let known very soon.\nMay The Source Be With You!\n\nThanking You,\nYours' Sincerely,\nRohan Rao\n(Junior Member, GLUG)`,
                        user.email
                      );
                    });
                  }
                });
              })
              .then(() => {
                const rejectedones = rejected.slice(0, -1);
                sendMail(
                  "Thank you for your participation.",
                  "Hi there.\nWe announce with a heavy heart that you will not be moving ahead in the audition process. However, the GNU/Linux User's Group will always be there to help your every need to the best of our abilities.\nMay The Source Be With You!\n\nThanking You,\nYours' Sincerely,\nRohan Rao\n(Junior Member, GLUG)",
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

        if (save.round === roundNo && save.status === "ong") {
          var studentdata = []
          DashModel.findOne({ uid: req.user._id }).then((doc) => {
            if (!doc) throw err;
            else if (doc.time >= currenttime && doc.round === roundNo) {
              studentdata = doc;
              studentdata.answers.forEach((round) => {
                if (round.roundNo === roundNo) {
                  var foundques = false;
                  round.questions.forEach((question) => {

                    if (question.qid === qid) {
                      question.answer = answer;
                      foundques = true;
                    }
                  });
                  if (foundques == false) {
                    round.questions.push({
                      qid: qid,
                      answer: answer,
                      qtype: qtype,
                    });

                  }

                }
              })
              if (studentdata.answers.length === 0) {
                studentdata.answers = [
                  {
                    roundNo: roundNo,
                    questions: [
                      {
                        qid: qid,
                        answer: answer,
                        qtype: qtype,
                      }
                    ]
                  }
                ]
              }
            } else {
              res.sendStatus(401);
            }
          }).then(() => {
            DashModel.findByIdAndUpdate(studentdata._id, studentdata).then(
              () => {
                res.sendStatus(200);
              }
            );
          });
        } else {
          res.sendStatus(401);
        }
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
        if (doc.round === save.round && save.status === "ong") {
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

        if (save.round === round.roundNo && save.status === "ong") {
          var studentdata = [];
          DashModel.findOne({ uid: req.user._id }).then((doc) => {
            if (!doc) throw err;
            else if (doc.time >= currenttime && doc.round === round.roundNo) {
              studentdata = doc;
              var roundfound = false
              studentdata.answers.map((internalround) => {
                if (round.roundNo === internalround.roundNo) {
                  internalround.questions = round.questions;
                  roundfound = true
                }
              })

              if (roundfound === false || studentdata.answers.length === 0) {
                studentdata.answers.push(round)
              }


              ///
            } else res.sendStatus(401)
          }).then(() => {
            DashModel.findByIdAndUpdate(studentdata._id, studentdata).then(
              () => {
                res.sendStatus(200);
              }
            );
          })
        } else res.sendStatus(401);
      } else res.sendStatus(401);
    }
  );

  app.get("/student/get", passport.authenticate("jwt", { session: false }),
    (req, res) => {
      DashModel.findOne({ uid: req.user._id }).then((kid)=>{
        if (!kid) res.sendStatus(404);
        res.status(200).json({ studenttime:kid.time, studentround:kid.round});
      })
    }
  )
};
