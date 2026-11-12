// School 3: Cognitive Psychology. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md), with evidence
// status (EV:) and questions at three levels in every lesson. Explanations are original; sources are those used and
// cited for checking, pending human verification (qa.js). Level: A level to first-year undergraduate.
export default `
## The information-processing approach
LV: Introductory · Foundation
S: The information-processing approach describes the mind as a system that takes in, transforms, stores and retrieves information in stages. This lesson explains the approach, its methods and its limits.
O: Describe the information-processing approach and its stage models
O: Explain how reaction times and errors are used to infer mental processes
O: Evaluate the information-processing approach, including the computer analogy
PRE: The cognitive approach
H: Stages of processing
P: Information-processing models divide cognition into stages: **input** through the senses, **encoding** into a mental representation, **storage**, **processing** (comparing, deciding, transforming) and **output** as a response. Models are often drawn as boxes connected by arrows, such as Broadbent's (1958) filter model of attention or Atkinson and Shiffrin's (1968) memory model.
H: Methods
P: Because mental stages can't be observed directly, researchers infer them from **reaction times** and **error patterns**. If a task takes longer when an extra step is added, that step is assumed to take time. The **subtractive method** compares reaction times for tasks that differ by one stage; the difference estimates that stage's duration.
IX: reaction-time
X: Choice reaction time and information
> Participants respond to one, two or four possible lights.
> Reaction time rises roughly linearly with log2 of the number of choices (Hick, 1952).
> The finding suggests decision time grows with the amount of information to be processed.
P: **Investigate with the lab.** Try the Stroop task and think of it as information flowing through stages: input, processing and response.
IX: stroop
K: The information-processing approach models cognition as staged processing of information, inferred from reaction times and errors.
P: Later models added **parallel processing**, in which several operations occur at once, and **connectionist** networks, in which knowledge is stored in patterns of connections between simple units, closer to how neurones work.
!: Thinking box-and-arrow models describe where things happen in the brain. They describe functions, not anatomy.
EV: established | Choice reaction time increases with the number of response alternatives (Hick's law).
EV: contested | Whether serial stage models or parallel, connectionist models best describe cognition is debated.
T: Information processing | Describing cognition as the input, transformation, storage and output of information
T: Subtractive method | Estimating a stage's duration by comparing tasks that differ by that stage
SUM: The approach models cognition as stages from input to output.
SUM: It infers processes from reaction times and errors; parallel and connectionist models extend it.
SRC: Hick W. E., "On the rate of gain of information", Quarterly Journal of Experimental Psychology 4(1):11–26 | primary | 1952 | https://doi.org/10.1080/17470215208416600
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 7.1 "What is cognition?" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/7-1-what-is-cognition
Q: What are the main stages in information-processing models? | Input, encoding, storage, processing and output.
Q: How do researchers infer mental stages? | From reaction times and error patterns, such as comparing tasks that differ by one stage.
M1#psychology-u03-01-q1@1: Which measure is most used to infer the duration of mental processes? | Reaction time | Heart rate | Self-report | Body temperature | Differences in reaction time indicate extra processing.
M2#psychology-u03-01-q2@2: Responding takes 50 ms longer when participants must also decide which hand to use. What does the subtractive method suggest? | The decision stage takes about 50 ms | Hands are slower than eyes | The task is unreliable | Decisions take no time | The extra time is attributed to the added stage.
TF2#psychology-u03-01-q3@3: Box-and-arrow models show exactly where processes occur in the brain. | false | They describe functions, not anatomical locations.
M3#psychology-u03-01-q4@3: Which is the strongest criticism of the computer analogy in information processing? | It neglects emotion, context and the body | It uses too many reaction times | It denies mental processes exist | It is too biological | Embodied and emotional factors shape cognition in ways the analogy misses.
SA3#psychology-u03-01-q5@2,3: Evaluate the information-processing approach in cognitive psychology. | Strengths: testable stage models; precise measures (reaction time, errors); findings such as Hick's law; practical applications (interface design). Weaknesses: serial stages oversimplify parallel processing; computer analogy neglects emotion and embodiment; laboratory tasks may lack ecological validity. Connectionist models address some limits. | Stage models ; Methods ; Strength ; Limitation ; Development
M2#psychology-u03-01-q6@1: What does the information-processing approach compare the mind to? | A computer that takes in, processes and outputs information | A hydraulic pump releasing pressure | A blank slate written on by experience | An iceberg with a hidden unconscious | The approach models cognition as stages of processing.

## Selective attention
LV: Intermediate · Application
S: Selective attention is the ability to focus on some information while ignoring the rest. This lesson explains early and late selection theories, the cocktail party effect and inattentional blindness.
O: Describe early-selection, attenuation and late-selection theories of attention
O: Explain the evidence from dichotic listening and inattentional blindness
O: Evaluate theories of selective attention, including load theory
PRE: The information-processing approach
H: The cocktail party problem
P: Cherry (1953) used **dichotic listening**: participants heard two messages, one in each ear, and **shadowed** (repeated aloud) one of them. They recalled little of the unattended message, noticing only physical changes such as a switch from a male to a female voice. Yet at a party we notice our own name in a nearby conversation, the **cocktail party effect**, so some unattended information is processed.
H: Theories
- **Early selection** (Broadbent, 1958): a filter selects one channel on physical features before meaning is analysed.
- **Attenuation** (Treisman, 1964): unattended messages are weakened, not blocked, so important or expected words (your name) can still break through.
- **Late selection** (Deutsch and Deutsch, 1963): all input is analysed for meaning; selection happens just before response.
- **Load theory** (Lavie, 1995): when a task demands a lot of perceptual capacity, distractors aren't processed (early selection); when load is low, spare capacity processes distractors (late selection).
IX: visual-search
X: Inattentional blindness
> Participants counted basketball passes by one team in a video (Simons and Chabris, 1999).
> A person in a gorilla suit walked through the scene; about half the participants didn't notice.
> Without attention, even a salient, unexpected object can go unseen.
P: Attention can also be studied visually. In **visual search**, finding a target defined by one feature (a red item among green) is fast regardless of how many distractors there are, while finding a target defined by a combination of features takes longer as distractors are added. Treisman and Gelade (1980) argued that combining features needs focused attention.
P: **Investigate with the lab.** Do the Stroop task and measure your interference effect: name the ink colour, not the word.
IX: stroop
K: Selective attention filters information; theories differ on how early and how completely unattended information is filtered, and load theory reconciles them.
!: Assuming unattended information is never processed. Breakthrough of personally relevant words shows some processing occurs.
EV: established | People often fail to notice unexpected objects when attention is engaged elsewhere (inattentional blindness).
EV: contested | Where selection occurs (early or late) depends on task demands, as load theory proposes.
T: Dichotic listening | Presenting different messages to each ear, often asking participants to shadow one
T: Attenuation | Treisman's idea that unattended information is weakened rather than blocked
T: Inattentional blindness | Failing to notice an unexpected object when attention is focused elsewhere
SUM: Dichotic listening and the cocktail party effect show both filtering and breakthrough.
SUM: Early, attenuation and late selection theories differ; load theory reconciles them.
SRC: Cherry E. C., "Some experiments on the recognition of speech, with one and with two ears", Journal of the Acoustical Society of America 25(5):975–979 | primary | 1953 | https://doi.org/10.1121/1.1907229
SRC: Simons D. J. and Chabris C. F., "Gorillas in our midst: sustained inattentional blindness for dynamic events", Perception 28(9):1059–1074 | primary | 1999 | https://doi.org/10.1068/p281059
Q: What is the cocktail party effect? | Noticing personally relevant information, such as your name, in an unattended conversation.
Q: What does load theory propose? | High perceptual load leaves no capacity for distractors (early selection); low load lets distractors be processed.
M1#psychology-u03-02-q1@1: Who proposed the early-selection filter model of attention? | Donald Broadbent | Anne Treisman | Nilli Lavie | Colin Cherry | Broadbent's 1958 model filtered information by physical features.
M2#psychology-u03-02-q2@2: While shadowing one ear, a participant hears their name in the other ear. Which theory explains this best? | Attenuation theory | Broadbent's strict filter | Hick's law | Signal detection theory | Attenuation lets important words break through.
TF1#psychology-u03-02-q3@2: In the "gorilla" study, almost every participant noticed the gorilla. | false | About half didn't notice it while counting passes.
M3#psychology-u03-02-q4@3: How does load theory reconcile early and late selection? | Selection depends on how demanding the main task is | It rejects all evidence on attention | It says attention never filters | It applies only to hearing | High load produces early selection; low load allows late processing.
SA3#psychology-u03-02-q5@3: Evaluate theories of selective attention using research evidence. | Broadbent's early filter explains poor recall of unattended messages (Cherry) but not breakthrough of names; Treisman's attenuation explains breakthrough; late selection explains meaning effects but seems inefficient; inattentional blindness shows limits; load theory reconciles positions. | Early selection ; Attenuation ; Late selection ; Evidence ; Load theory
M2#psychology-u03-02-q6@1: Why are people slower to name the ink colour in the Stroop task when it spells a different colour? | Reading the word is automatic and interferes | The colours are hard to see | People read more slowly under time pressure | The words are printed too small | Automatic reading competes with the slower colour-naming task.

## Divided attention
LV: Intermediate · Application
S: Divided attention is attending to more than one task at once. This lesson explains capacity and multiple-resource theories, the bottleneck in response selection and why using a phone while driving is dangerous.
O: Describe capacity and multiple-resource theories of divided attention
O: Explain how task similarity, difficulty and practice affect dual-task performance
O: Apply dual-task research to real-world multitasking
PRE: Selective attention
H: Why multitasking is hard
P: Kahneman (1973) proposed that attention is a limited pool of **capacity** shared between tasks: when combined demands exceed capacity, performance falls. Wickens proposed **multiple resources**: tasks interfere most when they use the same resources (both visual, both verbal, both manual) and less when they use different ones (listening while looking).
H: What affects dual-task performance
- **Similarity**: similar tasks interfere more.
- **Difficulty**: harder tasks need more capacity.
- **Practice**: practised tasks become **automatic**, needing less attention.
P: Even simple tasks show a **psychological refractory period**: when two stimuli need quick responses one after another, the second response is delayed, suggesting a bottleneck in choosing responses (Pashler, 1994).
X: Phones and driving
> In a simulated driving task, participants talking on a phone missed more simulated red lights and reacted more slowly than when listening to the radio (Strayer and Johnston, 2001).
> Hands-free phones gave similar impairment to hand-held ones.
> The problem is attentional (conversation demands central resources), not just holding the phone.
K: Divided attention is limited by capacity and shared resources; similar, difficult and unpractised tasks interfere most.
!: Believing people can truly do two demanding tasks at once. Most "multitasking" is rapid switching with costs.
EV: established | Conversing on a phone, including hands-free, impairs simulated driving performance.
EV: contested | Whether attention is best modelled as a single pool, multiple resources or a central bottleneck is debated.
T: Divided attention | Attending to two or more tasks at once
T: Automaticity | Performing a task with little attention after extensive practice
T: Psychological refractory period | The delay in responding to a second stimulus presented soon after a first
SUM: Capacity, multiple-resource and bottleneck theories explain dual-task costs.
SUM: Similarity, difficulty and practice affect interference; phone use impairs driving even hands-free.
SRC: Strayer D. L. and Johnston W. A., "Driven to distraction: dual-task studies of simulated driving and conversing on a cellular telephone", Psychological Science 12(6):462–466 | primary | 2001 | https://doi.org/10.1111/1467-9280.00386
SRC: Pashler H., "Dual-task interference in simple tasks: data and theory", Psychological Bulletin 116(2):220–244 | primary | 1994 | https://doi.org/10.1037/0033-2909.116.2.220
Q: What is automaticity? | Performing a task with little attention after extensive practice.
Q: Why does phone conversation impair driving even hands-free? | Conversation demands central attentional resources needed for driving.
M1#psychology-u03-03-q1@1: Which theory says tasks interfere most when they use the same type of resource? | Multiple-resource theory | Early selection theory | Hick's law | Load theory | Wickens proposed separate pools for different modalities and responses.
M2#psychology-u03-03-q2@2: Which pair of tasks is likely to interfere least? | Listening to music while walking a familiar route | Reading while listening to a lecture | Writing an email while dictating another | Two mental arithmetic tasks | Different resources and practised tasks interfere less.
TF2#psychology-u03-03-q3@3: Hands-free phones remove the risk of distraction while driving. | false | Conversation itself impairs driving performance.
M3#psychology-u03-03-q4@3: Why do expert typists find it easier to talk while typing than beginners do? | Practice has made typing largely automatic | Experts have more capacity overall | Talking uses no attention | Beginners type faster | Automatic processes need fewer attentional resources.
SA2#psychology-u03-03-q5@2,3: Apply research on divided attention to explain why students shouldn't revise with social media notifications on. | Notifications draw attention away (task switching costs); reading and messaging both use verbal resources (multiple-resource interference); revision is demanding and unpractised; result: poorer encoding and slower progress. Practical advice: turn off notifications, single-task, schedule breaks. | Switching costs ; Resource overlap ; Task difficulty ; Encoding consequence ; Practical advice

## Sustained attention
LV: Intermediate · Application
S: Sustained attention (vigilance) is maintaining focus over long periods, especially when watching for rare signals. This lesson explains the vigilance decrement, its explanations and real-world implications.
O: Define sustained attention and the vigilance decrement
O: Explain resource and mind-wandering accounts of the vigilance decrement
O: Apply vigilance research to safety-critical jobs
PRE: Selective attention
H: The vigilance decrement
P: Mackworth (1948) studied radar operators during the Second World War using the **clock test**: a pointer moved in steps around a dial and occasionally jumped two steps; observers had to detect the double jumps. Detection fell noticeably within the first 30 minutes. This decline in performance over time on monotonous watch tasks is the **vigilance decrement**.
H: Explanations
P: **Resource** accounts argue vigilance is effortful and depletes attentional resources; tasks are rated as demanding and stressful, not boring and easy (Warm, Parasuraman and Matthews, 2008). **Mind-wandering** or underload accounts argue attention drifts away from monotonous tasks. Signal detection analysis shows the decrement can involve both reduced sensitivity and a more cautious criterion.
IX: signal-detection
X: Airport baggage screening
> Screeners watch X-ray images for rare threat items.
> Rare targets make missing them more likely (the low-prevalence effect), and performance declines over long shifts.
> Countermeasures include breaks, rotating tasks and inserting artificial test items to keep targets less rare.
P: Vigilance matters in many jobs: air traffic control, medical monitoring, security, quality inspection and long-distance driving. Automation can make it worse, because operators monitoring a reliable system rarely need to act and may miss the rare failure.
K: Sustained attention declines over time on monotonous tasks with rare signals, with important consequences for safety-critical work.
!: Assuming vigilance tasks are easy because nothing much happens. They are effortful and stressful.
EV: established | Detection performance declines over time in vigilance tasks (Mackworth, 1948).
EV: contested | Whether the vigilance decrement mainly reflects resource depletion or mind-wandering is debated.
T: Sustained attention | Maintaining focus over extended periods
T: Vigilance decrement | The decline in detection performance over time on watch tasks
SUM: Sustained attention declines over time, especially with rare signals.
SUM: Resource and mind-wandering accounts explain it; breaks and task design reduce errors.
SRC: Mackworth N. H., "The breakdown of vigilance during prolonged visual search", Quarterly Journal of Experimental Psychology 1(1):6–21 | primary | 1948 | https://doi.org/10.1080/17470214808416738
SRC: Warm J. S., Parasuraman R. and Matthews G., "Vigilance requires hard mental work and is stressful", Human Factors 50(3):433–441 | primary | 2008 | https://doi.org/10.1518/001872008X312152
Q: What is the vigilance decrement? | The decline in detection performance over time on monotonous watch tasks.
Q: What did Mackworth's clock test require? | Detecting rare double jumps of a pointer moving around a dial.
M1#psychology-u03-04-q1@1: Mackworth's research was first prompted by the performance of… | Radar operators | Factory workers | Schoolchildren | Pilots in training | Wartime radar operators missed signals after long watches.
M2#psychology-u03-04-q2@2: An airport changes screeners' tasks every 20 minutes. Which finding supports this? | Detection declines over time on watch tasks | Attention never changes | Rare targets are easy to see | Long shifts improve performance | Rotation counters the vigilance decrement.
TF2#psychology-u03-04-q3@3: Research shows vigilance tasks are undemanding and relaxing. | false | They are rated as effortful and stressful.
M3#psychology-u03-04-q4@3: Why are rare targets especially likely to be missed? | A cautious criterion and drifting attention | Rare targets are always smaller | Observers have no criterion | Rare targets are never relevant | The low-prevalence effect shifts criterion and reduces engagement.
SA2#psychology-u03-04-q5@2,3: Apply vigilance research to recommend shift design for CCTV operators. | Long monitoring of rare events produces the vigilance decrement; recommend short watch periods, breaks, task rotation, alerting tools, inserting test events, adequate staffing and reduced fatigue; evaluate with performance monitoring. | Decrement explained ; Rare events ; Breaks or rotation ; Other countermeasure ; Evaluation

## Sensation and perception
LV: Introductory · Foundation
S: Sensation is detecting physical energy with sense organs; perception is organising and interpreting it into meaningful experience. This lesson explains transduction, thresholds and the interplay of bottom-up and top-down processing.
O: Distinguish sensation from perception and describe transduction
O: Explain absolute thresholds, difference thresholds and Weber's law
O: Compare bottom-up and top-down theories of perception
PRE: The information-processing approach
H: From energy to experience
P: **Sensation** begins when sensory receptors respond to energy: light, sound waves, pressure, chemicals. **Transduction** converts this energy into neural signals. **Perception** organises and interprets these signals, so we see objects, hear words and recognise faces.
H: Thresholds
P: The **absolute threshold** is the weakest stimulus detected half the time. The **difference threshold** (just noticeable difference) is the smallest change detected half the time. **Weber's law** states that the just noticeable difference is a constant proportion of the original stimulus: adding 1 gram to 100 grams may be noticed, but to 1,000 grams it isn't. Signal detection theory adds that detection also depends on the observer's criterion.
X: Top-down and bottom-up
> Bottom-up: Gibson (1979) argued the environment provides rich information directly (texture gradients, optic flow), with little need for interpretation.
> Top-down: Gregory (1970) argued perception is hypothesis testing, using knowledge and expectation to interpret ambiguous input.
> Evidence: the same ambiguous shape is read as "B" among letters and "13" among numbers, showing context shapes perception.
IX: muller-lyer
P: **Sensory adaptation** means that constant stimulation produces a weaker response over time: you stop noticing the feel of your clothes or a steady background hum. Adaptation frees attention for change, which usually carries more information than a constant signal.
P: **Investigate with the lab.** Move the criterion and watch hits and false alarms trade off, then trace the ROC curve.
IX: signal-detection
K: Sensation detects energy; perception interprets it, combining bottom-up information with top-down knowledge and expectation.
!: Assuming perception is a passive recording of the world. It actively constructs an interpretation.
EV: established | The just noticeable difference is roughly a constant proportion of the stimulus over much of the range (Weber's law).
EV: contested | How much perception depends on direct information (Gibson) or on top-down inference (Gregory) is debated.
T: Transduction | Converting physical energy into neural signals
T: Absolute threshold | The weakest stimulus detected half the time
T: Weber's law | The just noticeable difference is a constant proportion of the original stimulus
SUM: Sensation detects energy through transduction; perception interprets it.
SUM: Thresholds and Weber's law describe detection; perception combines bottom-up and top-down processing.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 5.1 "Sensation versus perception" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/5-1-sensation-versus-perception
SRC: Gregory R. L., The Intelligent Eye, Weidenfeld & Nicolson | primary | 1970
Q: What is transduction? | The conversion of physical energy into neural signals by sensory receptors.
Q: What does Weber's law state? | The just noticeable difference is a constant proportion of the original stimulus.
M1#psychology-u03-05-q1@1: Converting light into neural signals in the eye is… | Transduction | Perception | Adaptation | Attention | Receptors transduce energy into neural signals.
NUM2#psychology-u03-05-q2@2: If the just noticeable difference for weight is 2% of the original, what change (in grams) is noticeable for a 500 g weight? | 10 | 0 | grams | Weber's law: 2% of 500 g gives a just noticeable difference of 10 g.
M2#psychology-u03-05-q3@2: A blurry word is read as "cat" in a sentence about pets but "act" in a sentence about theatre. This shows… | Top-down processing | Bottom-up processing only | Transduction | Sensory adaptation | Context and expectation shape what is perceived.
M3#psychology-u03-05-q4@3: What is the main difference between Gibson's and Gregory's theories? | Direct pickup versus inference | Gibson studied hearing only | Gregory denied sensation exists | They agree completely | They differ on how much perception relies on interpretation.
SA3#psychology-u03-05-q5@3: Evaluate top-down and bottom-up theories of perception. | Bottom-up (Gibson): rich direct information, explains fast perception and action in natural environments. Top-down (Gregory): explains illusions, context effects and ambiguity. Each fits some evidence; most researchers see perception as combining both (interactive models). | Gibson ; Gregory ; Evidence for each ; Combined view ; Judgement
M2#psychology-u03-05-q6@1: In signal detection theory, what does d′ measure? | Sensitivity to the signal, separate from response bias | The observer's willingness to say yes | The number of false alarms | The loudness of the signal | d′ measures how well signal and noise can be told apart.

## Visual perception
LV: Intermediate · Application
S: Vision turns patterns of light on the retina into a stable, three-dimensional world of objects. This lesson explains the visual pathway, depth perception, perceptual constancy and the two visual streams.
O: Describe the visual pathway from retina to cortex
O: Explain depth cues and perceptual constancy
O: Explain the "what" and "where/how" visual streams, with neuropsychological evidence
PRE: Sensation and perception
H: From eye to cortex
P: Light passes through the lens to the **retina**, where **rods** (sensitive to dim light) and **cones** (colour and detail, concentrated in the fovea) transduce it. Signals travel via the optic nerve and thalamus to the **primary visual cortex** in the occipital lobe, where Hubel and Wiesel (1962) found neurones tuned to edges and orientations.
H: Depth and constancy
- **Binocular cues**: retinal disparity (slightly different images from each eye) and convergence.
- **Monocular cues**: relative size, linear perspective, texture gradient, overlap (occlusion), height in the visual field, motion parallax.
P: **Perceptual constancy** means objects look the same size, shape, colour and brightness despite changes in the retinal image: a door looks rectangular as it opens, though its retinal image becomes a trapezium.
X: Two visual streams
> Goodale and Milner (1992) described patient DF, who couldn't recognise the orientation of a slot (ventral "what" stream damage).
> Yet she could post a card through it accurately (intact dorsal "how" stream).
> This suggests partly separate pathways for recognising objects and guiding action.
P: **Investigate with the lab.** Find the orange X: does it pop out among one kind of distractor, but need a slow search among mixed ones? Then try the Müller-Lyer illusion.
IX: visual-search
IX: muller-lyer
K: Vision builds a stable 3D world from retinal images using depth cues and constancies, processed in partly separate streams for recognition and action.
!: Assuming we see with our eyes alone. The eyes transduce light; seeing depends on the brain's interpretation.
EV: established | Neurones in primary visual cortex respond selectively to edge orientation (Hubel and Wiesel).
EV: contested | How separate the ventral and dorsal streams are is debated; they interact extensively.
T: Retinal disparity | The difference between the two eyes' images, used as a depth cue
T: Perceptual constancy | Perceiving objects as stable despite changes in their retinal images
T: Ventral and dorsal streams | Visual pathways for object recognition ("what") and spatial action ("where/how")
SUM: Rods and cones transduce light; visual cortex detects features.
SUM: Depth cues and constancies create a stable world; ventral and dorsal streams support recognition and action.
SRC: Hubel D. H. and Wiesel T. N., "Receptive fields, binocular interaction and functional architecture in the cat's visual cortex", Journal of Physiology 160(1):106–154 | primary | 1962 | https://doi.org/10.1113/jphysiol.1962.sp006837
SRC: Goodale M. A. and Milner A. D., "Separate visual pathways for perception and action", Trends in Neurosciences 15(1):20–25 | primary | 1992 | https://doi.org/10.1016/0166-2236(92)90344-8
Q: What is perceptual constancy? | Perceiving objects as stable in size, shape and colour despite changes in their retinal images.
Q: What are the two visual streams? | The ventral stream for object recognition ("what") and the dorsal stream for spatial action ("where/how").
M1#psychology-u03-06-q1@1: Which receptors are specialised for colour and fine detail? | Cones | Rods | Hair cells | Taste buds | Cones are concentrated in the fovea and support colour and detail.
M2#psychology-u03-06-q2@2: Railway lines appear to meet in the distance. Which depth cue is this? | Linear perspective | Retinal disparity | Convergence | Motion parallax | Parallel lines converging with distance is linear perspective.
TF2#psychology-u03-06-q3@2: Patient DF could post a card through a slot accurately despite being unable to report its orientation. | true | This dissociation supports separate streams for perception and action.
M3#psychology-u03-06-q4@3: Why does a door still look rectangular as it swings open? | Shape constancy uses knowledge and depth cues | The retinal image stays rectangular | Doors have no shape | Rods correct the image | The brain compensates for the changing retinal image.
SA2#psychology-u03-06-q5@2,3: Explain how depth is perceived, using binocular and monocular cues, and give one piece of neuropsychological evidence about visual processing. | Binocular: retinal disparity, convergence. Monocular: linear perspective, texture gradient, relative size, occlusion, motion parallax. Neuropsychology: DF's dissociation (Goodale and Milner) supports separate ventral and dorsal streams. | Binocular cues ; Monocular cues ; Example ; Neuropsychological evidence
M2#psychology-u03-06-q6@1: In visual search, which kind of target usually pops out? | One that differs by a single feature, such as colour | One that combines two features shared with distractors | One that is always in the centre | One that appears last | Single-feature targets are found in parallel; conjunction targets need serial search.

## Auditory perception
LV: Intermediate · Application
S: Auditory perception turns pressure waves into the experience of pitch, loudness, location and speech. This lesson explains how the ear works, how sounds are located and how hearing interacts with vision.
O: Describe how the ear transduces sound
O: Explain how pitch and sound location are perceived
O: Evaluate evidence that hearing interacts with vision, such as the McGurk effect
PRE: Sensation and perception
H: From sound waves to signals
P: Sound waves are funnelled by the outer ear to the eardrum, amplified by the bones of the middle ear and transmitted to the fluid-filled **cochlea**. There, **hair cells** on the basilar membrane bend and transduce vibrations into neural signals sent via the auditory nerve to the auditory cortex in the temporal lobe. **Frequency** is heard as **pitch**; **amplitude** as **loudness**.
H: Pitch and location
P: **Place theory** holds that different frequencies stimulate different places along the basilar membrane (high near the base, low near the tip). **Temporal theory** holds that neurones fire in time with low-frequency sounds. Both contribute. Sounds are **located** using differences in timing between the two ears (interaural time differences) and differences in intensity (interaural level differences), plus filtering by the shape of the outer ear.
X: The McGurk effect
> Participants watch a video of a face saying "ga" while hearing "ba".
> Many report hearing "da", a fusion of what they see and hear (McGurk and MacDonald, 1976).
> Speech perception integrates vision and hearing automatically.
P: Hearing loss is common. **Conductive** loss involves the outer or middle ear and can often be treated; **sensorineural** loss involves hair cells or the auditory nerve, often from age or noise exposure. Cochlear implants stimulate the auditory nerve directly and can restore useful hearing to some deaf people.
K: Hearing transduces vibrations in the cochlea; pitch depends on place and timing, location on differences between the ears, and speech perception integrates vision.
!: Thinking the ear "hears". The cochlea transduces sound; the brain constructs auditory experience.
EV: established | Visual information about lip movements can change which speech sound is heard (McGurk effect).
EV: contested | The relative contributions of place and temporal coding at different frequencies are still researched.
T: Cochlea | The fluid-filled inner-ear structure where sound is transduced
T: Place theory | The theory that pitch depends on where the basilar membrane vibrates most
T: Interaural time difference | The difference in arrival time of a sound at the two ears, used to locate it
SUM: The cochlea transduces sound; pitch and loudness follow frequency and amplitude.
SUM: Location uses differences between the ears; speech perception integrates sight and sound.
SRC: McGurk H. and MacDonald J., "Hearing lips and seeing voices", Nature 264:746–748 | primary | 1976 | https://doi.org/10.1038/264746a0
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 5.4 "Hearing" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/5-4-hearing
Q: Where is sound transduced? | In the cochlea, by hair cells on the basilar membrane.
Q: How do we locate a sound to the left or right? | By differences in arrival time and intensity between the two ears.
M1#psychology-u03-07-q1@1: The perceived pitch of a sound mainly corresponds to its… | Frequency | Amplitude | Duration | Location | Frequency is heard as pitch; amplitude as loudness.
M2#psychology-u03-07-q2@2: A person hears "da" when watching lips say "ga" while the audio says "ba". This shows… | Audiovisual integration | Hearing loss | Place theory failure | Sensory adaptation | The McGurk effect shows vision changes what is heard.
TF2#psychology-u03-07-q3@2: High-frequency sounds stimulate the basilar membrane most near its base. | true | Place theory maps high frequencies near the base and low frequencies near the tip.
M3#psychology-u03-07-q4@3: Why is it harder to tell whether a sound is in front or behind than left or right? | Interaural cues are similar | The ears can't detect timing | Only vision locates sounds | Sounds behind are always quieter | Similar interaural cues create front–back confusion, resolved partly by outer-ear filtering and head movement.
SA2#psychology-u03-07-q5@2,3: Explain how the ear and brain perceive speech in a noisy café. | Cochlear transduction of frequencies; place and temporal coding of pitch; locating the speaker with interaural differences; selective attention to one voice; lip-reading and the McGurk effect show vision helps; top-down knowledge fills gaps. | Transduction ; Pitch coding ; Localisation ; Attention ; Visual and top-down help

## Gestalt principles
LV: Introductory · Foundation
S: Gestalt psychologists showed that we perceive organised wholes, not collections of separate parts. This lesson explains the Gestalt laws of perceptual organisation and their applications.
O: Describe the main Gestalt principles of perceptual organisation
O: Apply Gestalt principles to design and everyday perception
O: Evaluate the Gestalt approach to perception
PRE: Sensation and perception
H: The whole is different from the sum of its parts
P: The Gestalt school, founded in Germany by Wertheimer, Köhler and Koffka in the 1910s, argued that perception organises input into meaningful wholes. Wertheimer's demonstrations of apparent motion (flashing lights seen as one moving light) showed that experience can't be explained by adding up sensations.
H: Laws of organisation
- **Figure–ground**: we separate objects (figure) from background.
- **Proximity**: items close together are grouped.
- **Similarity**: similar items are grouped.
- **Continuity**: we follow smooth, continuous lines.
- **Closure**: we fill gaps to see complete shapes.
- **Common fate**: items moving together are grouped.
- **Prägnanz** (good form): we perceive the simplest, most regular organisation.
X: Gestalt principles in interface design
> A website groups related buttons close together (proximity) and gives them the same colour (similarity).
> A logo with gaps is still seen as a complete shape (closure).
> Designers use these principles so users perceive structure without effort.
K: Gestalt principles describe how perception automatically organises input into coherent wholes.
H: Evaluation
P: Strengths: the principles are robust and widely applied in design, art and data visualisation. Weaknesses: they describe rather than explain how grouping happens, and the original "field" theories of brain activity were not supported. Modern research has linked Gestalt grouping to neural processes and to natural image statistics (Wagemans et al., 2012).
!: Treating Gestalt laws as fixed rules. They are tendencies that can compete, and context and experience influence which wins.
EV: established | Gestalt grouping principles such as proximity and similarity reliably influence perception.
EV: contested | Whether Gestalt grouping is innate or learned from regularities in the environment is debated.
T: Figure–ground | Separating an object from its background
T: Closure | Perceiving incomplete figures as complete
T: Prägnanz | The tendency to perceive the simplest, most regular organisation
SUM: Gestalt psychology showed perception organises input into wholes.
SUM: Laws such as proximity, similarity and closure are widely applied, though they describe more than explain.
SRC: Wagemans J. et al., "A century of Gestalt psychology in visual perception: I. Perceptual grouping and figure–ground organization", Psychological Bulletin 138(6):1172–1217 | primary | 2012 | https://doi.org/10.1037/a0029333
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 5.6 "Gestalt principles of perception" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/5-6-gestalt-principles-of-perception
Q: What is the Gestalt principle of proximity? | Items close together are perceived as a group.
Q: What is closure? | Perceiving incomplete figures as complete by filling in gaps.
M1#psychology-u03-08-q1@1: Seeing a circle made of dashes as a complete circle illustrates… | Closure | Proximity | Common fate | Figure–ground | We fill the gaps to perceive a complete, closed shape.
M2#psychology-u03-08-q2@2: A flock of birds flying in the same direction is seen as one group. Which principle is this? | Common fate | Similarity | Closure | Continuity | Elements moving in the same direction are grouped together.
MATCH1#psychology-u03-08-q3@1: Match each example to the Gestalt principle. | Dots in pairs seen as pairs = Proximity ; Red dots grouped among blue = Similarity ; A vase or two faces = Figure–ground ; A gapped triangle seen as whole = Closure | Each principle describes a grouping tendency.
M3#psychology-u03-08-q4@3: What is the main criticism of the Gestalt approach? | It describes grouping more than it explains it | It denies perception organises input | It relies on reaction times only | It applies only to hearing | Gestalt laws are descriptive; mechanisms needed later research.
SA2#psychology-u03-08-q5@2,3: Apply three Gestalt principles to explain how a data chart can be made easier to read. | Proximity: place related bars together; similarity: use consistent colours for the same category; figure–ground: strong contrast between data and background; continuity: line charts guide the eye along trends; closure lets simple shapes be recognised. | Principle one ; Principle two ; Principle three ; Application to charts

## Pattern recognition
LV: Intermediate · Application
S: Pattern recognition is identifying objects, letters, words and faces from sensory input. This lesson compares template, feature and structural theories and explains why face recognition may be special.
O: Describe template, feature-analysis and recognition-by-components theories
O: Explain evidence for feature detection and for holistic face processing
O: Evaluate theories of pattern recognition
PRE: Visual perception
H: Theories
- **Template matching**: compare input with stored templates. Simple, but can't cope with the endless variation of real objects (different fonts, angles, sizes).
- **Feature analysis**: identify basic features (lines, curves, angles) and combine them. Supported by feature-detecting neurones (Hubel and Wiesel) and by visual search, where letters sharing features take longer to tell apart.
- **Recognition-by-components** (Biederman, 1987): objects are recognised from a small set of basic 3D shapes ("geons") and their arrangement, which stay recognisable from many viewpoints.
H: Faces
P: Faces seem to be processed **holistically**, as wholes rather than features. Faces are much harder to recognise upside down (the face inversion effect). Bruce and Young (1986) proposed a model in which face recognition units connect to person identity information and names, explaining why we can know a face is familiar without retrieving a name. **Prosopagnosia** (face blindness) can occur after damage to the fusiform gyrus while other object recognition is spared.
IX: visual-search
X: Context in recognition
> A smudged letter between "T" and "E" is read as "H" in "THE".
> The same smudge is read as "A" in "CAT".
> Top-down context interacts with feature analysis.
P: Computer vision systems now recognise objects and faces using deep neural networks with layers of feature detectors, loosely inspired by the visual cortex. They can match human accuracy on some tasks but make errors humans don't, such as being fooled by small changes to an image.
K: Pattern recognition combines feature analysis, structural descriptions and context; face recognition appears to rely on holistic processing.
!: Assuming one theory explains all recognition. Letters, objects and faces may rely on different processes.
EV: established | Faces are recognised much less accurately when inverted (face inversion effect).
EV: contested | Whether face processing is unique to faces or reflects expertise with any highly familiar category is debated.
T: Feature analysis | Recognising patterns by detecting and combining basic features
T: Geons | Biederman's basic 3D shapes from which objects are recognised
T: Prosopagnosia | Impaired face recognition, often after brain damage
SUM: Template, feature and component theories explain different aspects of recognition.
SUM: Faces are processed holistically; context interacts with features.
SRC: Biederman I., "Recognition-by-components: a theory of human image understanding", Psychological Review 94(2):115–147 | primary | 1987 | https://doi.org/10.1037/0033-295X.94.2.115
SRC: Bruce V. and Young A., "Understanding face recognition", British Journal of Psychology 77(3):305–327 | primary | 1986 | https://doi.org/10.1111/j.2044-8295.1986.tb02199.x
Q: What is the main problem with template theory? | It can't cope with the variety of real objects, such as different fonts, sizes and angles.
Q: What is the face inversion effect? | Faces are much harder to recognise upside down, suggesting holistic processing.
M1#psychology-u03-09-q1@1: Biederman's basic 3D shapes are called… | Geons | Templates | Features | Pixels | Recognition-by-components builds objects from geons and their arrangement.
M2#psychology-u03-09-q2@2: A person can recognise cars and chairs but not familiar faces after a stroke. This is… | Prosopagnosia | Inattentional blindness | Aphasia | Amnesia | Selective face recognition impairment is prosopagnosia.
TF2#psychology-u03-09-q3@3: Template theory easily explains how we recognise letters in thousands of different handwriting styles. | false | The variation in handwriting is the main problem for template theory.
M3#psychology-u03-09-q4@3: Why does the face inversion effect suggest faces are processed holistically? | Inversion disrupts configuration | Faces have no features | Inverted faces are always blurred | Objects are recognised holistically too | Large inversion costs suggest reliance on whole-face configuration.
SA3#psychology-u03-09-q5@3: Evaluate theories of pattern recognition. | Template: simple but inflexible. Feature analysis: supported by feature detectors and search data, but ignores relations between features and context. Recognition-by-components: viewpoint-invariant, but less good at fine distinctions. Faces: holistic processing, Bruce and Young, prosopagnosia; expertise debate. Context effects show top-down influence. | Template ; Feature ; RBC ; Faces ; Context

## Sensory memory
LV: Introductory · Foundation
S: Sensory memory holds a brief, detailed copy of what the senses have just registered. This lesson explains iconic and echoic memory and Sperling's partial-report experiments.
O: Describe the capacity, duration and coding of sensory memory
O: Explain Sperling's whole-report and partial-report findings
O: Evaluate the role of sensory memory in the multi-store model
PRE: The information-processing approach
H: A brief sensory record
P: In Atkinson and Shiffrin's (1968) multi-store model, information first enters **sensory registers**, one for each sense. Visual sensory memory is **iconic memory**; auditory sensory memory is **echoic memory**. These stores hold large amounts of raw, unprocessed information in its sensory form (modality-specific coding), but only very briefly.
P: Iconic memory lasts around a quarter to half a second; echoic memory lasts longer, around 2 to 4 seconds, which helps us make sense of speech, where the meaning of a sound depends on what follows. Only information that receives **attention** passes on to short-term memory; the rest decays.
H: Sperling's experiments
X: Whole report versus partial report
> Sperling (1960) flashed a grid of 12 letters (three rows of four) for 50 milliseconds.
> In **whole report**, participants recalled about 4 letters, suggesting little was stored.
> In **partial report**, a tone after the flash signalled which row to report. Participants recalled about 3 of the 4 letters in any cued row, implying around 9 of 12 letters were briefly available.
> When the tone was delayed by about 1 second, partial-report performance fell to whole-report levels: the icon had faded.
P: The partial-report advantage shows that sensory memory holds much more than we can report, but that it fades before most of it can be read out.
IX: memory-models
K: Sensory memory briefly holds a large, modality-specific copy of input; attention selects what passes to short-term memory.
!: Assuming sensory memory is the same as short-term memory. It is much briefer, larger and unprocessed.
EV: established | Partial report shows more information is briefly available than can be reported in whole report (Sperling, 1960).
EV: contested | Whether iconic memory is a separate store or a lingering trace of visual processing is debated.
T: Iconic memory | Brief visual sensory memory
T: Echoic memory | Brief auditory sensory memory, lasting a few seconds
T: Partial report | Reporting only a cued part of a briefly shown display
SUM: Sensory registers hold large, raw copies of input for a fraction of a second (iconic) to a few seconds (echoic).
SUM: Sperling's partial-report technique showed far more is briefly stored than can be reported.
SRC: Sperling G., "The information available in brief visual presentations", Psychological Monographs 74(11):1–29 | primary | 1960 | https://doi.org/10.1037/h0093759
SRC: Atkinson R. C. and Shiffrin R. M., "Human memory: a proposed system and its control processes", in Spence K. W. and Spence J. T. (eds), The Psychology of Learning and Motivation 2:89–195 | primary | 1968 | https://doi.org/10.1016/S0079-7421(08)60422-3
Q: What are iconic and echoic memory? | Brief visual and auditory sensory memory stores.
Q: What did partial report show? | Far more information is briefly stored in sensory memory than whole report suggests.
M1#psychology-u03-10-q1@1: Roughly how long does iconic memory last? | Under a second | About 30 seconds | Several minutes | A lifetime | The visual icon fades within about half a second.
M2#psychology-u03-10-q2@2: In Sperling's partial-report condition, participants recalled about 3 letters from any cued row of 4. What did this imply? | About 9 of 12 letters were available | Only 3 letters were stored | Rows were not seen | Tones improve eyesight | Recall from any cued row implies most of the display was briefly held.
TF2#psychology-u03-10-q3@2: Delaying the cue by about a second removed the partial-report advantage. | true | The icon had faded, so performance fell to whole-report levels.
M3#psychology-u03-10-q4@3: Why is echoic memory's longer duration useful? | Speech unfolds over time | Sounds are larger than images | Hearing has no attention | Echoes are louder | Holding sounds for a few seconds lets later sounds clarify earlier ones.
SA2#psychology-u03-10-q5@2,3: Explain Sperling's research on sensory memory and evaluate what it shows. | Procedure: 12 letters, 50 ms; whole report about 4; partial report about 3 per row, implying about 9 available; delayed cue removes advantage. Shows large capacity, rapid decay. Evaluation: tightly controlled; artificial stimuli; debate over whether the icon is a store. | Procedure ; Whole report ; Partial report ; Conclusion ; Evaluation

## Short-term memory
LV: Introductory · Foundation
S: Short-term memory holds a small amount of information for a short time unless it is rehearsed. This lesson explains its capacity, duration and coding, and the evidence behind each.
O: Describe the capacity, duration and coding of short-term memory
O: Explain the studies of Miller, Peterson and Peterson, and Baddeley on short-term memory
O: Evaluate the evidence for a separate short-term store
PRE: Sensory memory
H: Capacity
P: Miller (1956) argued that short-term memory holds about **seven plus or minus two** items, but that the items can be **chunks**: meaningful groups. "BBCFBIUSA" is nine letters but three chunks for someone who recognises the acronyms. Later work suggests the true limit is nearer **four chunks** when rehearsal and chunking are controlled (Cowan, 2001).
IX: digit-span
H: Duration and coding
P: Peterson and Peterson (1959) gave participants trigrams of consonants (such as "KTX") and prevented rehearsal by having them count backwards in threes. Recall fell sharply, to around 10% after 18 seconds, suggesting short-term memory lasts under 20 seconds without rehearsal.
P: Baddeley (1966) found that lists of words that **sound alike** were harder to recall immediately than lists of dissimilar words, while words with **similar meanings** caused more trouble after a delay. This suggests short-term memory is mainly **acoustically** coded and long-term memory **semantically** coded.
X: The serial position curve
> Participants hear a list of 20 words and recall them in any order.
> Recall is best for the first words (primacy effect) and the last words (recency effect).
> A 30-second distraction task before recall removes the recency effect but leaves primacy, suggesting recency reflects short-term memory and primacy long-term memory (Glanzer and Cunitz, 1966).
IX: serial-position
P: **Investigate with the lab.** Step through the multi-store model, then the working memory model, and compare what each says about short-term memory.
IX: memory-models
K: Short-term memory has limited capacity (a few chunks), brief duration without rehearsal, and mainly acoustic coding.
!: Treating "seven items" as fixed. Chunking, item type and rehearsal all change the apparent capacity.
EV: established | Without rehearsal, recall of short items declines steeply over about 20 seconds.
EV: contested | Whether forgetting in the Peterson task reflects decay or interference from earlier items is debated.
T: Chunking | Grouping items into meaningful units to increase capacity
T: Acoustic coding | Storing information by its sound
T: Recency effect | Better recall of the last items in a list
SUM: Short-term memory holds a few chunks for under about 20 seconds without rehearsal.
SUM: It is mainly acoustically coded; serial position effects support a short-term/long-term distinction.
SRC: Miller G. A., "The magical number seven, plus or minus two: some limits on our capacity for processing information", Psychological Review 63(2):81–97 | primary | 1956 | https://doi.org/10.1037/h0043158
SRC: Peterson L. R. and Peterson M. J., "Short-term retention of individual verbal items", Journal of Experimental Psychology 58(3):193–198 | primary | 1959 | https://doi.org/10.1037/h0049234
SRC: Cowan N., "The magical number 4 in short-term memory: a reconsideration of mental storage capacity", Behavioral and Brain Sciences 24(1):87–114 | primary | 2001 | https://doi.org/10.1017/S0140525X01003922
Q: What is chunking? | Grouping items into meaningful units so more information fits in short-term memory.
Q: How is short-term memory mainly coded? | Acoustically, by sound.
M1#psychology-u03-11-q1@1: Miller's estimate of short-term memory capacity was… | Seven plus or minus two | Two plus or minus one | Twenty items | Unlimited | Miller's 1956 paper proposed about seven items or chunks.
M2#psychology-u03-11-q2@2: In Peterson and Peterson's study, why did participants count backwards in threes? | To prevent rehearsal | To test arithmetic | To increase attention | To build chunks | Counting blocked rehearsal so duration could be measured.
NUM2#psychology-u03-11-q3@2: Peterson and Peterson found recall of about 10% after how many seconds? | 18 | 0 | seconds | Recall fell steeply and was about 10% at the 18-second interval.
TF2#psychology-u03-11-q4@3: A distraction task before recall removes the primacy effect but leaves recency. | false | Distraction removes recency (short-term) and leaves primacy (long-term).
M3#psychology-u03-11-q5@3: Which is a limitation of the Peterson and Peterson study? | Consonant trigrams are unlike everyday material | It used too many participants | It measured long-term memory | It had no control of rehearsal | Artificial stimuli limit ecological validity.
SA3#psychology-u03-11-q6@3: Evaluate research into the capacity, duration and coding of short-term memory. | Capacity: Miller's 7±2 and chunking; Cowan suggests about 4. Duration: Peterson and Peterson; decay versus interference debate. Coding: Baddeley's acoustic/semantic findings. Strengths: controlled experiments. Limitations: artificial material, small samples, lab setting. | Capacity ; Duration ; Coding ; Strength ; Limitation
M2#psychology-u03-11-q7@1: How long does information last in short-term memory without rehearsal? | About 18 to 30 seconds | About 1 second | About 1 hour | Indefinitely | Peterson and Peterson found recall dropped sharply after about 18 seconds.

## Working memory
LV: Intermediate · Application
S: Working memory is the system that holds and manipulates information while we think. This lesson explains Baddeley and Hitch's working memory model, its components and the evidence for it.
O: Describe the components of the working memory model
O: Explain dual-task and neuropsychological evidence for separate components
O: Evaluate the working memory model against the multi-store model
PRE: Short-term memory
H: Beyond a single short-term store
P: Baddeley and Hitch (1974) argued that short-term memory isn't a single passive store but an active **working memory** with several components:
- **Central executive**: directs attention and coordinates the other parts; has limited capacity and no storage of its own.
- **Phonological loop**: holds speech-based information. It has a **phonological store** (the "inner ear") and an **articulatory control process** (the "inner voice") that rehearses.
- **Visuospatial sketchpad**: holds visual and spatial information (the "inner eye").
- **Episodic buffer** (added by Baddeley, 2000): a limited-capacity store that combines information from the other parts and long-term memory into integrated episodes.
H: Evidence
P: **Dual-task studies** show two verbal tasks interfere with each other more than a verbal and a visual task do, suggesting separate stores. The **word length effect** shows people remember more short words than long ones, because the loop holds about as much as can be said in roughly two seconds. **Articulatory suppression** (repeating "the the the") removes the word length effect by blocking rehearsal.
X: Neuropsychological evidence
> Patient KF had brain damage that impaired verbal short-term memory for heard material (Shallice and Warrington, 1970).
> His visual short-term memory and long-term memory were relatively intact.
> This suggests separate short-term components, which the single store in the multi-store model can't explain.
IX: memory-models
P: **Investigate with the lab.** Measure your digit span, then try chunking the digits into groups and measure it again.
IX: digit-span
K: Working memory is a multi-component system for holding and manipulating information, supported by dual-task and neuropsychological evidence.
!: Thinking the central executive is well understood. It is the least specified component of the model.
EV: established | Similar tasks interfere more than dissimilar ones, consistent with separate verbal and visuospatial stores.
EV: contested | How the central executive works, and whether it is one system or several functions, remains unclear.
T: Central executive | The component that directs attention and coordinates working memory
T: Phonological loop | The component that holds and rehearses speech-based information
T: Word length effect | Better recall of short words than long words
SUM: The model has a central executive, phonological loop, visuospatial sketchpad and episodic buffer.
SUM: Dual-task studies and patients such as KF support separate components; the executive is vague.
SRC: Baddeley A. D. and Hitch G., "Working memory", in Bower G. H. (ed.), The Psychology of Learning and Motivation 8:47–89 | primary | 1974 | https://doi.org/10.1016/S0079-7421(08)60452-1
SRC: Baddeley A. D., "The episodic buffer: a new component of working memory?", Trends in Cognitive Sciences 4(11):417–423 | primary | 2000 | https://doi.org/10.1016/S1364-6613(00)01538-2
SRC: Shallice T. and Warrington E. K., "Independent functioning of verbal memory stores: a neuropsychological study", Quarterly Journal of Experimental Psychology 22(2):261–273 | primary | 1970 | https://doi.org/10.1080/00335557043000203
Q: Name the four components of working memory. | Central executive, phonological loop, visuospatial sketchpad and episodic buffer.
Q: What is articulatory suppression? | Repeating a sound aloud to block rehearsal in the phonological loop.
M1#psychology-u03-12-q1@1: Which component of working memory holds visual and spatial information? | Visuospatial sketchpad | Phonological loop | Episodic buffer | Central executive | The visuospatial sketchpad, the "inner eye", stores visual and spatial material.
M2#psychology-u03-12-q2@2: A participant can track a moving dot while repeating digits, but struggles to repeat digits while reading. Why? | Reading and digits both use the phonological loop | Dots use the episodic buffer | The executive has unlimited capacity | Digits are visual | Two verbal tasks compete for the same component.
TF2#psychology-u03-12-q3@2: Articulatory suppression removes the word length effect. | true | Blocking rehearsal stops the advantage for short words.
M3#psychology-u03-12-q4@3: How does patient KF challenge the multi-store model? | Short-term memory looks fractionated | He had no long-term memory | He had perfect recall | He recalled only long words | Selective verbal impairment implies separate components.
SA3#psychology-u03-12-q5@3: Evaluate the working memory model. | Strengths: explains dual-task results, word length effect, KF; useful for education (e.g. dyslexia, ADHD research). Weaknesses: central executive is vague; case studies of brain damage have limits; episodic buffer added later; compare with multi-store's single store. | Components ; Dual-task evidence ; Neuropsychology ; Executive criticism ; Comparison
M2#psychology-u03-12-q6@1: How does chunking increase memory span? | It groups items into meaningful units, so more items fit | It makes each digit shorter to say | It moves items straight to long-term memory | It doubles the capacity of the phonological loop | Short-term memory holds a limited number of chunks, not individual items.

## Long-term memory: episodic, semantic and procedural
LV: Intermediate · Application
S: Long-term memory isn't one store but several. This lesson explains episodic, semantic and procedural memory, explicit and implicit memory, and the evidence from amnesia.
O: Describe episodic, semantic and procedural memory
O: Explain the explicit–implicit distinction using evidence from amnesia
O: Evaluate the evidence for separate long-term memory systems
PRE: Short-term memory
H: Types of long-term memory
P: Tulving (1972) distinguished **episodic memory** (personal experiences, located in time and place: your last birthday) from **semantic memory** (facts and knowledge: Paris is the capital of France). Both are **explicit** (declarative): they can be consciously recalled and described.
P: **Procedural memory** stores skills and habits: riding a bike, typing. It is **implicit** (non-declarative): shown in performance rather than conscious recollection, and hard to put into words. Other implicit memory includes **priming**, where earlier exposure speeds later processing without awareness.
H: Evidence from amnesia
X: Patient HM
> In 1953, HM (Henry Molaison) had parts of both medial temporal lobes, including much of the hippocampus, removed to treat epilepsy (Scoville and Milner, 1957).
> Afterwards he couldn't form new episodic or semantic memories, though his short-term memory was intact.
> Yet he improved at mirror drawing over several days without remembering having practised, showing intact procedural learning.
P: Clive Wearing, a musician whose hippocampus was damaged by a viral infection in 1985, lost much episodic memory but could still play the piano and conduct, again suggesting procedural memory depends on different brain systems. Brain imaging links episodic memory to the hippocampus and prefrontal cortex, semantic memory to the temporal lobes, and procedural memory to the cerebellum and basal ganglia.
P: **Investigate with the lab.** Learn the 15-word list, recall it immediately, and plot your serial position curve.
IX: serial-position
K: Long-term memory includes explicit episodic and semantic memory and implicit procedural memory, supported by amnesia and brain-imaging evidence.
!: Assuming amnesia wipes out all memory. Patients typically keep skills and much older knowledge.
EV: established | Amnesic patients can learn new motor skills despite being unable to recall the learning episodes.
EV: contested | How separate episodic and semantic memory are is debated; they interact and may lie on a continuum.
T: Episodic memory | Memory for personal experiences in time and place
T: Semantic memory | Memory for facts and general knowledge
T: Procedural memory | Implicit memory for skills and habits
SUM: Episodic and semantic memory are explicit; procedural memory is implicit.
SUM: Cases such as HM and Clive Wearing, and brain imaging, support separate systems.
SRC: Tulving E., "Episodic and semantic memory", in Tulving E. and Donaldson W. (eds), Organization of Memory, Academic Press, pp. 381–403 | primary | 1972
SRC: Scoville W. B. and Milner B., "Loss of recent memory after bilateral hippocampal lesions", Journal of Neurology, Neurosurgery and Psychiatry 20(1):11–21 | primary | 1957 | https://doi.org/10.1136/jnnp.20.1.11
Q: What is the difference between episodic and semantic memory? | Episodic is personal experiences in time and place; semantic is facts and general knowledge.
Q: What did HM's mirror drawing show? | He learned a new skill without remembering practising, showing procedural memory was intact.
M1#psychology-u03-13-q1@1: Knowing how to ride a bicycle is an example of… | Procedural memory | Episodic memory | Semantic memory | Sensory memory | Motor skills such as cycling are stored in implicit procedural memory.
M2#psychology-u03-13-q2@2: A student recalls their first day at university, including the weather and who they met. Which memory type is this? | Episodic | Procedural | Semantic | Iconic | A personal event located in time and place is episodic.
MATCH1#psychology-u03-13-q3@1: Match each memory to its type. | Your tenth birthday party = Episodic ; The boiling point of water = Semantic ; Touch-typing = Procedural ; Reading a primed word faster = Priming | Each example belongs to a different long-term system.
TF2#psychology-u03-13-q4@3: Clive Wearing lost the ability to play the piano. | false | His musical skill (procedural) was largely preserved.
M3#psychology-u03-13-q5@3: What is a limitation of using case studies like HM to argue for separate memory systems? | Damage is rarely confined to one area | They used too many participants | HM had no memory problems | The research was unethical | Brain damage is often widespread, so mapping functions is uncertain.
SA3#psychology-u03-13-q6@2,3: Evaluate the view that there are different types of long-term memory. | Episodic, semantic, procedural; HM and Clive Wearing dissociations; imaging links types to areas; strengths: practical uses (rehabilitation). Limitations: case studies, unclear damage, episodic and semantic interact; alternative continuum views. | Types ; Case evidence ; Imaging ; Limitations ; Judgement
M2#psychology-u03-13-q7@1: Which part of the serial position curve reflects long-term memory? | The primacy effect for early words | The recency effect for the last words | The dip in the middle of the list | None of it | Early words get more rehearsal and reach long-term memory.

## Encoding, storage and retrieval
LV: Intermediate · Application
S: Remembering involves encoding information, storing it and retrieving it. This lesson explains levels of processing, the testing effect and spacing, and how they inform effective study.
O: Describe encoding, storage and retrieval
O: Explain levels of processing and encoding specificity
O: Apply memory research to effective study strategies
PRE: Long-term memory: episodic, semantic and procedural
H: Three stages
P: **Encoding** turns experience into a memory representation. **Storage** keeps it over time; memories are thought to be **consolidated** over hours and days, partly during sleep. **Retrieval** brings stored information back into awareness, through **recall** (producing it) or **recognition** (identifying it among alternatives).
H: How deep is the processing?
P: Craik and Lockhart (1972) argued that memory depends on the **depth of processing**. Processing a word's appearance (is it in capitals?) is shallow; its sound (does it rhyme with "cat"?) is intermediate; its meaning (does it fit the sentence "The ___ ran away"?) is deep. Craik and Tulving (1975) found deep, semantic processing produced much better recall, even though participants didn't know they would be tested.
P: **Elaboration** (linking new information to what you already know) and **self-reference** (relating it to yourself) also improve memory. A criticism is that "depth" is hard to define independently of the memory it is meant to explain.
X: Evidence-based study techniques
> Dunlosky et al. (2013) reviewed ten study techniques.
> **Practice testing** (retrieving information, for example with flashcards) and **distributed practice** (spacing study over time) had high utility.
> Highlighting and rereading had low utility, though they are among the most popular.
P: **Investigate with the lab.** Follow information through encoding, storage and retrieval in the multi-store model.
IX: memory-models
K: Memory depends on how information is encoded and retrieved; deep processing, testing and spacing produce durable learning.
!: Treating familiarity from rereading as learning. Feeling fluent isn't the same as being able to recall.
EV: established | Retrieval practice and spaced study improve long-term retention across many materials and ages.
EV: contested | Whether "depth" of processing can be measured independently of memory performance is debated.
T: Consolidation | The stabilisation of memories over time after encoding
T: Levels of processing | The idea that deeper, meaningful processing produces better memory
T: Testing effect | Better retention after retrieving information than after restudying it
SUM: Memory involves encoding, storage (consolidation) and retrieval through recall or recognition.
SUM: Deep processing, practice testing and spacing improve memory; rereading and highlighting help little.
SRC: Craik F. I. M. and Lockhart R. S., "Levels of processing: a framework for memory research", Journal of Verbal Learning and Verbal Behavior 11(6):671–684 | primary | 1972 | https://doi.org/10.1016/S0022-5371(72)80001-X
SRC: Dunlosky J. et al., "Improving students' learning with effective learning techniques", Psychological Science in the Public Interest 14(1):4–58 | primary | 2013 | https://doi.org/10.1177/1529100612453266
SRC: Craik F. I. M. and Tulving E., "Depth of processing and the retention of words in episodic memory", Journal of Experimental Psychology: General 104(3):268–294 | primary | 1975 | https://doi.org/10.1037/0096-3445.104.3.268
Q: What are the three stages of memory? | Encoding, storage and retrieval.
Q: Which two study techniques did Dunlosky et al. rate most highly? | Practice testing and distributed (spaced) practice.
M1#psychology-u03-14-q1@1: Answering "Does this word fit the sentence?" involves which level of processing? | Semantic (deep) | Structural (shallow) | Phonemic | Sensory | Judging whether a word fits a sentence requires deep, semantic processing.
M2#psychology-u03-14-q2@2: A student rereads notes three times the night before an exam. Which change would most improve retention? | Spaced self-testing over weeks | Highlighting in more colours | Rereading a fourth time | Studying only at night | Retrieval practice and spacing outperform rereading.
SEQ1#psychology-u03-14-q3@1: Put the stages of memory in order. | Encoding ; Storage ; Retrieval | Information is encoded, stored and later retrieved.
TF2#psychology-u03-14-q4@3: Highlighting was rated a high-utility study technique by Dunlosky et al. | false | Highlighting and rereading were rated low utility.
M3#psychology-u03-14-q5@3: What is the main criticism of levels-of-processing theory? | Depth is hard to measure independently | It ignores meaning entirely | It denies long-term memory | It was never tested | Defining depth by memory risks circular reasoning.
SA2#psychology-u03-14-q6@2,3: Apply memory research to design a revision plan for a psychology exam. | Spaced sessions over weeks (distributed practice); flashcards and past questions (testing effect); elaborate and self-reference (deep processing); sleep for consolidation; interleave topics; avoid relying on rereading and highlighting. | Spacing ; Testing ; Deep processing ; Sleep ; Avoid low-utility
M2#psychology-u03-14-q7@1: In the multi-store model, how does information move from short-term to long-term memory? | Through rehearsal | Through forgetting | Through sensory input alone | Through displacement | Maintenance rehearsal transfers information to long-term memory.

## Forgetting
LV: Introductory · Foundation
S: Forgetting is the loss of the ability to recall or recognise information. This lesson explains Ebbinghaus's forgetting curve and the main explanations: decay, interference, retrieval failure and motivated forgetting.
O: Describe the forgetting curve and the main theories of forgetting
O: Explain how savings and relearning reveal memory that seems lost
O: Evaluate trace decay as an explanation of forgetting
PRE: Encoding, storage and retrieval
H: The forgetting curve
P: Ebbinghaus (1885) taught himself lists of nonsense syllables (such as "DAX", "BOK") and measured how much effort it took to relearn them after various delays. He found forgetting was rapid at first and then levelled off: the **forgetting curve**. He measured **savings**: relearning a list took less time than learning it originally, even when he could no longer recall it, showing some memory remained.
X: Reading the curve
> Ebbinghaus's savings fell steeply within the first hour or so and then declined slowly over days.
> A replication by Murre and Dros (2015) found a similar curve.
> The practical lesson: early review, soon after learning, prevents much of the loss.
H: Theories of forgetting
- **Trace decay**: memory traces fade with time if not used. Hard to test, because time is always filled with other events.
- **Interference**: other memories disrupt recall (next lesson).
- **Retrieval failure**: the memory is stored but can't be accessed without the right cues.
- **Motivated forgetting**: distressing memories are pushed out of awareness, as Freud proposed with repression; evidence for repression is disputed.
P: Jenkins and Dallenbach (1924) found participants who slept after learning remembered more than those who stayed awake, suggesting events in waking time, not time itself, cause forgetting, which challenges pure decay theory.
P: **Investigate with the lab.** Recall the list after a distractor task and see which part of your curve disappears.
IX: serial-position
K: Forgetting is rapid at first and then slows; decay, interference, retrieval failure and motivated forgetting are its main explanations.
!: Assuming forgotten means gone. Savings and cued recall show much forgotten information is still stored.
EV: established | Forgetting follows a curve that is steep at first and then levels off (Ebbinghaus; Murre and Dros, 2015).
EV: contested | Whether memory traces decay passively with time, independent of interference, is debated.
T: Forgetting curve | The rapid early and slower later decline in retention over time
T: Savings | The reduction in time needed to relearn material compared with learning it originally
T: Trace decay | The idea that memory traces fade with time if not used
SUM: Ebbinghaus showed forgetting is fast at first and then slows, and that savings reveal stored memory.
SUM: Decay, interference, retrieval failure and motivated forgetting explain forgetting; decay is hard to test.
SRC: Ebbinghaus H., Über das Gedächtnis (Memory: A Contribution to Experimental Psychology), Duncker & Humblot | primary | 1885
SRC: Murre J. M. J. and Dros J., "Replication and analysis of Ebbinghaus' forgetting curve", PLoS ONE 10(7):e0120644 | primary | 2015 | https://doi.org/10.1371/journal.pone.0120644
Q: What did Ebbinghaus's savings measure show? | Relearning took less time than original learning, so some memory remained.
Q: Why is trace decay hard to test? | Time always contains other events that might interfere.
M1#psychology-u03-15-q1@1: Ebbinghaus studied his own memory for… | Nonsense syllables | Faces | Childhood events | Song lyrics | Nonsense syllables limited the effect of prior meaning.
M2#psychology-u03-15-q2@2: Participants who sleep after learning remember more than those who stay awake. What does this suggest? | Waking events cause interference | Sleep erases memory | Time alone causes forgetting | Memory improves at night only | Fewer intervening events while asleep means less interference.
TF1#psychology-u03-15-q3@1: According to the forgetting curve, most forgetting happens long after learning. | false | Most forgetting occurs soon after learning.
M3#psychology-u03-15-q4@3: What is a limitation of Ebbinghaus's research? | One participant and meaningless material | It used too many participants | It ignored time | Its results were never replicated | Single-participant data with nonsense syllables limits generalisation.
SA2#psychology-u03-15-q5@2,3: Explain the forgetting curve and evaluate one theory of forgetting. | Ebbinghaus: rapid then slower loss; savings; replication by Murre and Dros. Theory: e.g. trace decay is intuitive but hard to test; Jenkins and Dallenbach favour interference. Or retrieval failure supported by cue studies. | Curve ; Savings ; Theory ; Evidence ; Evaluation
M2#psychology-u03-15-q6@1: What happens to the recency effect after a distractor task? | It disappears | It gets stronger | It moves to the start of the list | It is unaffected | The distractor displaces the last items from short-term memory.

## Interference
LV: Intermediate · Application
S: Interference theory holds that we forget because other memories get in the way. This lesson explains proactive and retroactive interference and the conditions under which interference is strongest.
O: Distinguish proactive from retroactive interference
O: Explain experimental and real-world evidence for interference
O: Evaluate interference theory as an explanation of forgetting
PRE: Forgetting
H: Two directions
P: **Proactive interference** (PI) happens when old learning disrupts new: a teacher who has taught many classes struggles to learn the names of a new class. **Retroactive interference** (RI) happens when new learning disrupts old: after learning a new phone number, you can't remember the old one.
P: Interference is strongest when the two sets of material are **similar**. McGeoch and McDonald (1931) found recall of a list of adjectives was worst when the list learned in between was synonyms of those adjectives, and better when it was unrelated material such as numbers.
X: Interference on the rugby pitch
> Baddeley and Hitch (1977) asked rugby players to recall the teams they had played that season.
> What predicted forgetting was the number of games played since, not the amount of time that had passed.
> Players who had missed games through injury forgot less, supporting interference over decay.
H: Release from proactive interference
P: Wickens (1972) gave participants several trials of words from one category; recall fell over trials as PI built up. When the category switched (from fruit to professions), recall recovered, called **release from PI**. This shows interference depends on similarity in meaning.
K: Interference occurs when similar memories compete, either old disrupting new (proactive) or new disrupting old (retroactive).
!: Mixing up the directions. **Pro**active works forwards from old to new; **retro**active works backwards from new to old.
EV: established | Similar material produces more interference than dissimilar material (McGeoch and McDonald, 1931).
EV: contested | How much everyday forgetting is due to interference rather than retrieval failure is debated; some interference effects shrink when cues are given.
T: Proactive interference | Old learning disrupting recall of new learning
T: Retroactive interference | New learning disrupting recall of old learning
T: Release from PI | Recovery of recall when the category of material changes
SUM: Proactive interference works from old to new; retroactive from new to old.
SUM: Interference is greatest for similar material and is supported by lab and field studies.
SRC: McGeoch J. A. and McDonald W. T., "Meaningful relation and retroactive inhibition", American Journal of Psychology 43(4):579–588 | primary | 1931 | https://doi.org/10.2307/1415159
SRC: Baddeley A. D. and Hitch G., "Recency re-examined", in Dornic S. (ed.), Attention and Performance VI, Erlbaum, pp. 647–667 | primary | 1977
Q: What is proactive interference? | Old learning disrupting the recall of new learning.
Q: What did the rugby study show? | Forgetting depended on the number of games played since, not the time elapsed.
M1#psychology-u03-16-q1@1: Forgetting your old password after learning a new one is… | Retroactive interference | Proactive interference | Trace decay | Motivated forgetting | New learning disrupting old is retroactive.
M2#psychology-u03-16-q2@2: A Spanish learner keeps using French words they learned earlier. Which type of interference is this? | Proactive | Retroactive | Release from PI | Decay | Earlier learning (French) disrupts later learning (Spanish).
TF2#psychology-u03-16-q3@2: Interference is greatest when the competing material is dissimilar. | false | Similar material produces the most interference.
M3#psychology-u03-16-q4@3: Why does the rugby study support interference over decay? | Games played predicted forgetting, not time | Players forgot nothing | Time predicted forgetting | Injured players forgot more | Injured players, with fewer intervening games, forgot less.
SA3#psychology-u03-16-q5@3: Evaluate interference as an explanation of forgetting. | Evidence: McGeoch and McDonald, Baddeley and Hitch rugby study, Wickens's release from PI. Strengths: controlled studies, real-world support. Limitations: lab tasks are artificial, interference effects shrink with cues (Tulving and Psotka, 1971), so retrieval failure may explain more everyday forgetting. | PI and RI ; Lab evidence ; Real-world evidence ; Limitation ; Judgement

## Retrieval failure
LV: Intermediate · Application
S: Retrieval failure means information is stored but can't be accessed without the right cues. This lesson explains encoding specificity, context-dependent and state-dependent memory.
O: Explain retrieval failure and the encoding specificity principle
O: Describe research on context-dependent and state-dependent forgetting
O: Apply retrieval cues to improve remembering
PRE: Forgetting
H: Cues and encoding specificity
P: Tulving's **encoding specificity principle** (Tulving and Thomson, 1973) holds that a cue helps retrieval if it was present when the information was encoded. Information isn't so much lost as unreachable: the **tip-of-the-tongue** state, when you know you know a word but can't produce it, is a familiar example.
H: Context and state
P: **Context-dependent forgetting** occurs when the external environment at recall differs from that at learning. **State-dependent forgetting** occurs when the internal state (mood, alertness, intoxication) differs.
X: The divers' study
> Godden and Baddeley (1975) asked divers to learn word lists on land or underwater, and recall them on land or underwater.
> Recall was about 40% lower when the learning and recall contexts didn't match.
> Matching context provided cues that aided retrieval.
P: Carter and Cassaday (1998) found participants who learned and recalled under the same antihistamine-induced drowsiness, or both while alert, did better than those whose states differed. Effects of context are often smaller in everyday life, where contexts are less distinct, and in recognition tests, which provide their own cues.
K: Forgetting often reflects missing retrieval cues; reinstating the context or state of learning aids recall.
!: Over-applying context effects. They are strongest with very different contexts and weaker for recognition and meaningful material.
EV: established | Recall is better when the learning context is reinstated at retrieval (Godden and Baddeley, 1975).
EV: contested | How large context effects are in everyday settings, such as revising and sitting exams in different rooms, is debated.
T: Encoding specificity | The principle that cues aid retrieval if present at encoding
T: Context-dependent forgetting | Forgetting when the external setting at recall differs from learning
T: State-dependent forgetting | Forgetting when the internal state at recall differs from learning
SUM: Retrieval failure means memories are stored but inaccessible without cues.
SUM: Matching context and state aids recall, though everyday effects are often small.
SRC: Godden D. R. and Baddeley A. D., "Context-dependent memory in two natural environments: on land and underwater", British Journal of Psychology 66(3):325–331 | primary | 1975 | https://doi.org/10.1111/j.2044-8295.1975.tb01468.x
SRC: Tulving E. and Thomson D. M., "Encoding specificity and retrieval processes in episodic memory", Psychological Review 80(5):352–373 | primary | 1973 | https://doi.org/10.1037/h0020071
Q: What is the encoding specificity principle? | A cue aids retrieval if it was present when the information was encoded.
Q: What is state-dependent forgetting? | Forgetting when your internal state at recall differs from that at learning.
M1#psychology-u03-17-q1@1: Godden and Baddeley's participants were… | Divers | Rugby players | Taxi drivers | Pilots | Divers learned and recalled words on land or underwater.
M2#psychology-u03-17-q2@2: A student can't remember a fact in an exam but recalls it walking back into their bedroom. Which explanation fits best? | Context-dependent forgetting | Proactive interference | Trace decay | Sensory adaptation | Returning to the learning context provided cues.
TF2#psychology-u03-17-q3@2: Context effects tend to be larger for recognition than for recall. | false | Recognition supplies its own cues, so context effects are usually smaller.
M3#psychology-u03-17-q4@3: Why might context effects be small when students revise at home and sit exams in a hall? | Home and hall contexts are not very distinct | Exams use no cues | Students have no memories | Context effects are always huge | Everyday contexts differ less than land versus underwater.
SA2#psychology-u03-17-q5@2,3: Apply retrieval-failure research to advise a student preparing for an exam. | Study in varied contexts so recall doesn't depend on one; mentally reinstate the learning context; use self-generated cues; practise recall without notes; consider state (calm, alert); note effects are modest outside strong contrasts. | Encoding specificity ; Context ; State ; Practical advice ; Limitation

## Reconstructive memory and false memories
LV: Intermediate · Evaluation
S: Remembering is an active reconstruction, not a replay. This lesson explains Bartlett's schema theory, the misinformation effect and research on false memories.
O: Explain Bartlett's theory of reconstructive memory and the role of schemas
O: Describe research showing that false memories can be created
O: Evaluate the implications of false memory research for therapy and the courts
PRE: Encoding, storage and retrieval
H: Bartlett's reconstructive memory
P: Bartlett (1932) asked English participants to read and later reproduce "The War of the Ghosts", a Native American folk tale. Over repeated retellings the story became shorter, unfamiliar details were dropped or changed (a canoe became a boat), and it was made more conventional. Bartlett argued we reconstruct memories using **schemas**: mental frameworks of knowledge and expectation.
H: Creating false memories
X: Lost in the shopping mall
> Loftus and Pickrell (1995) gave participants booklets describing four childhood events, three real (from relatives) and one invented: getting lost in a shopping mall.
> After two interviews, about 25% of participants remembered at least part of the false event.
> Suggestion and repeated imagining can create memories of events that never happened.
P: In the **Deese–Roediger–McDermott (DRM) paradigm**, people hear words such as "bed, rest, awake, tired, dream" and often confidently "remember" the unpresented word "sleep" (Roediger and McDermott, 1995). Memory confidence is a poor guide to accuracy.
H: Implications
P: In the 1990s, some therapy techniques (repeated guided imagery, hypnosis) were linked to recovered memories of abuse that were later shown to be false, damaging families. The British Psychological Society advises caution about recovered memories: some may be accurate, and abuse is real and common, but memories that emerge only through suggestive techniques need careful handling and shouldn't be taken as proof on their own.
K: Memory is reconstructive and can be distorted or even created by schemas and suggestion; confidence doesn't guarantee accuracy.
!: Concluding that all recovered memories are false. Research shows false memories can be created, not that true memories never return.
EV: established | Suggestion can lead some people to remember events that never happened.
EV: contested | How often recovered memories of childhood abuse are accurate is debated and varies with how they were recovered.
T: Reconstructive memory | Rebuilding memories from fragments and schemas at recall
T: Schema | A mental framework of knowledge and expectation
T: False memory | A memory of an event that didn't happen, or happened differently
SUM: Bartlett showed memories are reconstructed using schemas.
SUM: Lab studies create false memories; this calls for caution with suggestive techniques in therapy and courts.
SRC: Bartlett F. C., Remembering: A Study in Experimental and Social Psychology, Cambridge University Press | primary | 1932
SRC: Loftus E. F. and Pickrell J. E., "The formation of false memories", Psychiatric Annals 25(12):720–725 | primary | 1995 | https://doi.org/10.3928/0048-5713-19951201-07
SRC: Roediger H. L. and McDermott K. B., "Creating false memories: remembering words not presented in lists", Journal of Experimental Psychology: Learning, Memory, and Cognition 21(4):803–814 | primary | 1995 | https://doi.org/10.1037/0278-7393.21.4.803
SRC: British Psychological Society, Memory and the Law: Recommendations from the Scientific Study of Human Memory | guidance | 2008
Q: What did Bartlett's "War of the Ghosts" study show? | Retellings became shorter and more conventional as people reconstructed the story using schemas.
Q: What is the DRM paradigm? | Hearing related words leads people to falsely remember an unpresented related word.
M1#psychology-u03-18-q1@1: Bartlett explained memory distortions using the concept of… | Schemas | Chunks | Icons | Geons | Schemas shape what is remembered and how.
M2#psychology-u03-18-q2@2: After hearing "bed, rest, tired, dream, snooze", a participant confidently recalls "sleep", which wasn't presented. This shows… | A false memory from associations | Perfect recall | Proactive interference | Trace decay | The DRM effect creates confident false recall.
NUM2#psychology-u03-18-q3@2: In Loftus and Pickrell's study, about what percentage of participants remembered at least part of the false event? | 25 | 2 | % | Around a quarter recalled at least part of being lost in a mall.
TF2#psychology-u03-18-q4@3: Research on false memories proves that all recovered memories of abuse are false. | false | It shows false memories can be created, not that true ones never return.
M3#psychology-u03-18-q5@3: Which is the strongest criticism of Bartlett's original research? | Its procedure was loosely controlled | It relied on the idea of schemas | It used a story rather than word lists | It found far too much distortion | Bartlett gave loose instructions and few controls, so later studies tightened the method.
SA3#psychology-u03-18-q6@3: Evaluate research into reconstructive memory and its implications. | Bartlett: schemas, but informal method; later controlled replications. Loftus and Pickrell: false memories in about 25%, ethical issues, implanted event plausibility. DRM: confidence ≠ accuracy. Implications: caution with suggestive therapy, interviewing and testimony; balance with the reality of abuse. | Bartlett ; False memory studies ; DRM ; Applications ; Balance

## Eyewitness testimony
LV: Intermediate · Application
S: Eyewitness testimony is a witness's account of a crime or event. This lesson explains how leading questions, post-event information and anxiety affect its accuracy, and how the cognitive interview helps.
O: Explain the effects of leading questions and post-event information on eyewitness testimony
O: Evaluate research on anxiety and the weapon focus effect
O: Describe and evaluate the cognitive interview
PRE: Reconstructive memory and false memories
H: Leading questions
X: Loftus and Palmer (1974)
> Participants watched film clips of car crashes and were asked how fast the cars were going when they "smashed", "collided", "bumped", "hit" or "contacted" each other.
> Speed estimates were highest for "smashed" (about 41 mph) and lowest for "contacted" (about 32 mph).
> In a second experiment, a week later, participants given "smashed" were more likely to report seeing broken glass, which wasn't in the film.
P: **Post-event information** can be incorporated into memory, the **misinformation effect**. Co-witnesses who discuss an event can contaminate each other's memories (Gabbert et al., 2003).
H: Anxiety and weapon focus
P: The **weapon focus effect** is that witnesses attend to a weapon and remember the perpetrator's face less well (Johnson and Scott, 1976). Yet Yuille and Cutshall (1986) found witnesses to a real shooting in Canada gave accurate, detailed accounts months later, even when highly stressed. The effects of anxiety may depend on its level and on whether attention is drawn to the weapon.
H: The cognitive interview
P: Fisher and Geiselman developed the **cognitive interview** based on memory research. Witnesses are asked to: **report everything**, however trivial; **mentally reinstate the context**; **recall events in different orders**; and **change perspective** (describe what another person would have seen). A meta-analysis found it increased correct details substantially, with a small rise in errors (Memon, Meissner and Fraser, 2010).
K: Eyewitness memory is reconstructive and influenced by questions, post-event information and arousal; the cognitive interview improves recall.
!: Treating a confident eyewitness as an accurate one. Confidence can be inflated by feedback and repetition.
EV: established | Wording of questions and post-event information can alter eyewitness reports.
EV: contested | Whether high anxiety impairs or enhances eyewitness accuracy is debated and may depend on the situation.
T: Leading question | A question that suggests a particular answer
T: Misinformation effect | Distortion of memory by information encountered after the event
T: Cognitive interview | An interview technique based on memory research to improve witness recall
SUM: Leading questions and post-event information distort eyewitness reports.
SUM: Anxiety's effects are mixed; the cognitive interview increases accurate recall.
SRC: Loftus E. F. and Palmer J. C., "Reconstruction of automobile destruction: an example of the interaction between language and memory", Journal of Verbal Learning and Verbal Behavior 13(5):585–589 | primary | 1974 | https://doi.org/10.1016/S0022-5371(74)80011-3
SRC: Yuille J. C. and Cutshall J. L., "A case study of eyewitness memory of a crime", Journal of Applied Psychology 71(2):291–301 | primary | 1986 | https://doi.org/10.1037/0021-9010.71.2.291
SRC: Memon A., Meissner C. A. and Fraser J., "The cognitive interview: a meta-analytic review and study space analysis of the past 25 years", Psychology, Public Policy, and Law 16(4):340–372 | primary | 2010 | https://doi.org/10.1037/a0020518
Q: What is the misinformation effect? | Memory distortion caused by information encountered after an event.
Q: Name the four techniques of the cognitive interview. | Report everything, reinstate context, change order and change perspective.
M1#psychology-u03-19-q1@1: In Loftus and Palmer's study, which verb produced the highest speed estimates? | Smashed | Contacted | Bumped | Hit | "Smashed" produced estimates of about 41 mph.
M2#psychology-u03-19-q2@2: A witness hears another witness describe a red jacket and later "remembers" it too. This is… | Co-witness contamination | Weapon focus | Context reinstatement | Trace decay | Discussing an event with others can introduce details into memory.
TF2#psychology-u03-19-q3@2: Yuille and Cutshall found real witnesses to a shooting gave accurate accounts despite stress. | true | Their field study found detailed, accurate recall months later.
M3#psychology-u03-19-q4@3: Which is the main limitation of Loftus and Palmer's study? | Films lack real-life emotion | It used real witnesses | It had no control group | It tested children only | Watching a film is less arousing and consequential than a real event.
SA3#psychology-u03-19-q5@2,3: Evaluate research into factors affecting the accuracy of eyewitness testimony. | Leading questions (Loftus and Palmer) and post-event information; strengths: controlled; limitations: artificial, demand characteristics, student samples. Anxiety: weapon focus versus Yuille and Cutshall; mixed. Applications: cognitive interview, police guidelines. | Leading questions ; Post-event information ; Anxiety ; Evaluation ; Application

## Language acquisition
LV: Intermediate · Application
S: Children learn their first language rapidly and in a predictable sequence. This lesson describes the stages of language development and compares learning, nativist and interactionist explanations.
O: Describe the main stages of language acquisition
O: Compare behaviourist, nativist and interactionist theories of language acquisition
O: Evaluate evidence on critical or sensitive periods for language
PRE: The information-processing approach
H: Stages
- **Cooing** (from about 2 months) and **babbling** (about 6 months): repeated syllables such as "bababa".
- **One-word stage** (around 12 months): single words, often naming things.
- **Two-word stage** (around 18–24 months): "telegraphic speech" such as "more milk".
- **Vocabulary spurt** and rapid growth in grammar from about 2 years.
P: Children make **overregularisation** errors such as "goed" and "mouses", applying grammatical rules too widely. These errors are useful evidence: children don't hear adults say "goed", so they must be generating rules, not just copying.
H: Theories
P: **Behaviourist** (Skinner, 1957): language is learned through imitation and reinforcement. It struggles to explain overregularisation and the speed of learning. **Nativist** (Chomsky): humans have an innate capacity for language, a "language acquisition device" with universal grammar, explaining why children learn complex grammar from limited input (the "poverty of the stimulus" argument). **Interactionist** views (Bruner, Tomasello) stress social interaction, joint attention and child-directed speech, alongside general learning abilities.
X: Sensitive periods
> Genie, a girl isolated and neglected until she was found at 13 in 1970, learned many words but never mastered grammar (Curtiss, 1977).
> Her case is consistent with a sensitive period, but her severe deprivation means it can't isolate the effect of age.
> Studies of second-language learners find later starters rarely reach native-like grammar (Johnson and Newport, 1989), supporting a gradual sensitive period rather than a sharp cut-off.
K: Children acquire language in predictable stages; nativist, learning and interactionist theories each explain part of the evidence.
!: Treating nativism and learning as all-or-nothing. Most researchers accept both innate capacities and rich learning from input.
EV: established | Children produce overregularisation errors that they haven't heard from adults.
EV: contested | Whether children have an innate, language-specific universal grammar is strongly debated.
T: Overregularisation | Applying a grammatical rule too widely, as in "goed"
T: Universal grammar | Chomsky's proposed innate set of principles common to all languages
T: Child-directed speech | Simplified, expressive speech adults use with young children
SUM: Language develops from babbling to words, word combinations and grammar.
SUM: Learning, nativist and interactionist theories each explain part; evidence supports a sensitive period.
SRC: Johnson J. S. and Newport E. L., "Critical period effects in second language learning", Cognitive Psychology 21(1):60–99 | primary | 1989 | https://doi.org/10.1016/0010-0285(89)90003-0
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 7.2 "Language" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/7-2-language
Q: What is overregularisation? | Applying a grammar rule too widely, such as saying "goed" or "mouses".
Q: What is the poverty of the stimulus argument? | Children learn complex grammar from limited input, suggesting innate capacities.
M1#psychology-u03-20-q1@1: Who proposed that humans have an innate language acquisition device? | Noam Chomsky | B. F. Skinner | Jean Piaget | Jerome Bruner | Chomsky argued for innate universal grammar.
M2#psychology-u03-20-q2@2: A child says "I runned fast". What does this error suggest? | The child is applying a rule | The child is copying adults | The child has a hearing problem | The child is in the cooing stage | Adults don't say "runned", so the child generates rules.
SEQ1#psychology-u03-20-q3@1: Put the stages of language development in order. | Cooing ; Babbling ; One-word stage ; Two-word stage | Language develops in a predictable sequence.
M3#psychology-u03-20-q4@3: Why is Genie's case weak evidence for a critical period? | Her severe deprivation confounds age | She learned fluent grammar | She was studied in a lab | She was an adult learner | Abuse and neglect, not just age, could explain her difficulties.
SA3#psychology-u03-20-q5@3: Evaluate nativist and learning theories of language acquisition. | Learning theory explains vocabulary and accent but not overregularisation or speed. Nativism explains poverty of the stimulus and universals, but universal grammar is hard to test and debated. Interactionist views add social input. Evidence on sensitive periods supports some biological timing. | Learning theory ; Nativism ; Evidence ; Interactionism ; Judgement

## Language processing
LV: Intermediate · Application
S: Understanding language means recognising words, building sentence structures and constructing meaning, in a fraction of a second. This lesson explains word recognition, parsing and comprehension.
O: Explain how spoken and written words are recognised
O: Describe how sentences are parsed, using garden-path sentences
O: Explain how inferences and knowledge build comprehension
PRE: Language acquisition
H: Recognising words
P: Our **mental lexicon** stores tens of thousands of words. Frequent words are recognised faster (the **word frequency effect**), and words are recognised faster after a related word (**semantic priming**: "nurse" is read faster after "doctor"; Meyer and Schvaneveldt, 1971). In reading, the eyes move in jumps (saccades) with short fixations; skilled readers decode print quickly and largely automatically.
H: Building sentence structure
P: **Parsing** assigns grammatical structure to a sentence as it unfolds. **Garden-path sentences** show parsing happens word by word: in "The horse raced past the barn fell", readers first take "raced" as the main verb, then must reanalyse when "fell" arrives. Context, word meaning and probability all guide parsing.
X: Comprehension and inference
> Bransford and Johnson (1972) read participants a passage about a procedure ("First you arrange items into different groups…").
> Those told beforehand it was about washing clothes understood and remembered it much better.
> Comprehension depends on activating the right background knowledge (schemas).
P: Brain studies link language production to **Broca's area** in the left frontal lobe and comprehension to **Wernicke's area** in the left temporal lobe, though language relies on a wider network than these two regions.
K: Language processing involves rapid word recognition, incremental parsing and knowledge-driven inference.
!: Assuming comprehension simply decodes words. Readers constantly infer meaning using background knowledge.
EV: established | Words are recognised faster after a semantically related word (semantic priming).
EV: contested | Whether parsing first uses grammar alone or uses all available information at once is debated.
T: Mental lexicon | The store of words and their meanings in memory
T: Semantic priming | Faster recognition of a word after a related word
T: Garden-path sentence | A sentence that leads readers to an initial wrong interpretation
SUM: Word recognition depends on frequency and priming; parsing proceeds word by word.
SUM: Comprehension relies on inference and background knowledge.
SRC: Meyer D. E. and Schvaneveldt R. W., "Facilitation in recognizing pairs of words: evidence of a dependence between retrieval operations", Journal of Experimental Psychology 90(2):227–234 | primary | 1971 | https://doi.org/10.1037/h0031564
SRC: Bransford J. D. and Johnson M. K., "Contextual prerequisites for understanding: some investigations of comprehension and recall", Journal of Verbal Learning and Verbal Behavior 11(6):717–726 | primary | 1972 | https://doi.org/10.1016/S0022-5371(72)80006-9
Q: What is semantic priming? | Faster recognition of a word after a related word, such as "nurse" after "doctor".
Q: What do garden-path sentences show? | That sentences are parsed incrementally, word by word.
M1#psychology-u03-21-q1@1: Common words are recognised faster than rare words. This is the… | Word frequency effect | Garden-path effect | McGurk effect | Stroop effect | Words we meet often are recognised faster: the word frequency effect.
M2#psychology-u03-21-q2@2: Readers stumble at the end of "The old man the boat". Why? | They parsed "man" as a noun first | They don't know the words | They have poor eyesight | The sentence is ungrammatical | Initial parsing must be revised: "man" is a verb.
TF2#psychology-u03-21-q3@2: Participants understood the "washing clothes" passage better when told the topic in advance. | true | Activating the right schema aided comprehension and recall.
M3#psychology-u03-21-q4@3: What does Bransford and Johnson's study imply for teaching? | Activate prior knowledge first | Remove titles from all texts | Teach only new vocabulary | Train pupils to read faster | Comprehension improves when relevant schemas are activated.
SA2#psychology-u03-21-q5@2,3: Explain how a reader understands a newspaper article. | Word recognition (frequency, priming); eye movements and decoding; incremental parsing, possible garden paths; inference using schemas and background knowledge; brain networks including Broca's and Wernicke's areas. | Word recognition ; Parsing ; Inference ; Knowledge ; Brain

## Speech production
LV: Intermediate · Application
S: Speaking involves turning an idea into words, grammar and sounds in real time. This lesson explains stages of speech production and what speech errors and aphasia reveal.
O: Describe the stages of speech production
O: Explain what speech errors and tip-of-the-tongue states reveal
O: Evaluate evidence from aphasia about the brain basis of speech
PRE: Language processing
H: From idea to sound
P: Levelt's (1989) model describes three broad stages: **conceptualisation** (deciding what to say), **formulation** (selecting words and grammatical structure, then their sounds) and **articulation** (producing the speech with the vocal tract). Speakers produce about two to three words per second.
H: What errors reveal
P: **Speech errors** follow patterns that suggest these stages. **Spoonerisms** swap sounds between words ("you have hissed all my mystery lectures" for "missed all my history lectures"). **Word substitutions** usually replace a word with one of the same grammatical category. **Tip-of-the-tongue** states show that the meaning of a word can be retrieved without its sound: people often know the first letter or number of syllables (Brown and McNeill, 1966).
X: Aphasia
> Broca's aphasia (frontal damage): slow, effortful speech with simplified grammar, but comprehension relatively spared.
> Wernicke's aphasia (temporal damage): fluent speech that lacks meaning, with poor comprehension.
> These dissociations suggest separable processes, though modern imaging shows language relies on broader networks.
P: Speakers also **monitor** their own speech and repair errors, often within a fraction of a second, suggesting an internal check before and during articulation. **Gesture** is closely linked to speech: people gesture even on the phone, and gesture may help retrieve words.
K: Speech production moves from concept to words to sounds; errors and aphasia reveal the underlying stages and brain systems.
!: Assuming speech errors are random slips. They follow systematic patterns that reveal how speech is planned.
EV: established | People in tip-of-the-tongue states can often report partial information such as the first letter.
EV: contested | Whether speech planning stages are strictly sequential or interact is debated.
T: Spoonerism | A speech error in which sounds are swapped between words
T: Tip-of-the-tongue state | Knowing a word but being temporarily unable to produce it
T: Aphasia | A language disorder caused by brain damage
SUM: Speech production involves conceptualisation, formulation and articulation.
SUM: Speech errors, tip-of-the-tongue states and aphasia reveal its stages and brain basis.
SRC: Brown R. and McNeill D., "The 'tip of the tongue' phenomenon", Journal of Verbal Learning and Verbal Behavior 5(4):325–337 | primary | 1966 | https://doi.org/10.1016/S0022-5371(66)80040-3
SRC: Levelt W. J. M., Speaking: From Intention to Articulation, MIT Press | primary | 1989
Q: What are Levelt's three stages of speech production? | Conceptualisation, formulation and articulation.
Q: What do tip-of-the-tongue states show? | Meaning can be retrieved without the word's sound.
M1#psychology-u03-22-q1@1: "You have hissed all my mystery lectures" is an example of a… | Spoonerism | Garden-path sentence | Aphasia | Prime | The first sounds of two words have been swapped: a spoonerism.
M2#psychology-u03-22-q2@2: A patient speaks fluently but makes little sense and struggles to understand others. Which condition fits? | Wernicke's aphasia | Broca's aphasia | Prosopagnosia | Amnesia | Fluent but meaningless speech with poor comprehension suggests Wernicke's aphasia.
TF2#psychology-u03-22-q3@2: Word substitution errors usually replace a noun with a verb. | false | Substitutions usually keep the same grammatical category.
M3#psychology-u03-22-q4@3: What do systematic speech errors suggest about speech planning? | Words and sounds are planned in stages | Speech is unplanned | Errors are always random | Grammar plays no role | Patterned errors reflect separate planning levels.
SA2#psychology-u03-22-q5@2,3: Explain what speech errors and aphasia tell us about speech production. | Spoonerisms show sound planning; same-category substitutions show grammatical planning; tip-of-the-tongue shows meaning before sound; Broca's and Wernicke's aphasia show separable production and comprehension; limits of localisation. | Errors ; Tip of the tongue ; Broca's ; Wernicke's ; Evaluation

## Problem solving
LV: Intermediate · Application
S: Problem solving is finding a way from a current state to a goal when the route isn't obvious. This lesson explains problem spaces, heuristics, insight and the barriers of fixation and mental set.
O: Describe problem solving in terms of problem spaces and strategies
O: Explain insight and the barriers of functional fixedness and mental set
O: Apply strategies such as means–ends analysis and analogy to problems
PRE: The information-processing approach
H: Problem spaces and strategies
P: Newell and Simon (1972) described a problem as a **problem space**: an initial state, a goal state and the operators that move between states. **Algorithms** guarantee a solution by checking every possibility but may be slow. **Heuristics** are rules of thumb that are faster but not guaranteed. **Means–ends analysis** reduces the difference between the current state and the goal, often by setting sub-goals; the Tower of Hanoi puzzle is a classic test.
H: Insight
P: Some problems are solved by sudden **insight**, an "aha" moment when the problem is restructured. Köhler (1925) described chimpanzees apparently suddenly stacking boxes to reach bananas. Insight problems often need a new way of seeing the problem.
X: Barriers to problem solving
> **Functional fixedness**: in Duncker's (1945) candle problem, people struggle to fix a candle to a wall using a box of tacks because they see the box only as a container, not a shelf.
> **Mental set**: in Luchins's (1942) water-jar problems, people kept using a complex formula learned earlier even when a simpler solution was available.
> Both show that past experience can block new solutions.
P: **Analogical** problem solving applies a solution from one problem to another with similar structure. Gick and Holyoak (1980) found people rarely spotted a useful analogy spontaneously, but often did when hinted to use it.
K: Problem solving uses algorithms, heuristics, insight and analogy, but can be blocked by fixation and mental set.
!: Assuming experience always helps. Past solutions can create mental set and functional fixedness.
EV: established | Functional fixedness and mental set can block solutions that would otherwise be easy.
EV: contested | Whether insight involves special processes or ordinary search that suddenly succeeds is debated.
T: Heuristic | A rule of thumb that simplifies problem solving
T: Functional fixedness | Seeing an object only in terms of its usual function
T: Means–ends analysis | Reducing the gap between current state and goal through sub-goals
SUM: Problems can be described as spaces solved by algorithms or heuristics.
SUM: Insight restructures problems; fixation and mental set block solutions; analogies help when noticed.
SRC: Duncker K., "On problem-solving", Psychological Monographs 58(5):i–113 | primary | 1945 | https://doi.org/10.1037/h0093599
SRC: Gick M. L. and Holyoak K. J., "Analogical problem solving", Cognitive Psychology 12(3):306–355 | primary | 1980 | https://doi.org/10.1016/0010-0285(80)90013-4
Q: What is the difference between an algorithm and a heuristic? | An algorithm guarantees a solution; a heuristic is a faster rule of thumb that may fail.
Q: What is functional fixedness? | Seeing an object only in terms of its usual function.
M1#psychology-u03-23-q1@1: Duncker's candle problem demonstrates… | Functional fixedness | Mental set | Means–ends analysis | Insight learning in apes | Seeing the box only as a container blocks the solution.
M2#psychology-u03-23-q2@2: A student keeps using a long method for maths problems even when a shortcut works. This is… | Mental set | Functional fixedness | Analogy | Insight | Persisting with a learned method is mental set.
TF2#psychology-u03-23-q3@2: Gick and Holyoak found people often spontaneously used an analogy from an earlier story. | false | Few did spontaneously; a hint helped many more.
M3#psychology-u03-23-q4@3: Why might experts sometimes be slower than novices on unusual problems? | Experience creates mental set | Experts have less knowledge | Novices use algorithms | Experts lack heuristics | Habitual approaches can block novel solutions.
SA2#psychology-u03-23-q5@2,3: Apply problem-solving research to advise a team stuck on a design problem. | Define the problem space and sub-goals (means–ends analysis); look for analogies and be prompted to use them; challenge functional fixedness by listing alternative uses; avoid mental set by trying different approaches; take breaks for insight. | Problem space ; Analogy ; Fixedness ; Mental set ; Insight

## Reasoning
LV: Intermediate · Evaluation
S: Reasoning is drawing conclusions from information. This lesson explains deductive and inductive reasoning, the Wason selection task and belief bias.
O: Distinguish deductive and inductive reasoning
O: Explain findings from the Wason selection task and syllogistic reasoning
O: Evaluate explanations of reasoning errors, including dual-process theory
PRE: Problem solving
H: Two types of reasoning
P: **Deductive reasoning** draws conclusions that follow necessarily from premises: "All dogs are mammals; Rex is a dog; so Rex is a mammal." If the premises are true and the logic valid, the conclusion must be true. **Inductive reasoning** generalises from observations to likely conclusions: "every swan I've seen is white, so swans are white", which can be overturned by one black swan.
H: The Wason selection task
X: Four cards
> Four cards show A, D, 4 and 7. Each has a letter on one side and a number on the other.
> Rule: "If a card has a vowel on one side, it has an even number on the other." Which cards must you turn over to test it?
> The answer is A and 7. Fewer than 10% of people choose correctly in the abstract version (Wason, 1968); most choose A and 4.
> When the rule is about a familiar social rule ("If someone is drinking beer, they must be over 18"), most people choose correctly.
P: The 7 card matters because a vowel on its other side would break the rule; the 4 card can't break it whatever is on the back. The improvement with social rules suggests reasoning depends on context and familiarity, not just abstract logic.
H: Belief bias and dual processes
P: **Belief bias** is judging arguments by whether their conclusion is believable rather than whether it follows logically. Evans, Barston and Pollard (1983) found people accepted invalid arguments with believable conclusions and rejected valid ones with unbelievable conclusions. **Dual-process theories** distinguish fast, intuitive **Type 1** processing from slow, effortful **Type 2** processing; errors occur when Type 1 answers aren't checked.
K: People often reason poorly with abstract logic but better with familiar content; belief bias and dual processes explain many errors.
!: Confusing validity with truth. A valid argument can have a false conclusion if a premise is false.
EV: established | Most people fail the abstract Wason selection task but do better with familiar social rules.
EV: contested | Why familiar content helps (specialised reasoning modules versus learned schemas) is debated.
T: Deductive reasoning | Reasoning to conclusions that follow necessarily from premises
T: Inductive reasoning | Generalising from observations to probable conclusions
T: Belief bias | Judging an argument by the believability of its conclusion
SUM: Deduction guarantees conclusions from true premises; induction gives probable ones.
SUM: The Wason task and belief bias show reasoning depends on content; dual-process theory explains errors.
SRC: Wason P. C., "Reasoning about a rule", Quarterly Journal of Experimental Psychology 20(3):273–281 | primary | 1968 | https://doi.org/10.1080/14640746808400161
SRC: Evans J. St. B. T., Barston J. L. and Pollard P., "On the conflict between logic and belief in syllogistic reasoning", Memory & Cognition 11(3):295–306 | primary | 1983 | https://doi.org/10.3758/BF03196976
Q: What is the difference between deductive and inductive reasoning? | Deduction gives necessary conclusions from premises; induction gives probable generalisations.
Q: What is belief bias? | Judging an argument by whether its conclusion is believable rather than logically valid.
M1#psychology-u03-24-q1@1: "All students in the class passed; Sam is in the class; so Sam passed" is… | Deductive reasoning | Inductive reasoning | A heuristic | Belief bias | The conclusion follows necessarily from the premises.
M2#psychology-u03-24-q2@2: In the abstract Wason task (A, D, 4, 7), which cards must be turned? | A and 7 | A and 4 | A only | D and 4 | Only a vowel or an odd number could break the rule.
TF2#psychology-u03-24-q3@2: People perform better on the Wason task when it uses a familiar social rule. | true | Drinking-age versions are solved by most participants.
M3#psychology-u03-24-q4@3: Someone accepts "All flowers need water; roses need water; so roses are flowers" as valid. Why? | The conclusion is believable | The argument is valid | The premises are false | They used Type 2 thinking | It is invalid, but belief bias makes it seem sound.
SA3#psychology-u03-24-q5@3: Evaluate the claim that humans are poor reasoners. | Evidence of errors: Wason task, belief bias. Counter: content effects show good reasoning in familiar contexts; dual-process theory says errors come from unchecked intuition; lab tasks may be artificial; "rationality" depends on goals. | Errors ; Content effects ; Dual process ; Ecological validity ; Judgement

## Decision-making
LV: Intermediate · Evaluation
S: Decision-making is choosing between options under uncertainty. This lesson explains expected utility, prospect theory, framing and bounded rationality.
O: Describe expected utility theory and bounded rationality
O: Explain prospect theory, loss aversion and framing effects
O: Evaluate applications of decision research, such as nudges
PRE: Reasoning
H: Rational choice and its limits
P: **Expected utility theory** says a rational person chooses the option with the highest expected value, weighting each outcome by its probability. Simon (1955) argued people have **bounded rationality**: limited time, information and processing capacity, so they **satisfice**, choosing an option that is good enough rather than the best.
H: Prospect theory
P: Kahneman and Tversky's (1979) **prospect theory** proposes that people judge outcomes as **gains or losses** relative to a reference point, and that **losses loom larger than gains**: losing £10 feels worse than finding £10 feels good (**loss aversion**). People also overweight small probabilities, which helps explain both buying lottery tickets and buying insurance.
X: The Asian disease problem
> Participants imagined 600 people at risk from a disease (Tversky and Kahneman, 1981).
> Framed as gains ("200 people will be saved" versus a one-third chance all 600 are saved), 72% chose the certain option.
> Framed as losses ("400 people will die" versus a one-third chance nobody dies), 78% chose the risky option.
> The options were identical; only the framing changed.
H: Nudges
P: Thaler and Sunstein (2008) argued that "choice architecture" can **nudge** people toward better decisions without removing choice: for example, automatic enrolment in pension schemes greatly increases saving (Madrian and Shea, 2001). Critics question whether nudging is manipulative, and replications show many nudges have smaller effects than first reported.
P: **Investigate with the lab.** Answer the framing, anchoring and base-rate problems before reading the original findings, then try the reaction-time and signal-detection labs.
IX: biases
IX: reaction-time
IX: signal-detection
K: People decide with bounded rationality, are loss-averse and sensitive to framing; these findings inform policy nudges.
!: Assuming that a framing effect means people are irrational in every case. Reference points and loss aversion can be sensible in context.
EV: established | Equivalent options framed as gains or losses lead to different choices (framing effect).
EV: contested | The average size of nudge effects in real policy is debated; some meta-analyses suggest publication bias inflated early estimates.
T: Bounded rationality | Decision-making limited by time, information and capacity
T: Loss aversion | The tendency for losses to feel worse than equivalent gains feel good
T: Framing effect | Different choices depending on how equivalent options are described
SUM: Expected utility describes ideal choice; bounded rationality and satisficing describe real choice.
SUM: Prospect theory explains loss aversion and framing; nudges apply these findings but are debated.
SRC: Kahneman D. and Tversky A., "Prospect theory: an analysis of decision under risk", Econometrica 47(2):263–291 | primary | 1979 | https://doi.org/10.2307/1914185
SRC: Tversky A. and Kahneman D., "The framing of decisions and the psychology of choice", Science 211(4481):453–458 | primary | 1981 | https://doi.org/10.1126/science.7455683
SRC: Madrian B. C. and Shea D. F., "The power of suggestion: inertia in 401(k) participation and savings behavior", Quarterly Journal of Economics 116(4):1149–1187 | primary | 2001 | https://doi.org/10.1162/003355301753265543
Q: What is satisficing? | Choosing an option that is good enough rather than searching for the best.
Q: What is loss aversion? | Losses feel worse than equivalent gains feel good.
M1#psychology-u03-25-q1@1: Who proposed bounded rationality? | Herbert Simon | Daniel Kahneman | Peter Wason | Richard Thaler | Simon argued real decision-makers satisfice.
M2#psychology-u03-25-q2@2: A shop says a product has "a 90% success rate" rather than "a 10% failure rate", and sales rise. This is… | A framing effect | Loss aversion only | Satisficing | Mental set | Equivalent information framed positively changes choices.
NUM2#psychology-u03-25-q3@2: In the gain frame of the Asian disease problem, what percentage chose the certain option? | 72 | 2 | % | Most chose to save 200 for certain when the options were framed as gains.
TF2#psychology-u03-25-q4@3: Automatic enrolment in pensions reduced saving because people resisted being nudged. | false | Automatic enrolment substantially increased participation.
M3#psychology-u03-25-q5@3: Which is the strongest ethical criticism of nudging? | It may steer people without awareness | It removes all choices | It has no effects | It uses expected utility | Critics argue nudges can be manipulative even if choice remains.
SA3#psychology-u03-25-q6@3: Evaluate prospect theory as an explanation of human decision-making. | Strengths: explains framing, loss aversion, lottery and insurance behaviour, many replications, Nobel-recognised. Limitations: descriptive rather than explanatory, lab scenarios are hypothetical, effect sizes vary, individual and cultural differences. Applications: nudges, debates over their size and ethics. | Key ideas ; Evidence ; Strength ; Limitation ; Application
M2#psychology-u03-25-q7@1: What is the framing effect? | Choices change depending on whether options are described as gains or losses | People always choose the safest option | People ignore all numbers in decisions | Decisions depend only on the final outcome | Tversky and Kahneman showed choices reverse when the same outcome is framed differently.

## Biases and heuristics
LV: Intermediate · Application
S: Heuristics are mental shortcuts that usually work but can produce systematic errors called biases. This lesson explains availability, representativeness and anchoring, and the debate over whether heuristics are rational.
O: Describe the availability, representativeness and anchoring heuristics
O: Explain how heuristics produce biases such as base-rate neglect and confirmation bias
O: Evaluate the heuristics-and-biases and "fast and frugal" views
PRE: Decision-making
H: Three classic heuristics
- **Availability**: judging frequency by how easily examples come to mind. People overestimate deaths from dramatic causes (plane crashes) relative to common ones (diabetes).
- **Representativeness**: judging probability by similarity to a stereotype. In the "Linda problem", many people judge "Linda is a bank teller and feminist" more likely than "Linda is a bank teller", which is logically impossible (the **conjunction fallacy**; Tversky and Kahneman, 1983).
- **Anchoring**: estimates are pulled toward an initial number, even an irrelevant one (Tversky and Kahneman, 1974).
IX: biases
H: Other biases
P: **Base-rate neglect** ignores how common something is in the population. **Confirmation bias** is seeking and favouring evidence that supports existing beliefs. **Hindsight bias** is believing, after the event, that you knew it would happen. **Overconfidence** is being more sure than accuracy justifies.
X: Anchoring with a wheel
> Participants spun a wheel rigged to land on 10 or 65, then estimated the percentage of African countries in the United Nations (Tversky and Kahneman, 1974).
> Median estimates were 25% after the wheel showed 10 and 45% after 65.
> An obviously random number shifted estimates of a factual quantity.
P: Gigerenzer argues that heuristics are often **ecologically rational**: simple "fast and frugal" rules can match or beat complex calculations in real environments, and some biases shrink when problems are presented as natural frequencies ("10 out of 1,000") rather than percentages.
K: Heuristics are useful shortcuts that can produce predictable biases; whether they are flaws or adaptive depends on context.
!: Thinking that knowing about a bias removes it. Awareness alone rarely eliminates biases; changing procedures helps more.
EV: established | Anchoring, availability and the conjunction fallacy have been demonstrated many times.
EV: contested | Whether heuristics are best seen as reasoning flaws (Kahneman) or adaptive tools (Gigerenzer) is debated.
T: Availability heuristic | Judging frequency by how easily examples come to mind
T: Representativeness heuristic | Judging probability by similarity to a prototype
T: Anchoring | Estimates being pulled toward an initial value
SUM: Availability, representativeness and anchoring are common heuristics that create biases.
SUM: The debate is whether they are errors or ecologically rational shortcuts.
SRC: Tversky A. and Kahneman D., "Judgment under uncertainty: heuristics and biases", Science 185(4157):1124–1131 | primary | 1974 | https://doi.org/10.1126/science.185.4157.1124
SRC: Tversky A. and Kahneman D., "Extensional versus intuitive reasoning: the conjunction fallacy in probability judgment", Psychological Review 90(4):293–315 | primary | 1983 | https://doi.org/10.1037/0033-295X.90.4.293
SRC: Gigerenzer G. and Gaissmaier W., "Heuristic decision making", Annual Review of Psychology 62:451–482 | primary | 2011 | https://doi.org/10.1146/annurev-psych-120709-145346
Q: What is the availability heuristic? | Judging frequency by how easily examples come to mind.
Q: What is the conjunction fallacy? | Judging a combination of events more likely than one of them alone.
M1#psychology-u03-26-q1@1: After seeing news of a shark attack, someone overestimates the risk of swimming. This is the… | Availability heuristic | Anchoring heuristic | Conjunction fallacy | Hindsight bias | Vivid, recent examples come to mind easily.
M2#psychology-u03-26-q2@2: A house listed at £400,000 receives higher offers than the same house listed at £350,000. Which heuristic explains this? | Anchoring | Availability | Representativeness | Satisficing | The listing price acts as an anchor for estimates.
TF2#psychology-u03-26-q3@2: In Tversky and Kahneman's wheel study, the random number didn't affect estimates. | false | Estimates were pulled toward the number on the wheel.
M3#psychology-u03-26-q4@3: What does Gigerenzer mean by ecological rationality? | Heuristics fit real environments well | Heuristics are always wrong | People never use heuristics | Only logic is rational | Simple rules can perform well where they match the environment's structure.
SA3#psychology-u03-26-q5@2,3: Evaluate the heuristics-and-biases approach to judgement. | Strengths: robust demonstrations (anchoring, availability, Linda), practical uses (medicine, law, finance). Limitations: lab problems may be unnatural; frequency formats reduce some biases; Gigerenzer's ecological rationality view; awareness rarely removes bias. | Heuristics ; Evidence ; Applications ; Criticism ; Judgement

## Metacognition
LV: Intermediate · Application
S: Metacognition is thinking about thinking: knowing what you know and controlling how you learn. This lesson explains metacognitive monitoring and control, illusions of knowing and how to improve them.
O: Define metacognition and distinguish monitoring from control
O: Explain illusions of competence, including the Dunning–Kruger pattern
O: Apply metacognitive strategies to learning
PRE: Encoding, storage and retrieval
H: Monitoring and control
P: Flavell (1979) introduced **metacognition**: knowledge and regulation of one's own cognition. **Monitoring** is judging your own learning or memory: "Do I know this well enough?" (judgements of learning, feeling-of-knowing). **Control** is acting on those judgements: deciding what to study next, when to stop or which strategy to use (Nelson and Narens, 1990).
H: Illusions of knowing
P: Monitoring is often inaccurate. Rereading makes material feel familiar, so learners overestimate how well they'll recall it later (an **illusion of competence**). Learners also prefer **massed** practice, which feels easier, over spaced practice, which feels harder but works better; Bjork calls effective but effortful methods **desirable difficulties**.
X: Overconfidence among low performers
> Kruger and Dunning (1999) found students scoring in the bottom quarter on tests of logic and grammar estimated they had scored above average.
> Top performers slightly underestimated their relative standing.
> Part of the pattern may be a statistical artefact (regression to the mean), and its size is debated, but poor calibration among low performers is often found.
H: Improving metacognition
P: Accurate monitoring is improved by **delayed judgements** (judging learning some time after study, not straight away), **self-testing** (which shows what you can actually recall) and **feedback**. Teaching students to plan, monitor and evaluate their learning has been found to improve attainment (Education Endowment Foundation, 2018).
K: Metacognition involves monitoring and controlling learning; feelings of fluency mislead, while self-testing and delayed judgements improve accuracy.
!: Trusting how easy something feels. Ease during study often predicts learning poorly.
EV: established | Delayed judgements of learning predict later recall more accurately than immediate ones.
EV: contested | How much of the Dunning–Kruger effect reflects metacognitive deficits rather than statistical artefact is debated.
T: Metacognition | Knowledge and regulation of one's own thinking
T: Judgement of learning | A prediction of how well something will be remembered later
T: Desirable difficulty | A learning condition that feels harder but improves long-term retention
SUM: Metacognition combines monitoring and control of one's own learning.
SUM: Fluency creates illusions of competence; self-testing and delayed judgements improve calibration.
SRC: Flavell J. H., "Metacognition and cognitive monitoring: a new area of cognitive–developmental inquiry", American Psychologist 34(10):906–911 | primary | 1979 | https://doi.org/10.1037/0003-066X.34.10.906
SRC: Kruger J. and Dunning D., "Unskilled and unaware of it: how difficulties in recognizing one's own incompetence lead to inflated self-assessments", Journal of Personality and Social Psychology 77(6):1121–1134 | primary | 1999 | https://doi.org/10.1037/0022-3514.77.6.1121
SRC: Education Endowment Foundation, Metacognition and Self-Regulated Learning: Guidance Report | guidance | 2018
Q: What is the difference between metacognitive monitoring and control? | Monitoring judges your learning; control uses those judgements to direct study.
Q: What is a desirable difficulty? | A condition that feels harder during learning but improves long-term retention.
M1#psychology-u03-27-q1@1: Judging "I'll remember this tomorrow" is an example of… | Metacognitive monitoring | Metacognitive control | Proactive interference | Encoding specificity | Predicting later recall is a judgement of learning, a form of monitoring.
M2#psychology-u03-27-q2@2: A student feels confident after rereading but fails a quiz. What happened? | Fluency created an illusion of competence | They used spaced practice | Their monitoring was accurate | They were self-testing | Familiarity from rereading misled their judgement.
TF2#psychology-u03-27-q3@2: Judgements of learning made after a delay are usually more accurate than immediate ones. | true | Delayed judgements reflect what can actually be retrieved.
M3#psychology-u03-27-q4@3: Why is the Dunning–Kruger effect debated? | Part may be regression to the mean | It has never been studied | It shows everyone is accurate | It only applies to experts | Statistical artefacts can produce a similar pattern.
SA2#psychology-u03-27-q5@2,3: Apply research on metacognition to help a student who over-predicts their exam results. | Explain illusions of competence; use self-testing and practice papers to monitor accurately; delay judgements; seek feedback; plan, monitor and evaluate study (EEF); prefer desirable difficulties such as spacing. | Problem ; Self-testing ; Delayed judgements ; Feedback ; Strategy

## Cognitive development
LV: Intermediate · Application
S: Cognitive development is how thinking changes from infancy to adulthood. This lesson explains Piaget's stages and Vygotsky's sociocultural theory, and evaluates both against later research.
O: Describe Piaget's stages of cognitive development and key concepts
O: Explain Vygotsky's zone of proximal development and scaffolding
O: Evaluate Piaget's and Vygotsky's theories using later evidence
PRE: The cognitive approach
H: Piaget
P: Piaget argued children actively construct knowledge through **schemas**, adapted by **assimilation** (fitting new experience into existing schemas) and **accommodation** (changing schemas to fit new experience). He proposed four stages:
- **Sensorimotor** (0–2 years): learning through senses and actions; **object permanence** develops.
- **Pre-operational** (2–7): language and symbolic thought, but **egocentrism** and lack of **conservation**.
- **Concrete operational** (7–11): logical thinking about concrete things; conservation achieved.
- **Formal operational** (11+): abstract and hypothetical reasoning.
X: Conservation and its critics
> In Piaget's conservation task, a child sees two identical rows of counters, then one row is spread out. Pre-operational children say the longer row has more.
> McGarrigle and Donaldson (1974) had a "naughty teddy" spread the counters "by accident". Many more 4–6-year-olds then said the number was the same.
> Children may understand more than Piaget thought; his tasks may have confused them.
H: Vygotsky
P: Vygotsky emphasised social and cultural influences. The **zone of proximal development** (ZPD) is the gap between what a child can do alone and what they can do with help from a more knowledgeable other. **Scaffolding** (Wood, Bruner and Ross, 1976) is support adjusted to the child's needs and gradually withdrawn. Language is a key tool of thought: children's private speech becomes inner speech.
K: Piaget described stages of self-constructed understanding; Vygotsky stressed social support; later research shows children are often more capable than Piaget's tasks suggested.
!: Treating Piaget's stage ages as fixed. Development varies, and abilities emerge earlier with child-friendly tasks.
EV: established | Children's reasoning changes systematically with age, and supportive guidance helps learning.
EV: contested | Whether development proceeds in broad general stages or through more gradual, domain-specific changes is debated.
T: Accommodation | Changing schemas to fit new experience
T: Conservation | Understanding that quantity stays the same despite changes in appearance
T: Zone of proximal development | The gap between what a learner can do alone and with help
SUM: Piaget proposed four stages driven by assimilation and accommodation.
SUM: Vygotsky stressed the ZPD and scaffolding; later research suggests children's abilities appear earlier.
SRC: McGarrigle J. and Donaldson M., "Conservation accidents", Cognition 3(4):341–350 | primary | 1974 | https://doi.org/10.1016/0010-0277(74)90003-1
SRC: Wood D., Bruner J. S. and Ross G., "The role of tutoring in problem solving", Journal of Child Psychology and Psychiatry 17(2):89–100 | primary | 1976 | https://doi.org/10.1111/j.1469-7610.1976.tb00381.x
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 9.2 "Lifespan theories" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/9-2-lifespan-theories
Q: What are Piaget's four stages? | Sensorimotor, pre-operational, concrete operational and formal operational.
Q: What is scaffolding? | Support adjusted to a learner's needs and gradually withdrawn.
M1#psychology-u03-28-q1@1: Understanding that objects exist when out of sight is… | Object permanence | Conservation | Egocentrism | Accommodation | Object permanence develops in the sensorimotor stage.
M2#psychology-u03-28-q2@2: A teacher gives hints on a maths problem, then fewer hints as the pupil improves. This is… | Scaffolding | Assimilation | Egocentrism | Conservation | Gradually withdrawn support is scaffolding.
TF2#psychology-u03-28-q3@2: In the "naughty teddy" study, more young children conserved number than in Piaget's version. | true | Making the change seem accidental improved performance.
M3#psychology-u03-28-q4@3: What does the "naughty teddy" study suggest about Piaget's methods? | His tasks may have underestimated children | Children can't conserve before 11 | Piaget overestimated children | Teddy bears distract children | Children may have misread the adult's intentions in the original task.
SA3#psychology-u03-28-q5@2,3: Compare and evaluate Piaget's and Vygotsky's theories of cognitive development. | Piaget: stages, schemas, individual discovery; evidence: conservation, object permanence; criticisms: underestimation (McGarrigle and Donaldson), cultural variation. Vygotsky: ZPD, scaffolding, culture, language; supported by tutoring research; less specific, harder to test. Educational applications of both. | Piaget ; Vygotsky ; Evidence ; Criticism ; Applications

## Theories of intelligence
LV: Intermediate · Evaluation
S: Intelligence is the general ability to reason, learn and solve problems. This lesson compares general-factor, hierarchical and multiple-intelligences theories.
O: Describe Spearman's g and hierarchical models of intelligence
O: Explain Gardner's and Sternberg's broader theories
O: Evaluate theories of intelligence using evidence
PRE: Problem solving
H: The general factor
P: Spearman (1904) noticed that people who did well on one mental test tended to do well on others: scores were **positively correlated**. He proposed a **general intelligence factor (g)** underlying performance on all tests, plus specific abilities. Factor analysis of many test batteries still finds a strong general factor.
P: **Hierarchical models** such as the Cattell–Horn–Carroll (CHC) model place g at the top, broad abilities in the middle (including **fluid intelligence**, reasoning with new problems, and **crystallised intelligence**, accumulated knowledge) and narrow skills at the bottom (Carroll, 1993).
H: Broader theories
P: **Gardner's multiple intelligences** (1983) proposed separate intelligences: linguistic, logical-mathematical, spatial, musical, bodily-kinaesthetic, interpersonal, intrapersonal and naturalistic. It has been popular in education, but there is little evidence that these are independent abilities or that teaching to "intelligence types" helps learning (Waterhouse, 2006).
P: **Sternberg's triarchic theory** distinguishes **analytical**, **creative** and **practical** intelligence, emphasising success in real life.
X: Fluid and crystallised intelligence across age
> Fluid reasoning tends to peak in early adulthood and decline gradually.
> Crystallised knowledge such as vocabulary often keeps rising into later adulthood.
> This pattern supports distinguishing the two abilities.
K: Strong evidence supports a general factor within a hierarchy of abilities; broader theories highlight valued skills but have weaker evidence for separate intelligences.
!: Equating intelligence with worth. Intelligence tests measure particular cognitive abilities, not a person's value.
EV: established | Scores on diverse cognitive tests are positively correlated, producing a general factor.
EV: contested | Whether Gardner's intelligences are separate abilities rather than talents or skills is disputed.
T: g (general intelligence) | A general factor underlying performance on many cognitive tests
T: Fluid intelligence | The ability to reason with and solve new problems
T: Crystallised intelligence | Accumulated knowledge and skills
SUM: Spearman's g and hierarchical models describe intelligence as general plus specific abilities.
SUM: Gardner and Sternberg broaden intelligence; evidence for Gardner's separate intelligences is weak.
SRC: Spearman C., "'General intelligence', objectively determined and measured", American Journal of Psychology 15(2):201–293 | primary | 1904 | https://doi.org/10.2307/1412107
SRC: Carroll J. B., Human Cognitive Abilities: A Survey of Factor-Analytic Studies, Cambridge University Press | primary | 1993
SRC: Waterhouse L., "Multiple intelligences, the Mozart effect, and emotional intelligence: a critical review", Educational Psychologist 41(4):207–225 | primary | 2006 | https://doi.org/10.1207/s15326985ep4104_1
Q: What is g? | A general intelligence factor underlying performance on many cognitive tests.
Q: What is the difference between fluid and crystallised intelligence? | Fluid is reasoning with new problems; crystallised is accumulated knowledge.
M1#psychology-u03-29-q1@1: Who proposed the general intelligence factor g? | Charles Spearman | Howard Gardner | Robert Sternberg | Alfred Binet | Spearman noticed positive correlations among test scores.
M2#psychology-u03-29-q2@2: An older adult has a large vocabulary but finds new puzzles harder than when young. This illustrates… | Crystallised versus fluid ability | Gardner's multiple intelligences | Sternberg's practical intelligence | The Flynn effect over decades | Knowledge rises while new reasoning declines.
TF2#psychology-u03-29-q3@2: Strong evidence shows teaching to pupils' preferred "intelligence type" improves learning. | false | Evidence for matching teaching to intelligence types is weak.
M3#psychology-u03-29-q4@3: What is the main criticism of Gardner's theory? | Weak evidence they are separate | It includes too few abilities | It relies on g alone | It leaves out musical ability | Measures of his intelligences are often correlated or untested.
SA3#psychology-u03-29-q5@3: Evaluate theories of intelligence. | g: strong correlational evidence, predicts outcomes; may underplay specific abilities. Hierarchical CHC: integrates g and broad abilities. Gardner: popular, broad, but weak evidence. Sternberg: practical and creative focus, measurement challenges. | Spearman ; Hierarchical ; Gardner ; Sternberg ; Judgement

## Intelligence testing
LV: Intermediate · Evaluation
S: Intelligence tests measure cognitive abilities and compare people with others of the same age. This lesson explains how IQ tests are built, what they predict, the Flynn effect and the history of misuse.
O: Describe how IQ tests are constructed, standardised and scored
O: Explain the reliability, validity and predictive power of IQ tests
O: Evaluate controversies in intelligence testing, including bias and misuse
PRE: Theories of intelligence
H: Building a test
P: Binet and Simon (1905) created the first practical intelligence test to identify French schoolchildren needing extra support. Modern tests such as the **Wechsler** scales (WAIS for adults, WISC for children) include subtests of verbal comprehension, perceptual reasoning, working memory and processing speed.
P: Tests are **standardised** on large representative samples. Scores are converted to a scale with a **mean of 100** and a **standard deviation of 15**, so about 68% of people score between 85 and 115 and about 95% between 70 and 130.
IX: psychometrics
H: What tests predict
P: IQ tests are highly **reliable** (test–retest correlations often above 0.9). They correlate moderately with school achievement and job performance, and with later health and lifespan (Deary, 2012). They don't measure everything valued as "intelligent", such as creativity or wisdom, and motivation, schooling and test familiarity affect scores.
X: The Flynn effect
> Average raw scores on IQ tests rose by about 3 points per decade across the 20th century in many countries (Flynn, 1987).
> The rise is too fast to be genetic; better nutrition, health, schooling and more abstract thinking are suggested causes.
> In some countries the rise has recently slowed or reversed.
H: Misuse and bias
P: Early 20th-century tests were used to support the eugenics movement, restrict immigration to the United States and justify forced sterilisation. Tests developed in one culture may disadvantage people from others. Modern test standards (American Educational Research Association et al., 2014) require evidence of fairness for the groups tested.
K: IQ tests are reliable and predictive within limits, but scores reflect environment as well as ability, and tests have a history of harmful misuse.
!: Treating an IQ score as a fixed, complete measure of a person's mind. Scores change with environment and measure particular abilities.
EV: established | IQ test scores are reliable and moderately predict educational and occupational outcomes.
EV: contested | The causes of the Flynn effect, and of group differences in average scores, are debated.
T: Standardisation | Giving a test to a large representative sample to establish norms
T: IQ | A standardised score with a mean of 100 and standard deviation of 15
T: Flynn effect | The rise in average IQ test scores over the 20th century
SUM: IQ tests are standardised to a mean of 100 and SD of 15, are reliable and predict some outcomes.
SUM: The Flynn effect shows environmental influence; tests have been misused and need fairness evidence.
SRC: Flynn J. R., "Massive IQ gains in 14 nations: what IQ tests really measure", Psychological Bulletin 101(2):171–191 | primary | 1987 | https://doi.org/10.1037/0033-2909.101.2.171
SRC: Deary I. J., "Intelligence", Annual Review of Psychology 63:453–482 | primary | 2012 | https://doi.org/10.1146/annurev-psych-120710-100353
SRC: American Educational Research Association, American Psychological Association and National Council on Measurement in Education, Standards for Educational and Psychological Testing | standard | 2014
Q: What are the mean and standard deviation of IQ scores? | A mean of 100 and a standard deviation of 15.
Q: What is the Flynn effect? | The rise of about 3 IQ points per decade across the 20th century.
M1#psychology-u03-30-q1@1: The first practical intelligence test was developed by… | Binet and Simon | David Wechsler | Charles Spearman | Howard Gardner | It was designed to identify pupils needing support in France.
NUM2#psychology-u03-30-q2@2: About what percentage of people score between 85 and 115 on an IQ test? | 68 | 2 | % | One standard deviation either side of the mean covers about 68%.
M2#psychology-u03-30-q3@2: Why can't the Flynn effect be explained by genetic change? | The rise was too rapid | Genes don't affect intelligence | Tests weren't standardised | Scores fell over time | Genetic change across a few decades is far too slow.
TF2#psychology-u03-30-q4@3: Early intelligence tests were used to support eugenic policies. | true | Tests were used to justify immigration restrictions and sterilisation.
M3#psychology-u03-30-q5@3: Which is the strongest reason to interpret an individual's IQ score cautiously? | Scores reflect the environment | IQ tests are very unreliable | IQ scores predict nothing at all | Scores can never change | Environmental factors influence performance on the day and over life.
SA3#psychology-u03-30-q6@3: Evaluate the use of intelligence tests. | Strengths: reliability, standardisation, predictive validity, identifying support needs. Limitations: narrow abilities, cultural bias, environmental influence (Flynn effect), history of misuse (eugenics). Need for fairness evidence and careful interpretation. | Construction ; Reliability and validity ; Flynn effect ; Bias and misuse ; Judgement

## Creativity
LV: Intermediate · Application
S: Creativity is producing ideas or products that are both novel and useful. This lesson explains how creativity is measured, the creative process and the factors that encourage it.
O: Define creativity and describe divergent-thinking measures
O: Explain stage models of the creative process and incubation
O: Evaluate factors that encourage or hinder creativity
PRE: Problem solving
H: Defining and measuring creativity
P: Most researchers define creativity as producing work that is both **original** and **appropriate** (useful or valuable) (Runco and Jaeger, 2012). Guilford (1950) distinguished **convergent thinking** (finding the single correct answer) from **divergent thinking** (generating many possible answers). Divergent-thinking tests such as the **Alternative Uses Task** ("list uses for a brick") score **fluency** (number of ideas), **flexibility** (number of categories) and **originality** (rarity).
H: The creative process
P: Wallas (1926) proposed four stages: **preparation** (studying the problem), **incubation** (setting it aside), **illumination** (the idea appears) and **verification** (testing it). A meta-analysis found incubation periods modestly improve creative problem solving, especially for divergent tasks (Sio and Ormerod, 2009).
X: Motivation and creativity
> Amabile (1985) asked creative writers to write poems after reflecting on either intrinsic reasons (enjoyment) or extrinsic reasons (money, recognition) for writing.
> Poems written after considering extrinsic reasons were judged less creative.
> Intrinsic motivation tends to support creativity, though rewards for creative performance can sometimes help.
P: Creativity is linked to **openness to experience**, domain knowledge and environments that allow risk-taking and time. Intelligence correlates modestly with creativity, more strongly at lower levels of IQ.
K: Creativity combines originality and usefulness; it can be measured by divergent thinking and is supported by incubation, intrinsic motivation and openness.
!: Assuming creativity is only for artists. Creativity matters in science, business and everyday problem solving.
EV: established | Incubation periods modestly improve performance on creative problems.
EV: contested | How well divergent-thinking tests predict real-world creative achievement is debated.
T: Divergent thinking | Generating many possible solutions to an open problem
T: Convergent thinking | Finding the single best answer to a problem
T: Incubation | Setting a problem aside, after which solutions may come more easily
SUM: Creativity is novel and useful; divergent-thinking tests score fluency, flexibility and originality.
SUM: Wallas's stages and incubation describe the process; intrinsic motivation and openness support it.
SRC: Runco M. A. and Jaeger G. J., "The standard definition of creativity", Creativity Research Journal 24(1):92–96 | primary | 2012 | https://doi.org/10.1080/10400419.2012.650092
SRC: Sio U. N. and Ormerod T. C., "Does incubation enhance problem solving? A meta-analytic review", Psychological Bulletin 135(1):94–120 | primary | 2009 | https://doi.org/10.1037/a0014212
SRC: Amabile T. M., "Motivation and creativity: effects of motivational orientation on creative writers", Journal of Personality and Social Psychology 48(2):393–399 | primary | 1985 | https://doi.org/10.1037/0022-3514.48.2.393
Q: What is the standard definition of creativity? | Producing something both original and appropriate or useful.
Q: What are Wallas's four stages? | Preparation, incubation, illumination and verification.
M1#psychology-u03-31-q1@1: "List as many uses for a paperclip as you can" measures… | Divergent thinking | Convergent thinking | Crystallised intelligence | Working memory | Generating many ideas is divergent thinking.
M2#psychology-u03-31-q2@2: A scientist solves a problem in the shower after a week away from it. Which stage of Wallas's model came just before? | Incubation | Preparation | Verification | Convergence | Time away from the problem precedes illumination.
TF2#psychology-u03-31-q3@2: Amabile found poems were more creative after writers thought about money and recognition. | false | Extrinsic reasons led to less creative poems.
M3#psychology-u03-31-q4@3: Which is the main limitation of divergent-thinking tests? | Weak links to real achievement | They count no ideas at all | They measure only memory | They take far too long | Lab fluency may not predict real-world creative work.
SA2#psychology-u03-31-q5@2,3: Apply creativity research to advise a school on encouraging creative work. | Teach divergent thinking; allow incubation time; foster intrinsic motivation, limit controlling rewards; build domain knowledge; encourage openness and risk-taking; evaluate with measures of originality and usefulness. | Divergent thinking ; Incubation ; Motivation ; Knowledge and openness ; Evaluation

## Cognitive ageing
LV: Intermediate · Evaluation
S: Cognitive ageing is how thinking changes in later adulthood. This lesson explains which abilities decline and which are maintained, explanations such as processing speed, and factors linked to healthy cognitive ageing.
O: Describe which cognitive abilities change and which remain stable with age
O: Explain processing-speed and cognitive-reserve accounts of ageing
O: Evaluate evidence on lifestyle factors and dementia risk
PRE: Theories of intelligence
H: Change and stability
P: On average, **processing speed**, **working memory**, **episodic memory** and **fluid reasoning** decline gradually from early adulthood. **Semantic knowledge**, **vocabulary** and **procedural skills** are largely maintained and may grow into later life (Salthouse, 2009). Individual differences are large: some 80-year-olds outperform many 50-year-olds.
H: Explanations
P: Salthouse's **processing-speed theory** (1996) proposes that slower processing underlies many other age-related declines: if early steps are slow, later steps have less time. **Cognitive reserve** (Stern, 2002) refers to the brain's resilience built through education, demanding occupations and mental activity; people with more reserve may function well despite age-related brain changes.
X: The Lothian Birth Cohorts
> In 1932 and 1947, almost all 11-year-olds in Scotland sat the same intelligence test.
> Researchers retested people from the Lothian region in their 70s and beyond (Deary et al., 2004).
> Childhood scores correlated around 0.6–0.7 with scores in old age, showing strong stability of relative standing alongside average decline.
H: Lifestyle and dementia
P: **Dementia** is not normal ageing; it involves cognitive decline severe enough to affect daily life, most often from Alzheimer's disease. The Lancet Commission (Livingston et al., 2020) estimated that around 40% of dementia cases worldwide might be linked to modifiable risk factors, including low education, hearing loss, hypertension, smoking, physical inactivity and social isolation. This is a population-level estimate, not a guarantee for any individual.
K: Some abilities decline with age while knowledge is maintained; processing speed and cognitive reserve help explain variation, and modifiable risks affect dementia.
!: Assuming cognitive decline is inevitable and uniform. Decline varies widely, and dementia isn't a normal part of ageing.
EV: established | Processing speed and episodic memory decline on average with age, while vocabulary is maintained.
EV: contested | How much "brain training" and specific lifestyle changes can slow cognitive ageing is debated.
T: Processing speed | How quickly simple cognitive operations are carried out
T: Cognitive reserve | Resilience to brain changes built through education and mental activity
T: Dementia | Cognitive decline severe enough to impair daily living
SUM: Fluid abilities decline gradually while crystallised knowledge is maintained; individual differences are large.
SUM: Processing speed and reserve explain variation; modifiable factors may affect dementia risk.
SRC: Salthouse T. A., "The processing-speed theory of adult age differences in cognition", Psychological Review 103(3):403–428 | primary | 1996 | https://doi.org/10.1037/0033-295X.103.3.403
SRC: Deary I. J. et al., "The impact of childhood intelligence on later life: following up the Scottish mental surveys of 1932 and 1947", Journal of Personality and Social Psychology 86(1):130–147 | primary | 2004 | https://doi.org/10.1037/0022-3514.86.1.130
SRC: Livingston G. et al., "Dementia prevention, intervention, and care: 2020 report of the Lancet Commission", The Lancet 396(10248):413–446 | primary | 2020 | https://doi.org/10.1016/S0140-6736(20)30367-6
Q: Which abilities are largely maintained with age? | Semantic knowledge, vocabulary and procedural skills.
Q: What is cognitive reserve? | Resilience to brain changes built through education, demanding work and mental activity.
M1#psychology-u03-32-q1@1: Which ability typically declines most clearly with age? | Processing speed | Vocabulary | General knowledge | Procedural skill | Speed declines gradually from early adulthood.
M2#psychology-u03-32-q2@2: Two 75-year-olds have similar brain changes on a scan, but one functions much better. Which concept may explain this? | Cognitive reserve | Proactive interference | The Flynn effect | Functional fixedness | Greater reserve may buffer against brain changes.
TF2#psychology-u03-32-q3@2: Dementia is a normal, inevitable part of ageing. | false | Dementia is a disease process, not normal ageing.
NUM2#psychology-u03-32-q4@2: The Lancet Commission estimated about what percentage of dementia cases might be linked to modifiable risk factors? | 40 | 5 | % | Around 40% worldwide, a population-level estimate, not an individual guarantee.
M3#psychology-u03-32-q5@3: Why must the 40% estimate be interpreted carefully? | It is a population estimate from observational data | It was made up | It applies to every person exactly | It covers only one country | Risk factor estimates can't promise individual outcomes or prove causation.
SA3#psychology-u03-32-q6@3: Evaluate research on cognitive ageing. | Cross-sectional versus longitudinal designs (cohort effects, practice effects); evidence of decline in speed and memory, stability of knowledge; Lothian cohorts; processing speed and reserve theories; lifestyle evidence is mainly observational; implications for policy and individuals. | Methods ; Findings ; Theories ; Lifestyle evidence ; Judgement
`;
