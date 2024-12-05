// Smooth scroll to the education section
document.querySelector('.scroll-arrow a').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});

// Select all bounding boxes
const boundingBoxes = document.querySelectorAll('.bounding-box');

// Create an Intersection Observer with an immediate trigger
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.01
});

// Observe each bounding box
boundingBoxes.forEach(box => observer.observe(box));

const markdownText = `
# About Me
Hi, I’m **Andrew Panos**!

I recently graduated from Northeastern University with a degree in Computer Science, concentrating in Software Development. Along the way, I gained valuable experience:

- **McDonald’s**: Enhanced point-of-sale test automation and tackled CI/CD challenges.
- **Verizon**: Built a tool to automate project management for hundreds of cell sites.
- **Teaching Assistant**: Guided over 600 students in their first steps into programming.

I’m passionate about using computer science to create cool, useful things that make a positive impact on the world.

When I’m not coding, you can find me:
- **Fighting gravity** at the gym (weightlifting).
- Learning about health and wellness (and trying to live forever).
- Getting competitive in **Rainbow Six Siege**.
- Losing golf balls at the course.
- Spending quality time with family and friends.
- Dreaming up new app ideas.

Check out my [experience](#experience) and [projects](#projects) for more!
`;

const typingArea = document.getElementById('typing-area');
const preview = document.getElementById('markdown-preview');
const vscodeContainer = document.querySelector('.vscode-container');

let currentChar = 0;

function typeMarkdown() {
    if (currentChar < markdownText.length) {
        // Add the next character to the raw Markdown area
        typingArea.textContent += markdownText[currentChar];

        // Update the rendered Markdown preview in real-time
        const currentText = markdownText.slice(0, currentChar + 1);
        preview.innerHTML = markdownToHTML(currentText);

        currentChar++;
        setTimeout(typeMarkdown, 40); // Typing speed
    } else {
        // Once typing is complete, transition to the rendered preview
        setTimeout(() => {
            document.querySelector('.raw-markdown').style.display = 'none';
            document.querySelector('.preview-markdown').style.flex = '1';

            // Shrink the container after typing is complete
            vscodeContainer.classList.add('shrunk');
        }, 1000);
    }
}

// Convert Markdown to HTML (simple renderer)
function markdownToHTML(md) {
    return md
        .replace(/# (.*?)(\n|$)/g, '<h1>$1</h1>') // # Heading
        .replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>') // ## Subheading
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') // Links
        .replace(/\- (.*?)(\n|$)/g, '<li>$1</li>') // Bullet points
        .replace(/\n/g, '<br>'); // New lines
}

// Start typing the markdown text when the about section is in view
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeMarkdown();
            aboutObserver.unobserve(entry.target);
        }
    });
});

aboutObserver.observe(aboutSection);

// Smooth scroll to the skill section
document.querySelectorAll('.scroll-to-skill').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Scroll to the element
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Simulate hover effect
            targetElement.classList.add('hover-effect');

            // Remove hover effect after a short delay
            setTimeout(() => {
                targetElement.classList.remove('hover-effect');
            }, 1000);
        }
    });
});