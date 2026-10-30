// Which 3D model each sub-site has, and how its pages talk about it. The model itself is in
// kit/models/<file>; the page is getgradify.com/<site>/3d.html (made by `npm run add-3d`).
export const MODELS = {
  MedGradify: { file: "body.js", nav: "Anatomy 3D", title: "The body in 3D", blurb: "Nine systems in medical school detail: turn it, zoom right in, look inside. The heart beats, the lungs breathe and blood flows. Click any structure for its relations and clinical points, with a full page of notes for every system." },
  NurseGradify: { file: "body.js", nav: "Body 3D", title: "The body in 3D", blurb: "Every body system you'll care for, in 3D. Click any structure for the key facts and clinical points, quiz yourself, and read the full notes for each system." },
  HealthGradify: { file: "body.js", nav: "Body 3D", title: "Your body in 3D", blurb: "See how your body fits together: the heart beating, the lungs breathing, and every organ in its place. Click anything to learn what it does." },
  DentalGradify: { file: "mouth.js", nav: "Mouth 3D", title: "The mouth in 3D", blurb: "Both dental arches on their jaws, a molar cut in half to show every layer, and the nerve under the lower teeth. Zoom in on any tooth, click it to learn it, and read the notes for each section." },
  VetGradify: { file: "dog.js", nav: "Dog 3D", title: "The dog in 3D", blurb: "A dog's skeleton, thorax, abdomen and nervous system, with comparative notes on the cat, horse and cow. The heart beats and the lungs breathe; click anything to learn it." },
  PharmaGradify: { file: "membrane.js", nav: "Drug targets 3D", title: "Drug targets in 3D", blurb: "A patch of cell membrane with every major drug target in it: the four receptor families, channels, transporters, pumps and enzymes. Watch an agonist dock, then read the notes on each target." },
  PsychGradify: { file: "brain.js", nav: "Brain 3D", title: "The brain in 3D", blurb: "The lobes, the limbic system, the deep structures and the hindbrain. Fade the cortex to see inside, click any region for its functions and the key studies, and read the notes for each part." },
};
export const modelOf = (siteName) => MODELS[siteName] || null;
