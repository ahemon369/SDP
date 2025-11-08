var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];
let object=[];
for (let i=0;i<numbers.length;i++)
    {
        let check=object.find(num => num==numbers[i])
        if(check==undefined)
            {
                object.push(numbers[i]);
            }
    }
console.log(object);