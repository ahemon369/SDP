let array=[1,3,2,5,4,7,8,10,9,6,11,13,12,14,15,16,17,19,20,18]
for(let i=0;i<array.length-1;i++)
    {
        for(let j=i+1;j<array.length;j++)
            {
                if(array[i]>array[j])
                    {
                        let tmp=array[i];
                        array[i]=array[j];
                        array[j]=tmp;
                    }
            }
    }

console.log(array);