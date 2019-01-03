import * as bcrypt from "bcryptjs";



export const registerNewUser=(userName:string, userPassword:string, db:any)=>{
    const rowCount:number=db.count('*').from('USERS').where({
        NAME: userName,
    })

    console.log("START");

    if(rowCount>0){
        console.log("user existed in database");
        return 0;
    }else{
        const saltRounds:number = 10;
        bcrypt.hash(userPassword, saltRounds, (err, hashedPassword)=>{
            if(err){
                console.log(err);
            }

            console.log(hashedPassword);

            db('USERS').insert({
                NAME: userName,
                PASSWORD: hashedPassword,
            });
            return 1;
        })
    }
}

export const addNewExercise=(userId:number, description:string, duration:number, date:string, db:any)=>{
    try{
        db('EXERCISES').insert({
            DESCRIPTION: description,
            DURATION: duration,
            DATE: date,
            USER_ID: userId
        })

        console.log(description+ " inserted ok");
    } catch(error){
        console.log(error);
        return 0;
    }
    return 1;
}

