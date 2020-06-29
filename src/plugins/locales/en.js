export default {
    lang: 'English',
    fields: {
        username: "Username",
        password: "Password",
        passwordConf: "Confirm Password",
        name: "First name",
        surname: 'Last name',
        email: 'Email',
        avatar: "Avatar",
        description: "Description",
        address: "Address",
        country: "Country",
        province: "Province",
        city: "City",
        phone: 'Phone Number',
        device: "Device",
        profile: "Profile"
    },
    search: {
        title: "Search",
        searchObj: "@:search.title {0}"
    },
    warnings: {
        not_empty: 'can\'t be empty',
        not_match: 'doesn\'t match',
        invalid: 'invalid',
        taken: 'taken',
        userid_not_exists: 'UserID does not exist',
        unauthorized: 'Unauthorized action'
    },
    validations: {
        required: '{0} @:warnings.not_empty',
        pass_match: '@:fields.password and @:fields.passwordConf @:warnings.not_match',
        max: '{0} must be under {1} characters',
        min: '{0} must be over {1} characters',
        between: '{0} must be between {1} and {2} characters',
        username_regex: 'Invalid Username',
        pass_regex: 'Password must have at least 1 undercase, 1 number and between 6 to 120 characters',
        field_invalid: '{0} is @:warnings.invalid',
        field_taken: '{0} is already @:warnings.taken',
        file_size: "{0} size should be less than {1} MB!",
        file_valid: "{0} does not have a valid type"
    },
    register: {
        title: 'Register',
        header: 'Complete the form to create a SamosAlive profile',
        message: 'If you don\'t have an account register here:',
    },
    login: {
        title: "Login",
        header: 'Complete your account credencials to login',
        message: 'If you already have an account sign in here:',
        invalid: 'Invalid credentials',
        sessionExp: "Session expired, retry login"
    },
    events: {
        event: 'Occurrence',
        form: 'Complete the form',
        eventInfo: 'Choose a patient\'s condition',
        eventS1: 'He has arrhythmias',
        eventS2: 'He can\'t breathe',
        eventS3: 'He lost his senses',
        send: 'Send alert',
        eventList: 'Occurrence\'s table',
        eventListInfo: 'This is a list of current uncompleted occurrences',
        address: 'Address: ',
        situation: 'Situation: ',
        comment: 'Comment: ',
        problemList: 'Technical problems',
        problemListInfo: 'This is a list of current uncompleted technical problems'
    },
    user: {
        user: 'User',
        profileTitle: 'Profile',
        profile: 'That is your profile',
        online: "Currently Online",
        offline: "Currently Offline",
        last_login: "Last login:",
        last_logout: "Last logout:",
        offline_for: "Offline For:",
        online_for: "Online For:",
        verified: "Verified User:",
        cred_stars: "Credibility Stars:",
        more_options: "Profile Options",
        send_message: "Send Message",
        edit_profile: "Edit Profile",
        account_created: "Account Created:",
        account_updated: "Account Updated:",
        report: "Report",
        block_comm: "Block All Communication",
        activity: "Activity",
        information: "User's Infromation:",
        logout: 'Log out',
        users_autocomplete: "Find User",
        users_search: "Start typing to search"

    },
    edit: {
        title: "Edit User Profile:",
        description_hint: "Give a Profile Description (Optional)",
        user_personal: "User Personal Info",
        avatar_hint: "Pick an avatar",
        country_hint:  "Pick your country",
        optional: "Optional",
        update: "Update",
        updated: "Successful Update",
        error_updated: "Error on Update",
        upload: "Upload",
        avatar_updated: "Avatar updated",
        error_avatar_update: "Error on Avatar Update",
    },
    privacy: {
        title: "Privacy User Settings:",
        online_status: "Online Status:",
        last_login: "Last Login:",
        last_logout: "Last Logout:",
        fullname: "Fullname:",
        email: "Email:",
        account_created: "Account Created:",
        description: "Description:",
        address: "Address:",
        phone: "Phone:",
        show_type: "Show Type",
        public: "Public",
        private: "Private",
        onlyto: "Only To",
        exceptto: "Except To",
    },
    messages: {
        messageTitle: 'Inbox',
        inbox: 'My messages'
    },
    
    info: {
        infoTitle: 'Informations',
        message: 'General informations and Q&A for the application'
    },
    settings: {
        settingsTitle: 'Settings',
        message: 'General settings for the application',
        theme: 'Choose theme (light, dark)',
        language: 'Choose language'
    },
    roles: {
        0: "General Admin",
        10: "Area Admin",
        100: "Rescuer",
        101: "Defribrillator Manager",
        102: "Defribrillator Company Service",
        203: "ΕΚΑΒ",
        1000: "User"
    },
    status: {
        currently: "Currently ",
        0: "Offline",
        1: "Online",
        2: "Busy",
        3: "On Duty",
        4: "Away"
    },
    mainTitle: 'Main',
    news: {
        title: "News",
        newsTitle: "@:news.title Title",
        latestNews: "@:filter.latest @:news.title"
    },
    filter: {
        latest: "Latest"
    },
    main: 'Welcome to SamosAlive!',

    languageTitle: 'Language',
    languageGreek: 'Greek',
    languageEnglish: 'English',
    clear: "Clear",


    reset: 'Reset',
    terms: 'I have read and accept terms and conditions',
};