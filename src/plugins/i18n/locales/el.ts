export default {
  lang: "Ελληνικά",
  webapp: "SamosAlive",
  fields: {
    username: "Όνομα χρήστη",
    password: "Κωδικός",
    passwordConf: "Επιβεβαίωση κωδικού",
    name: "Όνομα",
    surname: "Επώνυμο",
    email: "Διευ/νση Ηλ. Tαχ.",
    avatar: "Εικόνα Προφίλ",
    description: "Περιγραφή",
    address: "Διεύθυνση",
    country: "Χώρα",
    province: "Περιοχή",
    city: "Πόλη",
    phone: "Κινητό τηλέφωνο",
    device: "Συσκευή",
    profile: "Προφίλ"
  },
  search: {
    title: "Αναζήτηση",
    searchObj: "@:search.title {0}"
  },
  warnings: {
    notEmpty: "δεν μπορεί να είναι άδειο",
    notMatch: "δεν ταιριάζουν",
    invalid: "μη έγκυρο",
    taken: "Δεν είναι διαθέσιμο",
    useridNotExists: "To Id χρήστη δεν υπάρχει",
    unauthorized: "Μη εξουσιοδοτημένη ενέργεια"
  },
  validations: {
    required: "Το πεδίο {0} @:warnings.notEmpty",
    passMatch:
      "Ο @:fields.password και @:fields.passwordConf @:warnings.notMatch",
    max: "To πεδίο {0} πρέπει να έχει λιγότερο από {1} χαρακτήρες",
    min: "To πεδίο {0} πρέπει να έχει περισσότερο από {1} χαρακτήρες",
    between: "Το πεδίο {0} πρέπει να έχει μεταξύ {1} και {2} χαρακτήρες",
    usernameRegex: "Μη έγκυρο όνομα χρήστη",
    passRegex:
      "O Κωδικός πρέπει να έχει 1 μικρό, 1 αριθμό και μεταξύ 6 και 120 χαρακτήρες",
    fieldInvalid: "To πεδίο {0} είναι @:warnings.invalid",
    fieldTaken: "@:warnings.taken",
    fileSize: "Το πεδίο {0} πρέπει να έχει αρχείο μικρότερο των {1} MB!",
    fileValid: "To πεδίο {0} πρέπει να έχει αρχείο εικόνας",
    fieldNotTaken: "Διαθέσιμο"
  },
  register: {
    title: "Εγγραφή",
    header:
      "Συμπληρώστε την φόρμα για να δημιουργήσετε λογαριασμό στο SamosAlive",
    message: "Αν έχετε ήδη λογαριασμό κάντε σύνδεση εδώ:"
  },
  login: {
    title: "Σύνδεση",
    loginTo: "@:login.title στο @:webapp",
    forgotPass: "Ξέχασες τον κωδικό;",
    header: "Συμπλωρώστε τα στοιχεία σας για να συνδεθείτε στην εφαρμογή",
    message: "Αν δεν έχετε λογαριασμό κάντε εγγραφή εδώ:",
    invalid: "Λάθος στοιχεία σύνδεσης",
    sessionExp: "Η συνεδριά έληξε, κάνετε επανασύνδεση"
  },
  events: {
    event: "Συμβαν",
    form: "Συμπληρώστε την φόρμα",
    eventInfo: "Επέλεξε κατάσταση ασθενούς",
    eventS1: "Έχει αρυθμίες",
    eventS2: "Δεν μπορεί να αναπνεύσει",
    eventS3: "Έχασε τις αισθήσεις του",
    eventList: "Πινακας συμβαντων",
    send: "Αποστολη",
    eventListInfo: "Αυτή είναι μια λίστα με τα τρέχοντα συμβάντα",
    address: "Διεύθυνση: ",
    situation: "Κατάσταση: ",
    comment: "Σχόλια: ",
    problemList: "Τεχνικα προβληματα",
    problemListInfo: "Αυτή είναι μια λίστα με τα τρέχοντα προβλήματα απινιδοτών"
  },
  messages: {
    title: "Μηνύματα",
    inbox: "Τα μηνύματα μου"
  },
  info: {
    title: "Πληροφορίες",
    message: "Γενικές πληροφορίες και ερωτήσεις για την εφαρμογή"
  },
  settings: {
    title: "Ρυθμίσεις",
    message: "Διάφορες ρυθμίσεις για την εφαρμογή",
    theme: "Επιλέξτε θέμα (Φωτεινό,Σκοτεινό)",
    language: "Επιλέξτε γλώσσα"
  },
  user: {
    user: "Χρήστης",
    title: "Προφίλ",
    profile: "Εδώ βλέπετε το προφίλ σας",
    online: "Συδεδεμένος",
    offline: "Αποσυνδεδεμένος",
    lastLogin: "Τελευταία Σύνδεση:",
    lastLogout: "Τελευταία Αποσύνδεση:",
    offlineFor: "Αποσυνδεδεμένος Για:",
    onlineFor: "Συδεδεμένος Για:",
    verified: "Επαληθευμένος Χρήστης:",
    credStars: "Αστέρια Αξιοπιστίας:",
    moreOptions: "Επιλογές Προφίλ",
    sendMessage: "Αποστολή Μηνύματος",
    editProfile: "Επεξεργασία Προφίλ",
    accountCreated: "Δημιουργία Λογαριασμού:",
    accountUpdated: "Ενημέρωση Λογαριασμού:",
    report: "Αναφορά",
    blockComm: "Μπλοκάρισμα Συνομίλιας",
    activity: "Δραστηριότητα",
    information: "Πληροφορίες Χρήστη:",
    logout: "Αποσυνδεση",
    usersAutocomplete: "Βρες Χρήστη",
    usersSearch: "Πληκτρολογίστε για αναζήτηση"
  },
  edit: {
    title: "Ρυθμίσεις Προφίλ Χρήστη:",
    descriptionHint: "Δώσε Περιγραφή για το Προφίλ (Προεραιτικό)",
    userPersonal: "Προσωπικές Πληροφορίες Χρήστη",
    avatarHint: "Διάλεξε εικόνα προφίλ",
    countryHint: "Επίλεξε την χώρα σου",
    optional: "Προεραιτικό",
    update: "Ενημέρωση",
    updated: "Επιτυχής Ενημέρωση",
    errorUpdated: "Σφάλμα στην Ενημέρωση",
    upload: "Ανέβασμα",
    avatarUpdated: "Εικόνα Προφίλ Ενημερώθηκε",
    errorAvatarUpdate: "Σφάλμα στην Ενημέρωση Εικόνας Προφίλ"
  },
  privacy: {
    title: "Ρυθμίσεις Απορρήτου Χρήστη:",
    onlineStatus: "Κατάσταση Σύνδεσης:",
    lastLogin: "Τελευταία Σύνδεση:",
    lastLogout: "Τελευταία Αποσύνδεση:",
    fullName: "Πραγματικό Ονόμα:",
    email: "Ηλ\\νικο Ταχυδρομείο:",
    accountCreated: "Δημιουργία Λογαριασμού:",
    description: "Περιγραφή:",
    address: "Διεύθυνση:",
    phone: "Κινητό Τηλέφωνο:",
    showType: "Τύπος Εμφάνισης",
    public: "Δημόσια",
    private: "Ιδιωτικό",
    onlyTo: "Μόνο σε",
    exceptTo: "Εκτός από"
  },
  roles: {
    admins: {
      0: "Γενικός Διαχειριστής",
      1000: "Διαχειριστής Περιοχής"
    },
    users: {
      10000: "Χρήστης"
    },

    addedBy: "Προστέθηκε από {0} στις {1}",

    100: "Διασώστης",
    101: "Διαχειριστής Απινιδωτή",
    102: "Εταιρία Εξυπηρέτησης Απινιδωτή",
    203: "ΕΚΑΒ"
  },
  status: {
    currently: "Αυτή την στιγμή ",
    0: "Αποσυνδεδεμένος",
    1: "Συνδεδεμένος",
    2: "Απασχολημένος",
    3: "Σε Υπηρεσία",
    4: "Εκτός"
  },
  forms: {
    apply: "Εφαρμογή"
  },
  news: {
    title: "Νέα",
    newsTitle: "Τίτλοι Νέων",
    latestNews: "@:filter.latest @:news.title"
  },
  filter: {
    latest: "Τελευταία"
  },
  mainTitle: "Αρχική",
  main: "Καλώς ήρθατε στο SamosAlive!",
  languageTitle: "Γλώσσα",
  languageGreek: "Ελληνικά",
  languageEnglish: "Αγγλικά",
  clear: "Καθαρισμός",
  reset: "Επαναφορα",
  terms: "Έχω διαβάσει και αποδέχομαι τους όρους και προϋποθέσεις"
  //validation: gr.messages
};
