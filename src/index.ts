// Main code goes here
import { generateCompanyStructure, employee, demoteEmployee } from "./manageEmployees"
import data from './employees.json'
import { TreeNode } from "./manageEmployees";
import { getBoss, getSubordinates } from './getEmployees'
import {hireEmployee } from './manageEmployees' 
import {fireEmployee } from './manageEmployees'
import {promoteEmployee } from './manageEmployees'
function main() {
    const employeeArray: employee[] =  data.employees; 
    let tree = new TreeNode(null);
    tree = generateCompanyStructure(employeeArray); 
    let testEmp: employee = {
        name: "Jeb",
        jobTitle: 'Tech',
        boss: null,
        salary: '10000'
    }
    
    hireEmployee(tree, testEmp, "Sarah"); 
    fireEmployee(tree, 'Alicia');
    promoteEmployee(tree, 'Jared'); 
    demoteEmployee(tree, "Xavier", "Maria"); 
    getBoss(tree, "Bill");
    getSubordinates(tree, "Jared"); 
    
    console.log('main')
}

main()
