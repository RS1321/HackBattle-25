// Content data structure
const contentData = {
    "history-of-ai": {
        title: "The History of Artificial Intelligence",
        introduction: "Artificial Intelligence (AI) has a rich history dating back to ancient times, but the formal field was established in the mid-20th century. The journey of AI has been marked by periods of great optimism followed by 'AI winters' where progress stalled.",
        paths: [
            {
                id: "early-challenges",
                title: "Early Challenges",
                description: "Explore the fundamental problems that early AI researchers faced and how they attempted to solve them.",
                content: `
                    <h3>Early Challenges in AI Development</h3>
                    <p>The birth of artificial intelligence as a formal academic discipline presented researchers with profound challenges that would shape the field for decades.</p>
                    
                    <h4>Major Early Challenges:</h4>
                    <div class="challenge-grid">
                        <div class="challenge-card">
                            <h5>Combinatorial Explosion</h5>
                            <p>Early AI systems used brute-force search methods that quickly became impractical as problem complexity grew exponentially.</p>
                        </div>
                        <div class="challenge-card">
                            <h5>Knowledge Representation</h5>
                            <p>How to represent real-world knowledge in formats computers could understand and manipulate.</p>
                        </div>
                        <div class="challenge-card">
                            <h5>Common Sense Reasoning</h5>
                            <p>Humans possess vast amounts of implicit knowledge about how the world works. Capturing this 'common sense' proved extremely difficult.</p>
                        </div>
                    </div>
                `
            },
            {
                id: "key-milestones",
                title: "Key Milestones",
                description: "Follow the timeline of major breakthroughs that shaped the development of AI.",
                content: `
                    <h3>Major Milestones in AI History</h3>
                    <p>The evolution of artificial intelligence has been marked by groundbreaking achievements.</p>
                    
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-year">1950</div>
                            <div class="timeline-content">
                                <h4>Turing's Landmark Paper</h4>
                                <p>Alan Turing publishes "Computing Machinery and Intelligence," introducing the Turing Test.</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-year">1956</div>
                            <div class="timeline-content">
                                <h4>Dartmouth Conference</h4>
                                <p>John McCarthy organizes the Dartmouth Conference, establishing AI as a field.</p>
                            </div>
                        </div>
                        <div class="timeline-item">
                            <div class="timeline-year">1997</div>
                            <div class="timeline-content">
                                <h4>Deep Blue vs. Kasparov</h4>
                                <p>IBM's Deep Blue defeats world chess champion Garry Kasparov.</p>
                            </div>
                        </div>
                    </div>
                `
            }
        ],
        puzzles: {
            "early-challenges": {
                type: "matching",
                question: "Match these early AI challenges with their descriptions:",
                pairs: [
                    {
                        term: "Combinatorial Explosion",
                        definition: "The exponential growth of possible solutions as problem complexity increases"
                    },
                    {
                        term: "Frame Problem",
                        definition: "The challenge of representing what does and doesn't change in a dynamic world"
                    },
                    {
                        term: "Common Sense Reasoning",
                        definition: "The ability to make inferences based on everyday knowledge"
                    }
                ]
            },
            "key-milestones": {
                type: "timeline",
                question: "Arrange these AI milestones in chronological order:",
                events: [
                    "Dartmouth Conference (1956)",
                    "Deep Blue defeats Kasparov (1997)",
                    "AlphaGo defeats Lee Sedol (2016)"
                ]
            }
        },
        externalResources: [
            {
                title: "AI Timeline Visualization",
                url: "#",
                description: "An interactive timeline showing key events in AI history"
            }
        ]
    },
    "machine-learning": {
        title: "Machine Learning Fundamentals",
        introduction: "Machine learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.",
        paths: [
            {
                id: "supervised-learning",
                title: "Supervised Learning",
                description: "Learn about algorithms that learn from labeled training data to make predictions.",
                content: `
                    <h3>Supervised Learning</h3>
                    <p>Supervised learning involves training algorithms using labeled datasets.</p>
                    
                    <h4>Key Concepts:</h4>
                    <ul>
                        <li><strong>Training Data:</strong> Labeled examples used to teach the algorithm</li>
                        <li><strong>Features:</strong> Input variables used for making predictions</li>
                        <li><strong>Labels:</strong> The output variable we're trying to predict</li>
                    </ul>
                `
            },
            {
                id: "unsupervised-learning",
                title: "Unsupervised Learning",
                description: "Explore algorithms that find patterns and structures in unlabeled data.",
                content: `
                    <h3>Unsupervised Learning</h3>
                    <p>Unsupervised learning deals with unlabeled data, aiming to find hidden patterns.</p>
                    
                    <h4>Main Approaches:</h4>
                    <div class="approach-grid">
                        <div class="approach-card">
                            <h5>Clustering</h5>
                            <p>Groups similar data points together based on their characteristics.</p>
                        </div>
                        <div class="approach-card">
                            <h5>Dimensionality Reduction</h5>
                            <p>Reduces the number of features while preserving important information.</p>
                        </div>
                    </div>
                `
            }
        ],
        puzzles: {
            "supervised-learning": {
                type: "matching",
                question: "Match these machine learning algorithms with their primary uses:",
                pairs: [
                    {
                        term: "Linear Regression",
                        definition: "Predicting continuous numerical values like house prices"
                    },
                    {
                        term: "Logistic Regression",
                        definition: "Binary classification problems like spam detection"
                    },
                    {
                        term: "Decision Trees",
                        definition: "Both classification and regression with interpretable decisions"
                    }
                ]
            }
        },
        externalResources: [
            {
                title: "Machine Learning Course",
                url: "#",
                description: "Free online course covering fundamental machine learning concepts"
            }
        ]
    },
    "natural-language-processing": {
        title: "Natural Language Processing",
        introduction: "NLP enables computers to understand, interpret, and generate human language.",
        paths: [
            {
                id: "text-processing",
                title: "Text Processing Fundamentals",
                description: "Learn the basic techniques for preparing and analyzing text data.",
                content: `
                    <h3>Text Processing Fundamentals</h3>
                    <p>Before NLP models can understand text, raw text must be converted into structured formats.</p>
                    
                    <h4>Key Text Processing Steps:</h4>
                    <div class="processing-steps">
                        <div class="step-card">
                            <h5>Tokenization</h5>
                            <p>Breaking text into individual words, phrases, or symbols.</p>
                        </div>
                        <div class="step-card">
                            <h5>Stop Word Removal</h5>
                            <p>Filtering out common but uninformative words.</p>
                        </div>
                    </div>
                `
            }
        ],
        puzzles: {
            "text-processing": {
                type: "matching",
                question: "Match NLP techniques with their descriptions:",
                pairs: [
                    {
                        term: "Tokenization",
                        definition: "Splitting text into individual words or symbols for analysis"
                    },
                    {
                        term: "Named Entity Recognition",
                        definition: "Identifying and classifying proper nouns like people and organizations"
                    }
                ]
            }
        },
        externalResources: [
            {
                title: "NLP with Python",
                url: "#",
                description: "Practical guide to implementing NLP techniques"
            }
        ]
    },
    "computer-vision": {
        title: "Computer Vision",
        introduction: "Computer vision enables machines to interpret and understand visual information from the world.",
        paths: [
            {
                id: "image-processing",
                title: "Image Processing Basics",
                description: "Learn fundamental techniques for manipulating and analyzing digital images.",
                content: `
                    <h3>Image Processing Fundamentals</h3>
                    <p>Image processing forms the foundation of computer vision.</p>
                    
                    <h4>Core Image Processing Techniques:</h4>
                    <div class="image-techniques">
                        <div class="technique-card">
                            <h5>Filtering and Enhancement</h5>
                            <p>Improving image quality through noise reduction and contrast adjustment.</p>
                        </div>
                        <div class="technique-card">
                            <h5>Edge Detection</h5>
                            <p>Identifying boundaries and sharp transitions in images.</p>
                        </div>
                    </div>
                `
            }
        ],
        puzzles: {
            "image-processing": {
                type: "matching",
                question: "Match computer vision techniques with their applications:",
                pairs: [
                    {
                        term: "Object Detection",
                        definition: "Identifying and locating multiple objects within an image"
                    },
                    {
                        term: "Semantic Segmentation",
                        definition: "Assigning each pixel in an image to a specific class"
                    }
                ]
            }
        },
        externalResources: [
            {
                title: "Computer Vision Tutorials",
                url: "#",
                description: "Step-by-step tutorials for implementing computer vision algorithms"
            }
        ]
    },
    "robotics": {
        title: "Robotics and AI",
        introduction: "Robotics combines AI with mechanical engineering to create intelligent machines that can interact with the physical world.",
        paths: [
            {
                id: "ai-robotics",
                title: "AI in Robotics",
                description: "Explore how artificial intelligence enables robots to perceive, plan, and act autonomously.",
                content: `
                    <h3>AI in Robotics</h3>
                    <p>Artificial intelligence plays a crucial role in modern robotics, enabling machines to operate autonomously in complex environments.</p>
                    
                    <h4>Key AI Technologies in Robotics:</h4>
                    <div class="robotics-technologies">
                        <div class="tech-card">
                            <h5>Computer Vision</h5>
                            <p>Enables robots to perceive and understand their environment through cameras and sensors.</p>
                        </div>
                        <div class="tech-card">
                            <h5>Motion Planning</h5>
                            <p>Algorithms that determine how robots should move to achieve tasks while avoiding obstacles.</p>
                        </div>
                        <div class="tech-card">
                            <h5>Reinforcement Learning</h5>
                            <p>Allows robots to learn optimal behaviors through trial and error interactions with their environment.</p>
                        </div>
                    </div>
                `
            }
        ],
        puzzles: {
            "ai-robotics": {
                type: "matching",
                question: "Match robotics concepts with their descriptions:",
                pairs: [
                    {
                        term: "SLAM",
                        definition: "Simultaneous Localization and Mapping - creating maps while tracking position"
                    },
                    {
                        term: "Kinematics",
                        definition: "The study of motion without considering forces that cause the motion"
                    },
                    {
                        term: "Actuator",
                        definition: "A component that converts energy into physical motion"
                    }
                ]
            }
        },
        externalResources: [
            {
                title: "Robotics Fundamentals",
                url: "#",
                description: "Introduction to robotics principles and AI integration"
            }
        ]
    }
};

// Current application state
let currentTopic = "history-of-ai";
let currentPath = null;
let userProgress = {
    "history-of-ai": { completed: false, progress: 0 },
    "machine-learning": { completed: false, progress: 0 },
    "natural-language-processing": { completed: false, progress: 0 },
    "computer-vision": { completed: false, progress: 0 },
    "robotics": { completed: false, progress: 0 }
};

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Living Textbook initialized!");
    initializeApp();
});

function initializeApp() {
    // Set up all event listeners and initial state
    setupTopicNavigation();
    loadTopic(currentTopic);
    setupNavigationButtons();
    
    // Update progress display
    updateProgressDisplay();
}

function setupTopicNavigation() {
    const topicItems = document.querySelectorAll('.topic-item');
    
    topicItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all topics
            topicItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked topic
            this.classList.add('active');
            
            // Get the topic ID from data attribute
            const topicId = this.getAttribute('data-topic');
            
            if (topicId && contentData[topicId]) {
                loadTopic(topicId);
            } else {
                console.warn(`Topic "${topicId}" not found in content data`);
            }
        });
    });
}

function loadTopic(topicId) {
    if (!contentData[topicId]) {
        console.error(`Topic "${topicId}" not found in content data`);
        return;
    }
    
    // Update current topic
    currentTopic = topicId;
    const topic = contentData[topicId];
    
    // Update the page title
    document.title = `${topic.title} - Living Textbook`;
    
    // Update the topic title in the content area
    document.getElementById('topicTitle').textContent = topic.title;
    
    // Update the topic content
    const topicContent = document.getElementById('topicContent');
    topicContent.innerHTML = `
        <p>${topic.introduction}</p>
        <p>Which aspect of ${topic.title.toLowerCase()} would you like to explore first?</p>
    `;
    
    // Generate path options
    const pathOptionsContainer = document.getElementById('pathOptions');
    if (topic.paths && topic.paths.length > 0) {
        pathOptionsContainer.innerHTML = topic.paths.map(path => `
            <div class="path-option" data-path="${path.id}">
                <h4>${path.title}</h4>
                <p>${path.description}</p>
            </div>
        `).join('');
        
        // Show path options
        pathOptionsContainer.style.display = 'grid';
        
        // Set up path selection
        setupPathSelection();
    } else {
        pathOptionsContainer.innerHTML = '<p>No learning paths available for this topic yet.</p>';
        pathOptionsContainer.style.display = 'block';
    }
    
    // Reset current path and hide puzzle/external content
    currentPath = null;
    document.getElementById('puzzleContainer').style.display = 'none';
    document.getElementById('externalContent').style.display = 'none';
    
    // Update progress display
    updateProgressDisplay();
    
    console.log(`Loaded topic: ${topic.title}`);
}

function setupPathSelection() {
    const pathOptions = document.querySelectorAll('.path-option');
    
    pathOptions.forEach(option => {
        option.addEventListener('click', function() {
            const pathId = this.getAttribute('data-path');
            selectPath(pathId);
        });
    });
}

function selectPath(pathId) {
    const topic = contentData[currentTopic];
    const path = topic.paths.find(p => p.id === pathId);
    
    if (!path) {
        console.error(`Path "${pathId}" not found in topic "${currentTopic}"`);
        return;
    }
    
    // Update current path
    currentPath = pathId;
    
    // Update the content to show the selected path
    const topicContent = document.getElementById('topicContent');
    topicContent.innerHTML = path.content;
    
    // Hide path options since we've selected one
    document.getElementById('pathOptions').style.display = 'none';
    
    // Show and update the puzzle section if available
    const puzzleContainer = document.getElementById('puzzleContainer');
    if (topic.puzzles && topic.puzzles[pathId]) {
        puzzleContainer.style.display = 'block';
        updatePuzzle(pathId);
    } else {
        puzzleContainer.style.display = 'none';
    }
    
    // Show and update external resources if available
    const externalContent = document.getElementById('externalContent');
    if (topic.externalResources && topic.externalResources.length > 0) {
        externalContent.style.display = 'block';
        updateExternalResources(topic.externalResources);
    } else {
        externalContent.style.display = 'none';
    }
    
    console.log(`Selected path: ${path.title}`);
}

function updatePuzzle(pathId) {
    const topic = contentData[currentTopic];
    const puzzle = topic.puzzles[pathId];
    const puzzleContainer = document.getElementById('puzzleContainer');
    
    if (!puzzle) {
        puzzleContainer.innerHTML = '<p>No puzzle available for this path.</p>';
        return;
    }
    
    if (puzzle.type === 'matching') {
        // Shuffle the pairs for random order
        const shuffledPairs = shuffleArray([...puzzle.pairs]);
        
        puzzleContainer.innerHTML = `
            <h3 class="puzzle-title">Knowledge Puzzle</h3>
            <p>${puzzle.question}</p>
            
            <div class="drag-drop-area">
                <div class="drag-items">
                    ${shuffledPairs.map(pair => `
                        <div class="drag-item" draggable="true" data-term="${pair.term}">${pair.term}</div>
                    `).join('')}
                </div>
                <div class="drop-targets">
                    ${shuffledPairs.map(pair => `
                        <div class="drop-target" data-term="${pair.term}">Drop here</div>
                    `).join('')}
                </div>
            </div>
            
            <button class="btn btn-primary" id="checkPuzzle">Check Answers</button>
            <div id="puzzleFeedback" style="margin-top: 15px;"></div>
        `;
    }
    
    // Reinitialize drag and drop for the new puzzle
    initDragAndDrop();
    
    // Set up puzzle checking
    const checkButton = document.getElementById('checkPuzzle');
    checkButton.addEventListener('click', function() {
        checkPuzzle(puzzle);
    });
}

function initDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropTargets = document.querySelectorAll('.drop-target');
    
    let draggedItem = null;
    
    dragItems.forEach(item => {
        item.addEventListener('dragstart', function() {
            draggedItem = this;
            setTimeout(() => {
                this.style.opacity = '0.4';
            }, 0);
        });
        
        item.addEventListener('dragend', function() {
            setTimeout(() => {
                this.style.opacity = '1';
            }, 0);
            draggedItem = null;
        });
    });
    
    dropTargets.forEach(target => {
        target.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('highlight');
        });
        
        target.addEventListener('dragleave', function() {
            this.classList.remove('highlight');
        });
        
        target.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('highlight');
            
            if (draggedItem) {
                this.textContent = draggedItem.textContent;
                this.setAttribute('data-user-term', draggedItem.getAttribute('data-term'));
                draggedItem.style.display = 'none';
            }
        });
    });
}

function checkPuzzle(puzzle) {
    const feedbackElement = document.getElementById('puzzleFeedback');
    const dropTargets = document.querySelectorAll('.drop-target');
    let correctMatches = 0;
    
    dropTargets.forEach(target => {
        const userTerm = target.getAttribute('data-user-term');
        const correctTerm = target.getAttribute('data-term');
        const correctDefinition = puzzle.pairs.find(p => p.term === correctTerm).definition;
        
        if (userTerm === correctTerm) {
            target.style.backgroundColor = '#d4edda';
            target.style.border = '2px solid #28a745';
            correctMatches++;
        } else {
            target.style.backgroundColor = '#f8d7da';
            target.style.border = '2px solid #dc3545';
            target.innerHTML += ` <small style="color: #6c757d;">(Correct: ${correctDefinition})</small>`;
        }
    });
    
    const isCorrect = correctMatches === puzzle.pairs.length;
    const message = `You matched ${correctMatches} out of ${puzzle.pairs.length} correctly.`;
    
    if (isCorrect) {
        feedbackElement.innerHTML = `<p style="color: green;">✅ Correct! ${message}</p>`;
        updateProgress(20);
    } else {
        feedbackElement.innerHTML = `<p style="color: red;">❌ Not quite right. ${message} Try again!</p>`;
    }
}

function updateExternalResources(resources) {
    const externalContent = document.getElementById('externalContent');
    externalContent.innerHTML = `
        <h3>External Resources</h3>
        <p>Explore these additional resources to deepen your understanding:</p>
        ${resources.map(resource => `
            <div style="margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px;">
                <h4 style="margin-bottom: 10px;">${resource.title}</h4>
                <p style="margin-bottom: 10px;">${resource.description}</p>
                <a href="${resource.url}" target="_blank" class="btn btn-outline">
                    <span class="btn-icon">🌐</span> Visit Resource
                </a>
            </div>
        `).join('')}
        <p style="margin-top: 15px; font-style: italic;">After exploring the external resources, return here to continue your learning path.</p>
    `;
}

function setupNavigationButtons() {
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    backBtn.addEventListener('click', function() {
        navigateBack();
    });
    
    nextBtn.addEventListener('click', function() {
        navigateNext();
    });
}

function navigateBack() {
    if (currentPath) {
        // If we're in a specific path, go back to topic overview
        currentPath = null;
        loadTopic(currentTopic);
    } else {
        // Go to previous topic if available
        const topics = Object.keys(contentData);
        const currentIndex = topics.indexOf(currentTopic);
        if (currentIndex > 0) {
            loadTopic(topics[currentIndex - 1]);
        } else {
            showNotification("You're at the first topic!");
        }
    }
}

function navigateNext() {
    if (currentPath) {
        // If we're in a path, try to go to next path in current topic
        const topic = contentData[currentTopic];
        const currentPathIndex = topic.paths.findIndex(p => p.id === currentPath);
        
        if (currentPathIndex < topic.paths.length - 1) {
            // Go to next path
            selectPath(topic.paths[currentPathIndex + 1].id);
        } else {
            // This was the last path - mark topic as completed
            userProgress[currentTopic].completed = true;
            userProgress[currentTopic].progress = 100;
            updateProgressDisplay();
            
            showNotification(`Congratulations! You've completed "${topic.title}"`);
            
            // Try to go to next topic
            const topics = Object.keys(contentData);
            const currentIndex = topics.indexOf(currentTopic);
            if (currentIndex < topics.length - 1) {
                loadTopic(topics[currentIndex + 1]);
            } else {
                showNotification("You've completed all available topics!");
            }
        }
    } else {
        // If we're at topic overview, go to first path
        const topic = contentData[currentTopic];
        if (topic.paths.length > 0) {
            selectPath(topic.paths[0].id);
        }
    }
}

function updateProgress(points) {
    if (userProgress[currentTopic]) {
        userProgress[currentTopic].progress = Math.min(100, userProgress[currentTopic].progress + points);
        updateProgressDisplay();
    }
}

function updateProgressDisplay() {
    const progress = userProgress[currentTopic] ? userProgress[currentTopic].progress : 0;
    const progressBar = document.querySelector('.progress');
    const progressText = document.getElementById('progressText');
    
    if (progressBar && progressText) {
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}% Complete`;
    }
}

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4361ee;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility function to shuffle arrays (for randomizing puzzle options)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}