function populateTrans(transArr){
  const container = document.getElementById("container");

  container.innerHTML = ``;

  let currIn = 0, currEx = 0;

  const allTrans = document.createElement("div")
  allTrans.classList.add("allTrans");

  for(tran of transArr){
    const tranCon = document.createElement("div")
    tranCon.classList.add("tranCon");

    //LeftCon Started
    const leftCon = document.createElement("div")
    leftCon.classList.add("leftCon");

    if(tran.type == "in"){
      const inAmo = document.createElement("span")
      inAmo.classList.add("inAmo");
      inAmo.innerHTML = `Rs.${tran.amount}`;
      currIn += tran.amount;

      leftCon.appendChild(inAmo);
    }else{
      const exAmo = document.createElement("span")
      exAmo.classList.add("exAmo");
      exAmo.innerHTML = `Rs.${tran.amount}`;
      currEx += tran.amount;

      leftCon.appendChild(exAmo);
    }

    const dateEle = document.createElement("span");
    dateEle.innerHTML = `${tran.date}`;
    leftCon.appendChild(dateEle);

    tranCon.appendChild(leftCon);
    //leftCon Ended


    //rightCon Started
    const rightCon = document.createElement("div")
    rightCon.classList.add("rightCon");

    const desEle = document.createElement("span");
    desEle.innerHTML = `${tran.des}`
    rightCon.appendChild(desEle);

    tranCon.appendChild(rightCon);
    //rightCon Ended

    allTrans.appendChild(tranCon);
  }


  const inExCon = document.createElement("div")
  inExCon.classList.add("inExCon");

  const inAmoD = document.createElement("span");
  inAmoD.classList.add("inAmo");
  inAmoD.innerHTML = `Rs.${currIn}`;
  inExCon.appendChild(inAmoD);

  const exAmoD = document.createElement("span");
  exAmoD.classList.add("exAmo");
  exAmoD.innerHTML = `Rs.${currEx}`;
  inExCon.appendChild(exAmoD);


  const curr = document.createElement("div")
  curr.classList.add("curr");

  const inHandEle = document.createElement("span");
  inHandEle.innerHTML = `In Hand: `;
  curr.appendChild(inHandEle);

  const inHandAmounte = document.createElement("span");
  let inHand = currIn - currEx;
  if(inHand >= 0){
    inHandAmounte.classList.add("inAmo");
    inHandAmounte.innerHTML = `Rs.${inHand}`;
  }else{
    inHandAmounte.classList.add("exAmo");
    inHandAmounte.innerHTML = `Rs.${inHand*-1}`;
  }

  curr.appendChild(inHandAmounte);

  container.appendChild(allTrans);
  container.appendChild(inExCon);
  container.appendChild(curr);
}
