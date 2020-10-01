import express from 'express';
import {BMI as bmi} from './bmiCalculator';
import {calculateExercise as exerciseCalculator} from './calculateExercise';

const app = express();

app.use(express.json())

app.get('/get',(_req,res) => {
    res.send('Hello');
});

app.get('/bmi',(req,res) => {
    if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight)))
        return res.json({error:"WRONG INPUT"});
    const result = bmi(Number(req.query.height),Number(req.query.weight));
    return res.json(result);
});

app.post('/exercises',(req,res) => {
    const body = req.body; // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if(!body.daily_exercises || !body.target)
        return res.json({error:"parameters missing"});
    if(isNaN(Number(body.target)) && Array.isArray(body.daily_exercises))
        return res.json({error:"malformatted parameters"});
    return res.json(exerciseCalculator(body.daily_exercises,body.target));
});

const PORT = 3003;

app.listen(PORT,() => {
    console.log(`Server running on Port ${PORT}`);
});