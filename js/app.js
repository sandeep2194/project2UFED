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
const fragment = document.createDocumentFragment();
const sections = document.querySelectorAll("section");
const list = document.getElementById("navbar__list");
let goto;
const scrolltotopa = document.querySelector(".scrolltotop");
const topelement = document.querySelector("h1");
const navbar = document.querySelector(".navbar__menu")
    /**
     * End Global Variables
     * Start Helper Functions
     * 
     */
function showtotopbutton() {
    if (document.documentElement.scrollTop > 350) {
        scrolltotopa.style.display = "block";
    } else {
        scrolltotopa.style.display = "none";
    }
}

function hideelement(element) {
    element.style.display = "none";
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildnav() {
    for (section of sections) {
        const menuitem = document.createElement("li");
        const linkitem = document.createElement("a");

        linkitem.setAttribute("href", "#" + section.id);
        linkitem.classList.add(section.id, "menu__link");
        linkitem.textContent = section.id;

        menuitem.appendChild(linkitem);
        fragment.appendChild(menuitem);
    }
    list.appendChild(fragment);
};
// Add class 'active' to section when near top of viewport
function makeactive() {
    for (section of sections) {
        let current_a = list.getElementsByClassName(section.id).item("0");
        const box = section.getBoundingClientRect();
        if (box.top <= 200 && box.bottom >= 200) {
            section.classList.add("your-active-class");
            current_a.classList.add("active_menu");
        } else {
            section.classList.remove("your-active-class");
            current_a.classList.remove("active_menu");

        }
    }

}
// Scroll to anchor ID using scrollTO event
function gotoelement(toelement) {
    toelement.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
}

/**0
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
buildnav();

// Scroll to section on link click
document.addEventListener("scroll", function() {
    makeactive()
});


// Set sections as active
list.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (evt.target.nodeName === 'A') {
        goto = document.getElementById(evt.target.classList[0]);
        gotoelement(goto);
    }

});




//scroll to top on click
scrolltotopa.addEventListener("click", function(evt) {
    evt.preventDefault();
    gotoelement(topelement);
})


// show to top button on scroll
document.addEventListener("scroll", function() { showtotopbutton() });