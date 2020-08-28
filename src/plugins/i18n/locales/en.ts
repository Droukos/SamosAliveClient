export default {
  lang: "English",
  webapp: "SamosAlive",
  fields: {
    username: "Username",
    password: "Password",
    passwordConf: "Confirm Password",
    name: "First name",
    surname: "Last name",
    email: "Email",
    avatar: "Avatar",
    description: "Description",
    address: "Address",
    country: "Country",
    province: "Province",
    city: "City",
    phone: "Phone Number",
    device: "Device",
    profile: "Profile"
  },
  search: {
    title: "Search",
    searchObj: "@:search.title {0}"
  },
  warnings: {
    notEmpty: "can't be empty",
    notMatch: "doesn't match",
    invalid: "invalid",
    taken: "taken",
    useridNotExists: "UserID does not exist",
    unauthorized: "Unauthorized action"
  },
  validations: {
    required: "{0} @:warnings.notEmpty",
    passMatch:
      "@:fields.password and @:fields.passwordConf @:warnings.notMatch",
    max: "{0} must be under {1} characters",
    min: "{0} must be over {1} characters",
    between: "{0} must be between {1} and {2} characters",
    usernameRegex: "Invalid Username",
    passRegex:
      "Password must have at least 1 undercase, 1 number and between 6 to 120 characters",
    fieldInvalid: "{0} is @:warnings.invalid",
    fieldTaken: "{0} is already @:warnings.taken",
    fileSize: "{0} size should be less than {1} MB!",
    fileValid: "{0} does not have a valid type",
    fieldNotTaken: "Available"
  },
  register: {
    title: "Register",
    header: "Complete the form to create a SamosAlive profile",
    message: "If you don't have an account register here:"
  },
  login: {
    title: "Login",
    loginTo: "@:login.title to @:webapp",
    forgotPass: "Forgot your password?",
    header: "Complete your account credencials to login",
    message: "If you already have an account sign in here:",
    invalid: "Invalid credentials",
    sessionExp: "Session expired, retry login"
  },
  events: {
    event: "Occurrence",
    form: "Complete the form",
    eventInfo: "Choose a patient's condition",
    eventS1: "He has arrhythmias",
    eventS2: "He can't breathe",
    eventS3: "He lost his senses",
    send: "Send alert",
    eventList: "Occurrence's table",
    eventListInfo: "This is a list of current uncompleted occurrences",
    address: "Address: ",
    situation: "Situation: ",
    comment: "Comment: ",
    problemList: "Technical problems",
    problemListInfo: "This is a list of current uncompleted technical problems"
  },
  user: {
    user: "User",
    title: "Profile",
    profile: "That is your profile",
    online: "Currently Online",
    offline: "Currently Offline",
    lastLogin: "Last login:",
    lastLogout: "Last logout:",
    offlineFor: "Offline For:",
    onlineFor: "Online For:",
    verified: "Verified User:",
    credStars: "Credibility Stars:",
    moreOptions: "Profile Options",
    sendMessage: "Send Message",
    editProfile: "Edit Profile",
    accountCreated: "Account Created:",
    accountUpdated: "Account Updated:",
    report: "Report",
    blockComm: "Block All Communication",
    activity: "Activity",
    information: "User's Information:",
    logout: "Log out",
    usersAutocomplete: "Find User",
    usersSearch: "Start typing to search"
  },
  edit: {
    title: "Edit User Profile:",
    descriptionHint: "Give a Profile Description (Optional)",
    userPersonal: "User Personal Info",
    avatarHint: "Pick an avatar",
    countryHint: "Pick your country",
    optional: "Optional",
    update: "Update",
    updated: "Successful Update",
    errorUpdated: "Error on Update",
    upload: "Upload",
    avatarUpdated: "Avatar updated",
    errorAvatarUpdate: "Error on Avatar Update"
  },
  privacy: {
    title: "Privacy User Settings:",
    onlineStatus: "Online Status:",
    lastLogin: "Last Login:",
    lastLogout: "Last Logout:",
    fullName: "Fullname:",
    email: "Email:",
    accountCreated: "Account Created:",
    description: "Description:",
    address: "Address:",
    phone: "Phone:",
    showType: "Show Type",
    public: "Public",
    private: "Private",
    onlyTo: "Only To",
    exceptTo: "Except To"
  },
  messages: {
    title: "Inbox",
    inbox: "My messages"
  },
  info: {
    title: "Information",
    message: "General information and Q&A for the application"
  },
  settings: {
    title: "Settings",
    message: "General settings for the application",
    theme: "Choose theme (light, dark)",
    language: "Choose language"
  },
  roles: {
    0: {
      0: "General Admin",
      1000: "Area Admin"
    },
    10000: {
      10000: "User"
    },

    addedBy: "Added by {0} on {1}",

    100: "Rescuer",
    101: "Defribrillator Manager",
    102: "Defribrillator Company Service",
    203: "ΕΚΑΒ"
  },
  status: {
    currently: "Currently ",
    0: "Offline",
    1: "Online",
    2: "Busy",
    3: "On Duty",
    4: "Away"
  },
  forms: {
    apply: "Apply"
  },
  mainTitle: "Main",
  news: {
    title: "News",
    newsTitle: "@:news.title Title",
    latestNews: "@:filter.latest @:news.title"
  },
  filter: {
    latest: "Latest"
  },
  main: "Welcome to SamosAlive!",

  languageTitle: "Language",
  languageGreek: "Greek",
  languageEnglish: "English",
  clear: "Clear",

  reset: "Reset",
  terms: "I have read and accept terms and conditions"
};
