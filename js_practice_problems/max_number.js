var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];
// let max=Math.max(...numbers);
// console.log(max);
let num=numbers[0];
for (let i=1;i<numbers.length;i++)
    {
        if(numbers[i]>num)
            {
                num=numbers[i];
            }
    }
console.log(num);