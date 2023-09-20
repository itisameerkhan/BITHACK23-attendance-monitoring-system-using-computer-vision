const con = require('./mysql')
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs'); 

console.log('server file running')

app.get('/',function(req,res){
    res.sendFile(__dirname + '/student.html')
});

app.post('/',function(req, res){
    let name = req.body.name;
    let rollnumber = req.body.rollnumber;
    let designation = req.body.designation;
    let department = req.body.department;
    let gender = req.body.gender;
    let batch = req.body.batch;
    let studentclass = req.body.studentclass;
    let studentID = req.body.studentID;
    let dob = req.body.dob;
    let email = req.body.email;
    let degreelevel = req.body.degreelevel;

    console.log(batch)
    console.log('rere')

    if(name === "" || rollnumber==='' || designation==='' || department==='N/A' ||
     gender === 'N/A' || batch === 'N/A' || studentclass === '' || studentID === '' 
     || dob === '' || email === '' || degreelevel === 'N/A') return;

     const sqlquery2 =  "INSERT INTO attendanceTable (rollnumber, name, department) VALUES ?";
     const values2 = [
         [rollnumber, name, department]
     ];

     con.query(sqlquery2,[values2],function(error,result){
         if(error) console.log('duplicate entry');
         else console.log('data inserted successfully attendanceTable')
     });

        const sqlquery =  "INSERT INTO students VALUES ?";
        const values = [
            [name,rollnumber,designation,department,gender,batch,studentclass,studentID,dob,email,degreelevel]
        ];
        con.query(sqlquery,[values],function(error,result){
            if(error) console.log('duplicate entry');
            else console.log('data inserted successfully')
        });

});

app.get('/students', (req,res)=>{ //
        const studentQuery = 'SELECT * FROM students ORDER BY name';
        const attendanceQuery = 'SELECT * FROM attendanceTable ORDER BY name';

        con.query(studentQuery, (error,studentResult) => {
            if(error) {
                console.log(error);
                return;
            }
            
            con.query(attendanceQuery, (error,attendanceResult) => {
                if(error){
                    console.log(error);
                    return;
                }
                res.render(__dirname + '/index', {
                    students: studentResult,
                    attendanceTable: attendanceResult
                }) 
            })
        })

});


app.listen(7000);
