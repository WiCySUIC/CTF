document.addEventListener("DOMContentLoaded", function () {
    const scheduleItems = document.querySelectorAll(".schedule-item");

    scheduleItems.forEach(item => {
        item.addEventListener("click", function () {
            this.classList.toggle("active");
            
            // Toggle visibility of the next sibling (the .details div)
            const details = this.nextElementSibling;
            if (details && details.classList.contains("details")) {
                details.style.display = details.style.display === "block" ? "none" : "block";
            }
        });
    });
});

document.getElementById('about-btn').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('schedule-btn').addEventListener('click', () => {
    document.getElementById('schedule').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('faq-btn').addEventListener('click', () => {
    document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('sponsors-btn').addEventListener('click', () => {
    document.getElementById('sponsorsPartners').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('meetTheTeam-btn').addEventListener('click', () => {
    document.getElementById('team').scrollIntoView({ behavior: 'smooth' });
});


/* faq - answer drop down script */ 
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const itemsPerRow = 3; // DONT CHANGE THIS there are 3 items per row

    function closeAllAnswers() {
        faqItems.forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('.faq-answer')) {
                item.querySelector('.faq-answer').style.top = '';
            }
        });

        // margin reset only for items that have been shifted
        faqItems.forEach(item => {
            item.style.marginTop = '0';
        });
    }

    function handleFAQClick(e) {
        const item = e.currentTarget;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        // if already open, close everything
        if (isActive) {
            closeAllAnswers();
            return;
        }

        // close all others
        closeAllAnswers();

        // open clicked answer
        item.classList.add('active');

        // this is calculating positioning
        const itemRect = item.getBoundingClientRect(); /* this just returns the size of element and the position for vp */ 
        const itemIndex = Array.from(faqItems).indexOf(item);
        const rowIndex = Math.floor(itemIndex / itemsPerRow);

        if (answer) {
            const answerHeight = answer.offsetHeight;
            answer.style.top = `${itemRect.height}px`;

            // THREE ITEMS in next row are moved 
            const startNextRow = (rowIndex + 1) * itemsPerRow;

            for (let i = 0; i < itemsPerRow; i++) {
                const nextItem = faqItems[startNextRow + i];
                if (nextItem) {
                    nextItem.style.marginTop = `${answerHeight + 20}px`; // extra padding for safety
                }
            }
        }
    }

    faqItems.forEach(item => {
        item.addEventListener('click', handleFAQClick);
    });
});

const mainSponsor = { clean: "zebrawhite.png", glitch: "zebra-glitch.png" };

const sponsors = [
    { clean: "motorolawhite.jpg", glitch: "motorola-glitch.png" },
    { clean: "cmeGroup.png", glitch: "cmeGroup-glitch.png" },
    { clean: "discover.png", glitch: "discover-glitch.png" }
];

const partners = [
    { clean: "imanage.png", glitch: "imanage-glitch.png" },
    { clean: "caci.avif", glitch: "caci-glitch.png" }
];

// Get canvas elements
const mainSponsorCanvas = document.getElementById("main-sponsor-canvas");

const sponsorCanvases = [
    document.getElementById("sponsor-canvas-1"),
    document.getElementById("sponsor-canvas-2"),
    document.getElementById("sponsor-canvas-3")
];

const partnerCanvases = [
    document.getElementById("partner-canvas-1"),
    document.getElementById("partner-canvas-2")
];

// Get 2D contexts
const mainSponsorCtx = mainSponsorCanvas.getContext("2d");
const sponsorCtxs = sponsorCanvases.map(canvas => canvas.getContext("2d"));
const partnerCtxs = partnerCanvases.map(canvas => canvas.getContext("2d"));

// Resize canvases dynamically
function resizeCanvas() {
    const mainSponsorContainer = document.querySelector(".sponsor-display");
    mainSponsorCanvas.width = mainSponsorContainer.clientWidth;
    mainSponsorCanvas.height = mainSponsorContainer.clientHeight;

    sponsorCanvases.forEach((canvas) => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });

    partnerCanvases.forEach((canvas) => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    });
}

// Apply glitch effect before showing the clean logo
function pixelGlitchEffect(canvas, ctx, imagePair, callback) {
    let glitchImg = new Image();
    glitchImg.src = imagePair.glitch;
    glitchImg.crossOrigin = "Anonymous"; // Prevent CORS issues

    glitchImg.onload = () => {
        let glitchSteps = 6; // Number of glitch transitions
        let step = 0;

        function applyGlitch() {
            if (step >= glitchSteps) {
                callback(imagePair.clean); // Show clean logo after glitching
                return;
            }

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Apply pixelation with random distortion
            let pixelSize = Math.floor(Math.random() * 10) + 2;
            ctx.drawImage(glitchImg, 0, 0, canvas.width / pixelSize, canvas.height / pixelSize);
            ctx.drawImage(canvas, 0, 0, canvas.width / pixelSize, canvas.height / pixelSize, 0, 0, canvas.width, canvas.height);

            // Add random horizontal scan lines
            for (let i = 0; i < 5; i++) {
                let y = Math.random() * canvas.height;
                ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
                ctx.fillRect(0, y, canvas.width, 2);
            }

            // Add slight RGB shift effect
            ctx.globalCompositeOperation = "difference";
            ctx.drawImage(glitchImg, Math.random() * 10 - 5, Math.random() * 10 - 5, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";

            step++;
            setTimeout(applyGlitch, 100);
        }

        applyGlitch();
    };

    glitchImg.onerror = () => {
        console.error("Error loading glitch image:", imagePair.glitch);
    };
}

// Display the official logo after glitch effect
function displayOfficialLogo(canvas, ctx, officialImage) {
    let officialImg = new Image();
    officialImg.src = officialImage;
    officialImg.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(officialImg, 0, 0, canvas.width, canvas.height);
    };
}

// Apply glitch effect then show the final logo
function glitchThenShow(canvas, ctx, imagePair) {
    pixelGlitchEffect(canvas, ctx, imagePair, (cleanLogo) => {
        setTimeout(() => {
            displayOfficialLogo(canvas, ctx, cleanLogo);
        }, 200);
    });
}

// Function to start glitching at **random intervals**
function startRandomGlitchLoop(canvas, ctx, imagePair) {
    function glitchWithRandomDelay() {
        glitchThenShow(canvas, ctx, imagePair);
        
        // Generate a new random interval between **8 to 15 seconds**
        let randomDelay = Math.floor(Math.random() * (10000 - 5000) + 5000); 
        
        setTimeout(glitchWithRandomDelay, randomDelay);
    }

    glitchWithRandomDelay(); // Start immediately
}

// Run glitches on all elements with random timing
function applyGlitchesWithRandomization() {
    startRandomGlitchLoop(mainSponsorCanvas, mainSponsorCtx, mainSponsor);

    sponsors.forEach((sponsor, index) => {
        if (sponsorCanvases[index]) {
            startRandomGlitchLoop(sponsorCanvases[index], sponsorCtxs[index], sponsor);
        }
    });

    partners.forEach((partner, index) => {
        if (partnerCanvases[index]) {
            startRandomGlitchLoop(partnerCanvases[index], partnerCtxs[index], partner);
        }
    });
}

// Resize canvas and start random glitches
window.addEventListener("load", () => {
    resizeCanvas();
    applyGlitchesWithRandomization();
});
window.addEventListener("resize", resizeCanvas);

//updated:
// Enhanced team members data
const teamMembers = [
    {
        realName: "Brenda Leyva",
        specialty: "Director",
        status: "WANTED",
        image: "teamPhotos/brenda.JPG",
        threatLevel: 5
    },
    {
        realName: "Coda Richmond",
        specialty: "Experience Lead | Logistics Co-Lead",
        status: "WANTED",
        image: "teamPhotos/coda.JPG",
        threatLevel: 4
    },
    {
        realName: "Julia Bowman",
        specialty: "Communications Lead",
        status: "CAPTURED",
        image: "teamPhotos/julia.JPG",
        threatLevel: 3
    },
    {
        realName: "Martha Barraza",
        specialty: "Web Design Co-Lead",
        status: "WANTED",
        image: "teamPhotos/martha.JPG",
        threatLevel: 4
    },
    {
        realName: "Eduardo Morales",
        specialty: "Web Design Co-Lead | Experience member",
        status: "CAPTURED",
        image: "teamPhotos/eddie.JPG",
        threatLevel: 3
    },
    {
        realName: "Monsserrat Berrum",
        specialty: "Logistics Co-Lead",
        status: "Wanted",
        image: "teamPhotos/monsse.JPG",
        threatLevel: 3
    },
    {
        realName: "Kevin Palma",
        specialty: "Outreach Co-Lead | Experience member",
        status: "CAPTURED",
        image: "anonymous.jpg",
        threatLevel: 3
    },
    {
        realName: "Ciara Taylor",
        specialty: "Outreach Lead | Communications member",
        status: "Wanted",
        image: "teamPhotos/ciara.JPG",
        threatLevel: 3
    },
    {
        realName: "Aleena Mehmood",
        specialty: "Web Design member",
        status: "WANTED",
        image: "teamPhotos/aleena.JPG",
        threatLevel: 5
    },
    {
        realName: "Basil Tiongson",
        specialty: "Web Design member",
        status: "WANTED",
        image: "teamPhotos/basil.JPG",
        threatLevel: 4
    },
    {
        realName: "Jason Carmona",
        specialty: "Outreach member",
        status: "CAPTURED",
        image: "teamPhotos/jason.JPG",
        threatLevel: 3
    },
    {
        realName: "Malika Syeda",
        specialty: "Logistics member",
        status: "CAPTURED",
        image: "teamPhotos/malika.JPG",
        threatLevel: 3
    },
    {
        realName: "Eva Pisabaj",
        specialty: "Logistics member",
        status: "CAPTURED",
        image: "teamPhotos/eva.JPG",
        threatLevel: 3
    },
    {
        realName: "Manan",
        specialty: "Web Development member",
        status: "Wanted",
        image: "anonymous.jpg",
        threatLevel: 3
    },
];


//apply red-blue glitch effect on mouse move
function applyRedBlueGlitch(card, e) {
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xIntensity = Math.min(5, Math.abs(mouseX - card.dataset.lastX || mouseX) / 5);
    const yIntensity = Math.min(5, Math.abs(mouseY - card.dataset.lastY || mouseY) / 5);
    const intensity = Math.max(xIntensity, yIntensity);
    
    card.dataset.lastX = mouseX;
    card.dataset.lastY = mouseY;
    
    if (intensity > 0.5) {
        //red-blue
        const redOffset = `${intensity * 2}px`;
        const blueOffset = `${-intensity * 2}px`;
        
        card.style.textShadow = `${redOffset} 0 rgba(255,0,0,0.7), ${blueOffset} 0 rgba(0,0,255,0.7)`;
        card.style.boxShadow = `${redOffset} 0 rgba(255,0,0,0.5), ${blueOffset} 0 rgba(0,0,255,0.5), 0 0 20px rgba(255,255,255,0.3)`;
        
        const textElements = card.querySelectorAll('.glitch-data');
        textElements.forEach(element => {
            element.style.textShadow = `${redOffset} 0 rgba(255,0,0,0.7), ${blueOffset} 0 rgba(0,0,255,0.7)`;
            
            //random glitch
            if (intensity > 2 && Math.random() > 0.7) {
                element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`;
                
                if (intensity > 3 && Math.random() > 0.8) {
                    const originalText = element.dataset.originalText || element.textContent;
                    if (!element.dataset.originalText) {
                        element.dataset.originalText = originalText;
                    }
                    
                    const corruptedText = originalText.split('').map(char => {
                        if (Math.random() > 0.7) {
                            return String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 5) - 2);
                        }
                        return char;
                    }).join('');
                    
                    element.textContent = corruptedText;
                    
                    setTimeout(() => {
                        element.textContent = originalText;
                    }, 150);
                }
                
                setTimeout(() => {
                    element.style.transform = 'translate(0, 0)';
                }, 100);
            }
        });
        
        card.classList.add('actively-glitching');
        setTimeout(() => {
            card.classList.remove('actively-glitching');
            card.style.textShadow = '';
            card.style.boxShadow = '';
            textElements.forEach(element => {
                element.style.textShadow = '';
            });
        }, 150);
    }
}

//table view layout with 4 columns and increased spacing
function loadTeamTable() {
    const teamContainer = document.getElementById("teamGrid");
    teamContainer.innerHTML = "";
    teamContainer.className = "team-table";

    //create table structure
    const table = document.createElement("table");
    let currentRow;
    
    teamMembers.forEach((member, index) => {
        //create a new row for every 4 members
        if (index % 4 === 0) {
            currentRow = document.createElement("tr");
            table.appendChild(currentRow);
        }
        
        const cell = document.createElement("td");
        cell.classList.add("team-member-cell");
        
        const memberCard = document.createElement("div");
        memberCard.classList.add("team-member");
        
        if (member.status === "CAPTURED") {
            memberCard.classList.add("captured");
        }
        
        let threatFlames = "🔥".repeat(member.threatLevel || 3);
        
        memberCard.innerHTML = `
            <div class="status ${member.status === "CAPTURED" ? "captured" : ""}">${member.status}</div>
            <img src="${member.image}" alt="${member.realName}">
            <div class="hacker-info">
                <div class="glitch-data real-name">${member.realName}</div>
                <div class="glitch-data specialty">${member.specialty}</div>
                <div class="threat-level">${threatFlames}</div>
            </div>
        `;
        
        memberCard.addEventListener("mousemove", function(e) {
            applyRedBlueGlitch(this, e);
        });
        
        //effect on click
        memberCard.addEventListener("click", function() {
            this.style.filter = "invert(100%)";
            setTimeout(() => {
                this.style.filter = "invert(0%)";
            }, 150);
        });
        
        //Reset mouse
        memberCard.addEventListener("mouseleave", function() {
            this.style.textShadow = '';
            this.style.boxShadow = '';
            const textElements = this.querySelectorAll('.glitch-data');
            textElements.forEach(element => {
                element.style.textShadow = '';
                element.style.transform = 'translate(0, 0)';
                //Reset text
                if (element.dataset.originalText) {
                    element.textContent = element.dataset.originalText;
                }
            });
        });
        
        cell.appendChild(memberCard);
        currentRow.appendChild(cell);
    });
    
    teamContainer.appendChild(table);
}

// letter animation of about title
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

document.querySelectorAll("h2, h3").forEach(h2 => {
  h2.onmouseover = event => {  
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  };
});

window.addEventListener("load", loadTeamTable);