
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
export function animateText() {
    gsap.registerPlugin(TextPlugin);
    gsap.defaults({ ease: "none" });

    //set heigth of the container so size doesn't change when text is animated
    var welcomeHeight = document.getElementById("welcome").offsetHeight;
    document.getElementById("welcome").style.height = welcomeHeight + "px";

    const tl = gsap.timeline();
    const initialTitle = document.querySelector("#title").innerHTML;
    const initialSubText = document.querySelector("#subtext").innerHTML;
    tl.set("#title", { text: initialTitle })
        .set("#subtext", { text: "" })
        .fromTo("#title", { text: "" }, { text: initialTitle, duration: 0.5, reversed: true, delay: 1 })
        .to("#title", { text: "Hi.", duration: 0.5 })
        .fromTo("#title", { text: "" }, { text: "Hi.", duration: 0.5, reversed: true, delay: 0.7 })
        .to("#title", { text: "I mean...", duration: 0.3 })
        .fromTo("#title", { text: "" }, { text: "I mean...", duration: 0.3, reversed: true, delay: 0.5 })
        // .to("#title", { text: "Hello", duration: 0.5 })
        .to("#title", { text: "Hello World!", duration: 0.5, delay: 0.5, ease:"none" })
        .to("#subtext", { text: initialSubText, duration: 1, delay: 1, ease: "none" })

}