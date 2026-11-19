// TechGradify's 3D model: inside a computer. A motherboard with its CPU (under a tower cooler), RAM, an
// NVMe SSD, a graphics card and the power supply, with data moving along the buses and the CPU running the
// fetch-decode-execute cycle. For GCSE and A level Computer Science: architecture, memory and storage.
const s = (group, name, desc, facts, cards, keys) => ({ group, name, desc, facts, cards, keys });

const GROUPS = {
  processing: { name: "Processing", c: "#5ec8ff" },
  memory: { name: "Memory and storage", c: "#7be08a" },
  board: { name: "Board and power", c: "#f2b84b" },
};

const STRUCTURES = {
  cpu: s("processing", "CPU (processor)", "The central processing unit runs program instructions, one after another, billions of times a second, using the fetch-decode-execute cycle. Lift the cooler to see it.",
    ["Inside: the **control unit** (decodes instructions and directs the other parts), the **ALU** (arithmetic and logic) and **registers** (tiny, very fast stores).", "**Clock speed**: a 3 GHz CPU has 3 billion clock cycles a second.", "More **cores** let a CPU run several instructions at once; **cache** keeps recently used data close to the cores."],
    [["What are the three main parts inside a CPU?", "The control unit, the arithmetic logic unit (ALU) and registers (plus cache)."], ["What does a clock speed of 3 GHz mean?", "3 billion clock cycles per second."], ["Why does cache make a CPU faster?", "It holds frequently used data and instructions closer to the cores than RAM, so they're fetched faster."], ["What are the three stages of the CPU's cycle?", "Fetch, decode, execute."]],
    ["cpu", "processor", "alu", "control unit", "clock speed", "cores", "cache", "registers", "fetch decode execute"]),
  cooler: s("processing", "CPU cooler", "A heat sink of thin metal fins, with heat pipes and a fan. The CPU turns almost all the electrical power it uses into heat, which has to be carried away.",
    ["**Thermal paste** fills tiny gaps between the CPU and the cooler so heat flows well.", "Heat pipes carry heat from the base up into the fins; the fan blows air through them.", "A CPU that gets too hot slows itself down (**throttles**) to protect itself."],
    [["Why does a CPU need a cooler?", "It turns electrical energy into heat; without cooling it would overheat and throttle or fail."], ["What is thermal paste for?", "Filling the tiny gaps between the CPU and the heat sink so heat transfers well."], ["What do heat pipes in a CPU cooler do?", "Carry heat from the base on the CPU up into the fins, where the fan's air takes it away."]],
    ["cooler", "heat sink", "fan", "thermal paste", "throttle"]),
  gpu: s("processing", "Graphics card (GPU)", "The graphics processing unit has thousands of simpler cores that work in parallel: ideal for drawing images, and for the huge matrix calculations behind machine learning.",
    ["A CPU has a few powerful cores; a GPU has **thousands** of simpler ones.", "GPUs are used to **train AI models** because the same calculation runs on huge amounts of data at once.", "The card has its own fast memory (VRAM) and plugs into a **PCIe** slot."],
    [["How is a GPU different from a CPU?", "It has many more, simpler cores, designed to do the same operation on lots of data in parallel."], ["Why are GPUs used for machine learning?", "Training needs huge numbers of parallel calculations, which their many cores do well."], ["Which slot does a graphics card plug into?", "A PCIe slot."]],
    ["gpu", "graphics card", "parallel", "vram", "pcie"]),
  ram: s("memory", "RAM", "Random access memory holds the programs and data in use right now. It is fast but **volatile**: everything in it is lost when the power goes off.",
    ["The CPU fetches instructions and data from RAM at an **address**.", "If RAM fills up, the operating system uses **virtual memory** on storage, which is much slower.", "More RAM lets you run more programs at once without slowing down."],
    [["What is RAM used for?", "Holding the programs and data that are currently in use."], ["What does volatile mean?", "The contents are lost when the power is turned off."], ["What is virtual memory?", "Part of secondary storage used as extra RAM when RAM is full; much slower."]],
    ["ram", "memory", "volatile", "virtual memory", "main memory", "primary storage"]),
  ssd: s("memory", "SSD (storage)", "A solid-state drive keeps files and programs when the power is off (**non-volatile**). This M.2 NVMe drive talks to the CPU over PCIe lanes on the board.",
    ["SSDs use **flash memory**: no moving parts, so they're fast, silent and robust.", "Hard disk drives (HDDs) store data magnetically on spinning platters: cheaper per gigabyte but slower.", "When you open a program it's copied from storage into RAM, then the CPU runs it from RAM."],
    [["Why does a computer need secondary storage as well as RAM?", "RAM is volatile; storage keeps programs and files when the power is off."], ["Give two advantages of an SSD over an HDD.", "Faster, no moving parts (more robust, silent), uses less power."], ["What happens when you open a program?", "It is loaded from storage into RAM, and the CPU runs it from there."]],
    ["ssd", "storage", "flash", "non-volatile", "secondary storage", "hard disk", "hdd", "nvme"]),
  motherboard: s("board", "Motherboard", "The main circuit board: everything plugs into it, and copper tracks inside its layers connect the CPU to memory, storage and expansion cards.",
    ["It holds the CPU socket, RAM slots, PCIe slots, M.2 slots and the connectors for power and devices.", "Its firmware (**UEFI**, formerly BIOS) starts the computer and loads the operating system.", "Boards have many layers of tracks, so signals can cross without touching."],
    [["What does the motherboard do?", "Connects all the components so they can communicate, and distributes power."], ["What does the BIOS/UEFI do?", "Starts the hardware when the computer is switched on and loads the operating system."], ["Name three things that plug into a motherboard.", "Any three of: the CPU, RAM, an SSD, a graphics card, the power supply cables."]],
    ["motherboard", "circuit board", "bios", "uefi", "socket"]),
  buses: s("board", "Buses", "Sets of parallel wires that carry signals between the CPU and memory. The **address bus** says where, the **data bus** carries the data, and the **control bus** carries signals such as read and write.",
    ["The address bus is **one-way** (CPU to memory); the data bus is **two-way**.", "In the **von Neumann** architecture, instructions and data share the same memory and buses, so they can't be fetched at the same time: the von Neumann bottleneck.", "The **width** of the data bus (for example 64 bits) is how many bits it can carry at once."],
    [["Name the three buses.", "The address bus, the data bus and the control bus."], ["Which bus is one-way?", "The address bus (from the CPU to memory)."], ["What is the von Neumann bottleneck?", "Instructions and data share one memory and bus, so the CPU waits while each is fetched in turn."]],
    ["bus", "address bus", "data bus", "control bus", "von neumann"]),
  psu: s("board", "Power supply (PSU)", "Converts mains electricity (230 V AC in the UK) into the low-voltage DC the components need: 12 V, 5 V and 3.3 V.",
    ["The CPU and graphics card draw most of the power from the 12 V rail.", "Efficiency ratings (such as 80 Plus Gold) say how little power is wasted as heat.", "The 24-pin cable powers the board; separate cables feed the CPU and GPU."],
    [["What does the power supply do?", "Converts mains AC into low-voltage DC (12 V, 5 V, 3.3 V) for the components."], ["Which components use the most power?", "The CPU and the graphics card."], ["What does an 80 Plus rating tell you about a power supply?", "How efficient it is: how little energy it wastes as heat."]],
    ["psu", "power supply", "voltage", "ac", "dc"]),
};

const NOTES = {
  processing: { title: "The CPU and the fetch-decode-execute cycle", lead: "A computer follows the **von Neumann** design: a CPU that runs a stored program, with instructions and data held together in memory. The CPU repeats one cycle, over and over.",
    sections: [
      ["Fetch, decode, execute", "1. **Fetch**: the address in the **program counter (PC)** is copied to the **memory address register (MAR)**; the instruction at that address comes along the data bus into the **memory data register (MDR)**; the PC goes up by one.", "2. **Decode**: the **control unit** works out what the instruction means (A level: it's held in the current instruction register, CIR).", "3. **Execute**: the instruction is carried out, for example the **ALU** adds a number to the **accumulator (ACC)**.", "> Exam tip: name the registers and say what moves where. \"The PC holds the address of the next instruction\" earns more than \"the CPU gets the instruction\"."],
      ["What makes a CPU faster", "- **Clock speed**: more cycles per second.", "- **Cores**: more instructions processed at the same time (if the software can use them).", "- **Cache**: more fast memory close to the cores means fewer slow trips to RAM."],
      ["CPU and GPU", "- CPU: a few powerful cores, good at varied, step-by-step work.", "- GPU: thousands of simple cores, good at the same operation on lots of data: graphics, and training AI models."],
    ] },
  memory: { title: "Memory and storage", lead: "Computers use fast, small, volatile memory for what's running now, and slower, larger, non-volatile storage for everything kept long-term.",
    sections: [
      ["The memory hierarchy", "From fastest and smallest to slowest and largest:", "- **Registers** (inside the CPU)", "- **Cache** (on the CPU)", "- **RAM** (main memory, volatile)", "- **Secondary storage**: SSD, HDD (non-volatile)", "> The trade-off: faster memory costs more per byte, so there's less of it."],
      ["RAM and ROM", "- **RAM**: read and write, volatile, holds programs in use.", "- **ROM**: read-only, non-volatile, holds the start-up instructions (firmware)."],
      ["Storage types", "- **Solid state** (SSD, USB sticks, memory cards): flash memory, fast, robust.", "- **Magnetic** (HDD): spinning platters, cheap for large capacities.", "- **Optical** (CD, DVD, Blu-ray): read by laser, portable, now rarely used.", "Compare them by capacity, speed, portability, durability, reliability and cost."],
    ] },
  board: { title: "The motherboard, buses and power", lead: "The motherboard connects everything, the buses carry signals between the parts, and the power supply keeps it all running.",
    sections: [
      ["The three buses", "- **Address bus**: carries the memory address the CPU wants (one-way).", "- **Data bus**: carries the data or instruction (two-way).", "- **Control bus**: carries control signals such as read, write and the clock."],
      ["Expansion and connections", "- **PCIe** slots and lanes connect graphics cards and fast storage.", "- **M.2** slots hold NVMe SSDs.", "- Connectors for USB, networking, audio and displays."],
      ["Power", "The PSU converts 230 V AC mains into 12 V, 5 V and 3.3 V DC. Everything the computer does ends up as heat, which is why cooling matters."],
    ] },
};

export default {
  title: "Inside a computer in 3D", kicker: "3D computing",
  intro: { title: "Look inside a computer", text: "A motherboard with its CPU, memory, storage, graphics card and power supply. Watch data move along the buses while the CPU fetches, decodes and executes. Lift the cooler to see the processor." },
  groups: GROUPS, structures: STRUCTURES, notes: NOTES,
  calloutName: "Exam tip",
  quiz: "find the component",
  motion: "Running",
  trueColour: true,
  sliders: [{ key: "cooler", label: "Lift the cooler", value: 0 }],
  camera: { pos: [0.95, 1.05, 1.35], target: [0.02, 0.08, 0.0], min: 0.2, max: 3.5 },
  views: { Overview: [[0.95, 1.05, 1.35], [0.02, 0.08, 0.0]], "From above": [[0.02, 1.9, 0.12], [0.02, 0, 0]], "CPU and RAM": [[0.35, 0.55, 0.42], [0.0, 0.08, -0.12]], "Graphics card": [[0.1, 0.35, 0.95], [0.0, 0.1, 0.2]] },
  platform: { r: 0.55 },
  shadow: { left: -1.3, right: 1.3, top: 1.2, bottom: -1.2, near: 0.5, far: 9 },
  explode: false,
  build(k) {
    const { THREE, V, mat, text, add, decor, box, tube } = k;
    const at = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.y = ry; return o; };
    const plastic = (c, r = 0.5) => mat(c, { detail: "none", roughness: r, clearcoat: 0.2 });
    const metal = (c, r = 0.32) => mat(c, { detail: "none", metalness: 0.9, roughness: r, clearcoat: 0 });
    const alu = metal("#c9ccd1", 0.35), copper = metal("#c47a45", 0.3), gold = metal("#d4a94a", 0.28), black = plastic("#18191c", 0.6), chip = plastic("#202226", 0.35);
    const Y = 0.035;   // the top of the board

    // the board: a canvas texture of tracks and silkscreen on dark green
    const c = document.createElement("canvas"); c.width = 1024; c.height = 853; const g = c.getContext("2d");
    g.fillStyle = "#123d2c"; g.fillRect(0, 0, 1024, 853);
    const rnd = (() => { let x = 7; return () => (x = (x * 16807) % 2147483647) / 2147483647; })();
    g.strokeStyle = "rgba(190, 150, 80, 0.32)"; g.lineWidth = 2;
    for (let i = 0; i < 160; i++) { let x = rnd() * 1024, y = rnd() * 853; g.beginPath(); g.moveTo(x, y); for (let j = 0; j < 4; j++) { if (rnd() < 0.5) x += (rnd() - 0.5) * 260; else y += (rnd() - 0.5) * 260; g.lineTo(x, y); } g.stroke(); }
    g.fillStyle = "rgba(235, 235, 225, 0.75)"; g.font = "600 22px Geist, system-ui, sans-serif";
    // labels sit next to what they name (board x -0.45..0.45 → 0..1024 px, z -0.375..0.375 → 0..853 px)
    for (const [t, x, y] of [["CPU_1", 370, 400], ["DDR5_A1  A2", 600, 525], ["PCIE_X16", 120, 625], ["M2_1", 130, 300], ["ATX", 935, 420], ["GRADIFY B-1", 60, 800]]) g.fillText(t, x, y);
    const btex = new THREE.CanvasTexture(c); btex.colorSpace = THREE.SRGBColorSpace; btex.anisotropy = 8;
    const board = new THREE.Group();
    board.add(at(box(0.9, 0.012, 0.75, mat("#6f8a78", { detail: "none", map: btex, roughness: 0.55, clearcoat: 0.5 })), 0, Y - 0.006, 0));
    for (const [x, z] of [[-0.42, -0.34], [0.42, -0.34], [-0.42, 0.34], [0.42, 0.34], [0, -0.34], [0, 0.34]]) board.add(at(new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, Y - 0.012, 12), gold), x, (Y - 0.012) / 2, z));
    // slots, connectors and small parts, so it reads as a real board
    board.add(at(box(0.06, 0.03, 0.2, black), 0.39, Y + 0.015, -0.05));   // 24-pin power
    for (const z of [0.2, 0.3]) board.add(at(box(0.6, 0.012, 0.016, black), -0.08, Y + 0.006, z));   // PCIe slots
    board.add(at(box(0.09, 0.025, 0.09, metal("#5a5e66", 0.4)), 0.2, Y + 0.0125, 0.1));   // chipset heat sink
    for (let i = 0; i < 26; i++) board.add(at(box(0.012, 0.016, 0.012, plastic(i % 3 ? "#2a2a30" : "#6b4a20", 0.4)), -0.3 + (i % 13) * 0.022, Y + 0.008, i < 13 ? -0.3 : -0.26));   // capacitors and chokes
    board.add(at(box(0.04, 0.06, 0.6, metal("#40444c", 0.45)), -0.43, Y + 0.03, 0.0));   // the rear I/O
    add("motherboard", board);

    // CPU in its socket
    const cpu = new THREE.Group(), CX = -0.08, CZ = -0.12;
    cpu.add(at(box(0.14, 0.006, 0.14, black), CX, Y + 0.003, CZ));
    cpu.add(at(box(0.1, 0.004, 0.1, plastic("#1e5a3a", 0.4)), CX, Y + 0.008, CZ));
    cpu.add(at(box(0.082, 0.007, 0.082, metal("#d7d9dd", 0.22)), CX, Y + 0.0135, CZ));
    add("cpu", cpu);

    // tower cooler over the CPU: base, heat pipes, a stack of fins and a fan
    const cooler = new THREE.Group();
    cooler.add(at(box(0.075, 0.012, 0.075, copper), 0, 0.006, 0));
    for (const x of [-0.024, -0.008, 0.008, 0.024]) cooler.add(tube([V(x, 0.008, -0.02), V(x, 0.03, -0.035), V(x, 0.22, -0.035)], 0.004, copper, 24, false, 8), tube([V(x, 0.008, 0.02), V(x, 0.03, 0.035), V(x, 0.22, 0.035)], 0.004, copper, 24, false, 8));
    const fin = new THREE.BoxGeometry(0.15, 0.0025, 0.11);
    for (let i = 0; i < 30; i++) cooler.add(at(new THREE.Mesh(fin, alu), 0, 0.05 + i * 0.0058, 0));
    cooler.add(at(box(0.15, 0.006, 0.11, black), 0, 0.226, 0));
    const fan = new THREE.Group(); fan.add(at(box(0.012, 0.15, 0.15, black), 0, 0, 0));
    const blades = new THREE.Group(); for (let i = 0; i < 7; i++) { const b = box(0.004, 0.055, 0.02, plastic("#2c2e33", 0.5)); b.position.set(0.008, 0.035, 0); b.rotation.x = 0.35; const arm = new THREE.Group(); arm.add(b); arm.rotation.x = (i / 7) * Math.PI * 2; blades.add(arm); }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.01, 24), black); hub.rotation.z = Math.PI / 2; blades.add(at(hub, 0.008, 0, 0));
    fan.add(blades); cooler.add(at(fan, -0.082, 0.135, 0));
    cooler.position.set(CX, Y + 0.017, CZ); cooler.userData.moves = true;
    add("cooler", cooler);
    k.slider("cooler", (v) => { cooler.position.y = Y + 0.017 + v * 0.32; });

    // two RAM sticks in their slots, beside the CPU
    const ram = new THREE.Group();
    for (const x of [0.1, 0.135]) {
      ram.add(at(box(0.012, 0.012, 0.36, black), x, Y + 0.006, -0.12));
      const stick = new THREE.Group(); stick.add(at(box(0.004, 0.045, 0.33, plastic("#1e5a3a", 0.4)), 0, 0, 0));
      stick.add(at(box(0.008, 0.04, 0.32, metal("#2f3440", 0.4)), 0, 0.005, 0)); stick.add(at(box(0.009, 0.006, 0.32, plastic("#c23a3a", 0.4)), 0, 0.026, 0));
      ram.add(at(stick, x, Y + 0.035, -0.12));
    }
    add("ram", ram);

    // an M.2 NVMe SSD, flat on the board
    const ssd = new THREE.Group(), SX = -0.3, SZ = -0.08;   // beside the CPU, where it isn't hidden behind the graphics card
    ssd.add(at(box(0.08, 0.003, 0.022, plastic("#1a1a1f", 0.4)), SX, Y + 0.002, SZ));
    for (const x of [-0.022, 0.004, 0.026]) ssd.add(at(box(x > 0.02 ? 0.012 : 0.02, 0.003, 0.016, chip), SX + x, Y + 0.0045, SZ));
    ssd.add(at(box(0.012, 0.0015, 0.018, gold), SX + 0.044, Y + 0.0015, SZ));
    const ssdLabel = text("NVMe SSD", { size: 0.022 }); ssdLabel.position.set(SX, Y + 0.05, SZ); decor(ssdLabel, "memory");
    add("ssd", ssd);

    // the graphics card, standing in the first PCIe slot, fans towards you
    const gpu = new THREE.Group(), GZ = 0.2;
    gpu.add(at(box(0.6, 0.11, 0.008, plastic("#16301f", 0.45)), -0.07, Y + 0.068, GZ));
    gpu.add(at(box(0.6, 0.12, 0.035, plastic("#2a2c31", 0.35)), -0.07, Y + 0.075, GZ + 0.022));
    gpu.add(at(box(0.6, 0.006, 0.04, metal("#9aa0a8", 0.3)), -0.07, Y + 0.138, GZ + 0.018));
    for (const x of [-0.24, -0.07, 0.1]) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.004, 8, 40), metal("#8a9098", 0.35)); gpu.add(at(ring, x, Y + 0.075, GZ + 0.041));
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.006, 24), black); hub.rotation.x = Math.PI / 2; gpu.add(at(hub, x, Y + 0.075, GZ + 0.042));
      const bl = new THREE.Group(); for (let i = 0; i < 9; i++) { const b = box(0.012, 0.036, 0.003, plastic("#1c1d21", 0.5)); b.position.y = 0.024; b.rotation.y = 0.4; const arm = new THREE.Group(); arm.add(b); arm.rotation.z = (i / 9) * Math.PI * 2; bl.add(arm); }
      gpu.add(at(bl, x, Y + 0.075, GZ + 0.04)); gpu.userData.fans = [...(gpu.userData.fans || []), bl];
    }
    gpu.add(at(box(0.012, 0.13, 0.04, metal("#9aa0a8", 0.3)), -0.38, Y + 0.075, GZ + 0.018));   // bracket
    add("gpu", gpu);

    // buses: gold tracks between CPU and RAM (address, data, control), CPU and PCIe, CPU and M.2
    const buses = new THREE.Group(), traces = [];
    const track = (pts, w = 0.0035) => { for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1], len = a.distanceTo(b), m = box(len + w, 0.0012, w, gold); m.position.copy(a).lerp(b, 0.5); m.rotation.y = -Math.atan2(b.z - a.z, b.x - a.x); buses.add(m); } traces.push(pts); };
    for (let i = 0; i < 6; i++) { const z = CZ - 0.05 + i * 0.02; track([V(CX + 0.07, Y + 0.0006, z), V(0.085, Y + 0.0006, z)]); }
    for (let i = 0; i < 4; i++) { const x = CX - 0.03 + i * 0.02; track([V(x, Y + 0.0006, CZ + 0.07), V(x, Y + 0.0006, 0.08), V(x - 0.02, Y + 0.0006, GZ - 0.012)]); }
    for (let i = 0; i < 3; i++) { const z = SZ - 0.01 + i * 0.01; track([V(SX + 0.045, Y + 0.0006, z), V(CX - 0.075, Y + 0.0006, z)]); }
    add("buses", buses);

    // the power supply beside the board, cabled in
    const psu = new THREE.Group(), PX = 0.66, PZ = 0.15;
    psu.add(at(box(0.15, 0.086, 0.16, metal("#2a2c30", 0.5)), PX, 0.043, PZ));
    const grille = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.003, 6, 40), metal("#8a9098", 0.35)); grille.rotation.x = Math.PI / 2; psu.add(at(grille, PX, 0.087, PZ));
    for (let i = -4; i <= 4; i++) psu.add(at(box(0.1, 0.002, 0.003, metal("#8a9098", 0.35)), PX, 0.087, PZ + i * 0.011));
    psu.add(at(box(0.004, 0.03, 0.05, black), PX - 0.075, 0.03, PZ - 0.02));
    for (let i = 0; i < 6; i++) psu.add(tube([V(PX - 0.075, 0.03, PZ - 0.035 + i * 0.006), V(0.53, 0.05, 0.0), V(0.45, Y + 0.03, -0.1 + i * 0.012), V(0.42, Y + 0.03, -0.12 + i * 0.03)], 0.0035, plastic(i % 2 ? "#18191c" : "#3a3c42", 0.6), 40, false, 6));
    add("psu", psu);

    // data on the move: storage → RAM → CPU, results back to RAM, and work for the GPU
    const P = (x, z, y = Y + 0.012) => V(x, y, z);
    k.flow([[P(SX + 0.04, SZ), P(CX - 0.075, SZ), P(CX - 0.075, CZ + 0.08), P(0.1, CZ + 0.08), P(0.1, CZ)]], "#7be08a", 10, 0.35, "memory", 0.012);
    k.flow([[P(0.09, CZ - 0.04), P(CX + 0.06, CZ - 0.04)], [P(0.09, CZ), P(CX + 0.06, CZ)]], "#5ec8ff", 14, 0.6, "processing", 0.012);
    k.flow([[P(CX + 0.06, CZ + 0.04), P(0.09, CZ + 0.04)]], "#ffb15e", 6, 0.6, "processing", 0.012);
    k.flow([[P(CX - 0.02, CZ + 0.07), P(CX - 0.02, 0.08), P(CX - 0.04, GZ - 0.012)]], "#c58cff", 8, 0.5, "processing", 0.012);

    // the fetch-decode-execute cycle, shown above the CPU
    const stages = ["Fetch", "Decode", "Execute"].map((t, i) => { const l = text(`${i + 1}. ${t}`, { size: 0.03 }); l.position.set(CX, 0.42, CZ); l.visible = i === 0; decor(l, "processing"); return l; });
    k.tick((t, dt, motion) => {
      if (!motion) return;
      const st = Math.floor(t / 0.9) % 3; stages.forEach((l, i) => { l.visible = i === st; });
      blades.rotation.x = t * 14; for (const b of gpu.userData.fans) b.rotation.z = -t * 11;
    });
  },
};
