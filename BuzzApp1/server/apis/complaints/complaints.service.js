/**
 * Created by saubhagya on 2/5/17.
 */

var Complaint = require('./complaints.model');

//==========================********   for creating complaints   **************==========================

exports.createComplaint = (newComp,res) => {
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
        console.log('----------',err, data);
        if(err){
            console.log('error occurred while creating complaint>>>>>>>',err)
        }
        else{
            console.log('complaint data is>>>>>>>>>>',data);
            res.send(data);


        }
    })
}

//==========================********   for fetching complaints   **************==========================

exports.fetchComplaints = (fetchCompData,res) => {
    console.log('all complaints ',res);
    console.log('offset-----',fetchCompData.offset);
    var offset = fetchCompData.offset;
    var currentUser = fetchCompData.currentUser;

    if(currentUser === 'admin'){
        Complaint.find({}).sort({'createdAt': -1}).limit(10).skip(offset).exec(function(err,allComplaint){
            if (err) {
                res.send(err);
            } else {
                console.log('all complaint--- ', allComplaint.length);

                console.log('limit and offset---------------', offset)
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
                console.log('all complaint--- ', allComplaint.length);

                console.log('limit and offset---------------', offset)
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
                console.log('data in statusComp',data);
                Complaint.update({"_id": statusComp.compId},{"compStatus": statusComp.compStatus}, function(err,result){
                    if(err){
                        res.send(err);
                    }
                    else{
                        console.log('________resolvedComp',statusComp);
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
                res.send(data);
            }

        })
    }
}

//==========================********   for fetching resolved complaints   **************==========================

exports.resolvedComplaints = (resolvedList,res) => {
    console.log('offset-----',resolvedList.offset);
    var offset = resolvedList.offset;
    var currentUser = resolvedList.currentUser;

    if(currentUser === 'admin'){
        Complaint.find({"compStatus":'Resolved'}).sort({'createdAt': -1}).limit(10).skip(offset).exec(function(err,resolvedComp){
            if (err) {
                res.send(err);
            } else {
                console.log('all complaint--- ', resolvedComp.length);

                console.log('limit and offset---------------', offset);
                res.send(resolvedComp)
            }
        })
    }
    else{
        var currentUserID = fetchCompData.currentUserID;
        Complaint.find({"_id":currentUserID, "compStatus":'Resolved'}).sort({'createdAt': -1}).limit(10).skip(offset).exec(function(err,resolvedComp){
            if (err) {
                res.send(err);
            } else {
                console.log('all complaint--- ', resolvedComp.length);

                console.log('limit and offset---------------', offset);
                res.send(resolvedComp)
            }
        })
    }
}
