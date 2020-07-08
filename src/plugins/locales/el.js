export default {
    lang: 'Ελληνικά',
    fields: {
        username: "Όνομα χρήστη",
        password: "Κωδικός",
        passwordConf: "Επιβεβαίωση κωδικού",
        name: "Όνομα",
        surname: 'Επώνυμο',
        email: 'Διευ/νση Ηλ. Tαχ.',
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
        not_empty: 'δεν μπορεί να είναι άδειο',
        not_match: 'δεν ταιριάζουν',
        invalid: 'μη έγκυρο',
        taken: 'Δεν είναι διαθέσιμο',
        userid_not_exists: 'To Id χρήστη δεν υπάρχει',
        unauthorized: 'Μη εξουσιοδοτημένη ενέργεια'
    },
    validations: {
        required: 'Το πεδίο {0} @:warnings.not_empty',
        pass_match: 'Ο @:fields.password και @:fields.passwordConf @:warnings.not_match',
        max: 'To πεδίο {0} πρέπει να έχει λιγότερο από {1} χαρακτήρες',
        min: 'To πεδίο {0} πρέπει να έχει περισσότερο από {1} χαρακτήρες',
        between: 'Το πεδίο {0} πρέπει να έχει μεταξύ {1} και {2} χαρακτήρες',
        username_regex: 'Μη έγκυρο όνομα χρήστη',
        pass_regex: 'O Κωδικός πρέπει να έχει 1 μικρό, 1 αριθμό και μεταξύ 6 και 120 χαρακτήρες',
        field_invalid: 'To πεδίο {0} είναι @:warnings.invalid',
        field_taken: '@:warnings.taken',
        file_size: "Το πεδίο {0} πρέπει να έχει αρχείο μικρότερο των {1} MB!",
        file_valid: "To πεδίο {0} πρέπει να έχει αρχείο εικόνας"
    },
    register: {
        title: 'Εγγραφή',
        header: 'Συμπληρώστε την φόρμα για να δημιουργήσετε λογαριασμό στο SamosAlive',
        message: 'Αν έχετε ήδη λογαριασμό κάντε σύνδεση εδώ:',
    },
    login: {
        title: "Σύνδεση",
        header: 'Συμπλωρώστε τα στοιχεία σας για να συνδεθείτε στην εφαρμογή',
        message: 'Αν δεν έχετε λογαριασμό κάντε εγγραφή εδώ:',
        invalid: 'Λάθος στοιχεία σύνδεσης',
        sessionExp: "Η συνεδριά έληξε, κάνετε επανασύνδεση"
    },
    events: {
        event: 'Συμβαν',
        form: 'Συμπληρώστε την φόρμα',
        eventInfo: 'Επέλεξε κατάσταση ασθενούς',
        eventS1: 'Έχει αρυθμίες',
        eventS2: 'Δεν μπορεί να αναπνεύσει',
        eventS3: 'Έχασε τις αισθήσεις του',
        eventList: 'Πινακας συμβαντων',
        send: 'Αποστολη',
        eventListInfo: 'Αυτή είναι μια λίστα με τα τρέχοντα συμβάντα',
        address: 'Διεύθυνση: ',
        situation: 'Κατάσταση: ',
        comment: 'Σχόλια: ',
        problemList: 'Τεχνικα προβληματα',
        problemListInfo: 'Αυτή είναι μια λίστα με τα τρέχοντα προβλήματα απινιδοτών'
    },
    messages: {
        title: 'Μηνύματα',
        inbox: 'Τα μηνύματα μου'
    },
    info: {
        title: 'Πληροφορίες',
        message: 'Γενικές πληροφορίες και ερωτήσεις για την εφαρμογή'
    },
    settings: {
        title: 'Ρυθμίσεις',
        message: 'Διάφορες ρυθμίσεις για την εφαρμογή',
        theme: 'Επιλέξτε θέμα (Φωτεινό,Σκοτεινό)',
        language: 'Επιλέξτε γλώσσα'
    },
    user: {
        user: 'Χρήστης',
        title: 'Προφίλ',
        profile: 'Εδώ βλέπετε το προφίλ σας',
        online: "Συδεδεμένος",
        offline: "Αποσυνδεδεμένος",
        last_login: "Τελευταία Σύνδεση:",
        last_logout: "Τελευταία Αποσύνδεση:",
        offline_for: "Αποσυνδεδεμένος Για:",
        online_for: "Συδεδεμένος Για:",
        verified: "Επαληθευμένος Χρήστης:",
        cred_stars: "Αστέρια Αξιοπιστίας:",
        more_options: "Επιλογές Προφίλ",
        send_message: "Αποστολή Μηνύματος",
        edit_profile: "Επεξεργασία Προφίλ",
        account_created: "Δημιουργία Λογαριασμού:",
        account_updated: "Ενημέρωση Λογαριασμού:",
        report: "Αναφορά",
        block_comm: "Μπλοκάρισμα Συνομίλιας",
        activity: "Δραστηριότητα",
        information: "Πληροφορίες Χρήστη:",
        logout: 'Αποσυνδεση',
        users_autocomplete: "Βρες Χρήστη",
        users_search: "Πληκτρολογίστε για αναζήτηση"
    },
    edit: {
        title: "Ρυθμίσεις Προφίλ Χρήστη:",
        description_hint: "Δώσε Περιγραφή για το Προφίλ (Προεραιτικό)",
        user_personal: "Προσωπικές Πληροφορίες Χρήστη",
        avatar_hint: "Διάλεξε εικόνα προφίλ",
        country_hint:  "Επίλεξε την χώρα σου",
        optional: "Προεραιτικό",
        update: "Ενημέρωση",
        updated: "Επιτυχής Ενημέρωση",
        error_updated: "Σφάλμα στην Ενημέρωση",
        upload: "Ανέβασμα",
        avatar_updated: "Εικόνα Προφίλ Ενημερώθηκε",
        error_avatar_update: "Σφάλμα στην Ενημέρωση Εικόνας Προφίλ"
    },
    privacy: {
        title: "Ρυθμίσεις Απορρήτου Χρήστη:",
        online_status: "Κατάσταση Σύνδεσης:",
        last_login: "Τελευταία Σύνδεση:",
        last_logout: "Τελευταία Αποσύνδεση:",
        fullname: "Πραγματικό Ονόμα:",
        email: "Ηλ\\νικο Ταχυδρομείο:",
        account_created: "Δημιουργία Λογαριασμού:",
        description: "Περιγραφή:",
        address: "Διεύθυνση:",
        phone: "Κινητό Τηλέφωνο:",
        show_type: "Τύπος Εμφάνισης",
        public: "Δημόσια",
        private: "Ιδιωτικό",
        onlyto: "Μόνο σε",
        exceptto: "Εκτός από",
    },
    roles: {
        0: "Γενικός Διαχειριστής",
        10: "Διαχειριστής Περιοχής",
        100: "Διασώστης",
        101: "Διαχειριστής Απινιδωτή",
        102: "Εταιρία Εξυπηρέτησης Απινιδωτή",
        203: "ΕΚΑΒ",
        1000: "Χρήστης"
    },
    status: {
        currently: "Αυτή την στιγμή ",
        0: "Αποσυνδεδεμένος",
        1: "Συνδεδεμένος",
        2: "Απασχολημένος",
        3: "Σε Υπηρεσία",
        4: "Εκτός"
    },
    news: {
        title: "Νέα",
        newsTitle: "Τίτλοι Νέων",
        latestNews: "@:filter.latest @:news.title"
    },
    filter: {
        latest: "Τελευταία"
    },
    mainTitle: 'Αρχική',
    main: 'Καλώς ήρθατε στο SamosAlive!',
    languageTitle: 'Γλώσσα',
    languageGreek: 'Ελληνικά',
    languageEnglish: 'Αγγλικά',
    clear: "Καθαρισμός",
    reset: 'Επαναφορα',
    terms: 'Έχω διαβάσει και αποδέχομαι τους όρους και προϋποθέσεις',
    //validation: gr.messages
};