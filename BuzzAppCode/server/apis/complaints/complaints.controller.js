/**
 * Created by saubhagya on 2/5/17.
 */

var complaintService = require('./complaints.service');

//==========================********   for creating complaint   **************==========================

exports.createComplaint = function(req,res,next){
    var newComp = req.body;
    var data ={};

    if(newComp.category == 'Hardware'||newComp.category == 'Infrastructure'){
        data = {
            _id: req.session.user._id,
            email:'saubhagya.nair@thrhenew.com'
        };
    }
    else{
        data = {
            _id: req.session.user._id,
            email:'anurag.sharma@thrhenew.com'
        };
    }



    if((newComp.compName == ''|| newComp.compEmail == ''|| newComp.compTitle == '') &&(newComp.compContent == '' && newComp.compImage == '')){
        console.log('Username, email or title is empty or Complaint details not given. Cannot proceed');
        res.status(500).send('All neccessary inforamtion not present. Cannot proceed');
    }
    else{
        complaintService.createComplaint(newComp,res,data);
    }
}

//==========================********   for fetching complaints   **************==========================

exports.fetchComplaints = function(req,res,next){
    var offsetComp = Number(req.query.offset);
    var fetchCompData = {
        offset: offsetComp,
        currentUser: req.session.user.role,
        currentUserID: req.session.user._id
    }

    complaintService.fetchComplaints(fetchCompData,res);
}

//==========================********   for changing complaint status  **************==========================

exports.complaintStatus = function(req,res,next){
    var statusComp = req.body;
    complaintService.complaintStatus(statusComp,res);
}

//==========================********   for fetching resolved complaints   **************==========================

exports.resolvedComplaints = function(req,res,next){
    var resolvedOffset = Number(req.query.offset);
    var resolvedList = {
        offset:resolvedOffset,
        currentUser: req.session.user.role,
        currentUserID: req.session.user._id
    }
    complaintService.resolvedComplaints(resolvedList,res);
}

exports.deleteComplaints = function(req,res,next){
    var deleteComp = req.body;
    complaintService.deleteComplaints(deleteComp,res);
}