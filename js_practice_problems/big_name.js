var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
let bigname=friends[0];
for(let i=1;i<friends.length;i++)
    {
        let element=friends[i];
        if(bigname.length<element.length)
            {
                bigname=element;
            }
    }
console.log(bigname);