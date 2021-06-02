const inq = require('inquirer');

inq.prompt([
        {
            type: "input",
            message: "Welcome to Great-Bay! What is your username?",
            name: "username",
            validation: (username) => {
                return !(username.length > 0) || "Please enter your username.";
            }
        },
        {
            type: "list",
            message: "Would you like to POST or BID?",
            choices: ["POST", "BID"],
            name: "selection"
        }
    ]).then(
        (response) => {
            if (response.selection = "POST") {
                postAuction(response.username);
            }
            else {
                bidAuction(response.username);
            }
        }
    );