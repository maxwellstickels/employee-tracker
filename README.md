# Employee Tracker
## Overview

Employee Tracker is an interactive node.JS application which allows users to create, view, and modify lists of employees, job roles, and work departments. Data that is added by the user can then be stored in (or retrieved from) the application's server. This means that data persists even after the application closes, unless the server is reset.

Currently, there are three distinct objects in the application: EMPLOYEE, ROLE, DEPARTMENT. Each employee must have a role and each role must have a corresponding department. There are three ways to modify these group: ADD, VIEW, and UPDATE.

To add an employee to the current list of employees, simply select ADD, then EMPLOYEE. To see a full list of roles, select VIEW, then ROLE. To update a department's name, select UPDATE, then DEPARTMENT. To exit the application, simply select EXIT EMPLOYEE TRACKER.

## Programs Used
This application was created using Javascript (2020 Build) in Visual Studio Code 1.56.2, and the database was created using SQL queries in MySQL Workbench 8.0 CE. The node.js application requires installing the console.table, dotenv, inquirer, and mysql libraries; these can be installed through npm.

## Example
[Video Displaying The Code In Action](https://drive.google.com/file/d/1qGS5OWVVN2B5HRjjvv0pxcu-W6QkYbtD/view)