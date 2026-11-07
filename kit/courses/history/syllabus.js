// HistoryGradify History: the full curriculum. Each topic is taught as one lesson, grouped into modules ("> " lines) and
// stages (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock history): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Historical Thinking and Methods
> The discipline of history
* What is history?
* Primary and secondary sources
* Historical evidence
* Source provenance
* Reliability and usefulness
* Bias and perspective
* Historical interpretations
> Second-order concepts
* Cause and consequence
* Continuity and change
* Significance
* Chronology and periodisation
> Argument and writing
* Historical argument
* Essay construction
* Evidence selection
* Evaluating historical claims
* Comparing interpretations
2. Medieval Britain
> Anglo-Saxons and Vikings
* Anglo-Saxon England
* The Viking invasions
* Alfred the Great
> The Norman Conquest
* The Norman Conquest
* The Battle of Hastings
* William I and Norman control
* Feudalism
* The Domesday Book
> Crown, Church and law
* Medieval monarchy
* Henry II and legal reform
* Thomas Becket
* King John and Magna Carta
* The development of Parliament
> Society and crisis
* Medieval society
* The Black Death
* The Peasants' Revolt
* The Wars of the Roses
* The rise of the Tudor dynasty
3. Tudor England
> Henry VII and Henry VIII
* Henry VII and dynastic security
* Henry VIII's government
* The English Reformation
* The dissolution of the monasteries
> The mid-Tudor years
* Edward VI and Protestant reform
* Mary I and Catholic restoration
> Elizabethan England
* Elizabeth I and the religious settlement
* Elizabethan government
* The Spanish Armada
* Elizabethan exploration
* Poverty and social policy
* Tudor culture and society
* Tudor foreign policy
* Succession and the end of the Tudor dynasty
4. Stuart Britain and the Civil War
> Early Stuart monarchy
* James I and the Union of the Crowns
* The divine right of kings
* Parliament and taxation
* Religious tensions under the early Stuarts
* Charles I
* The Personal Rule
> The road to war
* The Bishops' Wars
* The Long Parliament
* Causes of the English Civil War
> War and revolution
* Royalists and Parliamentarians
* Key campaigns and battles of the Civil War
* The trial and execution of Charles I
* The Commonwealth
* Oliver Cromwell
* The Protectorate
> Restoration and revolution
* The Restoration
* The Glorious Revolution
* The Bill of Rights
5. The Industrial Revolution
> Foundations of change
* Agricultural change
* Population growth
* The factory system
* The textile industry
* Steam power
* Coal and iron
* Railways
> Life and work in industrial Britain
* Urbanisation
* Industrial working conditions
* Child labour
* Public health
* Housing and sanitation
> Economy and politics
* Industrial capitalism
* Trade unions
* Chartism
* The Great Reform Act
* Early Victorian social reform
* The changing British economy
6. Nineteenth-Century Britain
> Monarchy and democracy
* The British Empire in the nineteenth century
* Victorian monarchy
* Parliamentary reform, 1867–1884
* The development of democracy
* The growth of the Labour movement
> Ireland
* Ireland and the Union
* Irish nationalism
> Empire
* Imperial expansion
* Colonial administration
* The Scramble for Africa
* Imperial resistance
* The Boer Wars
> Society and Britain's place in the world
* Women's suffrage
* The Liberal welfare reforms
* Britain's changing international position
7. The First World War
> Long-term causes
* European power politics
* Militarism
* Alliances
* Imperial rivalry
* Nationalism
> The outbreak of war
* The assassination of Archduke Franz Ferdinand
* The July Crisis
* The outbreak of war
> The fighting
* Trench warfare
* The Western Front
* Gallipoli
* The Eastern Front, 1914–1917
> War and society
* The British Home Front, 1914–1918
* Total war
* Propaganda in the First World War
* Women's wartime roles
> Ending the war
* Russia leaves the war
* The United States enters the war
* The Armistice
* The Treaty of Versailles
* The consequences of the First World War
8. The Russian Revolution and the Soviet Union
> Tsarist Russia
* Tsarist Russia
* Nicholas II
* Russian society and inequality
* The 1905 Revolution
* The First World War and Russia
> 1917
* The February Revolution
* The Provisional Government
* Lenin and the Bolsheviks
* The October Revolution
> Consolidating Bolshevik power
* The Russian Civil War
* War Communism
* The New Economic Policy
> Stalin's Russia
* Stalin's rise to power
* Collectivisation
* Soviet industrialisation
* The Five-Year Plans
* The Great Purge
* Soviet propaganda
* Life under Stalin
* The Soviet Union in the Second World War
9. The Rise of Fascism and Nazism
> Fascist Italy
* Post-war Italy
* Mussolini
* The development of Italian Fascism
> Weimar Germany
* The Weimar Republic
* The Treaty of Versailles and Germany
* Political instability in Weimar Germany
* Hyperinflation
* The Great Depression in Germany
> The Nazi seizure of power
* Hitler's rise to power
* Nazi ideology
* Nazi consolidation of power
> Life in Nazi Germany
* The police state
* Propaganda and censorship in Nazi Germany
* Nazi economic policy
* Youth and education in Nazi Germany
* Women and family policy in Nazi Germany
> Persecution and resistance
* Persecution of minorities
* Antisemitism
* The Holocaust
* Resistance to Nazi rule
10. The Second World War
> The road to war
* The causes of the Second World War
* Appeasement
* The invasion of Poland
> Europe at war
* The fall of France
* The Battle of Britain
* The Blitz
* Operation Barbarossa
* The Eastern Front, 1941–1945
> The global war
* The Pacific War
* Pearl Harbor
* The Holocaust in wartime
> War economies and home fronts
* The Home Front, 1939–1945
* Wartime economies
> Victory and settlement
* D-Day
* The defeat of Nazi Germany
* The atomic bombings of Hiroshima and Nagasaki
* The surrender of Japan
* The post-war settlement
* The creation of the United Nations
11. The Cold War
> Origins
* Origins of the Cold War
* Capitalism and communism
* The division of Europe
* The Iron Curtain
* The Berlin Blockade
* NATO and the Warsaw Pact
> Global confrontation
* The Korean War
* The arms race
* Nuclear deterrence
* The Hungarian Uprising
* The Berlin Wall
* The Cuban Missile Crisis
* Vietnam and containment
> Détente and the end
* Détente
* Soviet intervention in Afghanistan
* Reagan and Gorbachev
* The fall of the Berlin Wall
* The collapse of the Soviet Union
* The end of the Cold War
12. Britain since 1945
> Reconstruction and the welfare state
* Post-war reconstruction
* The welfare state
* The creation of the NHS
* Housing and education reform
> Empire to Commonwealth
* Immigration and multicultural Britain
* The end of the British Empire
* Decolonisation
* The Suez Crisis
> Society and politics
* The Swinging Sixties
* Social and cultural change
* The Troubles in Northern Ireland
* Thatcherism
* Industrial decline
* New Labour
> Britain and Europe
* Britain and Europe
* Brexit
* Contemporary British society
13. The United States in the Twentieth Century
> Reform and depression
* Progressive reform
* The Great Depression
* Franklin D. Roosevelt
* The New Deal
> Superpower
* The Second World War and America
* Post-war prosperity
> Civil rights
* The Civil Rights Movement
* Martin Luther King Jr.
* Malcolm X
* The Montgomery Bus Boycott
> Crisis and renewal
* The Vietnam War and American society
* The Watergate scandal
* Reaganomics
* The United States and the end of the Cold War
* The changing role of the United States
14. Global History and Empires
> Early modern empires
* The Ottoman Empire
* The Mughal Empire
* The Qing dynasty
* The rise of modern Japan
> Colonialism and slavery
* European colonialism
* The Atlantic slave trade
* Abolition and emancipation
* The Haitian Revolution
* Latin American independence
> Empire and resistance in Africa and Asia
* The Scramble for Africa: African experiences
* Anti-colonial resistance
* Indian independence
* Partition
> China and the post-colonial world
* The Chinese Revolution
* Mao and the People's Republic of China
* Post-colonial states
* Globalisation and historical change
15. Revolutions and Political Change
> The age of revolutions
* The English Revolution
* The American Revolution
* The French Revolution
* The Haitian Revolution in comparison
* The Latin American revolutions
* The European revolutions of 1848
> Twentieth-century revolutions
* The Russian Revolution in comparison
* The Chinese Revolution in comparison
* Decolonisation movements
* The Iranian Revolution
> Thinking about revolution
* Revolutionary ideologies
* The causes and consequences of revolution
* Comparative revolutionary history
16. Religion, Culture and Society
> Belief and ideas
* Medieval Christianity
* The European Reformation
* Religious conflict in Europe
* The Enlightenment
* Scientific change
* The development of political thought
* The growth of secularism
> Society and culture
* Women's changing roles
* Education and literacy
* The development of mass media
* Art and cultural movements
* Social class and identity
> Memory and heritage
* Historical memory
* Commemoration and contested heritage
17. A Level Historical Investigation
> Designing an enquiry
* Constructing historical enquiries
* Developing research questions
* Selecting primary sources
* Evaluating provenance in depth
> Historians and debate
* Comparing interpretations at A level
* Historiographical debate
* Using academic literature
> Writing the investigation
* Constructing an argument
* Structuring an extended essay
* Citation and referencing
* Avoiding anachronism
* Evaluating historical significance
* Writing a sustained historical judgement
18. Historical Examination and Revision
> Question types
* Source analysis questions
* Interpretation analysis questions
* Causation questions
* Consequence questions
* Change and continuity questions
* Significance questions
* Comparison questions
> Essays
* Evidence-based essays
* Extended historical arguments
* Planning examination answers
> Exam technique
* Time management
* Mark-scheme interpretation
* GCSE practice examinations
* A level practice examinations
`;

export const TRACKS = [
  { name: "Stage 1 · Thinking like a historian", units: [1], from: "#c2833f", to: "#e0b56c" },
  { name: "Stage 2 · Medieval and early modern Britain", units: [2, 3, 4], from: "#b0703a", to: "#d9a35b" },
  { name: "Stage 3 · Industry, empire and reform", units: [5, 6], from: "#8f5f3a", to: "#c98a4b" },
  { name: "Stage 4 · The world in conflict, 1900–1991", units: [7, 8, 9, 10, 11, 13], from: "#7c4a2d", to: "#c2833f" },
  { name: "Stage 5 · Britain and the world since 1945", units: [12, 14], from: "#a0603a", to: "#22d3ee" },
  { name: "Stage 6 · Themes, investigation and exams", units: [15, 16, 17, 18], from: "#c2833f", to: "#22d3ee" },
];

export const PATHS = [
  { id: "core", name: "The whole course", sub: "Every school in order, from historical method to exam technique.", units: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] },
  { id: "gcse", name: "GCSE pathway", sub: "Method, then the periods most GCSE specifications study: medieval, Elizabethan, the world wars, Germany, the Cold War and modern Britain, ending with exam practice. Check your own board's specification.", units: [1, 2, 3, 7, 9, 10, 11, 12, 18] },
  { id: "a-level", name: "A level pathway", sub: "Method, the Tudors and Stuarts, Russia, Germany, the Cold War, the USA and revolutions, with the independent investigation and exam practice. Check your own board's specification.", units: [1, 3, 4, 8, 9, 11, 13, 15, 17, 18] },
  { id: "britain", name: "Britain, 1066 to today", sub: "A continuous story of British history.", units: [2, 3, 4, 5, 6, 12] },
  { id: "world", name: "The modern world", sub: "Twentieth-century conflict, ideology and empire beyond Britain.", units: [7, 8, 9, 10, 11, 13, 14, 15] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "How historians know: sources, provenance, interpretations, the second-order concepts and how to build an argument.",
  2: "From Anglo-Saxon England and the Norman Conquest to Magna Carta, the Black Death and the Wars of the Roses.",
  3: "Dynasty, Reformation and religious settlement, from Henry VII to the death of Elizabeth I.",
  4: "Crown against Parliament: the road to civil war, regicide, republic, Restoration and the Glorious Revolution.",
  5: "How Britain became the first industrial nation, and what it meant for the people who lived through it.",
  6: "Democracy, Ireland, empire and women's suffrage in Victorian and Edwardian Britain.",
  7: "Why war came in 1914, how it was fought on every front, and the peace that followed.",
  8: "From the last Tsar to Stalin's dictatorship: revolution, civil war and the Soviet state.",
  9: "How democracy failed in Italy and Germany, and what Fascist and Nazi rule meant in practice.",
  10: "The causes, campaigns, home fronts and genocide of the Second World War, and the post-war settlement.",
  11: "Superpower rivalry from Yalta to the collapse of the Soviet Union.",
  12: "The welfare state, the end of empire, social change, the Troubles, Thatcherism and Europe.",
  13: "Depression, New Deal, civil rights, Vietnam and Watergate: the American century at home.",
  14: "Empires beyond Europe, the Atlantic slave trade, colonialism and the road to independence.",
  15: "Revolutions compared, from 1640s England to 1979 Iran: causes, ideologies and outcomes.",
  16: "Religion, ideas, culture and identity across the centuries, and how societies remember their past.",
  17: "The A level independent investigation: questions, sources, historiography and the extended essay.",
  18: "Every type of exam question, essay planning, timing and mark schemes, for GCSE and A level.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
