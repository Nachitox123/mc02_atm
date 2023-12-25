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

while (true) {
    let inputUser = null;
    let inputPassword = null;
    let index = null;

    let validCredentials = false;

    while (!validCredentials) {
        alert("Bienvenido, ingrese su usuario y contraseña.");

        inputUser = prompt("Usuario:");
        inputPassword = prompt("Contraseña:");

        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].name === inputUser && usersList[i].password === inputPassword) {
                validCredentials = true;
                index = i;
                break;
            }
        }

        if (validCredentials) {
            alert("Bienvenido " + inputUser + ".");
        } else {
            alert("Credenciales inválidas. Intente nuevamente.");
        }
    } 

    function selectOption() {
        return parseInt(prompt("1 - Consultar saldo\n2 - Depositar\n3 - Retirar\n4 - Salir"));
    }

    let selectedOption = null;

    let logout = false;

    while (!logout) {
        selectedOption = selectOption();

        switch (selectedOption) {
            case 1: // View balance
                alert("Su saldo es de $" + usersList[index].balance + ".");
                
                break;

            case 2: // Deposit
                let depositAmount = parseInt(prompt("Cantidad a depositar:"));

                if (depositAmount <= 0) {
                    alert("Cantidad inválida. Por favor, ingrese un monto superior a $0.");
                } else if (depositAmount + usersList[index].balance > 990) {
                    alert("Excede el saldo permitido en la cuenta ($990).");
                }
                else {
                    usersList[index].balance += depositAmount;
                    alert("Usted ha depositado $" + depositAmount + ". Su nuevo saldo es de $" + usersList[index].balance + ".");
                }

                break;

            case 3: // Withdraw
                let withdrawAmount = parseInt(prompt("Cantidad a retirar:"));

                if (withdrawAmount <= 0) {
                    alert("Cantidad inválida. Por favor, ingrese un monto superior a $0.");
                } else if (withdrawAmount > usersList[index].balance - 10) {
                    alert("Fondos insuficientes. La cuenta debe contar siempre con un mínimo de $10.");
                } else {
                    usersList[index].balance -= withdrawAmount;
                    alert("Usted ha retirado $" + withdrawAmount + ". Su nuevo saldo es de $" + usersList[index].balance + ".");
                }

                break;

            case 4: // Exit
                logout = true;
                alert("Cerrando sesión. Hasta pronto.");

                break;

            default:
                alert("Opción inválida");

                break;
        }
    }
}