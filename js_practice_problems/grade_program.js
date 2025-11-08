const mark =100;
let grade;
if (mark>=80)
    {
        grade="A+";
    }
else if(mark>=70 && mark<80)
    {
        grade="A";
    }
else if(mark>=60 && mark<70)
    {
        grade="A-";
    }
else if(mark>=50 && mark<60)
    {
        grade="B";
    }
else if(mark>=40 && mark<50)
    {
        grade="C";
    }
else if(mark>=33 && mark<40)
    {
        grade="D";
    }
else
{
    grade="F";
}
console.log("Your Grade is ",grade);