document.addEventListener('DOMContentLoaded', function() {
    const elements = [
        { number: 1, symbol: "H", name: "Hydrogen", group: "1" },
        { number: 2, symbol: "He", name: "Helium", group: "18" },
        { number: 3, symbol: "Li", name: "Lithium", group: "1" },
        { number: 4, symbol: "Be", name: "Beryllium", group: "2" },
        { number: 5, symbol: "B", name: "Boron", group: "13" },
        { number: 6, symbol: "C", name: "Carbon", group: "14" },
        { number: 7, symbol: "N", name: "Nitrogen", group: "15" },
        { number: 8, symbol: "O", name: "Oxygen", group: "16" },
        { number: 9, symbol: "F", name: "Fluorine", group: "17" },
        { number: 10, symbol: "Ne", name: "Neon", group: "18" },
        { number: 11, symbol: "Na", name: "Sodium", group: "1" },
        { number: 12, symbol: "Mg", name: "Magnesium", group: "2" },
        { number: 13, symbol: "Al", name: "Aluminum", group: "13" },
        { number: 14, symbol: "Si", name: "Silicon", group: "14" },
        { number: 15, symbol: "P", name: "Phosphorus", group: "15" },
        { number: 16, symbol: "S", name: "Sulfur", group: "16" },
        { number: 17, symbol: "Cl", name: "Chlorine", group: "17" },
        { number: 18, symbol: "Ar", name: "Argon", group: "18" },
        { number: 19, symbol: "K", name: "Potassium", group: "1" },
        { number: 20, symbol: "Ca", name: "Calcium", group: "2" },
        { number: 21, symbol: "Sc", name: "Scandium", group: "3" },
        { number: 22, symbol: "Ti", name: "Titanium", group: "4" },
        { number: 23, symbol: "V", name: "Vanadium", group: "5" },
        { number: 24, symbol: "Cr", name: "Chromium", group: "6" },
        { number: 25, symbol: "Mn", name: "Manganese", group: "7" },
        { number: 26, symbol: "Fe", name: "Iron", group: "8" },
        { number: 27, symbol: "Co", name: "Cobalt", group: "9" },
        { number: 28, symbol: "Ni", name: "Nickel", group: "10" },
        { number: 29, symbol: "Cu", name: "Copper", group: "11" },
        { number: 30, symbol: "Zn", name: "Zinc", group: "12" },
        { number: 31, symbol: "Ga", name: "Gallium", group: "13" },
        { number: 32, symbol: "Ge", name: "Germanium", group: "14" },
        { number: 33, symbol: "As", name: "Arsenic", group: "15" },
        { number: 34, symbol: "Se", name: "Selenium", group: "16" },
        { number: 35, symbol: "Br", name: "Bromine", group: "17" },
        { number: 36, symbol: "Kr", name: "Krypton", group: "18" },
        { number: 37, symbol: "Rb", name: "Rubidium", group: "1" },
        { number: 38, symbol: "Sr", name: "Strontium", group: "2" },
        { number: 39, symbol: "Y", name: "Yttrium", group: "3" },
        { number: 40, symbol: "Zr", name: "Zirconium", group: "4" },
        { number: 41, symbol: "Nb", name: "Niobium", group: "5" },
        { number: 42, symbol: "Mo", name: "Molybdenum", group: "6" },
        { number: 43, symbol: "Tc", name: "Technetium", group: "7" },
        { number: 44, symbol: "Ru", name: "Ruthenium", group: "8" },
        { number: 45, symbol: "Rh", name: "Rhodium", group: "9" },
        { number: 46, symbol: "Pd", name: "Palladium", group: "10" },
        { number: 47, symbol: "Ag", name: "Silver", group: "11" },
        { number: 48, symbol: "Cd", name: "Cadmium", group: "12" },
        { number: 49, symbol: "In", name: "Indium", group: "13" },
        { number: 50, symbol: "Sn", name: "Tin", group: "14" },
        { number: 51, symbol: "Sb", name: "Antimony", group: "15" },
        { number: 52, symbol: "Te", name: "Tellurium", group: "16" },
        { number: 53, symbol: "I", name: "Iodine", group: "17" },
        { number: 54, symbol: "Xe", name: "Xenon", group: "18" },
        { number: 55, symbol: "Cs", name: "Cesium", group: "1" },
        { number: 56, symbol: "Ba", name: "Barium", group: "2" },
        { number: 57, symbol: "La", name: "Lanthanum", group: "3" },
        { number: 58, symbol: "Ce", name: "Cerium", group: "lanthanoids" },
        { number: 59, symbol: "Pr", name: "Praseodymium", group: "lanthanoids" },
        { number: 60, symbol: "Nd", name: "Neodymium", group: "lanthanoids" },
        { number: 61, symbol: "Pm", name: "Promethium", group: "lanthanoids" },
        { number: 62, symbol: "Sm", name: "Samarium", group: "lanthanoids" },
        { number: 63, symbol: "Eu", name: "Europium", group: "lanthanoids" },
        { number: 64, symbol: "Gd", name: "Gadolinium", group: "lanthanoids" },
        { number: 65, symbol: "Tb", name: "Terbium", group: "lanthanoids" },
        { number: 66, symbol: "Dy", name: "Dysprosium", group: "lanthanoids" },
        { number: 67, symbol: "Ho", name: "Holmium", group: "lanthanoids" },
        { number: 68, symbol: "Er", name: "Erbium", group: "lanthanoids" },
        { number: 69, symbol: "Tm", name: "Thulium", group: "lanthanoids" },
        { number: 70, symbol: "Yb", name: "Ytterbium", group: "lanthanoids" },
        { number: 71, symbol: "Lu", name: "Lutetium", group: "lanthanoids" },
        { number: 72, symbol: "Hf", name: "Hafnium", group: "4" },
        { number: 73, symbol: "Ta", name: "Tantalum", group: "5" },
        { number: 74, symbol: "W", name: "Tungsten", group: "6" },
        { number: 75, symbol: "Re", name: "Rhenium", group: "7" },
        { number: 76, symbol: "Os", name: "Osmium", group: "8" },
        { number: 77, symbol: "Ir", name: "Iridium", group: "9" },
        { number: 78, symbol: "Pt", name: "Platinum", group: "10" },
        { number: 79, symbol: "Au", name: "Gold", group: "11" },
        { number: 80, symbol: "Hg", name: "Mercury", group: "12" },
        { number: 81, symbol: "Tl", name: "Thallium", group: "13" },
        { number: 82, symbol: "Pb", name: "Lead", group: "14" },
        { number: 83, symbol: "Bi", name: "Bismuth", group: "15" },
        { number: 84, symbol: "Po", name: "Polonium", group: "16" },
        { number: 85, symbol: "At", name: "Astatine", group: "17" },
        { number: 86, symbol: "Rn", name: "Radon", group: "18" },
        { number: 87, symbol: "Fr", name: "Francium", group: "1" },
        { number: 88, symbol: "Ra", name: "Radium", group: "2" },
        { number: 89, symbol: "Ac", name: "Actinium", group: "actinoids" },
        { number: 90, symbol: "Th", name: "Thorium", group: "actinoids" },
        { number: 91, symbol: "Pa", name: "Protactinium", group: "actinoids" },
        { number: 92, symbol: "U", name: "Uranium", group: "actinoids" },
        { number: 93, symbol: "Np", name: "Neptunium", group: "actinoids" },
        { number: 94, symbol: "Pu", name: "Plutonium", group: "actinoids" },
        { number: 95, symbol: "Am", name: "Americium", group: "actinoids" },
        { number: 96, symbol: "Cm", name: "Curium", group: "actinoids" },
        { number: 97, symbol: "Bk", name: "Berkelium", group: "actinoids" },
        { number: 98, symbol: "Cf", name: "Californium", group: "actinoids" },
        { number: 99, symbol: "Es", name: "Einsteinium", group: "actinoids" },
        { number: 100, symbol: "Fm", name: "Fermium", group: "actinoids" },
        { number: 101, symbol: "Md", name: "Mendelevium", group: "actinoids" },
        { number: 102, symbol: "No", name: "Nobelium", group: "actinoids" },
        { number: 103, symbol: "Lr", name: "Lawrencium", group: "actinoids" },
        { number: 104, symbol: "Rf", name: "Rutherfordium", group: "4" },
        { number: 105, symbol: "Db", name: "Dubnium", group: "5" },
        { number: 106, symbol: "Sg", name: "Seaborgium", group: "6" },
        { number: 107, symbol: "Bh", name: "Bohrium", group: "7" },
        { number: 108, symbol: "Hs", name: "Hassium", group: "8" },
        { number: 109, symbol: "Mt", name: "Meitnerium", group: "9" },
        { number: 110, symbol: "Ds", name: "Darmstadtium", group: "10" },
        { number: 111, symbol: "Rg", name: "Roentgenium", group: "11" },
        { number: 112, symbol: "Cn", name: "Copernicium", group: "12" },
        { number: 113, symbol: "Nh", name: "Nihonium", group: "13" },
        { number: 114, symbol: "Fl", name: "Flerovium", group: "14" },
        { number: 115, symbol: "Mc", name: "Moscovium", group: "15" },
        { number: 116, symbol: "Lv", name: "Livermorium", group: "16" },
        { number: 117, symbol: "Ts", name: "Tennessine", group: "17" },
        { number: 118, symbol: "Og", name: "Oganesson", group: "18" }
    ];
    const periodicTable = document.getElementById('periodicTable');
    elements.forEach(element => {
        const elDiv = document.createElement('div');
        elDiv.className = 'element';
        elDiv.textContent = element.symbol;
        elDiv.onclick = () => showElementDetails(element);
        periodicTable.appendChild(elDiv);
    });
    
    elements.forEach(element => {
        const elDiv = document.createElement('div');
        elDiv.className = `element ${element.type}`; // Add a type to each element data
        elDiv.textContent = `${element.symbol}\n${element.number}`;
        elDiv.title = element.name; // Tooltip to show the name on hover
        elDiv.onclick = () => showElementDetails(element);
        periodicTable.appendChild(elDiv);
    });
    
    function showElementDetails(element) {
        const details = document.getElementById('elementDetails');
        details.innerHTML = `<h1>${element.name} (${element.symbol})</h1>
                             <p>Atomic Number: ${element.number}</p>
                             <p>Group: ${element.group}</p>`;
    }

    window.filterElements = function() {
        const query = document.getElementById('searchBox').value.toLowerCase();
        const elements = document.querySelectorAll('.element');
        elements.forEach(el => {
            const symbol = el.textContent.toLowerCase();
            el.style.display = symbol.startsWith(query) ? 'block' : 'none';
        });
    }
});