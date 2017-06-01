/**
 * Created by saubhagya on 2/5/17.
 */

var Complaint = require('./complaints.model');

//==========================********   for creating complaints   **************==========================

exports.createComplaint = (newComp,res,currentUser) => {
    var newComplaint = {
        compName: newComp.compName,
        compEmail:newComp.compEmail,
        compTitle:newComp.compTitle,
        compContent:newComp.compContent,
        compImage:newComp.compImage,
        category:newComp.category,
        createdBy:newComp.createdBy,
        compStatus:newComp.compStatus
    };
    if(newComp.category == 'Hardware' || newComp.category == 'Infrastructure')
    {
        newComplaint.assignedTo = "5912ba0f94677a286c6f35c3";

    }
    else{
        newComplaint.assignedTo = "59155d09f60b542d9098aa15";

    }

    Complaint.create(newComplaint, function(err,data){

        if(err){
            res.send(err);
        }
        else{
            let compRes = JSON.parse(JSON.stringify(data));
            compRes.assignedTo = currentUser;
            res.send(compRes);
        }
    })
}

//==========================********   for fetching complaints   **************==========================

exports.fetchComplaints = (fetchCompData,res) => {

    var offset = fetchCompData.offset;
    var currentUser = fetchCompData.currentUser;

    if(currentUser === 'admin'){
        Complaint.find({}).sort({'createdAt': -1}).populate({path: 'assignedTo', select: 'userName email userImage'}).limit(10).skip(offset).exec(function(err,allComplaint){
            if (err) {
                res.send(err);
            } else {

                res.send(allComplaint)
            }
        })
    }
    else{
        var currentUserID = fetchCompData.currentUserID;
        Complaint.find({"_id":currentUserID}).sort({'createdAt': -1}).limit(10).skip(offset).exec(function(err,allComplaint){
            if (err) {
                res.send(err);
            } else {

                res.send(allComplaint)
            }
        })
    }
}

//==========================********   for changing status   **************==========================

exports.complaintStatus = (statusComp,res) => {

    if(statusComp.compStatus === 'Resolved'){
        Complaint.findOne({"_id": statusComp.compId},function(err,data) {
            if(err){
                res.send(err)
            }
            else{

                Complaint.update({"_id": statusComp.compId},{"compStatus": statusComp.compStatus}, function(err,result){
                    if(err){
                        res.send(err);
                    }
                    else{

                        res.send(statusComp);
                    }
                });
            }
        })
    }
    else{
        Complaint.deleteOne({"_id":statusComp.compId},function(err,data){
            if(err){
                res.send(err)
            }
            else{
                res.send(statusComp);
            }

        })
    }
}

//==========================********   for fetching resolved complaints   **************==========================

exports.resolvedComplaints = (resolvedList,res) => {

    var offset = resolvedList.offset;
    var currentUser = resolvedList.currentUser;

    if(currentUser === 'admin'){
        Complaint.find({"compStatus":'Resolved'}).sort({'createdAt': -1}).populate({path: 'assignedTo', select: 'userName email userImage'}).limit(10).skip(offset).exec(function(err,resolvedComp){
            if (err) {
                res.send(err);
            }
            else {

                res.send(resolvedComp)
            }
        })
    }
    else{
        var currentUserID = resolvedList.currentUserID;
        Complaint.find({"_id":currentUserID, "compStatus":'Resolved'}).sort({'createdAt': -1}).populate({path: 'assignedTo', select: 'userName email userImage'}).limit(10).skip(offset).exec(function(err,resolvedComp){
            if (err) {
                res.send(err);
            }
            else {

                res.send(resolvedComp)
            }
        })
    }
}

exports.deleteComplaints = (deleteComp,res) => {
    Complaint.deleteOne({"_id":deleteComp.compId},function(err,data){
        if(err){
            res.send(err)
        }
        else{
            res.send(data);
        }

    })
}
