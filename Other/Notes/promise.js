//! Problem Statement: You have to post data into an array datas and after you are done posting that, you have to display that data on the user interface.

const datas = [
    {name: "Raman", Profession: "Software Engineer"},
    {name: "Sudhir", Profession: "Journalist"},
]

function getData(){
    setTimeout(() => {
        let output = "";
        datas.forEach((data, index) => {
            output += `<li>${data.name}</li>`
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createData(newData){
    setTimeout(() => {
        datas.push(newData);
    }, 2000);
}

createData({name: "Ramadhir", Profession: "Contractor"})

getData();

// Now the first way of solving this is by using setTimeout function, in this case, the function will wait for a defined time and will execute after that time.

// The problem with this approach is as in case of above example, the createData function has more time allocated (on the basis of an assumption), so getData function will render data as it will get resolved in the event loop before createData.

// To solve this problem, we have to decrease the time of the createData method, which won't be possible if it's a network request because we never know how much time a network will take for responding.

// One way of solving this problem is by using callback functions.

// The solution is described below.

const datas = [
    {name: "Raman", Profession: "Software Engineer"},
    {name: "Sudhir", Profession: "Journalist"},
]

function getData(){
    setTimeout(() => {
        let output = "";
        datas.forEach((data, index) => {
            output += `<li>${data.name}</li>`
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createData(newData, callback){
    setTimeout(() => {
        datas.push(newData);
        callback();
    }, 2000);
}

createData({name: "Ramadhir", Profession: "Contractor"}, getData());

// So, in the above program, function getData will be called after the createData timeout gets over.


// Now the solution to the above problem using promise.

const datas = [
    {name: "Raman", Profession: "Software Engineer"},
    {name: "Sudhir", Profession: "Journalist"},
]

function getData(){
    setTimeout(() => {
        let output = "";
        datas.forEach((data, index) => {
            output += `<li>${data.name}</li>`
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createData(newData){
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            datas.push(newData);
            if(!err){
                resolve();
            } else{
                reject("There is a problem...");
            }
        }, 2000);
    });
    
    
}

createData({name: "Ramadhir", Profession: "Contractor"})
.then(getData)
.catch(err => console.log(err););



// Now the solution to the same problem using async and await.

const datas = [
    {name: "Raman", Profession: "Software Engineer"},
    {name: "Sudhir", Profession: "Journalist"},
]

function getData(){
    let output = "";
    datas.forEach((data, index) => {
        output += `<li>${data.name}</li>`
    });
    document.body.innerHTML = output;
    
}

function createData(newData){
    datas.push(newData);
    if(!err){
        resolve();
    } else{
        reject("There is a problem...");
    }
}

async function start(){
    await createData({name: "Ramadhir", Profession: "Contractor"});
    getData();
}






/* 
Promise's result: 
-> Resolve
-> Reject
-> Pending

*/


function func1(){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            if(!error){
                console.log("Your promise has been resolved.");
                resolve();
            }
            else{
                console.log("Your promise has not been resolved.");
                reject('Sorry not fulfilled.');
            }
        }, 2000);
    });
}

func1().then(function(){
    console.log("Thanks for resolving.");
}).catch(function(error){
    console.log("Not fulfilled. Reason: " + error);
});