/**
 * Created by saubhagya on 1/6/17.
 */
var User = require('./../apis/users/users.model');

var admin = [{
    userName:'Saubhagya Nair',
    email:'saubhagya.nair@tothenew.com',
    role:'admin',
    category:'Infrastructure'
},{
    userName:'Anurag Sharma',
    email:'anurag.sharma@tothenew.com',
    role:'admin',
    category:'Software'
},{
    userName:'Puja Goyal',
    email:'puja.goyal@tothenew.com',
    role:'admin',
    category:'Hardware'
}]

createAdmin = () => {
    if(User.length == 0){
        admin.forEach((user) => {
            User.create(user, function(err,data){
                if(err){
                    console.log('admins could not be created.',err);
                }
                else{
                    console.log(data);
                }
            });
        })
    }
    else{
        admin.forEach((user) => {
            User.findOne({'role': 'admin', 'email': user.email},function(err,data){
                if(err){
                    console.log('admins could not be found',err);
                }
                else{
                    console.log('Admin found',data);
                }
            })
        })
    }
}

createAdmin();