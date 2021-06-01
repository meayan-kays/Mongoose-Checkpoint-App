const express = require('express')
const app = express()
const mongoose = require('mongoose');
const connectDB = require('./config/connect')

const port = process.env.PORT || 5000;

// Install and Setup mongoose
app.use(express.json())
connectDB()

//  Create a person with this prototype:
var Person = require('./Models/Person')

app.post('/addPerson', (req, res) => {
    var {name, age, favoriteFoods} = req.body
    var newPerson = new Person({
        name, age, favoriteFoods
    })
    
    newPerson.save()
        .then(person => res.send(person))
        .catch((err) => console.log(err))
})
 
// Create many record with model.create()

app.post('/addManyPersons', (req, res) =>{
    Person.create(req.body, (err, persons) => {
        if(err){
            console.log('Error saving Data')
        }
        else{
            console.log(persons)
            res.send(persons)
        }
    })   
})

// Use model.find() to Search Your Database
app.get('/persons', (req, res) =>{
    Person.find({})
    .exec((err, persons) => {
        if(err){
            console.log('Error Getting All Data')
        }
        else{
            console.log(persons)
            res.send(persons)
        }
    })   
})

// Use model.findOne() to Return a Single Matching Document from Your Database
app.get('/persons/:favoriteFoods', (req, res) => {
   Person.findOne({favoriteFoods : req.params.favoriteFoods}, (err, person) => {
       if(err){
           console.log(err)
       }
       else{
           console.log(person)
           res.json(person)
       }
   })
})

// Use model.findById() to Search Your Database By _id
app.get('/persons/:id', (req, res) => {
    Person.findById(id, (err, person) => {
            if(err){
                console.log('Error getting the searched data')
            }
            else{
                console.log(person)
                res.json(person)
            }
        })
})

// Perform Classic Updates by Running Find, Edit, then Save
app.put('/updatePersonByID/:personID', (req, res) => {
    var foodToAdd = 'hamburger';
    Person.findOne({personID : req.params._id}, (err, person) => {
        if (err) 
            return console.log(err)
        person.favoriteFoods.push(foodToAdd);
        person.save()
            .then(person => res.json(person))
            .catch((err) => console.log(err))
        });
})

// Perform New Updates on a Document Using model.findOneAndUpdate()
app.put('/updatePersonByName/:personName', (req, res) => {
    var ageToUpdate = 20;
    Person.findOneAndUpdate({personName : req.params.name},{age : ageToUpdate},{new : true} , (err, person) => {
        if (err) {
            return console.log(err)
        }else {
            console.log(person)
            res.json(person)
        }
    })
})

// Delete One Document Using model.findByIdAndRemove
app.delete('/deletePersonByID/:personID', (req, res) => {
    Person.findOneAndRemove({personID : req.params._id}, (err, person) => {
        if (err) {
            return console.log(err)
        }else {
            console.log("Delete is complete with success") 
            res.json(person)
        }
    })
})

// MongoDB and Mongoose - Delete Many Documents with model.remove()
app.delete('/deleteManyPersons/:personName', (req, res) => {
    Person.remove({personName : req.params.name}, (err, person) => {
        if (err) {
            return console.log(err)
        }else {
            console.log("Delete is complete with success") 
            res.json(person)
        }
    })
})

// Chain Search Query Helpers to Narrow Search Results
app.get('/getPersons/', (req, res) => {
    let searchedFood = "burritos"
    Person.find({favoriteFoods : searchedFood})
    .sort({name : 1})
    .limit(2)
    .select({age : 0})
    .exec()
    .then(persons => res.json(persons))
    .catch((err) => console.log(err))
})



app.get('/', (req, res) => {
    res.send('Welcome to Mongoose App')
})

app.listen(port, () => {
    console.log(`App Listening and Running on ${port}`)
})
