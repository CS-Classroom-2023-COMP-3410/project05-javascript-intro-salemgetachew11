const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const saveGameButton = document.getElementById('saveGame');
const resumeGameButton = document.getElementById('resumeGame');
const resetGameButton = document.getElementById('resetGame');
const progressBar = document.getElementById('progress-bar');
const logList = document.getElementById('log-list');

let state = JSON.parse(localStorage.getItem('gameState')) || { visitedNodes: [], currentNode: 'start' };

const storyNodes = {
    start: {
        text: "You wake up in a mysterious forest. The air is cool, and sunlight filters through the dense canopy. What do you do?",
        choices: [
            { text: "Explore the forest", nextNode: "forest" },
            { text: "Follow a faint trail", nextNode: "trail" },
            { text: "Climb a tree to get a better view", nextNode: "climbTree" }
        ]
    },
    forest: {
        text: "You venture deeper into the forest and encounter a strange glowing tree. What do you do?",
        choices: [
            { text: "Touch the tree", nextNode: "magicTree" },
            { text: "Inspect the area for clues", nextNode: "hiddenClues" },
            { text: "Walk past the tree", nextNode: "clearing" }
        ]
    },
    trail: {
        text: "You follow the trail and discover an abandoned campsite. What do you do?",
        choices: [
            { text: "Search the campsite for supplies", nextNode: "findSupplies" },
            { text: "Leave the campsite and continue walking", nextNode: "river" }
        ]
    },
    climbTree: {
        text: "You climb a tall tree and see a distant village to the east and smoke rising to the north. What do you do?",
        choices: [
            { text: "Head towards the village", nextNode: "village" },
            { text: "Investigate the smoke", nextNode: "campfire" }
        ]
    },
    magicTree: {
        text: "The tree grants you magical powers! You feel stronger and more aware of your surroundings. What will you do next?",
        choices: [
            { text: "Use the magic to summon help", nextNode: "summonHelp" },
            { text: "Keep exploring the forest", nextNode: "clearing" }
        ]
    },
    hiddenClues: {
        text: "You find strange symbols etched into the tree trunk, hinting at an ancient ritual. What do you do?",
        choices: [
            { text: "Perform the ritual", nextNode: "ancientRitual" },
            { text: "Leave the area", nextNode: "clearing" }
        ]
    },
    clearing: {
        text: "You find a clearing with an ancient ruin in the distance. What do you do?",
        choices: [
            { text: "Explore the ruins", nextNode: "ruins" },
            { text: "Set up camp for the night", nextNode: "camp" }
        ]
    },
    findSupplies: {
        text: "You find a map and some food at the campsite. The map shows a hidden path leading to a treasure. What do you do?",
        choices: [
            { text: "Follow the hidden path", nextNode: "hiddenPath" },
            { text: "Ignore the map and move on", nextNode: "river" }
        ]
    },
    river: {
        text: "You arrive at a river with a small boat tied to the bank. What do you do?",
        choices: [
            { text: "Take the boat downstream", nextNode: "boatRide" },
            { text: "Stay near the river and rest", nextNode: "rest" }
        ]
    },
    campfire: {
        text: "You discover a campfire with a group of friendly travelers. They offer to help you. What do you do?",
        choices: [
            { text: "Accept their help", nextNode: "villageHelp" },
            { text: "Politely decline and continue alone", nextNode: "forest" }
        ]
    },
    village: {
        text: "You arrive at the village and meet its cautious but kind inhabitants. What do you do?",
        choices: [
            { text: "Ask for help", nextNode: "villageHelp" },
            { text: "Explore the village quietly", nextNode: "villageExplore" }
        ]
    },
    ruins: {
        text: "The ruins hold ancient secrets. You find a hidden passage leading underground. What do you do?",
        choices: [
            { text: "Enter the passage", nextNode: "treasureRoom" },
            { text: "Leave the ruins", nextNode: "clearing" }
        ]
    },
    hiddenPath: {
        text: "The hidden path leads you to a treasure chest guarded by a riddle. What do you do?",
        choices: [
            { text: "Solve the riddle", nextNode: "treasureRoom" },
            { text: "Walk away and avoid the risk", nextNode: "clearing" }
        ]
    },
    treasureRoom: {
        text: "You find a treasure room filled with gold and artifacts. Congratulations, you win!",
        choices: []
    },
    camp: {
        text: "You set up camp and rest for the night. The adventure continues tomorrow...",
        choices: []
    },
    rest: {
        text: "You rest near the river, gaining strength for the journey ahead.",
        choices: []
    },
    summonHelp: {
        text: "You summon magical creatures to aid you. They lead you to safety. Congratulations, you win!",
        choices: []
    },
    villageHelp: {
        text: "The villagers decide to help you. They guide you out of the forest. Congratulations, you escape!",
        choices: []
    },
    villageExplore: {
        text: "You explore the village and find clues about your mysterious arrival. The adventure continues...",
        choices: []
    },
    ancientRitual: {
        text: "The ritual unlocks hidden powers within you, granting you new abilities. What do you do next?",
        choices: [
            { text: "Use the powers to protect yourself", nextNode: "treasureRoom" },
            { text: "Seek out the source of the powers", nextNode: "ruins" }
        ]
    }
};

function updateProgressBar() {
    const progress = Math.round((state.visitedNodes.length / Object.keys(storyNodes).length) * 100);
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('data-progress', progress);
}

function updateProgressLog() {
    logList.innerHTML = '';
    state.visitedNodes.forEach(node => {
        const li = document.createElement('li');
        li.textContent = node;
        logList.appendChild(li);
    });
}

function showNode(nodeId) {
    state.currentNode = nodeId;
    if (!state.visitedNodes.includes(nodeId)) state.visitedNodes.push(nodeId);

    const node = storyNodes[nodeId];
    storyElement.textContent = node.text;

    choicesElement.innerHTML = '';
    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => showNode(choice.nextNode);
        choicesElement.appendChild(button);
    });

    updateProgressBar();
    updateProgressLog();
}

function saveGame() {
    localStorage.setItem('gameState', JSON.stringify(state));
    alert('Game Saved!');
}

function resumeGame() {
    state = JSON.parse(localStorage.getItem('gameState')) || state;
    showNode(state.currentNode);
}

function resetGame() {
    localStorage.removeItem('gameState');
    state = { visitedNodes: [], currentNode: 'start' };
    showNode('start');
}

saveGameButton.onclick = saveGame;
resumeGameButton.onclick = resumeGame;
resetGameButton.onclick = resetGame;

showNode(state.currentNode);
