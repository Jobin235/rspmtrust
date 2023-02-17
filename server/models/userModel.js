const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      maxLength: [25, "Name must not be more than 25 characters"],
    },

    gender: {
      type: String,
      required: [true, "Please select a gender option"],
    },

    bloodGroup: {
      type: String,
      default: "NA",
    },

    birthDate: {
      type: Date,
      required: [true, "Please enter date of birth"],
    },

    designation: {
      type: String,
      required: [true, "Please enter your designation"],
    },

    depo: {
      type: String,
      required: [true, "Please enter your depo"],
    },

    joiningDate: {
      type: Date,
      required: [true, "Please enter the date of joining"],
    },

    retirementDate: {
      type: Date,
      default: "",
    },

    email: {
      unique: true,
      type: String,
      required: [true, "A valid email is required"],
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be minimum 6 characters"],
      // maxLength: [20, "Password must not be more than 20 characters"],
    },

    permanentAddress: {
      type: String,
      maxLength: [100, "Address must not be more than 100 characters"],
    },

    presentAddress: {
      type: String,
      maxLength: [100, "Address must not be more than 100 characters"],
    },

    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },

    phone: {
      type: String,
      required: [true, "Please enter phone number"],
      default: "91",
      match: [/^(0|91)?[6-9][0-9]{9}$/, "Please enter a valid phone number"],
    },

    whatsapp: {
      type: String,
      default: "91",
      match: [/^(0|91)?[6-9][0-9]{9}$/, "Please enter a valid whatsapp number"],
    },

    telegram: {
      type: String,
      default: "91",
      match: [/^(0|91)?[6-9][0-9]{9}$/, "Please enter a valid telegram number"],
    },

    aadhar: {
      type: String,
      required: [true, "Aadhaar Number is required"],
      match: [/^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/],
    },

    pan: {
      type: String,
      required: [true, "Pan Number is required"],
      match: [/[A-Z]{5}[0-9]{4}[A-Z]{1}/],
    },

    membershipNo: {
      unique: true,
      type: String,
      required: [true, "Membership Number is required"],
      match: [/[0-9]{6}[A-Z]{1}[0-9]{2}/, "Membership Number is not valid"],
    },

    membershipStatus: {
      type: String,
      required: [true, "Membership Status is required"],
    },
  },
  {
    timestamps: true,
  }
);

//   Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// designation/   locopilot/mail/pass/goods/shunting/alp/lpm/lpp/lps/lpg
// depo palakkad/shornur/calicut/mangalapuram
// dob
// date of joining
// aadhar
// pan
// whatsapp/telegram/mobile
// retired?
// date of retirement
// address permanennt/present
// membership number    123456A25
// membership status
//gender
//blood group
