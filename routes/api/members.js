const express = require('express');
const members = require('../../Members.js');
const router = express.Router();
const uuid = require('uuid');

// Gets all members
router.get('/', (req,res) => {
    res.json(members);
});

// Get single member
router.get('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));    
    }
    else {
        //Showing Errors
        res.status(400).json({msg: "Member not found"});
    }
});

//Create Members
router.post('/', (req,res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age
    }
    if(!newMember.name || !newMember.age){
        return res.status(400).json({msg: "Please include a name or age"});
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');

    // res.send(req.body);
});

// Update Member
router.put('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name?updMember.name:member.name;
                member.age = updMember.age?updMember.age:member.age;
            
                res.json({msg: "Member updated successfully", member});
            }
        });
    }
    else {
        //Showing Errors
        res.status(400).json({msg: "Member not found"});
    }
});


//Delete Member
router.delete('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json({msg: 'Member deleted',
        members : members.filter(member => member.id !== parseInt(req.params.id))});    
    }
    else {
        //Showing Errors
        res.status(400).json({msg: "Member not found"});
    }
});

module.exports = router;