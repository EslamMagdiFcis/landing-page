/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

const sectionElments = document.querySelectorAll('main section');
const navbarElment = document.getElementById("navbar__list");
const fragment = document.createDocumentFragment();
const activeClassForSectionBody = 'your-active-class';
const activeClassForSectionLink = 'active';

/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav


for(let sectionElment of sectionElments) {
    const navbarItem = document.createElement('li');

    const sectionLink = document.createElement('a');
    sectionLink.href = '#' + sectionElment.id;
    sectionLink.textContent = sectionElment.dataset.nav;
    sectionLink.classList.add('menu__link');
    sectionLink.id = getSectionLinkId(sectionElment.id);
    navbarItem.appendChild(sectionLink);

    fragment.appendChild(navbarItem);
}

navbarElment.appendChild(fragment);


// Add class 'active' to section when near top of viewport

navbarElment.addEventListener('click', function(event){
    event.preventDefault();
    
    try{
        const desiredId = event.target.hash.slice(1);

        for(let sectionElment of sectionElments){

            const sectionLinkId = getSectionLinkId(sectionElment.id);
            const sectionLinkElment = document.getElementById(sectionLinkId);

            if(sectionElment.id === desiredId){
                sectionElment.classList.add(activeClassForSectionBody);
                sectionLinkElment.classList.add(activeClassForSectionLink);
            }
            else{
                sectionElment.classList.remove(activeClassForSectionBody);
                sectionLinkElment.classList.remove(activeClassForSectionLink);
            }
        }
    }
    catch{
    }
})

// Scroll to anchor ID using scrollTO event

navbarElment.addEventListener('click', function(event){
    event.preventDefault();

    try{
        const desiredId = event.target.hash.slice(1);
        const secId = document.getElementById(desiredId);
        const sectionLinks = document.querySelectorAll('ul li a');
        const sectionLinkId = getSectionLinkId(desiredId)

        window.scrollTo({
            top: secId.offsetTop,
            behavior: 'smooth'
        });
    }
    catch{

    }
})

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
const navBarHeight = document.querySelector('nav').offsetHeight;

function setActiveClassForSectionBody(){
    const pageOffset = window.pageYOffset + navBarHeight;
    handleActiveOverSections(pageOffset);
}

function handleActiveOverSections(currentPostion){

    for(let sectionElment of sectionElments){
        const sectionLinkId = getSectionLinkId(sectionElment.id);
        const linkElment = document.getElementById(sectionLinkId);

        if(sectionElment.offsetTop <=  currentPostion && currentPostion <= sectionElment.offsetTop + sectionElment.offsetHeight - navBarHeight){
            sectionElment.classList.add(activeClassForSectionBody);
            linkElment.classList.add(activeClassForSectionLink);
        }
        else{
            sectionElment.classList.remove(activeClassForSectionBody);
            linkElment.classList.remove(activeClassForSectionLink);
        }
    }
}

function getSectionLinkId(sectionId){
    return sectionId + 'link';
}


window.addEventListener('wheel', setActiveClassForSectionBody)
window.addEventListener('load', setActiveClassForSectionBody)