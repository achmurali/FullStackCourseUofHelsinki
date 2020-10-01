interface Exercises {
    periodLength:number,
    trainingDays:number,
    success:boolean,
    rating:number,
    ratingDescription:string,
    target:number,
    description:string
}

export const calculateExercise = (args : Array<number>,target:number) : Exercises => {
    let noOfDays= 0;
    let success = true;
    let rating = 0;
    args.forEach(a => {
        if(a > 0)
            noOfDays+=1;
        if(a==0)
            success=false;
        rating += a;
    });
    return {
        periodLength:args.length,
        trainingDays:noOfDays,
        success:success,
        rating:rating/args.length,
        ratingDescription:"OK",
        target:target,
        description:"OK"
    };
};

//console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1],2));