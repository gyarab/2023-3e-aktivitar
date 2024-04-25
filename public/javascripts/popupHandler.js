
let indexOfLastURL = -1;

//funkce pro pridani aktivity, spusti se po kliknuti na tlacitko
function pridatbtn() {
  
    //aktivita
    let popup = document.getElementById('popup');
     popup.style.display = 'block';
}
pridatbtn(); //at se ten popup rovnou otevre


    //co se stane kdyz kliknu na POTVRDIT u pridani zaznamu 1-4
    function Potvrdit1() {
        closePopup()    //zavrit popup
    }

    function Potvrdit2() {
        closePopup()
    }

    function Potvrdit3() {
        closePopup()
    }

    function Potvrdit4() {
        closePopup()
    }




    //kdyz vypnu popup, at se zase zneviditelni ty additionalinfo aby tam nezustaly visible z minula kdyz dam znova novej zaznam
    function closePopup() {
    

        let additionalInfo1 = document.getElementById('additional-info1');
        additionalInfo1.style.display = 'none';

        let additionalInfo2 = document.getElementById('additional-info2');
        additionalInfo2.style.display = 'none';

        let additionalInfo3 = document.getElementById('additional-info3');
        additionalInfo3.style.display = 'none';

        let additionalInfo4 = document.getElementById('additional-info4');
        additionalInfo4.style.display = 'none';

        //kdyz vypnu popup, at se barva vsech ikon vrati na default
        let icons = document.querySelectorAll('.icon-item i');
        icons.forEach(icon => {
        icon.classList.remove('clicked1', 'clicked2', 'clicked3', 'clicked4');
        });

        let popupContent = document.querySelector('.popup-content');
        popupContent.style.top = '50%'; 

        //vratí uživatele na stranku v pozadí
        history.go(indexOfLastURL)
        console.log(indexOfLastURL)
        document.querySelector('.toptitle').style.color = 'black';
        document.querySelector('.popup-content').style.backgroundColor = 'white';



    }
    //kdyz kliknu na prvni ikonu, at se zmizi jakykoliv additional infa pokud tam nejaky byly (kdyz preklikavam mezi ruznejma tema aktivitama jinak by se to stackovalo pod sebe)
    function details1() {
    
        if(window.location.search != "?activtype=sport"){
            history.pushState(null, '', '?activtype=sport');
            indexOfLastURL--;
        }

        let popup = document.getElementById('popup');
        popup.style.display = 'block';

        let additionalInfo1 = document.getElementById('additional-info1');
        additionalInfo1.style.display = 'block';

        let additionalInfo2 = document.getElementById('additional-info2');
        additionalInfo2.style.display = 'none';

        let additionalInfo3 = document.getElementById('additional-info3');
        additionalInfo3.style.display = 'none';

        let additionalInfo4 = document.getElementById('additional-info4');
        additionalInfo4.style.display = 'none';
        
        //nez se zmeni barva ikony, zmen barvu vsech ostatnich ikon na default
        let icons = document.querySelectorAll('.icon-item i');
        icons.forEach(icon => {
        icon.classList.remove('clicked1', 'clicked2', 'clicked3', 'clicked4');
        });
        //ikona zmeni barvu po kliknuti na ni
        let icon1 = document.querySelector('.icon-item:first-child i');
        icon1.classList.add('clicked1');

        //zmena position popupu po tom co kliknu na tu prvni ikonu (aby to bylo veprostred po tom co se tam objevi ty dalsi veci)
        let popupContent = document.querySelector('.popup-content');
        popupContent.style.top = '50%'; //position toho popupu po tom co kliknu na nejakou ikonu a to okno se rozsiri                                     --kam se posune popup po klinuti na ikonu
        
        document.querySelector('.popup-content').style.backgroundImage = 'linear-gradient(to bottom right,#c55c0063, #e67e22)';


    }
    //to samy
    function details2() {
        if(window.location.search != "?activtype=call"){
            history.pushState(null, '', '?activtype=call');
            indexOfLastURL--;
        }
        let additionalInfo2 = document.getElementById('additional-info2');
        additionalInfo2.style.display = 'block';

        let additionalInfo1 = document.getElementById('additional-info1');
        additionalInfo1.style.display = 'none';

        let additionalInfo3 = document.getElementById('additional-info3');
        additionalInfo3.style.display = 'none';

        let additionalInfo4 = document.getElementById('additional-info4');
        additionalInfo4.style.display = 'none';

        let icons = document.querySelectorAll('.icon-item i');
        icons.forEach(icon => {
        icon.classList.remove('clicked1', 'clicked2', 'clicked3', 'clicked4');
        });

        let icon2 = document.querySelector('.icon-item:nth-child(2) i');
        icon2.classList.add('clicked2');

        let popupContent = document.querySelector('.popup-content');
        popupContent.style.top = '50%';

        document.querySelector('.popup-content').style.backgroundImage = 'linear-gradient(to bottom right, #a4ffb8, #00af26)';

    }
    //to samy
    function details3() {

        if(window.location.search != "?activtype=sleep"){
            history.pushState(null, '', '?activtype=sleep');
            indexOfLastURL--;
        }
        let additionalInfo3 = document.getElementById('additional-info3');
        additionalInfo3.style.display = 'block';

        let additionalInfo1 = document.getElementById('additional-info1');
        additionalInfo1.style.display = 'none';

        let additionalInfo2 = document.getElementById('additional-info2');
        additionalInfo2.style.display = 'none';

        let additionalInfo4 = document.getElementById('additional-info4');
        additionalInfo4.style.display = 'none';

        let icons = document.querySelectorAll('.icon-item i');
        icons.forEach(icon => {
        icon.classList.remove('clicked1', 'clicked2', 'clicked3', 'clicked4');
        });

        let icon3 = document.querySelector('.icon-item:nth-child(3) i');
        icon3.classList.add('clicked3');

        let popupContent = document.querySelector('.popup-content');
        popupContent.style.top = '50%';

        document.querySelector('.popup-content').style.backgroundImage = 'linear-gradient(to bottom right, #ccc3ff, #3416dfa2)';

    }
    //to samy
    function details4() {

        if(window.location.search != "?activtype=book"){
            history.pushState(null, '', '?activtype=book');
            indexOfLastURL--;
        }

        let additionalInfo4 = document.getElementById('additional-info4');
        additionalInfo4.style.display = 'block';

        let additionalInfo1 = document.getElementById('additional-info1');
        additionalInfo1.style.display = 'none';

        let additionalInfo2 = document.getElementById('additional-info2');
        additionalInfo2.style.display = 'none';

        let additionalInfo3 = document.getElementById('additional-info3');
        additionalInfo3.style.display = 'none';

        let icons = document.querySelectorAll('.icon-item i');
        icons.forEach(icon => {
        icon.classList.remove('clicked1', 'clicked2', 'clicked3', 'clicked4');
        });

        let icon4 = document.querySelector('.icon-item:nth-child(4) i');
        icon4.classList.add('clicked4');

        let popupContent = document.querySelector('.popup-content');
        popupContent.style.top = '50%'; 

        document.querySelector('.popup-content').style.backgroundImage = 'linear-gradient(to bottom right, #dadada, #000000a2)';

    }

    
    