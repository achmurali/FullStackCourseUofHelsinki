export const BMI = (height:number,weight:number): number|string => {
    height = height/100;
    const bmi:number =  (weight)/(height^2);
    if(bmi < 18.5)
        return `Underweight ${bmi}`;
    else if(bmi < 25)
        return `Normal ${bmi}`;
    else 
        return `Overweight ${bmi}`;
};

//console.log(BMI(180,74))
//export default BMI