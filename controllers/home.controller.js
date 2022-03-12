const Employee = require("../models/employee");
const UserImage = require("../models/image");
const path = require("path");
const mongoose = require("mongoose");

exports.getHomePage = async (req, res) => {
  try {
    const employee = await Employee.find();

    if (employee) {
      // res.status(200).json(employee);
      res.render("index", { datas: employee });
    } else {
      res.render("index", {});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

exports.importData = async (req, res) => {
  // let data = req.file.filename;
  // console.log(data);
  let { email } = req.body;

  try {
    // let userImage = await UserImage.findOne({ name: data });

    // if (!userImage) {
    //   userImage = new UserImage({
    //     name: data,
    //   });
    //   await userImage.save();
    // }

    let employee = await Employee.findOne({ email: email });

    if (employee) {
      res.redirect("/");
    } else {
      employee = new Employee({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        etype: req.body.etype,
        hourlyRate: req.body.hourlyRate,
        totalRate: req.body.totalRate,
        totalAmount: req.body.totalAmount,
      });
      await employee.save();
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  let { id } = req.body;

  try {
    let employee = await Employee.deleteOne({ _id: id });

    console.log(employee);

    if (employee.deletedCount == 1) {
      res.status(200).json({
        errorcode: 0,
        meg: "Employee Deleted Successfully",
      });
    } else {
      res.status(500).json({
        errorcode: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      errorcode: 1,
    });
  }
};

exports.filterUser = async (req, res) => {
  let { name, email, etype } = req.body;

  try {
    let filterParams;
    if (name != "" && email != "" && etype != "") {
      filterParams = {
        $and: [{ name: name }, { $and: [{ email: email }, { etype: etype }] }],
      };
    } else if (name == "" && email != "" && etype != "") {
      filterParams = {
        $and: [{ email: email }, { etype: etype }],
      };
    } else if (name != "" && email == "" && etype != "") {
      filterParams = {
        $and: [{ name: name }, { etype: etype }],
      };
    } else if (name != "" && email != "" && etype == "") {
      filterParams = {
        $and: [{ name: name }, { email: email }],
      };
    } else if (name == "" && email == "" && etype != "") {
      filterParams = { etype: etype };
    } else if (name == "" && email != "" && etype == "") {
      filterParams = { email: email };
    } else if (name != "" && email == "" && etype == "") {
      filterParams = { name: name };
    }

    let employee = await Employee.find(filterParams);

    console.log(employee);

    if (employee) {
      res.status(200).json({
        data: employee,
        errorcode: 0,
      });
    } else {
      res.status(500).json({
        errorcode: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      errorcode: 1,
    });
  }
};

exports.editData = async (req, res) => {
  let data = req.body;
  let { id, name, email, etype, hourlyRate, totalRate, totalAmount } = req.body;

  let updateUser = {
    name: name,
    email: email,
    etype: etype,
    hourlyRate: hourlyRate,
    totalRate: totalRate,
    totalAmount: totalAmount,
  };

  try {
    let employee = await Employee.findByIdAndUpdate(id, updateUser);

    let allEmployee = await Employee.find();

    console.log(employee);

    if (employee) {
      res.status(200).json({
        data: allEmployee,
        errorcode: 0,
        meg: "Employee Edit Successfully",
      });
    } else {
      res.status(500).json({
        errorcode: 1,
      });
    }
  } catch (error) {
    res.status(500).json({
      errorcode: 1,
    });
  }
};
