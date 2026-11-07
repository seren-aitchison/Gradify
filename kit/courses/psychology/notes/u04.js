// School 4: Learning and Behaviour. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md), with evidence
// status (EV:) and questions at three levels in every lesson. Explanations are original; sources are those used and
// cited for checking, pending human verification (qa.js). Level: A level to first-year undergraduate.
export default `
## Classical conditioning
LV: Introductory · Foundation
S: Classical conditioning is learning by association: a neutral stimulus comes to trigger a response after being paired with a stimulus that triggers it naturally. This lesson explains Pavlov's discovery, the key terms and the Little Albert study.
O: Define the key terms of classical conditioning: UCS, UCR, NS, CS and CR
O: Apply the terms to identify the elements of a conditioning example
O: Evaluate the Little Albert study, including its ethics
H: Pavlov's discovery
P: Ivan Pavlov, a Russian physiologist who won the 1904 Nobel Prize for work on digestion, noticed that dogs began salivating before food arrived, at the sight of the person who fed them. He studied this systematically: a sound (such as a metronome or bell) was presented just before food, many times. Eventually the sound alone produced salivation (Pavlov, 1927).
H: The terms
- **Unconditioned stimulus (UCS)**: triggers a response without learning (food).
- **Unconditioned response (UCR)**: the natural response to the UCS (salivating to food).
- **Neutral stimulus (NS)**: produces no relevant response at first (the bell).
- **Conditioned stimulus (CS)**: the former NS, after pairing with the UCS.
- **Conditioned response (CR)**: the learned response to the CS (salivating to the bell).
IX: classical
K: In classical conditioning, repeated pairing of a neutral stimulus with an unconditioned stimulus makes it a conditioned stimulus that triggers a conditioned response.
X: Little Albert (Watson and Rayner, 1920)
> An 11-month-old infant showed no fear of a white rat (NS).
> Each time he touched the rat, a steel bar was struck loudly behind him (UCS), causing fear (UCR).
> After seven pairings, the rat alone produced crying and avoidance (CS and CR), and the fear generalised to similar objects such as a rabbit and a fur coat.
H: Evaluation
P: The study suggested phobias could be learned, which later supported behaviour therapies. But it was a single case, the fear was never removed before Albert left, the measures were informal, and it would be judged unethical today. Historians have also debated who Albert was. Modern accounts see classical conditioning as learning that one event predicts another, not just a reflex link (Rescorla, 1988).
!: Mixing up UCS and CS. Ask: did this stimulus trigger the response before any learning? If yes, it is unconditioned.
EV: established | Classical conditioning has been demonstrated reliably across many species and responses.
EV: contested | How far human phobias are acquired through direct conditioning, rather than observation, information or preparedness, is debated.
T: Unconditioned stimulus | A stimulus that triggers a response without learning
T: Conditioned stimulus | A formerly neutral stimulus that triggers a response after pairing with an unconditioned stimulus
T: Conditioned response | The learned response to a conditioned stimulus
SUM: Pairing a neutral stimulus with an unconditioned stimulus makes it a conditioned stimulus.
SUM: Little Albert suggested fears can be learned, but the study was a poorly controlled, unethical single case.
SRC: Pavlov I. P., Conditioned Reflexes, trans. G. V. Anrep, Oxford University Press | primary | 1927
SRC: Watson J. B. and Rayner R., "Conditioned emotional reactions", Journal of Experimental Psychology 3(1):1–14 | primary | 1920 | https://doi.org/10.1037/h0069608
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 6.2 "Classical conditioning" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/6-2-classical-conditioning
Q: What is an unconditioned stimulus? | A stimulus that triggers a response without any learning, such as food causing salivation.
Q: In the Little Albert study, what was the conditioned stimulus? | The white rat.
M1#psychology-u04-01-q1@1: In Pavlov's experiment, salivation to the bell after conditioning is the… | Conditioned response | Unconditioned response | Unconditioned stimulus | Neutral stimulus | It is learned, and triggered by the bell, so it is the conditioned response.
M2#psychology-u04-01-q2@2: A child is stung by a wasp in a garden and afterwards feels anxious in that garden. What is the conditioned stimulus? | The garden | The sting | The pain of the sting | The anxiety | The garden was neutral until paired with the sting (UCS); now it triggers anxiety (CR).
MATCH1#psychology-u04-01-q3@2: Match each element of the Little Albert study to its term. | The loud noise = Unconditioned stimulus ; Fear of the noise = Unconditioned response ; The white rat after pairing = Conditioned stimulus ; Fear of the rat = Conditioned response | The rat became a conditioned stimulus after pairing with the noise.
M3#psychology-u04-01-q4@3: Which is the strongest methodological criticism of the Little Albert study? | It was a single, poorly measured case | It used too many participants | It took place outside a laboratory | It studied adults rather than infants | One infant, informal observations and no follow-up limit what can be concluded.
SA3#psychology-u04-01-q5@2,3: Evaluate the Little Albert study as evidence that phobias are learned. | It showed fear could be conditioned to a neutral object and generalise, supporting a learning account of phobias and later therapies. But it was one infant, with informal measures, no removal of fear and serious ethical problems; many phobias have no conditioning history, and preparedness and observation also contribute. | Describes the study ; Support for learning ; Single case or measures ; Ethics ; Alternative explanations

## Acquisition and extinction
LV: Introductory · Foundation
S: Acquisition is the phase in which a conditioned response is learned; extinction is its gradual weakening when the conditioned stimulus is no longer followed by the unconditioned stimulus. This lesson explains both, and what affects how fast they happen.
O: Describe acquisition and extinction in classical conditioning
O: Explain how timing, intensity and prediction error affect acquisition
O: Evaluate the claim that extinction erases the original learning
PRE: Classical conditioning
H: Acquisition
P: During **acquisition**, the conditioned response strengthens over repeated CS–UCS pairings. Learning is fastest early on and then levels off (a negatively accelerated curve). It is typically strongest when:
- the CS comes **shortly before** the UCS (forward conditioning), rather than after it;
- the UCS is **intense**;
- the CS reliably **predicts** the UCS. Rescorla (1968) showed that pairing alone isn't enough: if the UCS also happens without the CS, little learning occurs.
P: The Rescorla–Wagner model (1972) describes this formally: learning on each trial is proportional to the **prediction error**, the difference between what happens and what was expected. As the CS comes to predict the UCS, error shrinks and so does learning.
IX: classical
H: Extinction
P: In **extinction**, the CS is presented repeatedly without the UCS, and the CR gradually weakens. Pavlov's dogs stopped salivating to a bell that was never followed by food.
K: Acquisition builds a CR when the CS reliably predicts the UCS; extinction weakens it when the prediction fails, but the original learning is not erased.
X: Is extinction forgetting?
> After extinction, the CR can return if time passes (spontaneous recovery).
> It can return if the CS is met in a different context from the one where extinction happened (renewal).
> It returns faster than it was first learned if pairings resume (reacquisition).
> So extinction is new learning that inhibits the old association (Bouton, 2004).
!: Thinking extinction means the association has been unlearned. The evidence shows it is suppressed by new learning, which is why relapse is common after exposure therapy.
EV: established | Acquisition depends on the CS predicting the UCS, not just on pairing (Rescorla, 1968).
EV: established | Extinguished responses can return through spontaneous recovery, renewal and reinstatement, so extinction is new learning.
T: Acquisition | The phase in which a conditioned response is learned through CS–UCS pairings
T: Extinction | The weakening of a conditioned response when the CS is presented without the UCS
T: Prediction error | The difference between what an organism expects and what actually happens
SUM: Acquisition is fastest when the CS reliably predicts an intense UCS; learning is driven by prediction error.
SUM: Extinction weakens the CR through new learning; the original association remains.
SRC: Rescorla R. A., "Probability of shock in the presence and absence of CS in fear conditioning", Journal of Comparative and Physiological Psychology 66(1):1–5 | primary | 1968 | https://doi.org/10.1037/h0025984
SRC: Bouton M. E., "Context and behavioral processes in extinction", Learning & Memory 11(5):485–494 | primary | 2004 | https://doi.org/10.1101/lm.78804
Q: What is extinction in classical conditioning? | The weakening of a CR when the CS is repeatedly presented without the UCS.
Q: What did Rescorla (1968) show about acquisition? | Pairing alone isn't enough: the CS must predict the UCS; if the UCS also occurs without the CS, little learning happens.
M1#psychology-u04-02-q1@1: When does acquisition usually happen fastest? | Early in training | Late in training | Only after extinction | Only when the UCS is weak | Learning curves are negatively accelerated: big gains at first, then levelling off.
M2#psychology-u04-02-q2@2: Food arrives after a tone on half of trials, and just as often with no tone. What does Rescorla's research predict? | Little conditioning to the tone | Strong conditioning to the tone | Immediate extinction | Spontaneous recovery | The tone doesn't predict food better than its absence, so little learning occurs.
TF2#psychology-u04-02-q3@3: Extinction erases the original conditioned association. | false | Spontaneous recovery, renewal and fast reacquisition show the association survives, inhibited by new learning.
M3#psychology-u04-02-q4@3: Which finding best supports the view that extinction is new learning? | A fear returns when the CS is met in a new context | The CR weakens over trials without the UCS | Acquisition is faster with an intense UCS | Forward pairing works better than backward | Renewal in a new context shows the original association was suppressed, not lost.
SA3#psychology-u04-02-q5@2,3: Explain why extinction is described as new learning, and what this means for treating phobias. | After extinction, responses return with time (spontaneous recovery), in new contexts (renewal) and quickly on re-pairing, so the old association remains and is inhibited. For phobias, exposure therapy can be followed by relapse; practising exposure in varied contexts and over time may help maintain gains. | Definition of extinction ; Spontaneous recovery or renewal ; Old association remains ; Implication for therapy

## Spontaneous recovery
LV: Introductory · Application
S: Spontaneous recovery is the reappearance of an extinguished conditioned response after a rest period. This lesson explains the phenomenon, why it happens and why it matters for relapse after treatment.
O: Define spontaneous recovery
O: Explain why spontaneous recovery occurs, with reference to extinction as new learning
O: Analyse the implications of spontaneous recovery for relapse
PRE: Acquisition and extinction
H: The phenomenon
P: Pavlov found that after a conditioned response had been extinguished, it often reappeared, usually weaker, when the CS was presented again after a rest of hours or days. This is **spontaneous recovery**. Repeated extinction sessions reduce it further.
H: Why it happens
P: If extinction erased the association, nothing could recover. Instead, extinction creates a second, inhibitory memory ("the CS now means no UCS") that is more fragile and more dependent on time and context than the original. With the passage of time, the extinction memory weakens relative to the original, so the CR re-emerges (Bouton, 2004). The Rescorla–Wagner model, which treats extinction as unlearning, can't predict this, which is one of its known limits.
IX: classical
P: Spontaneous recovery has also been found in operant conditioning: an extinguished lever press returns at the start of a new session.
K: Spontaneous recovery shows extinction suppresses rather than erases learning, so learned responses can return after time passes.
X: Relapse after exposure therapy
> A person's spider phobia is extinguished through repeated exposure in a therapist's room.
> Weeks later, meeting a spider at home, some fear returns: spontaneous recovery and renewal combined.
> Booster sessions and practising in many settings strengthen the extinction memory.
!: Treating spontaneous recovery as a failure of the experiment or therapy. It is a predictable property of extinction learning.
EV: established | Extinguished responses commonly recover after a rest period.
EV: contested | The exact mechanism (memory retrieval, context change over time, or both) is still researched.
T: Spontaneous recovery | The reappearance of an extinguished conditioned response after a rest period
T: Renewal | The return of an extinguished response when the CS is met outside the extinction context
SUM: Extinguished responses can return after time passes: spontaneous recovery.
SUM: This shows extinction is new, fragile learning and explains some relapse after treatment.
SRC: Pavlov I. P., Conditioned Reflexes, trans. G. V. Anrep, Oxford University Press | primary | 1927
SRC: Bouton M. E., "Context and behavioral processes in extinction", Learning & Memory 11(5):485–494 | primary | 2004 | https://doi.org/10.1101/lm.78804
Q: What is spontaneous recovery? | The reappearance of an extinguished conditioned response after a rest period.
Q: What does spontaneous recovery show about extinction? | That extinction suppresses the original learning rather than erasing it.
M1#psychology-u04-03-q1@1: Spontaneous recovery happens… | After a rest following extinction | During the first acquisition trials | Only when the UCS is doubled | Only in humans | It is the return of the CR when the CS is presented after time has passed.
M2#psychology-u04-03-q2@2: A dog's salivation to a bell is extinguished on Monday. On Tuesday the bell produces some salivation again. This is… | Spontaneous recovery | Stimulus generalisation | Higher-order conditioning | Habituation | The CR has returned after a rest, without new pairings.
TF2#psychology-u04-03-q3@1,2: The Rescorla–Wagner model successfully predicts spontaneous recovery. | false | Because it treats extinction as unlearning, it can't predict recovery, one of its known limitations.
M3#psychology-u04-03-q4@3: What is the most useful practical implication of spontaneous recovery for therapy? | Plan for relapse with booster sessions and varied practice | Stop therapy once fear first disappears | Avoid exposure therapy altogether | Use punishment instead of exposure | Because fear can return, maintaining and generalising extinction learning helps prevent relapse.
SA3#psychology-u04-03-q5@3: Explain spontaneous recovery and analyse what it shows about learning. | After extinction, a CR returns after a rest. This implies the original association remains, with extinction as a weaker, time- and context-dependent inhibitory memory. Models treating extinction as unlearning (Rescorla–Wagner) can't explain it. Practically, it predicts relapse after exposure therapy, so booster sessions and varied contexts help. | Definition ; Evidence that learning remains ; Limitation of a model ; Therapy implication

## Generalisation and discrimination
LV: Introductory · Application
S: Generalisation is responding to stimuli similar to the conditioned stimulus; discrimination is learning to respond only to the conditioned stimulus. This lesson explains both and their part in fears and everyday learning.
O: Define stimulus generalisation and discrimination
O: Explain the generalisation gradient and how discrimination training works
O: Apply generalisation and discrimination to anxiety and everyday behaviour
PRE: Classical conditioning
H: Generalisation
P: After conditioning, stimuli similar to the CS also produce the CR, more weakly the less similar they are. Plotting response strength against similarity gives a **generalisation gradient**. Little Albert's fear spread from the rat to a rabbit and a fur coat. Generalisation is adaptive: a predator rarely looks exactly the same twice.
H: Discrimination
P: In **discrimination training**, one stimulus is followed by the UCS (CS+) and a similar one is not (CS−). The organism learns to respond to the CS+ but not the CS−. Pavlov trained dogs to tell apart tones of different pitch; when the discrimination became too hard, some dogs became agitated, which he called "experimental neurosis".
P: Generalisation also occurs in operant learning: a child praised for tidying their bedroom may also tidy the living room.
K: Generalisation spreads a learned response to similar stimuli; discrimination narrows it to the stimulus that actually predicts the outcome.
X: Overgeneralised fear
> After a car accident on a motorway, someone fears all motorways (generalisation).
> Fear then spreads to dual carriageways and being a passenger.
> Over-generalised fear is a feature of anxiety disorders; treatment helps people learn which situations are truly dangerous (discrimination).
!: Confusing generalisation with spontaneous recovery. Generalisation is about similar stimuli; spontaneous recovery is about time after extinction.
EV: established | Conditioned responses generalise to similar stimuli in graded fashion.
EV: contested | Whether overgeneralisation of fear is a cause or a consequence of anxiety disorders is still researched.
T: Stimulus generalisation | Responding to stimuli similar to the conditioned stimulus
T: Stimulus discrimination | Responding to the conditioned stimulus but not to similar stimuli
T: Generalisation gradient | The decline in response strength as stimuli become less similar to the CS
SUM: Generalisation spreads responses to similar stimuli; discrimination limits them to the predictive one.
SUM: Overgeneralisation of fear is linked to anxiety; discrimination learning helps reverse it.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 6.2 "Classical conditioning" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/6-2-classical-conditioning
SRC: Dymond S. et al., "Fear generalization in humans: systematic review and implications for anxiety disorder research", Behavior Therapy 46(5):561–582 | primary | 2015 | https://doi.org/10.1016/j.beth.2014.10.001
Q: What is stimulus generalisation? | Responding to stimuli similar to the conditioned stimulus.
Q: How is discrimination trained? | One stimulus (CS+) is paired with the UCS and a similar one (CS−) is not, so the response becomes specific to the CS+.
M1#psychology-u04-04-q1@1: Little Albert's fear of a fur coat is an example of… | Stimulus generalisation | Stimulus discrimination | Extinction | Spontaneous recovery | The fear spread from the rat to a similar furry object.
M2#psychology-u04-04-q2@2: A dog salivates to a high tone that predicts food but not to a low tone that never does. This shows… | Discrimination | Generalisation | Habituation | Extinction | Responding to the predictive stimulus but not a similar one is discrimination.
TF1#psychology-u04-04-q3@1: The more similar a stimulus is to the CS, the stronger the generalised response tends to be. | true | This is the generalisation gradient.
M3#psychology-u04-04-q4@3: Why might overgeneralisation of fear be a problem in anxiety disorders? | It spreads fear to safe situations | It makes fear disappear too quickly | It prevents any learning about danger | It only affects fears of animals | Fear spreading to safe situations widens avoidance and distress, a pattern seen in anxiety disorders.
SA3#psychology-u04-04-q5@2,3: Explain generalisation and discrimination using an example of a fear. | Example: after being bitten by a large dog, a child fears all dogs (generalisation), more strongly for large dogs (gradient). Through safe experiences with friendly dogs, the child learns to fear only threatening dogs (discrimination). Overgeneralisation features in anxiety; treatment builds discrimination. | Example ; Generalisation ; Gradient ; Discrimination ; Link to anxiety or treatment

## Operant conditioning
LV: Introductory · Foundation
S: Operant conditioning is learning from consequences: behaviours followed by good outcomes become more frequent, and those followed by bad outcomes less frequent. This lesson explains Thorndike's law of effect and Skinner's experimental analysis of behaviour.
O: Describe the law of effect and the principles of operant conditioning
O: Explain how operant conditioning differs from classical conditioning
O: Evaluate Skinner's approach and its use of animal research
PRE: Behaviourism
H: The law of effect
P: Edward Thorndike (1898) placed hungry cats in puzzle boxes they could escape by pressing a lever or pulling a loop to reach food. Over trials, escape times fell gradually. He proposed the **law of effect**: responses followed by satisfying consequences become more likely; those followed by discomfort become less likely.
H: Skinner's analysis
P: B. F. Skinner (1938) studied **operant** behaviour, behaviour that operates on the environment, in an operant chamber (the "Skinner box") where rats pressed levers or pigeons pecked keys for food. He described consequences as **reinforcement** (increases behaviour) or **punishment** (decreases it), and measured learning by response rate.
H: Operant versus classical
- Classical conditioning links two **stimuli**; the learner's behaviour doesn't change what happens.
- Operant conditioning links a **behaviour** to its **consequence**; what the learner does matters.
- Classical responses are mostly involuntary (salivation, fear); operant behaviours are mostly voluntary (pressing, speaking, studying).
K: Operant conditioning changes voluntary behaviour through its consequences: reinforcement strengthens it and punishment weakens it.
X: A student and phone notifications
> Checking the phone (behaviour) is sometimes followed by an interesting message (reinforcement).
> Checking becomes more frequent: operant learning.
> The notification sound also becomes a conditioned stimulus for anticipation: classical and operant learning often work together.
H: Evaluation
P: Operant principles are reliable and widely applied, from classrooms to animal training. Criticisms: a strict focus on observable behaviour neglects cognition (Tolman's latent learning; Bandura's social learning); biological constraints limit what can be learned; and generalising from animals in boxes to complex human behaviour is limited.
!: Thinking operant conditioning only applies to animals. Much human behaviour, from studying to social media use, is shaped by its consequences.
EV: established | Behaviours followed by reinforcing consequences increase in frequency, across many species.
EV: contested | Whether operant principles can explain complex human behaviour without cognitive processes is debated.
T: Law of effect | Thorndike's principle that behaviours followed by satisfying consequences are more likely to recur
T: Operant conditioning | Learning in which behaviour is shaped by its consequences
T: Reinforcement | A consequence that increases the likelihood of a behaviour
SUM: Thorndike's law of effect and Skinner's research show behaviour is shaped by consequences.
SUM: Operant conditioning differs from classical in linking behaviour to consequence; it neglects cognition.
SRC: Thorndike E. L., "Animal intelligence: an experimental study of the associative processes in animals", Psychological Review Monograph Supplements 2(4) | primary | 1898 | https://doi.org/10.1037/h0092987
SRC: Skinner B. F., The Behavior of Organisms: An Experimental Analysis, Appleton-Century | primary | 1938
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 6.3 "Operant conditioning" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/6-3-operant-conditioning
Q: What is the law of effect? | Responses followed by satisfying consequences become more likely; those followed by discomfort become less likely (Thorndike).
Q: What is the key difference between classical and operant conditioning? | Classical links two stimuli; operant links a behaviour to its consequence.
M1#psychology-u04-05-q1@1: Who studied cats escaping from puzzle boxes? | Edward Thorndike | Ivan Pavlov | B. F. Skinner | John Watson | Thorndike's puzzle boxes led to the law of effect.
M2#psychology-u04-05-q2@2: A pupil answers questions more often after the teacher praises answers. Which kind of learning is this? | Operant conditioning | Classical conditioning | Habituation | Imprinting | The behaviour (answering) increases because of its consequence (praise).
MS2#psychology-u04-05-q3@2: Which are features of operant rather than classical conditioning? Choose all that apply. | Behaviour is followed by a consequence ; The learner's actions change what happens ; It mainly involves voluntary behaviour | Two stimuli are paired regardless of behaviour ; It mainly involves reflexes | Operant learning depends on consequences of voluntary actions.
M3#psychology-u04-05-q4@3: Which finding most challenges a purely operant account of learning? | Rats learned a maze without reward, showing it once rewarded | Reinforced behaviours increase in frequency | Punished behaviours decrease | Pigeons peck keys for food | Tolman's latent learning shows learning can occur without reinforcement, implying cognition.
SA3#psychology-u04-05-q5@3: Evaluate operant conditioning as an explanation of human behaviour. | Strengths: reliable principles; explains many habits; applications (token economies, behaviour modification, classroom management). Limitations: neglects cognition (latent learning, social learning); biological constraints; animal-to-human generalisation; ignores meaning and culture. | Principles ; Applications ; Cognitive critique ; Biological constraints ; Judgement

## Positive and negative reinforcement
LV: Introductory · Application
S: Reinforcement always increases behaviour. Positive reinforcement adds something pleasant; negative reinforcement removes something unpleasant. This lesson distinguishes the two, including escape and avoidance, and explains why negative reinforcement is often misunderstood.
O: Define positive and negative reinforcement
O: Classify examples of reinforcement correctly
O: Explain how negative reinforcement maintains avoidance in anxiety
PRE: Operant conditioning
H: Positive and negative
P: In operant terms, **positive** means something is **added** and **negative** means something is **removed**; neither means good or bad.
- **Positive reinforcement**: adding a pleasant stimulus after a behaviour increases it (praise, money, a sweet).
- **Negative reinforcement**: removing an unpleasant stimulus after a behaviour increases it (taking a painkiller removes a headache, so you take painkillers again).
P: Reinforcers can be **primary** (satisfying biological needs: food, warmth) or **secondary** (learned through association: money, grades, tokens).
IX: schedules
K: Reinforcement increases behaviour; positive reinforcement adds something pleasant, negative reinforcement removes something unpleasant.
H: Avoidance
X: Avoidance and anxiety
> Someone anxious about parties leaves early (behaviour) and their anxiety drops (unpleasant state removed).
> The relief negatively reinforces leaving, so they leave sooner next time, and later avoid parties altogether.
> Because they never stay, they never learn the party would have been fine: avoidance maintains the fear (Mowrer's two-process theory).
!: Confusing negative reinforcement with punishment. Negative reinforcement increases behaviour by removing something unpleasant; punishment decreases behaviour.
EV: established | Avoidance behaviour is maintained by relief from anxiety, a form of negative reinforcement.
EV: contested | Mowrer's two-process account of avoidance has been refined by cognitive theories involving expectations of threat.
T: Positive reinforcement | Adding a pleasant stimulus after a behaviour, which increases the behaviour
T: Negative reinforcement | Removing an unpleasant stimulus after a behaviour, which increases the behaviour
T: Secondary reinforcer | A stimulus that reinforces through learned association, such as money
SUM: Positive reinforcement adds something pleasant; negative reinforcement removes something unpleasant; both increase behaviour.
SUM: Negative reinforcement through relief explains why avoidance maintains anxiety.
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 6.3 "Operant conditioning" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/6-3-operant-conditioning
SRC: Mowrer O. H., "On the dual nature of learning: a re-interpretation of conditioning and problem-solving", Harvard Educational Review 17:102–148 | primary | 1947
Q: What does "negative" mean in negative reinforcement? | Something unpleasant is removed after the behaviour.
Q: Give an example of a secondary reinforcer. | Money, grades, tokens or praise (learned rather than biological).
M1#psychology-u04-06-q1@1: Which describes negative reinforcement? | Removing something unpleasant to increase a behaviour | Adding something unpleasant to decrease a behaviour | Removing something pleasant to decrease a behaviour | Adding something pleasant to increase a behaviour | Negative reinforcement still increases behaviour, by removing an aversive stimulus.
M2#psychology-u04-06-q2@2: A driver fastens their seatbelt to stop the car's beeping, and now buckles up straight away. This is… | Negative reinforcement | Positive reinforcement | Positive punishment | Negative punishment | Removing the unpleasant beeping increases buckling up.
MATCH2#psychology-u04-06-q3@2: Match each example to its process. | A child gets a sticker for reading = Positive reinforcement ; Taking a painkiller removes a headache = Negative reinforcement ; Leaving a party ends anxiety = Negative reinforcement ; A dog gets a treat for sitting = Positive reinforcement | Ask whether something is added or removed, and whether the behaviour increases.
M3#psychology-u04-06-q4@3: Why does avoidance tend to maintain anxiety? | Relief reinforces avoiding, blocking new learning | Avoidance is punished every time | Avoidance removes all learning | Anxiety is a positive reinforcer | Relief negatively reinforces avoidance and prevents the exposure that would extinguish fear.
SA3#psychology-u04-06-q5@2,3: Explain, with an example, how negative reinforcement can maintain a phobia. | Example: a person with a fear of lifts takes the stairs, and anxiety drops; the relief negatively reinforces avoiding lifts. Avoidance prevents exposure, so the fear is never extinguished. This explains why exposure therapy, which prevents avoidance, is effective. | Example ; Relief as removal of unpleasant state ; Behaviour increases ; Prevents extinction ; Link to treatment

## Punishment
LV: Introductory · Evaluation
S: Punishment is a consequence that decreases behaviour. Positive punishment adds something unpleasant; negative punishment removes something pleasant. This lesson explains both and why research suggests punishment is often less effective, and more harmful, than reinforcement.
O: Define positive and negative punishment
O: Explain the conditions under which punishment is most and least effective
O: Evaluate the use of physical punishment, with reference to evidence
PRE: Positive and negative reinforcement
H: Two kinds
- **Positive punishment**: adding an unpleasant stimulus after a behaviour, to decrease it (a reprimand, a fine).
- **Negative punishment**: removing a pleasant stimulus after a behaviour, to decrease it (losing phone time, time out from positive reinforcement).
H: When punishment works and fails
P: Punishment suppresses behaviour most when it is immediate, consistent and paired with reinforcement of an alternative behaviour. Its problems: it shows what not to do, not what to do; it can produce fear, anxiety and avoidance of the punisher; suppressed behaviour may return when the punisher is absent; and it models aggression.
K: Punishment decreases behaviour, but it is less effective than reinforcing alternatives and has side effects, especially physical punishment.
X: Two responses to a child's tantrum in a shop
> Positive punishment: shouting at the child. The tantrum may stop briefly, but the child learns little about what to do instead.
> Negative punishment plus reinforcement: calmly removing a privilege, and praising the child later when they ask calmly.
> Research favours the second approach.
H: Physical punishment
P: Meta-analyses have found physical punishment (spanking) associated with more child aggression, worse mental health and poorer parent–child relationships, and not with better long-term compliance (Gershoff, 2002; Gershoff and Grogan-Kaylor, 2016). Most of this evidence is correlational, so causation is inferred cautiously, but longitudinal studies controlling for earlier behaviour show similar patterns. Physical punishment of children was made unlawful in Scotland from 2020 and in Wales from 2022; in England a defence of "reasonable punishment" remains.
!: Equating negative punishment with negative reinforcement. Negative punishment decreases behaviour; negative reinforcement increases it.
EV: established | Physical punishment is associated with poorer child outcomes across many studies (Gershoff and Grogan-Kaylor, 2016).
EV: contested | How far the association reflects causation rather than other family factors continues to be examined, though longitudinal evidence points to harm.
T: Positive punishment | Adding an unpleasant stimulus after a behaviour to decrease it
T: Negative punishment | Removing a pleasant stimulus after a behaviour to decrease it
SUM: Positive punishment adds something unpleasant; negative punishment removes something pleasant; both decrease behaviour.
SUM: Punishment works best when immediate and paired with reinforcement of alternatives; physical punishment is linked to harm.
SRC: Gershoff E. T., "Corporal punishment by parents and associated child behaviors and experiences: a meta-analytic and theoretical review", Psychological Bulletin 128(4):539–579 | primary | 2002 | https://doi.org/10.1037/0033-2909.128.4.539
SRC: Gershoff E. T. and Grogan-Kaylor A., "Spanking and child outcomes: old controversies and new meta-analyses", Journal of Family Psychology 30(4):453–469 | primary | 2016 | https://doi.org/10.1037/fam0000191
SRC: Children (Equal Protection from Assault) (Scotland) Act 2019 | legislation | 2019 | https://www.legislation.gov.uk/asp/2019/16/contents
Q: What is negative punishment? | Removing a pleasant stimulus after a behaviour to decrease it, such as losing screen time.
Q: Name two side effects of punishment. | Any two of fear and anxiety, avoidance of the punisher, aggression modelled, behaviour returning when the punisher is absent, no alternative behaviour taught.
M1#psychology-u04-07-q1@1: Taking away a teenager's phone for breaking curfew is… | Negative punishment | Positive punishment | Negative reinforcement | Positive reinforcement | Removing something pleasant to decrease a behaviour is negative punishment.
M2#psychology-u04-07-q2@2: Which approach is most likely to reduce a pupil's shouting out in class? | Ignore shouting and praise hand-raising | Shout back each time | Punish only occasionally | Give sweets after shouting | Reinforcing an alternative behaviour while not reinforcing the problem behaviour is most effective.
TF2#psychology-u04-07-q3@2: Punishment works best when it is delayed for several hours. | false | Punishment is most effective when immediate and consistent.
M3#psychology-u04-07-q4@3: Which is the best evaluation of research on physical punishment? | Mostly correlational, but longitudinal studies also link it to harm | It proves physical punishment improves compliance | It shows no association with any outcome | It is based only on animal studies | Correlational designs limit causal claims, but longitudinal controls and consistent findings point to harm.
SA3#psychology-u04-07-q5@3: Evaluate the use of punishment to change children's behaviour. | Punishment can suppress behaviour if immediate and consistent, especially negative punishment combined with reinforcing alternatives. But it doesn't teach alternatives, causes fear and avoidance, models aggression, and behaviour returns without the punisher. Meta-analyses link physical punishment to poorer outcomes (Gershoff), mostly correlational but supported by longitudinal studies; several UK nations have banned it. | Conditions for effectiveness ; Side effects ; Evidence on physical punishment ; Methodological caution ; Alternative approach

## Schedules of reinforcement
LV: Intermediate · Application
S: Schedules of reinforcement are rules about which responses are reinforced. Ratio schedules depend on the number of responses and interval schedules on time; each can be fixed or variable. This lesson explains how schedules shape response patterns and resistance to extinction.
O: Describe continuous and partial schedules, including FR, VR, FI and VI
O: Explain the response patterns each schedule produces
O: Apply schedules of reinforcement to real-world behaviour, such as gambling
PRE: Positive and negative reinforcement
H: The schedules
- **Continuous reinforcement (CRF)**: every response is reinforced. Fast learning, fast extinction.
- **Fixed ratio (FR)**: reinforcement after a set number of responses (piecework pay). High rate, with a pause after each reinforcer.
- **Variable ratio (VR)**: after a varying number of responses averaging a set value (gambling machines). High, steady rate; very resistant to extinction.
- **Fixed interval (FI)**: the first response after a set time is reinforced (a weekly test). A "scallop": slow after reinforcement, speeding up as the time nears.
- **Variable interval (VI)**: the first response after a varying time (checking for messages). Moderate, steady rate.
IX: schedules
P: In everyday life schedules are often mixed: a salesperson may earn a basic wage (interval) plus commission (ratio).
K: Ratio schedules produce higher rates than interval schedules, and variable schedules produce steadier responding and greater resistance to extinction.
X: Why are gambling machines so compelling?
> They pay out on a variable ratio schedule: any play might win.
> The unpredictability sustains high, steady rates of play.
> Behaviour learned under partial reinforcement persists through long losing runs (the partial reinforcement extinction effect).
> Near-misses and sounds may act as additional conditioned reinforcers.
H: Partial reinforcement extinction effect
P: Behaviour reinforced only some of the time persists longer in extinction than behaviour reinforced every time. One explanation: under partial reinforcement, unrewarded responses are part of the normal pattern, so it takes longer to detect that rewards have stopped.
!: Thinking continuous reinforcement produces the most durable behaviour. It produces the fastest learning but the fastest extinction.
EV: established | Different reinforcement schedules produce characteristic response patterns (Ferster and Skinner, 1957).
EV: contested | How far schedule effects explain problem gambling, compared with cognitive distortions and social factors, is debated.
T: Variable ratio schedule | Reinforcement after an unpredictable number of responses, averaging a set value
T: Fixed interval schedule | Reinforcement for the first response after a fixed period of time
T: Partial reinforcement extinction effect | Behaviour reinforced intermittently persists longer in extinction than behaviour reinforced every time
SUM: Schedules can be continuous or partial; partial schedules are ratio or interval, fixed or variable.
SUM: Variable ratio schedules give high, persistent responding, as in gambling.
SRC: Ferster C. B. and Skinner B. F., Schedules of Reinforcement, Appleton-Century-Crofts | primary | 1957
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 6.3 "Operant conditioning" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/6-3-operant-conditioning
Q: Which schedule is used by gambling machines? | Variable ratio.
Q: What pattern does a fixed interval schedule produce? | A scallop: slow responding after reinforcement, speeding up as the interval ends.
M1#psychology-u04-08-q1@1: Reinforcement after every fifth response is a… | Fixed ratio schedule | Variable ratio schedule | Fixed interval schedule | Variable interval schedule | A set number of responses is a fixed ratio (FR5).
M2#psychology-u04-08-q2@2: A student revises little after each fortnightly test and then crams just before the next. Which schedule does this resemble? | Fixed interval | Variable ratio | Continuous | Variable interval | Responding that rises as a predictable time approaches is the fixed-interval scallop.
MATCH2#psychology-u04-08-q3@1,2: Match each example to its schedule. | Being paid per item made = Fixed ratio ; A slot machine = Variable ratio ; A weekly pay cheque for attending = Fixed interval ; Checking email for an unpredictable reply = Variable interval | Ratio schedules depend on responses; interval schedules on time.
M3#psychology-u04-08-q4@3: Why is behaviour learned on a variable ratio schedule so hard to extinguish? | Unrewarded responses are normal, so a stop in rewards is hard to detect | Every response was reinforced during learning | The reinforcer was always delivered on time | Variable ratio schedules produce low response rates | The partial reinforcement extinction effect: unpredictability makes extinction slower.
SA3#psychology-u04-08-q5@2,3: Apply schedules of reinforcement to explain why some apps are hard to stop using. | Social media feeds and notifications deliver rewards (likes, interesting content) unpredictably: variable ratio (scrolling) and variable interval (checking). These produce high, steady responding resistant to extinction. Other factors, such as social needs and design features, also contribute. | Names schedules ; Explains unpredictability ; Response pattern ; Resistance to extinction ; Other factors

## Shaping
LV: Introductory · Application
S: Shaping is training a new behaviour by reinforcing successive approximations to it. This lesson explains how shaping works, how it is used with animals and people, and its limits.
O: Define shaping and successive approximations
O: Explain the steps of a shaping programme
O: Apply shaping to design a training plan
PRE: Operant conditioning
H: Successive approximations
P: Some behaviours are too complex to wait for. **Shaping** reinforces behaviours that are progressively closer to the target. Skinner shaped pigeons to turn in circles or peck specific keys by reinforcing small steps: first any head movement in the right direction, then larger turns, then only full turns.
H: Steps
- Define the target behaviour precisely.
- Start by reinforcing a behaviour the learner already does that is close to the target.
- Raise the criterion gradually, reinforcing only closer approximations.
- Don't move too fast (the behaviour breaks down) or too slowly (the learner gets stuck at an earlier step).
- Fade reinforcement once the behaviour is established, moving to a partial schedule.
K: Shaping builds new behaviours by reinforcing successive approximations, raising the criterion step by step.
X: Shaping a child's independent dressing
> Step 1: praise the child for holding out their arm for a sleeve.
> Step 2: praise for pushing an arm through.
> Step 3: praise for putting on the whole jumper with help only for the head.
> Step 4: praise for doing it alone. Praise then becomes occasional.
H: Uses and limits
P: Shaping is used in animal training, speech and language therapy, rehabilitation after injury and teaching skills to people with learning disabilities. Its limits: it requires careful observation and patience; a learner can be reinforced for an unintended behaviour; and much human learning happens faster through instruction and imitation than through shaping.
!: Reinforcing the final behaviour only. Shaping works precisely because intermediate steps are reinforced.
EV: established | Shaping by successive approximations reliably produces new behaviours in animals and humans.
EV: contested | How much everyday human skill learning depends on shaping, rather than instruction and observation, is debated.
T: Shaping | Training a new behaviour by reinforcing successive approximations to it
T: Successive approximations | Behaviours that are progressively closer to the target behaviour
SUM: Shaping reinforces successive approximations, raising the criterion gradually.
SUM: It is widely used in training and therapy, but needs patience and is not how all human learning happens.
SRC: Skinner B. F., Science and Human Behavior, Macmillan | primary | 1953
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 6.3 "Operant conditioning" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/6-3-operant-conditioning
Q: What is shaping? | Training a new behaviour by reinforcing successive approximations to it.
Q: What happens if the criterion is raised too fast in shaping? | The behaviour breaks down because the learner can't yet meet the new step.
M1#psychology-u04-09-q1@1: Reinforcing behaviours progressively closer to a target is called… | Shaping | Extinction | Generalisation | Habituation | Shaping reinforces successive approximations to a target behaviour.
M2#psychology-u04-09-q2@2: A speech therapist first praises a child for any sound, then only for "b", then for "ba", then for "ball". This is… | Shaping | Classical conditioning | Negative punishment | Spontaneous recovery | Reinforcing closer approximations to the word is shaping.
SEQ2#psychology-u04-09-q3@2: Put the steps of a shaping programme in order. | Define the target behaviour ; Reinforce a behaviour already close to the target ; Raise the criterion gradually ; Fade reinforcement to a partial schedule | Shaping starts from what the learner already does and moves step by step.
M3#psychology-u04-09-q4@3: Which is the main limitation of shaping as an account of human learning? | People often learn faster by instruction or imitation | It can't produce any new behaviours at all | It works only with punishment | It requires no reinforcement | People often learn complex skills by being told or shown, which shaping alone doesn't explain.
SA2#psychology-u04-09-q5@2,3: Design a shaping programme to teach a dog to ring a bell to go outside. | Target: ring the bell by the door. Reinforce looking at the bell, then moving towards it, then touching it with the nose, then touching it hard enough to ring. Raise the criterion gradually; then reinforce ringing only before going out; fade treats to a partial schedule. | Target defined ; Starting approximation ; Gradual steps ; Reinforcement timing ; Fading

## Behaviour modification
LV: Intermediate · Application
S: Behaviour modification applies learning principles to change behaviour, in schools, care settings, health and everyday life. This lesson explains functional assessment, token economies and modern positive behaviour support, and the ethical questions they raise.
O: Describe behaviour modification techniques, including functional assessment and token economies
O: Explain how a token economy works using operant principles
O: Evaluate behaviour modification, including ethical concerns
PRE: Positive and negative reinforcement
H: Techniques
- **Functional assessment**: identify the antecedents (A), behaviour (B) and consequences (C) to find what maintains a behaviour (the ABC model).
- **Reinforcement of alternative behaviours**: teach and reward a behaviour that serves the same function.
- **Extinction**: withhold the reinforcer that maintained the problem behaviour.
- **Token economies**: tokens (secondary reinforcers) earned for target behaviours and exchanged for backup rewards.
- **Self-management**: monitoring and reinforcing one's own behaviour, such as rewarding study sessions.
IX: abab
K: Behaviour modification changes behaviour by identifying what maintains it and changing antecedents and consequences, especially by reinforcing alternatives.
X: A functional assessment
> A pupil throws work on the floor (behaviour) when given a writing task (antecedent).
> They are then sent out of the room (consequence), escaping the task: negative reinforcement.
> Intervention: break the task into smaller steps, teach the pupil to ask for a break, and reinforce asking rather than throwing.
H: Token economies
P: Ayllon and Azrin (1968) used token economies in a psychiatric hospital: patients earned tokens for self-care and work tasks, increasing those behaviours. Token economies are now used in schools and youth settings. Critics note behaviour often declines when tokens stop, and that rewards can institutionalise people or undermine intrinsic motivation.
H: Ethics
P: Behaviour modification raises questions of consent, dignity and control, particularly for people with less power, such as children and people with learning disabilities. Aversive methods have caused harm. Modern **positive behaviour support** emphasises understanding the function of behaviour, improving quality of life and avoiding restrictive practices, and is recommended in UK guidance for people with learning disabilities whose behaviour challenges.
!: Assuming behaviour modification means punishment. Effective programmes rely mainly on reinforcing alternative behaviours.
EV: established | Token economies increase target behaviours while they are in place.
EV: contested | How well token economy gains last and generalise once rewards end is debated.
T: Functional assessment | Identifying the antecedents and consequences that maintain a behaviour
T: Token economy | A system in which tokens earned for target behaviours are exchanged for rewards
T: Positive behaviour support | An approach that understands the function of behaviour and improves quality of life without restrictive practices
SUM: Behaviour modification uses functional assessment and reinforcement to change behaviour.
SUM: Token economies work while in place; ethical practice favours positive behaviour support.
SRC: Ayllon T. and Azrin N. H., The Token Economy: A Motivational System for Therapy and Rehabilitation, Appleton-Century-Crofts | primary | 1968
SRC: National Institute for Health and Care Excellence, Challenging behaviour and learning disabilities: prevention and interventions (NG11) | guidance | 2015
Q: What does the ABC model stand for? | Antecedents, Behaviour and Consequences.
Q: What is a token economy? | A system where tokens earned for target behaviours are exchanged for backup rewards.
M1#psychology-u04-10-q1@1: In a token economy, tokens are… | Secondary reinforcers | Unconditioned stimuli | Punishers | Primary reinforcers | Tokens have value because they can be exchanged for rewards, making them secondary reinforcers.
M2#psychology-u04-10-q2@2: A child shouts to get attention, and adults always respond. Which intervention is most likely to help? | Attend to calm requests and stop rewarding shouting | Give more attention after shouting | Punish the child at random | Ignore the child completely at all times | Reinforcing an alternative that achieves the same function (attention) while extinguishing shouting works best.
TF2#psychology-u04-10-q3@3: Token economy gains always last after tokens are withdrawn. | false | Behaviour often declines when tokens stop, unless reinforcement is faded and natural reinforcers take over.
M3#psychology-u04-10-q4@3: Which is the strongest ethical concern about behaviour modification? | It can control less powerful people without consent | It is based on learning theory | It uses observation of behaviour | It aims to teach new skills | The concern is about power and consent, especially with children and people with learning disabilities.
SA3#psychology-u04-10-q5@3: Evaluate the use of token economies. | Strengths: effective while in place (Ayllon and Azrin); clear, measurable; useful in schools and care. Weaknesses: gains may not last or generalise; may undermine intrinsic motivation; ethical issues of control and consent; positive behaviour support offers a more person-centred approach. | Evidence of effectiveness ; Practical strengths ; Maintenance problem ; Motivation or ethics ; Alternative approach
## Observational learning
LV: Introductory · Foundation
S: Observational learning is learning by watching others, without needing to perform the behaviour or be reinforced directly. This lesson explains the Bobo doll studies and what they showed about learning and aggression.
O: Define observational learning
O: Describe the procedure and findings of Bandura, Ross and Ross (1961)
O: Evaluate the Bobo doll studies, including their validity
PRE: Operant conditioning
H: Learning without doing
P: Conditioning theories implied that behaviour must be performed and reinforced to be learned. Albert Bandura showed that people, especially children, learn a great deal simply by watching others: **observational learning**. This is far more efficient than trial and error, and essential for learning dangerous or complex skills.
H: The Bobo doll study
P: Bandura, Ross and Ross (1961) studied 72 children aged about 3 to 6. Some watched an adult attack an inflatable Bobo doll with specific novel actions (hitting it with a mallet, saying "Pow!"); some watched a non-aggressive adult; a control group saw no model. After being mildly frustrated, children were observed playing. Those who had seen the aggressive model reproduced many of the specific aggressive acts; those who saw the non-aggressive model or no model showed little. Boys imitated physical aggression more than girls, and imitation of same-sex models was somewhat stronger.
K: Children can learn specific new behaviours, including aggression, simply by observing a model, without being reinforced.
X: Why the novel actions matter
> The aggressive model used unusual acts, such as hitting the doll with a mallet while saying set phrases.
> When children later used these exact acts, they could only have learned them from the model.
> This shows imitation of specific behaviour, not just a general increase in arousal.
H: Evaluation
P: Strengths: controlled experiment with a control group; clear evidence of imitation. Limitations: a Bobo doll is designed to be hit, so the aggression may be play, not real aggression (low ecological validity); demand characteristics (some children may have thought they were expected to hit it); short-term effects only; children were deliberately frustrated, raising ethical issues; and the sample came from one university nursery.
!: Concluding that watching violence always makes children violent. The studies show imitation of a specific behaviour in the short term, not long-term violence.
EV: established | Children imitate specific novel behaviours they have observed (Bandura, Ross and Ross, 1961).
EV: contested | How far media violence causes real-world aggression is debated; effects found in research are usually small and contested.
T: Observational learning | Learning by watching others' behaviour and its consequences
T: Model | A person whose behaviour is observed and may be imitated
SUM: Observational learning occurs without direct performance or reinforcement.
SUM: The Bobo doll studies showed imitation of specific acts, though their realism and ethics are questioned.
SRC: Bandura A., Ross D. and Ross S. A., "Transmission of aggression through imitation of aggressive models", Journal of Abnormal and Social Psychology 63(3):575–582 | primary | 1961 | https://doi.org/10.1037/h0045925
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 6.4 "Observational learning (modeling)" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/6-4-observational-learning-modeling
Q: What is observational learning? | Learning by watching others' behaviour and its consequences, without having to perform it or be reinforced directly.
Q: Why did the aggressive model in the Bobo doll study use novel actions? | So that if children copied them, it would show imitation of the model rather than general aggression.
M1#psychology-u04-11-q1@1: Who conducted the Bobo doll studies? | Albert Bandura | B. F. Skinner | Ivan Pavlov | Edward Thorndike | Bandura, Ross and Ross published the first study in 1961.
M2#psychology-u04-11-q2@2: After watching an older sibling, a child uses a new swear word they have never been rewarded for. What does this show? | Observational learning | Classical conditioning | Shaping | Habituation | The behaviour was learned by watching, without reinforcement.
TF2#psychology-u04-11-q3@2: In the 1961 study, children who saw a non-aggressive model showed little aggression towards the doll. | true | Aggression was mostly confined to those who had watched the aggressive model.
M3#psychology-u04-11-q4@3: What is the strongest criticism of the ecological validity of the Bobo doll studies? | The doll is made to be hit, so it may be play | The study used a control group | The children were observed carefully | The models' actions were standardised | Hitting a toy built for hitting may not reflect real aggression towards people.
SA3#psychology-u04-11-q5@2,3: Evaluate the Bobo doll studies as evidence for observational learning of aggression. | Strengths: controlled design with control group; children copied novel acts, showing imitation. Weaknesses: doll designed to be hit (play not aggression); demand characteristics; short-term; ethical issues (frustration, teaching aggression); narrow sample. Conclusion: strong evidence of imitation, weaker evidence of real-world aggression. | Procedure ; Imitation finding ; Validity criticism ; Ethical criticism ; Judgement

## Social learning theory
LV: Intermediate · Foundation
S: Bandura's social learning theory explains how people learn through observation, combining behaviourist ideas with cognitive processes. This lesson explains the four mediational processes and the concept of self-efficacy.
O: Describe the main assumptions of social learning theory
O: Explain the four mediational processes: attention, retention, reproduction and motivation
O: Evaluate social learning theory as a bridge between behaviourism and cognitive psychology
PRE: Observational learning
H: Assumptions
P: Bandura's **social learning theory** (1977) accepts that learning is shaped by the environment and consequences, but argues that much learning is **observational** and depends on **cognitive** processes. People don't simply react to reinforcement; they form expectations about the consequences of behaviour.
H: Mediational processes
- **Attention**: the learner must notice the model's behaviour.
- **Retention**: the behaviour must be remembered.
- **Reproduction**: the learner must be physically and mentally able to perform it.
- **Motivation**: the learner must expect the behaviour to be rewarded (or not punished).
P: Bandura distinguished **learning** (acquiring a behaviour) from **performance** (doing it): children may learn an aggressive act but perform it only if they expect reward.
K: Social learning theory explains learning through observation filtered by four mediational processes, so cognition sits between environment and behaviour.
X: Learning a football skill from a video
> Attention: the player watches a professional's free kick closely.
> Retention: they remember the run-up and foot position.
> Reproduction: they need enough skill and strength to try it.
> Motivation: they practise because they expect to score and be praised.
H: Self-efficacy and reciprocal determinism
P: Bandura later emphasised **self-efficacy**, belief in one's ability to succeed at a task, as a key influence on what people attempt and persist with (Bandura, 1977). He also proposed **reciprocal determinism**: behaviour, personal factors and the environment influence each other.
H: Evaluation
P: Strengths: explains learning without direct reinforcement; supported by experiments; widely applied in education, health promotion and media research. Limitations: it can't fully explain abilities that seem biologically prepared; the mediational processes are hard to measure directly; and it gives less weight to biological and developmental factors.
!: Thinking social learning theory rejects reinforcement. It keeps reinforcement but adds observation and expectation.
EV: established | Self-efficacy predicts persistence and performance across many domains.
EV: contested | How far social learning explains complex behaviour such as aggression compared with biological factors is debated.
T: Mediational processes | Attention, retention, reproduction and motivation: cognitive steps between observing and imitating
T: Self-efficacy | A person's belief in their ability to succeed at a particular task
T: Reciprocal determinism | Bandura's view that behaviour, personal factors and environment influence each other
SUM: Social learning theory combines observation, reinforcement and cognition through four mediational processes.
SUM: Self-efficacy and reciprocal determinism extend the theory; it underplays biology.
SRC: Bandura A., Social Learning Theory, Prentice-Hall | primary | 1977
SRC: Bandura A., "Self-efficacy: toward a unifying theory of behavioral change", Psychological Review 84(2):191–215 | primary | 1977 | https://doi.org/10.1037/0033-295X.84.2.191
Q: Name the four mediational processes. | Attention, retention, reproduction and motivation.
Q: What is self-efficacy? | A person's belief in their ability to succeed at a particular task.
M1#psychology-u04-12-q1@1: Which mediational process requires the learner to remember the observed behaviour? | Retention | Attention | Reproduction | Motivation | Retention is storing the behaviour in memory for later.
M2#psychology-u04-12-q2@2: A child watches a gymnast's routine but can't copy it because they lack the strength. Which process has failed? | Reproduction | Attention | Retention | Motivation | The child noticed and remembered, but lacks the physical ability to reproduce it.
SEQ1#psychology-u04-12-q3@2: Put Bandura's mediational processes in order. | Attention ; Retention ; Reproduction ; Motivation | A behaviour must be noticed, remembered, reproducible and expected to pay off.
M3#psychology-u04-12-q4@3: Why is social learning theory described as a bridge between behaviourism and cognitive psychology? | It keeps reinforcement but adds expectation | It rejects all environmental influences | It explains behaviour only through genes | It denies that people learn from others | It combines environmental learning with cognitive mediation.
SA3#psychology-u04-12-q5@3: Evaluate social learning theory. | Strengths: explains learning without direct reinforcement; mediational processes; experimental support; applications (self-efficacy in health and education). Weaknesses: underplays biology; mediational processes hard to measure; struggles with complex or prepared behaviours. Bridges behaviourism and cognition. | Key assumptions ; Mediational processes ; Evidence ; Biological critique ; Judgement

## Modelling and imitation
LV: Introductory · Application
S: Not all models are equally likely to be imitated. This lesson explains the characteristics of models and observers that make imitation more likely, and the role of identification.
O: Describe characteristics that make a model more likely to be imitated
O: Explain the role of identification in imitation
O: Apply ideas about modelling to media and health campaigns
PRE: Social learning theory
H: Who gets imitated?
P: People are more likely to imitate models who are:
- **similar** to themselves (in age, gender or background);
- **high status** or seen as competent;
- **rewarded** for the behaviour;
- **warm and nurturing**, or important to them.
P: **Identification** with a model, wanting to be like them, makes imitation more likely. Models can be **live** (a parent) or **symbolic** (a character on screen or a social media influencer).
H: Characteristics of observers
P: Observers who are uncertain, have low self-esteem or have been rewarded for imitating in the past imitate more. Children imitate more than adults, though adults also copy, for example in fashion, speech and professional skills.
K: Imitation is most likely when observers identify with similar, high-status or rewarded models.
X: Designing a vaccination campaign for young adults
> Use models who are similar to the audience (young adults), not only doctors.
> Show models being positively regarded for getting vaccinated (vicarious reinforcement).
> Make the behaviour easy to reproduce: show exactly how to book.
!: Assuming imitation is automatic. It depends on attention, the model's characteristics and expected consequences.
EV: established | Model similarity and status influence the likelihood of imitation.
EV: contested | How strongly social media influencers shape young people's behaviour, beyond what they already want, is debated.
T: Identification | Wanting to be like a model, which increases imitation
T: Symbolic model | A model encountered through media rather than in person
SUM: Models who are similar, high-status, rewarded or important are imitated more.
SUM: Identification makes imitation more likely; these principles inform media and health campaigns.
SRC: Bandura A., Social Learning Theory, Prentice-Hall | primary | 1977
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 6.4 "Observational learning (modeling)" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/6-4-observational-learning-modeling
Q: Name three characteristics of models that increase imitation. | Any three of similarity, high status or competence, being rewarded, warmth or importance to the observer.
Q: What is a symbolic model? | A model encountered through media, such as a TV character or influencer.
M1#psychology-u04-13-q1@1: Wanting to be like a model is called… | Identification | Habituation | Extinction | Shaping | Identification increases the chance of imitation.
M2#psychology-u04-13-q2@2: Which model is a 15-year-old most likely to imitate? | A popular student of the same age | An unknown adult stranger | A model who is punished | A cartoon of an object | Similarity, status and likely reward make imitation more likely.
TF2#psychology-u04-13-q3@2: Models who are punished for a behaviour are more likely to be imitated. | false | Seeing a model punished usually reduces performance of the behaviour (vicarious punishment).
M3#psychology-u04-13-q4@3: Which feature would most improve a stop-smoking campaign aimed at teenagers? | Teenage models shown gaining approval for not smoking | Only statistics read by an older expert | A model who is punished for exercising | Very long, detailed instructions | Similar models who are rewarded make imitation more likely.
SA2#psychology-u04-13-q5@2,3: Use modelling principles to design a campaign to increase recycling among university students. | Use student models (similarity), popular figures such as society leaders (status), shown being praised (vicarious reinforcement), demonstrating exact steps (reproduction), on platforms students use (attention). Evaluate by measuring recycling before and after. | Similar model ; Status or identification ; Vicarious reinforcement ; Reproduction ; Evaluation

## Vicarious reinforcement
LV: Introductory · Application
S: Vicarious reinforcement is learning about the consequences of behaviour by seeing what happens to others. This lesson explains Bandura's 1965 study and the difference between learning and performing a behaviour.
O: Define vicarious reinforcement and vicarious punishment
O: Explain Bandura's (1965) study and the learning–performance distinction
O: Evaluate the role of vicarious consequences in real-world behaviour
PRE: Social learning theory
H: Learning from others' consequences
P: **Vicarious reinforcement** occurs when an observer sees a model rewarded for a behaviour and becomes more likely to perform it. **Vicarious punishment** occurs when seeing a model punished makes the observer less likely to perform it.
H: Bandura (1965)
P: Children watched a film of an adult behaving aggressively towards a Bobo doll. In one condition the model was rewarded, in another punished, and in a third there were no consequences. Children who saw the model punished imitated less aggression. But when all children were then offered rewards for copying the model, the groups' imitation was similar. The children in the punished condition had **learned** the behaviour just as well; they had simply chosen not to **perform** it.
P: Vicarious consequences help explain why social norms spread: people watch what others are rewarded or criticised for, at school, at work and online.
K: Seeing others rewarded or punished changes whether we perform a behaviour, but not whether we learn it.
X: The learning–performance distinction at work
> Pupils see a classmate punished for copying homework.
> Most stop copying (vicarious punishment), but they have still learned how to copy.
> If they expect not to be caught, some may copy later.
!: Thinking vicarious punishment prevents learning. It reduces performance; the behaviour can still be learned.
EV: established | Observed consequences influence the performance of imitated behaviour (Bandura, 1965).
EV: contested | How far vicarious punishment deters crime, as public sentencing assumes, is debated.
T: Vicarious reinforcement | Increased likelihood of a behaviour after seeing a model rewarded for it
T: Vicarious punishment | Decreased likelihood of a behaviour after seeing a model punished for it
T: Learning–performance distinction | The difference between acquiring a behaviour and choosing to perform it
SUM: Seeing a model rewarded or punished changes the observer's likelihood of performing a behaviour.
SUM: Bandura (1965) showed punishment reduces performance, not learning.
SRC: Bandura A., "Influence of models' reinforcement contingencies on the acquisition of imitative responses", Journal of Personality and Social Psychology 1(6):589–595 | primary | 1965 | https://doi.org/10.1037/h0022070
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 6.4 "Observational learning (modeling)" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/6-4-observational-learning-modeling
Q: What is vicarious reinforcement? | An increase in a behaviour after seeing a model rewarded for it.
Q: What did Bandura (1965) show about children who saw the model punished? | They imitated less, but when offered rewards they showed they had learned the behaviour just as well.
M1#psychology-u04-14-q1@1: Seeing a classmate praised for helping, a pupil starts helping too. This is… | Vicarious reinforcement | Vicarious punishment | Negative reinforcement | Habituation | The pupil's behaviour increased after seeing a model rewarded.
M2#psychology-u04-14-q2@2: In Bandura (1965), what happened when children in all groups were offered rewards to copy the model? | Imitation was similar across groups | Only the rewarded group could imitate | Nobody imitated | The punished group imitated most | Rewards revealed that all groups had learned the behaviour; consequences had affected performance.
TF1#psychology-u04-14-q3@1: Vicarious punishment means the observer is punished directly. | false | The observer sees someone else punished.
M3#psychology-u04-14-q4@3: What does Bandura's (1965) study imply about deterring crime by publicising punishment? | It may reduce offending but not learning | It will stop people learning about crime | It has no effect on behaviour | It makes crime more rewarding | Vicarious punishment affects performance, not learning, so effects depend on expected consequences.
SA3#psychology-u04-14-q5@2,3: Explain the learning–performance distinction using Bandura's (1965) study. | Children watched a model rewarded, punished or with no consequences. Those who saw punishment imitated less, but when offered rewards all groups imitated similarly. So they had learned the behaviour equally; consequences affected whether they performed it. | Procedure ; Conditions ; First finding ; Reward phase ; Learning versus performance

## Latent learning
LV: Intermediate · Application
S: Latent learning is learning that occurs without reinforcement and stays hidden until there is a reason to show it. This lesson explains Tolman's maze studies and the idea of cognitive maps, which challenged strict behaviourism.
O: Define latent learning and cognitive maps
O: Describe Tolman and Honzik's (1930) study and its findings
O: Evaluate the significance of latent learning for theories of learning
PRE: Operant conditioning
H: Tolman and Honzik (1930)
P: Three groups of rats ran a complex maze daily. One group was always rewarded with food at the end; one was never rewarded; a third was not rewarded for the first ten days but was rewarded from day 11. The always-rewarded rats gradually made fewer errors. The never-rewarded rats improved little. The third group, once rewarded, improved dramatically, almost immediately matching or exceeding the always-rewarded group.
H: Cognitive maps
P: Tolman concluded the unrewarded rats had been learning the maze all along, but had no reason to show it: learning was **latent**. He proposed that rats form **cognitive maps**, mental representations of the layout of their environment (Tolman, 1948). This was a cognitive explanation within animal learning, at the height of behaviourism.
K: Latent learning shows that learning can occur without reinforcement; reinforcement affects performance rather than learning itself.
X: Latent learning in everyday life
> A passenger is driven to school every day without paying attention to the route.
> One day they need to walk there alone and find they know the way.
> They learned the route without reinforcement; the need to walk revealed it.
H: Evaluation
P: Strengths: a controlled experiment challenging the idea that reinforcement is necessary for learning; it paved the way for cognitive psychology, and later research found "place cells" in the rat hippocampus that encode location (O'Keefe and Nadel, 1978). Limitations: behaviourists argued the unrewarded rats received some reinforcement (such as being removed from the maze); and generalising from rats to humans needs care.
!: Saying the unrewarded rats didn't learn. They learned; they didn't perform until reinforcement gave them a reason.
EV: established | Rats show latent learning of maze layouts (Tolman and Honzik, 1930).
EV: contested | Whether latent learning requires cognitive maps or can be explained by subtle reinforcement was debated by behaviourists.
T: Latent learning | Learning that occurs without reinforcement and isn't shown until there is a reason
T: Cognitive map | A mental representation of the layout of an environment (Tolman)
SUM: Tolman and Honzik showed rats learned a maze without reward, revealed when reward was introduced.
SUM: Latent learning and cognitive maps challenged behaviourism and anticipated cognitive psychology.
SRC: Tolman E. C., "Cognitive maps in rats and men", Psychological Review 55(4):189–208 | primary | 1948 | https://doi.org/10.1037/h0061626
SRC: Tolman E. C. and Honzik C. H., "Introduction and removal of reward, and maze performance in rats", University of California Publications in Psychology 4:257–275 | primary | 1930
Q: What is latent learning? | Learning that occurs without reinforcement and isn't shown until there is a reason to show it.
Q: What is a cognitive map? | A mental representation of the layout of an environment.
M1#psychology-u04-15-q1@1: In Tolman and Honzik's study, when did the third group start receiving food? | From day 11 | From day 1 | Never | Only on the last day | The group was unrewarded for ten days, then rewarded from day 11.
M2#psychology-u04-15-q2@2: What did the third group's rapid improvement after day 11 show? | They had learned the maze without reward | Reward creates learning instantly | The maze had been made easier | The rats had been trained elsewhere | Their sudden improvement shows the learning had already happened.
TF2#psychology-u04-15-q3@2: Latent learning supports the idea that reinforcement is necessary for learning. | false | It shows learning occurs without reinforcement; reinforcement affects performance.
M3#psychology-u04-15-q4@3: Which later finding most supports Tolman's idea of cognitive maps? | Hippocampal place cells | Rats pressing levers for food | Dogs salivating to bells | Pigeons pecking keys on schedules | Place cells provide a neural basis for spatial representations like cognitive maps.
SA3#psychology-u04-15-q5@3: Evaluate the significance of Tolman's latent learning studies. | They showed learning without reinforcement, separated learning from performance and proposed cognitive maps, challenging behaviourism and anticipating cognitive psychology; supported by place cells. Limitations: possible subtle reinforcement; animal research generalisation. | Procedure ; Finding ; Cognitive maps ; Support from neuroscience ; Limitation

## Insight learning
LV: Intermediate · Application
S: Insight learning is the sudden solution of a problem through restructuring it mentally, rather than gradual trial and error. This lesson explains Köhler's studies of chimpanzees and research on insight in humans.
O: Define insight learning
O: Describe Köhler's studies with chimpanzees
O: Evaluate the evidence for insight as distinct from trial-and-error learning
PRE: Latent learning
H: Köhler's chimpanzees
P: Wolfgang Köhler, a Gestalt psychologist, studied chimpanzees on Tenerife during the First World War (*The Mentality of Apes*, 1925). In one problem, bananas hung out of reach and boxes lay around the enclosure. Köhler reported that a chimpanzee called Sultan, after unsuccessful attempts, paused and then stacked boxes to reach the fruit. In another, Sultan joined two short sticks to reach food beyond the bars.
H: What insight is
P: **Insight learning** is a sudden understanding of the relationships in a problem (an "aha" moment), leading to a solution that appears complete, is retained and transfers to similar problems. It contrasts with Thorndike's gradual trial-and-error learning. For Gestalt psychologists, insight involved **restructuring** the problem as a whole.
K: Insight learning is sudden problem solving by mentally restructuring the situation, contrasting with gradual trial and error.
X: Insight in humans
> In the nine-dot problem, people must join nine dots in a square with four straight lines without lifting the pen.
> Most fail because they assume lines must stay inside the square.
> The solution comes when they restructure the problem and extend lines beyond the square, often suddenly.
H: Evaluation
P: Strengths: showed that animals can solve problems in ways that look cognitive, and inspired research on human problem solving; brain imaging studies have found distinctive activity associated with moments of insight. Limitations: Köhler's chimpanzees may have used prior experience with boxes and sticks; later studies found that chimpanzees without prior play experience with sticks rarely solved such problems; and "suddenness" can hide earlier gradual learning.
!: Assuming insight means learning without any previous experience. Insight often recombines things learned earlier.
EV: established | People and some animals sometimes solve problems suddenly after impasse.
EV: contested | Whether insight is a distinct process or the end point of gradual learning is debated.
T: Insight learning | Sudden understanding of a problem's structure, leading to a complete solution
T: Restructuring | Mentally reorganising how a problem is represented, central to Gestalt accounts of insight
SUM: Köhler reported chimpanzees solving problems suddenly by insight.
SUM: Insight contrasts with trial and error, though prior experience may contribute.
SRC: Köhler W., The Mentality of Apes, Kegan Paul | primary | 1925
SRC: Kounios J. and Beeman M., "The cognitive neuroscience of insight", Annual Review of Psychology 65:71–93 | primary | 2014 | https://doi.org/10.1146/annurev-psych-010213-115154
Q: What is insight learning? | Sudden understanding of a problem's structure, leading to a complete solution.
Q: Which chimpanzee did Köhler describe stacking boxes to reach bananas? | Sultan.
M1#psychology-u04-16-q1@1: Köhler was a member of which school of psychology? | Gestalt psychology | Behaviourism | Psychoanalysis | Humanistic psychology | Köhler was a leading Gestalt psychologist, interested in perceiving problems as wholes.
M2#psychology-u04-16-q2@2: After struggling with a puzzle for an hour, a student suddenly sees the solution and can solve similar puzzles easily. This is… | Insight learning | Classical conditioning | Habituation | Latent learning | A sudden, complete, transferable solution is characteristic of insight.
TF2#psychology-u04-16-q3@1: Insight learning involves gradual improvement over many attempts, like Thorndike's cats. | false | Insight is sudden; Thorndike's cats showed gradual trial-and-error learning.
M3#psychology-u04-16-q4@3: What is the strongest criticism of Köhler's evidence for insight? | The apes may have used prior play experience | Köhler used too many chimpanzees | The problems were too easy for any animal | Köhler measured only reaction times | Later studies found prior play experience mattered, so "insight" may recombine earlier learning.
SA3#psychology-u04-16-q5@3: Evaluate the evidence that insight learning is different from trial-and-error learning. | For: Köhler's chimpanzees' sudden solutions; human "aha" experiences; neural markers of insight; transfer to similar problems. Against: prior experience may explain solutions; suddenness may hide gradual processes; animal evidence anecdotal. Conclusion: insight may be a real phenomenon built on earlier learning. | Köhler's evidence ; Human evidence ; Prior experience critique ; Gradual-learning critique ; Judgement

## Biological constraints on learning
LV: Intermediate · Evaluation
S: Not everything is equally easy to learn. This lesson explains how biology constrains learning, through taste aversion, preparedness and instinctive drift, and why this challenged behaviourism's assumption that any association can be learned.
O: Describe taste aversion, preparedness and instinctive drift
O: Explain how these findings challenge the principle of equipotentiality
O: Evaluate the evolutionary explanation of biological constraints
PRE: Classical conditioning
H: Taste aversion
P: Garcia and Koelling (1966) gave rats water that was both flavoured and accompanied by light and noise. Rats made ill afterwards (by radiation or a drug) learned to avoid the flavour but not the light and noise; rats given shocks learned to avoid the light and noise but not the flavour. Taste aversions also form after a single pairing, even with hours between taste and illness, breaking normal timing rules.
H: Preparedness and instinctive drift
P: Seligman (1970) proposed **preparedness**: species are biologically prepared to learn some associations easily (taste and illness; fear of snakes) and contra-prepared for others. Breland and Breland (1961), former students of Skinner who trained animals commercially, reported **instinctive drift**: raccoons trained to drop coins in a box began rubbing them together as they would wash food, and pigs began rooting them, even though this delayed reward.
K: Biology makes some associations easy and others hard to learn, contradicting the assumption that any stimulus can be linked equally well to any response.
X: Taste aversion in everyday life
> Someone eats a new dish and is sick hours later from an unrelated virus.
> They develop a lasting dislike of that dish after one experience, though they know it wasn't the cause.
> The aversion forms despite the long delay and their beliefs: a prepared association.
H: Evaluation
P: These findings undermined **equipotentiality**, the behaviourist assumption that all associations are learned equally easily, and supported an evolutionary view: associations that mattered for survival (food and poison, snakes and danger) are prepared. Applications include using taste aversion to protect livestock from predators and to reduce food aversions in chemotherapy. Limits: preparedness for human fears is debated; some "prepared" fears may be learned culturally.
!: Thinking biological constraints mean learning theory is wrong. They show learning operates within species-specific limits.
EV: established | Taste aversions are learned rapidly, sometimes after one pairing and long delays (Garcia and Koelling, 1966).
EV: contested | How strongly human phobias reflect evolved preparedness rather than cultural learning is debated.
T: Preparedness | A biological readiness to learn certain associations easily (Seligman)
T: Instinctive drift | The tendency of trained animals to revert to instinctive behaviours (Breland and Breland)
T: Equipotentiality | The behaviourist assumption that any stimulus can be associated equally easily with any response
SUM: Taste aversion, preparedness and instinctive drift show biology constrains learning.
SUM: They challenged equipotentiality and support an evolutionary account.
SRC: Garcia J. and Koelling R. A., "Relation of cue to consequence in avoidance learning", Psychonomic Science 4(3):123–124 | primary | 1966 | https://doi.org/10.3758/BF03342209
SRC: Seligman M. E. P., "On the generality of the laws of learning", Psychological Review 77(5):406–418 | primary | 1970 | https://doi.org/10.1037/h0029790
SRC: Breland K. and Breland M., "The misbehavior of organisms", American Psychologist 16(11):681–684 | primary | 1961 | https://doi.org/10.1037/h0040090
Q: What did Garcia and Koelling (1966) find? | Rats made ill learned to avoid a flavour but not light and noise; rats shocked avoided light and noise but not the flavour.
Q: What is instinctive drift? | The tendency of trained animals to revert to instinctive behaviours, even if this delays reward.
M1#psychology-u04-17-q1@1: Which researcher proposed the concept of preparedness? | Martin Seligman | John Garcia | Keller Breland | Wolfgang Köhler | Seligman's 1970 paper argued species are prepared to learn some associations.
M2#psychology-u04-17-q2@2: A trained pig keeps rooting coins along the ground instead of dropping them in a box. This illustrates… | Instinctive drift | Spontaneous recovery | Latent learning | Vicarious reinforcement | The pig reverted to instinctive foraging behaviour, as the Brelands reported.
TF2#psychology-u04-17-q3@1,2: Taste aversions can form after a single pairing, even with hours between food and illness. | true | This breaks the normal timing rules of classical conditioning.
M3#psychology-u04-17-q4@3: Why do biological constraints challenge behaviourism? | They contradict equipotentiality | They show that conditioning never occurs | They prove learning is entirely innate | They show reinforcement has no effect | Equipotentiality is undermined; learning depends on species-specific biology.
SA3#psychology-u04-17-q5@3: Evaluate the evolutionary explanation of biological constraints on learning. | Evidence: taste aversion (Garcia and Koelling), preparedness for snakes and spiders, instinctive drift. Evolutionary logic: associations important for survival are learned easily. Applications: livestock protection, chemotherapy. Limitations: human preparedness debated; cultural learning of fears; hard to know ancestral conditions. | Evidence ; Evolutionary logic ; Application ; Limitation ; Judgement

## Habituation and sensitisation
LV: Introductory · Foundation
S: Habituation and sensitisation are the simplest forms of learning: responding less to a repeated harmless stimulus, or more to stimuli after something intense. This lesson explains both, their biological basis and why they matter.
O: Define habituation and sensitisation
O: Explain the neural basis of habituation, with reference to research on Aplysia
O: Apply habituation and sensitisation to everyday experiences and research methods
PRE: Classical conditioning
H: Two simple forms of learning
P: **Habituation** is a decrease in response to a stimulus that is repeated and has no consequence: you stop noticing a ticking clock. It is stimulus-specific (a different sound still gets a response) and recovers with time. **Sensitisation** is an increase in response, often to a range of stimuli, after an intense or harmful stimulus: after a loud bang, you jump at small noises. Both are **non-associative** learning, because no link between two stimuli is formed.
H: The neural basis
P: Eric Kandel studied the sea slug *Aplysia*, whose gill-withdrawal reflex habituates when its siphon is touched repeatedly. He showed that habituation involves reduced neurotransmitter release at specific synapses, and that sensitisation involves increased release. This showed learning changes the strength of synapses, work recognised by the 2000 Nobel Prize in Physiology or Medicine.
K: Habituation reduces responses to repeated, harmless stimuli; sensitisation increases responses after intense ones; both change synaptic strength.
X: Habituation as a research tool
> Infants look less at a picture shown repeatedly (habituation).
> If a new picture brings renewed looking (dishabituation), the infant can tell the two apart.
> Researchers use this to study what babies perceive and know before they can speak.
H: Why it matters
P: Habituation saves attention for new information. Sensitisation prepares the organism for danger, and may contribute to chronic pain and anxiety, where nervous systems become oversensitive. Habituation is also one reason exposure to feared stimuli reduces fear.
!: Confusing habituation with sensory adaptation. Adaptation happens in sense organs (receptors stop responding); habituation is learning in the nervous system and can be reversed by a change in the stimulus.
EV: established | Habituation and sensitisation involve changes in synaptic transmission (Kandel's Aplysia research).
EV: contested | How much sensitisation processes contribute to chronic pain conditions is an active research question.
T: Habituation | A decrease in response to a repeated stimulus that has no consequence
T: Sensitisation | An increase in response following an intense or harmful stimulus
T: Dishabituation | Recovery of a habituated response when a new stimulus appears
SUM: Habituation decreases and sensitisation increases responding, without associations between stimuli.
SUM: Kandel showed both involve synaptic change; habituation is also used to study infant perception.
SRC: Thompson R. F. and Spencer W. A., "Habituation: a model phenomenon for the study of neuronal substrates of behavior", Psychological Review 73(1):16–43 | primary | 1966 | https://doi.org/10.1037/h0022681
SRC: Kandel E. R., "The molecular biology of memory storage: a dialogue between genes and synapses", Science 294(5544):1030–1038 | primary | 2001 | https://doi.org/10.1126/science.1067020
Q: What is habituation? | A decrease in response to a repeated stimulus that has no consequence.
Q: Why are habituation and sensitisation called non-associative learning? | Because no link between two stimuli, or between behaviour and consequence, is formed.
M1#psychology-u04-18-q1@1: Which animal did Kandel use to study habituation? | The sea slug Aplysia | The pigeon | The chimpanzee | The rat | Aplysia's simple nervous system allowed synaptic changes to be studied directly.
M2#psychology-u04-18-q2@2: After a near-miss in a car, a driver startles at every horn for days. This is… | Sensitisation | Habituation | Extinction | Latent learning | An intense experience increased responsiveness to other stimuli.
TF2#psychology-u04-18-q3@3: In infant research, renewed looking at a new picture after habituation suggests the infant can tell the pictures apart. | true | Dishabituation shows discrimination between the old and new stimulus.
M3#psychology-u04-18-q4@3: How does habituation differ from sensory adaptation? | Habituation is central learning and can dishabituate | They are the same process with different names | Sensory adaptation lasts for years | Habituation happens only in sense organs | Adaptation is receptor fatigue; habituation is central learning that dishabituates.
SA2#psychology-u04-18-q5@2,3: Explain how researchers use habituation to study infant perception. | Show an infant a stimulus repeatedly until looking time drops (habituation). Then show a new stimulus: if looking increases (dishabituation), the infant perceives a difference. This reveals perceptual and cognitive abilities before language, though interpreting looking time is debated. | Habituation phase ; Test stimulus ; Dishabituation as evidence ; What it reveals ; Limitation

## Habit formation
LV: Intermediate · Application
S: Habits are behaviours triggered automatically by context, after being repeated in that context. This lesson explains how habits form, what research says about how long they take, and how to use this to build or break them.
O: Define a habit and describe how habits differ from goal-directed behaviour
O: Explain the role of context, repetition and reward in habit formation
O: Apply habit research to design a strategy for behaviour change
PRE: Operant conditioning
H: What a habit is
P: A **habit** is a behaviour that is triggered automatically by a cue in a stable context, after repeated performance in that context. Unlike **goal-directed** behaviour, which depends on wanting an outcome, a habit continues even when the outcome no longer matters, such as reaching for a phone without wanting to check anything. Research in animals and humans links the shift from goal-directed to habitual control with different circuits in the basal ganglia.
H: How long do habits take?
P: Lally and colleagues (2010) asked 96 volunteers to repeat a new daily behaviour (such as eating fruit at lunch) and rate its automaticity. Automaticity rose in a curve that levelled off; the median time to reach the plateau was 66 days, with a very wide range (18 to 254 days). Missing a single day didn't seriously harm the process.
K: Habits form through repetition of a behaviour in a consistent context, until the context triggers it automatically; this takes weeks to months.
X: Building a revision habit
> Choose a stable cue: after dinner at the desk.
> Make the behaviour small and easy: 20 minutes of self-testing.
> Repeat daily in the same context; don't worry about missing one day.
> Over weeks, sitting at the desk after dinner starts to trigger revision automatically.
H: Breaking habits
P: Because habits are cued by context, they are hard to break by willpower alone. Strategies include changing or avoiding the cue, making the behaviour harder (friction), and replacing it with a new behaviour in response to the same cue. Changes of context, such as moving house, are windows when habits can change more easily (Wood and Neal, 2007).
!: Believing it takes "21 days" to form a habit. This popular figure has no solid basis; research shows it varies widely and often takes longer.
EV: established | Habit strength increases with repetition in a stable context (Lally et al., 2010).
EV: contested | The precise brain mechanisms of habit in humans, and how they differ from animal models, are still being researched.
T: Habit | A behaviour triggered automatically by a context cue after repeated performance
T: Goal-directed behaviour | Behaviour controlled by wanting a particular outcome
SUM: Habits are context-cued automatic behaviours, formed by repetition.
SUM: Formation took a median of 66 days in one study, with wide variation; breaking habits works best by changing cues.
SRC: Lally P. et al., "How are habits formed: modelling habit formation in the real world", European Journal of Social Psychology 40(6):998–1009 (online 2009, print 2010) | primary | 2009 | https://doi.org/10.1002/ejsp.674
SRC: Wood W. and Neal D. T., "A new look at habits and the habit–goal interface", Psychological Review 114(4):843–863 | primary | 2007 | https://doi.org/10.1037/0033-295X.114.4.843
Q: What is a habit? | A behaviour triggered automatically by a context cue after repeated performance in that context.
Q: What was the median time to reach peak automaticity in Lally et al. (2010)? | 66 days, with a range of 18 to 254 days.
M1#psychology-u04-19-q1@1: What triggers a habit? | A cue in a stable context | A conscious goal every time | A new, unfamiliar setting | Punishment after the behaviour | Habits are cued automatically by their usual context.
NUM2#psychology-u04-19-q2@2: In Lally et al. (2010), how many days was the median time to reach the plateau of automaticity? | 66 | 0 | days | The median was 66 days, though individuals ranged from 18 to 254.
M2#psychology-u04-19-q3@2: Someone wants to stop snacking while watching TV in the evening. Which strategy fits habit research best? | Remove snacks from beside the sofa | Rely on willpower each evening | Watch more TV to get used to it | Snack more to satisfy the craving | Habits are cue-driven, so changing the context or adding friction is effective.
M3#psychology-u04-19-q4@3: Why is the claim that habits take 21 days to form misleading? | Evidence shows formation varies widely and often takes much longer | Habits form instantly after one repetition | Habits can never be formed deliberately | Research shows exactly 21 days for everyone | Lally et al. found a median of 66 days and a range of 18 to 254.
SA3#psychology-u04-19-q5@2,3: Using research, explain how to build a new healthy habit. | Choose a specific behaviour and a stable cue (after breakfast); keep it simple; repeat daily in the same context; expect automaticity to grow over weeks to months (median 66 days, Lally et al., 2010); missing one day is fine; make cues visible and reduce friction. | Cue and context ; Repetition ; Evidence on timescale ; Practical tips ; Realistic expectations

## Applications of learning theory
LV: Intermediate · Evaluation
S: Learning theory has shaped therapy, education, parenting, health and the design of technology. This lesson reviews major applications and evaluates their evidence and ethics.
O: Describe applications of classical, operant and social learning theory
O: Explain how exposure therapy applies extinction
O: Evaluate the ethics and effectiveness of applying learning theory, including in technology design
PRE: Behaviour modification
H: Therapy
- **Systematic desensitisation** (Wolpe, 1958): pairing relaxation with a graded hierarchy of feared situations.
- **Exposure therapy**: confronting feared stimuli without escape so fear extinguishes; a core part of CBT for phobias, OCD and PTSD.
- **Aversion therapy**: pairing an unwanted behaviour with an unpleasant stimulus. It has been used for alcohol dependence, and historically, and harmfully, to try to change sexual orientation, a practice now condemned by professional bodies.
H: Education and parenting
P: Praise and feedback (operant reinforcement), modelling of skills and behaviours by teachers, classroom token systems and clear routines all apply learning principles. Parenting programmes based on social learning theory, which teach reinforcement of positive behaviour and consistent, non-harsh discipline, have good evidence for reducing children's conduct problems.
H: Technology
P: Variable rewards in apps and games, streaks, badges and notifications apply operant principles to keep users engaged. This can support learning and healthy habits, as in this course's XP and streaks, but can also encourage compulsive use. Debates about "persuasive" or "addictive" design concern whether techniques serve users' goals or exploit them.
K: Learning theory underpins exposure-based therapies, parenting programmes, education and technology design; its ethical use depends on consent and whose goals it serves.
X: Applying exposure therapy to a fear of dogs
> Build a hierarchy: pictures of dogs, a dog across the street, a calm dog on a lead, stroking a dog.
> Work up the hierarchy, staying in each situation until anxiety falls, without escaping.
> Fear extinguishes; practising in varied places and returning for booster sessions reduces relapse.
!: Treating these therapy descriptions as self-help instructions. Exposure therapy for clinical problems should be guided by a qualified practitioner.
EV: established | Exposure-based therapies are effective for specific phobias and other anxiety disorders.
EV: contested | Whether engagement techniques in apps cause harmful compulsive use, and how to regulate them, is debated.
T: Systematic desensitisation | Gradually pairing relaxation with feared situations in a hierarchy (Wolpe)
T: Exposure therapy | Confronting feared stimuli without escape so that fear extinguishes
T: Aversion therapy | Pairing an unwanted behaviour with an unpleasant stimulus to reduce it
SUM: Learning theory is applied in therapy, education, parenting and technology.
SUM: Exposure therapies and parenting programmes have strong evidence; aversion therapy and persuasive design raise ethical concerns.
SRC: Wolpe J., Psychotherapy by Reciprocal Inhibition, Stanford University Press | primary | 1958
SRC: Spielman R. M. et al., Psychology 2e, OpenStax, section 16.2 "Types of treatment" | secondary | 2020 | https://openstax.org/books/psychology-2e/pages/16-2-types-of-treatment
Q: What is systematic desensitisation? | Gradually pairing relaxation with a hierarchy of feared situations (Wolpe, 1958).
Q: Which learning process does exposure therapy rely on? | Extinction: confronting the feared stimulus without escape so fear weakens.
M1#psychology-u04-20-q1@1: Who developed systematic desensitisation? | Joseph Wolpe | B. F. Skinner | Albert Bandura | John Watson | Wolpe described systematic desensitisation in 1958, building on relaxation and hierarchies.
M2#psychology-u04-20-q2@2: A therapist helps a client with a fear of lifts ride one floor, then two, then ten, staying until anxiety falls each time. This applies… | Graded exposure and extinction | Aversion therapy | Vicarious punishment | Insight learning | Gradually confronting the feared situation without escape allows fear to extinguish.
TF2#psychology-u04-20-q3@3: Aversion therapy to change sexual orientation is endorsed by professional bodies today. | false | Such practices are condemned as harmful and ineffective by professional bodies.
M3#psychology-u04-20-q4@3: Which is the strongest ethical concern about engagement techniques in apps? | They can foster compulsive use that serves companies | They use principles from learning theory | They can support learning and habits | They give feedback to users | The concern is whose goals are served and whether users can meaningfully consent.
SA3#psychology-u04-20-q5@3: Evaluate the application of learning theory to therapy. | Strengths: exposure therapy and systematic desensitisation effective for phobias and anxiety; parenting programmes reduce conduct problems. Limitations: relapse (spontaneous recovery, renewal); symptom-focused, may neglect cognition (hence CBT); ethical problems with aversion therapy. Education only; clinical use requires a qualified practitioner. | Exposure evidence ; Other application ; Relapse ; Ethics ; Judgement
`;
