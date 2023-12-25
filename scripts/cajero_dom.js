var usersList = [
    {
        "name": "manuel",
        "password": "rojo",
        "balance": 900
    },
    {
        "name": "jose",
        "password": "abc123",
        "balance": 450
    },
    {
        "name": "pedro",
        "password": "perro",
        "balance": 50
    }
]

var sectionsList = [
    "login",
    "loginSuccess",
    "loginFail",
    "options",
    "balance",
    "deposit",
    "depositSuccess",
    "depositFail",
    "withdraw",
    "withdrawSuccess",
    "withdrawFail",
    "amountError",
    "logout",
]

function showSection(section) {
    document.getElementById(section).style.display = "block";
}

function hideSection(section) {
    document.getElementById(section).style.display = "none";
}

function hideAndShow(previousSection, nextSection) {
    hideSection(previousSection);
    showSection(nextSection);
}

function showMessageSection(initialSection, messageSection, finalSection) {
    hideSection(initialSection);

    showSection(messageSection);

    setTimeout(() => {
        hideSection(messageSection);

        showSection(finalSection);
    }, 2500);    
}

sectionsList.forEach(section => {
    hideSection(section);
});

let inputUser = null;
let inputPassword = null;
let index = null;

showSection("login");

function login() {
    // Retrieve input
    inputUser = document.getElementById("inputUser").value.toLowerCase();
    inputPassword = document.getElementById("inputPassword").value;

    // Clear input fields
    document.getElementById("inputUser").value = "";
    document.getElementById("inputPassword").value = "";

    let validCredentials = false;
    
    for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].name === inputUser && usersList[i].password === inputPassword) {
                validCredentials = true;
                index = i;
                break;
            }
        }

        if (validCredentials) {
            // Update name for login success section
            document.getElementById("user").innerHTML = usersList[index].name;

            showMessageSection("login", "loginSuccess", "options");
        } else if (!validCredentials) {
            showMessageSection("login", "loginFail", "login");
        }
}

function balance() {
    hideSection("options");
    
    document.getElementById("currentBalance").innerHTML = usersList[index].balance;

    showSection("balance");
}

function deposit() {
    let depositAmount = parseInt(document.getElementById("depositAmount").value);

    // Clear input field
    document.getElementById("depositAmount").value = "";

    if (depositAmount <= 0) {
        showMessageSection("deposit", "amountError", "deposit");
    } else if (depositAmount + usersList[index].balance > 990) {
        showMessageSection("deposit", "depositFail", "deposit");
    } else {
        usersList[index].balance += depositAmount;

        // Update balance
        document.getElementById("depositValue").innerHTML = depositAmount;
        document.getElementById("depositBalance").innerHTML = usersList[index].balance;
        
        showMessageSection("deposit", "depositSuccess", "options");
    }
}

function withdraw() {
    let withdrawAmount = parseInt(document.getElementById("withdrawAmount").value);

    // Clear input field
    document.getElementById("withdrawAmount").value = "";

    if (withdrawAmount <= 0) {
        showMessageSection("withdraw", "amountError", "withdraw");
    } else if (withdrawAmount > usersList[index].balance - 10) {
        showMessageSection("withdraw", "withdrawFail", "withdraw");
    } else {
        usersList[index].balance -= withdrawAmount;

        // Update balance
        document.getElementById("withdrawValue").innerHTML = withdrawAmount;
        document.getElementById("withdrawBalance").innerHTML = usersList[index].balance;

        showMessageSection("withdraw", "withdrawSuccess", "options");
    }
}

function logout() {
    showMessageSection("options", "logout", "login");
}