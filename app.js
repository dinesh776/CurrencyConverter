const select=document.querySelectorAll("select");
const baseCurrencyApi="https://latest.currency-api.pages.dev/v1/currencies";

for(let i of select){
    for(currCode in countryList){
        let option= document.createElement("option");
        option.innerText=currCode;
        option.value=currCode;
        if(i.name==="from"&&currCode==="USD"){
            option.selected="selected";
        }
        else if(i.name==="to" && currCode==="INR"){
            option.selected="selected";
        }
        i.append(option);
    }
    i.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    
    let currCode = element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

const button=document.querySelector(".submit");
button.addEventListener("click",(e)=>{
    e.preventDefault();
    conversion();
})

const fromCur=document.querySelector(".from select");
const toCur=document.querySelector(".to select");
const msg=document.querySelector("#msg");
const conversion=async ()=>{
    let amount=document.querySelector("input");
    let amtValue=amount.value;
    if(amtValue===""||amtValue<1){
        amount.value="1";
    }
    let url=`${baseCurrencyApi}/${fromCur.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[fromCur.value.toLowerCase()][toCur.value.toLowerCase()];
    let totalAmount=amtValue*rate;
    msg.innerText=`${amtValue} ${fromCur.value} = ${totalAmount} ${toCur.value}`;
};

const swap=document.querySelector("#swap");
swap.addEventListener("click",(e)=>{
    e.preventDefault();
    swapf();
    updateFlag(select[0]);
    updateFlag(select[1]);
});

const swapf=()=>{
    let temp=fromCur.value;
    fromCur.value=toCur.value;
    toCur.value=temp;
};