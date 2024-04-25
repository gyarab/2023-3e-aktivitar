
    //naše podmínky pro užívání aplikace
   let isAccepted = confirm("Vítejte na naší stránce (Aktivitář) plné užitečných informací a zajímavých zážitků! Předtím, než začnete prozkoumávat, nám prosím dovolte získat váš souhlas."+"\n"

   +"\n"+"Vaše soukromí je pro nás důležité. Při používání naší stránky budeme shromažďovat pouze nezbytné informace, které nám pomohou vytvářet lepší uživatelské zážitky a poskytovat vám relevantní obsah."+"\n"+
 
   "\n"+"Vaše osobní údaje nebudou sdíleny s žádnými třetími stranami bez vašeho výslovného souhlasu. Jsou uchovávány v souladu s našimi zásadami ochrany osobních údajů..");
   if(isAccepted === true){
      //nic se neděje
   }else{
        //vrátí na stránku zpět
       history.back()
   }
