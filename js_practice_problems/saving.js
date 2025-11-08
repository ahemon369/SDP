const savingmoney=(array,living_cost)=>{
    if(Array.isArray(array)==false || isNaN(living_cost))
        {
            console.log("Invalid input");
        }
    else
    {
        let total_income_after_tax=0;
        for(const element of array)
            {
                if(!isNaN(element))
                    {
                        if(element>=3000)
                            {
                                let tax=element*0.20;
                                total_income_after_tax+=element-tax;
                            }
                            else
                            {
                                total_income_after_tax+=element;
                            }
                    }
            }

            let total_saving=total_income_after_tax-living_cost;
            if(total_saving>=0)
                {
                    return total_saving;
                }
            else
            {
                return "earn more";
            }

    }

}
const s=savingmoney(100,[10000]);
console.log(s);