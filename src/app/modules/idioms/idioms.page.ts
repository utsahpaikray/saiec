import { Component } from '@angular/core';
interface Celebration {
  top: number;
  left: number;
  active: boolean;
  emoji: unknown
}
@Component({
  selector: 'app-idioms',
  templateUrl: './idioms.page.html',
  styleUrls: ['./idioms.page.scss']
})
export class IdiomsPage  {
  public idioms = [
      {
        "phrase": "A blessing in disguise",
        "explanation": "Something that seems bad or unlucky at first but results in something good happening later on.",
        "example": "Losing my job turned out to be a blessing in disguise because it pushed me to pursue my passion.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuYgGvgsDx7zgkCaZ3i_LfGV6qMakfz330f_eIZi346leQmD200LoIkKhQrGXHoZXgm4M&usqp=CAU"
      },
      {
        "phrase": "A dime a dozen",
        "explanation": "Something common and easy to get; plentiful and inexpensive.",
        "example": "In this area, cheap knockoffs are a dime a dozen."
      },
      {
        "phrase": "A piece of cake",
        "explanation": "Something very easy to do; not challenging at all.",
        "example": "After all the studying, the test was a piece of cake."
      },
      {
        "phrase": "Actions speak louder than words",
        "explanation": "What you do is more important than what you say; actions reveal true intentions or feelings.",
        "example": "She said she would help, but her actions speak louder than words."
      },
      {
        "phrase": "Bite the bullet",
        "explanation": "To endure a painful or difficult situation with courage and determination.",
        "example": "I have to bite the bullet and ask for a raise."
      },
      {
        "phrase": "Break the ice",
        "explanation": "To make a situation less tense or awkward; to initiate conversation in a social setting.",
        "example": "I tried to break the ice with a joke, but nobody laughed."
      },
      {
        "phrase": "Burn the midnight oil",
        "explanation": "To work late into the night; to study or work diligently late into the evening.",
        "example": "To finish the project on time, we had to burn the midnight oil."
      },
      {
        "phrase": "Cost an arm and a leg",
        "explanation": "To be very expensive; to require a high price.",
        "example": "Buying a new car can cost an arm and a leg."
      },
      {
        "phrase": "Curiosity killed the cat",
        "explanation": "Being too curious can lead to trouble or danger.",
        "example": "I'm curious about what's inside that box, but you know what they say, curiosity killed the cat."
      },
      {
        "phrase": "Don't put all your eggs in one basket",
        "explanation": "Don't risk everything on a single venture; diversify your investments or efforts.",
        "example": "Investing all your money in one stock is risky. Don't put all your eggs in one basket."
      },
      {
        "phrase": "Easy as pie",
        "explanation": "Very easy to do; not difficult at all.",
        "example": "Cooking this recipe is easy as pie."
      },
      {
        "phrase": "Feeling under the weather",
        "explanation": "Feeling unwell or sick.",
        "example": "I'm feeling under the weather today, so I'm going to stay home and rest."
      },
      {
        "phrase": "Hit the nail on the head",
        "explanation": "To describe or identify something exactly right; to be precisely accurate.",
        "example": "You hit the nail on the head with that comment. It's exactly what I was thinking."
      },
      {
        "phrase": "It's raining cats and dogs",
        "explanation": "Raining heavily; raining very hard.",
        "example": "We can't go outside right now, it's raining cats and dogs!"
      },
      {
        "phrase": "Jump on the bandwagon",
        "explanation": "To join or support something that has become popular or fashionable.",
        "example": "Many companies are jumping on the bandwagon and creating their own streaming services."
      },
      {
        "phrase": "Kill two birds with one stone",
        "explanation": "To accomplish two tasks with a single action or effort.",
        "example": "By carpooling, you can kill two birds with one stone: save money and reduce your carbon footprint."
      },
      {
        "phrase": "Let the cat out of the bag",
        "explanation": "To reveal a secret or disclose something that was supposed to be kept confidential.",
        "example": "I accidentally let the cat out of the bag about the surprise party."
      },
      {
        "phrase": "Miss the boat",
        "explanation": "To miss an opportunity; to fail to take advantage of a chance.",
        "example": "I wanted to invest in that company, but I missed the boat and now the stock price has skyrocketed."
      },
      {
        "phrase": "On thin ice",
        "explanation": "In a risky or precarious situation; in danger of experiencing negative consequences.",
        "example": "After arriving late to work three times this week, I know I'm on thin ice with my boss."
      },
      {
        "phrase": "Piece of cake",
        "explanation": "Something very easy to do; not challenging at all.",
        "example": "For him, running a marathon is a piece of cake."
      },
      {
        "phrase": "Rule of thumb",
        "explanation": "A general principle or guideline based on experience, rather than strict rules.",
        "example": "As a rule of thumb, I always check the reviews before buying anything online."
      },
      {
        "phrase": "See eye to eye",
        "explanation": "To agree with someone; to share the same opinion or viewpoint.",
        "example": "We don't always see eye to eye on everything, but we respect each other's opinions."
      },
      {
        "phrase": "Speak of the devil",
        "explanation": "When the person you're talking about suddenly appears.",
        "example": "Speak of the devil, and he shall appear. We were just talking about you!"
      },
      {
        "phrase": "Steal someone's thunder",
        "explanation": "To take attention or credit away from someone else, often by doing something similar or better.",
        "example": "I was about to announce my engagement, but then my sister stole my thunder by announcing hers first."
      },
      {
        "phrase": "Take the bull by the horns",
        "explanation": "To confront a difficult or risky situation with courage and determination.",
        "example": "I decided to take the bull by the horns and confront my fears head-on."
      },
      {
        "phrase": "A bird in the hand is worth two in the bush",
        "example": "I decided to accept the job offer I had instead of hoping for a better one in the future. A bird in the hand is worth two in the bush.",
        "explanation": "It's better to have something certain than to risk losing it by trying to get something better.",
        image: "https://preview.redd.it/a-bird-in-the-hand-is-worth-two-in-the-bush-20-images-v0-voqt7mlu56tb1.jpg?width=640&crop=smart&auto=webp&s=5f1175d8aec489bd75154fedb98b6a42765affdb"
      },
      {
        "phrase": "Actions speak louder than words",
        "example": "Don't just say you'll help; do something! Actions speak louder than words.",
        "explanation": "What you do is more important than what you say."
      },
      {
        "phrase": "All ears",
        "example": "Tell me your idea—I'm all ears.",
        "explanation": "Listening carefully or eagerly."
      },
      {
        "phrase": "Beat around the bush",
        "example": "Stop beating around the bush and get to the point.",
        "explanation": "Avoiding the main topic or delaying talking about something."
      },
      {
        "phrase": "Bite the bullet",
        "example": "I didn't want to confront my boss, but I knew I had to bite the bullet and ask for a raise.",
        "explanation": "To endure a painful or difficult situation with courage."
      },
      {
        "phrase": "Break the ice",
        "example": "The host tried to break the ice by telling a joke.",
        "explanation": "To initiate social interaction in a situation where there is tension or formality."
      },
      {
        "phrase": "Burn the midnight oil",
        "example": "I had to burn the midnight oil to finish the project on time.",
        "explanation": "To work late into the night."
      },
      {
        "phrase": "Cost an arm and a leg",
        "example": "Buying a new car can cost an arm and a leg.",
        "explanation": "To be very expensive."
      },
      {
        "phrase": "Cry over spilled milk",
        "example": "I know you made a mistake, but there's no use crying over spilled milk.",
        "explanation": "To be upset about something that has already happened and cannot be changed."
      },
      {
        "phrase": "Cutting corners",
        "example": "They finished the project early by cutting corners, but the quality suffered.",
        "explanation": "Doing something in the easiest or cheapest way, often sacrificing quality."
      },
      {
        "phrase": "Don't cry over spilled milk",
        "example": "I know you made a mistake, but don't cry over spilled milk.",
        "explanation": "Don't be upset about something that has already happened and cannot be changed."
      },
      {
        "phrase": "Don't judge a book by its cover",
        "example": "I didn't think I'd like the movie, but I loved it. I guess you can't judge a book by its cover.",
        "explanation": "You should not form an opinion about someone or something based solely on appearance."
      },
      {
        "phrase": "Every cloud has a silver lining",
        "example": "I lost my job, but I found a new career opportunity. Every cloud has a silver lining.",
        "explanation": "There is something good in every bad situation."
      },
      {
        "phrase": "Fit as a fiddle",
        "example": "Despite his age, my grandfather is as fit as a fiddle.",
        "explanation": "In good health."
      },
      {
        "phrase": "Go the extra mile",
        "example": "If you want to succeed, you need to be willing to go the extra mile.",
        "explanation": "To make a special effort or go beyond what is expected."
      },
      {
        "phrase": "Hit the nail on the head",
        "example": "Sarah hit the nail on the head when she pointed out the main flaw in the plan.",
        "explanation": "To describe exactly what is causing a situation or problem."
      },
      {
        "phrase": "Jump on the bandwagon",
        "example": "Many companies jumped on the bandwagon of sustainable practices after seeing the success of others.",
        "explanation": "To join or support something that has become popular or fashionable."
      },
      {
        "phrase": "Kick the bucket",
        "example": "He kicked the bucket at the age of 90.",
        "explanation": "To die."
      },
      {
        "phrase": "Kill two birds with one stone",
        "example": "By carpooling, we can save money on gas and reduce our carbon footprint. It's like killing two birds with one stone.",
        "explanation": "To accomplish two tasks with a single action."
      },
      {
        "phrase": "Let the cat out of the bag",
        "example": "I was planning a surprise party for her, but someone let the cat out of the bag.",
        "explanation": "To reveal a secret."
      },
      {
        "phrase": "Miss the boat",
        "example": "I didn't invest in the company when I had the chance, and now it's too late. I missed the boat.",
        "explanation": "To miss an opportunity."
      },
      {
        "phrase": "Once in a blue moon",
        "example": "I rarely see my old college friends; we only meet up once in a blue moon.",
        "explanation": "Very rarely."
      },
      {
        "phrase": "Piece of cake",
        "example": "Don't worry about the test; it'll be a piece of cake for you.",
        "explanation": "Something very easy to do."
      },
      {
        "phrase": "Pull someone's leg",
        "example": "Are you serious, or are you just pulling my leg?",
        "explanation": "To joke or tease someone, often by saying something untrue."
      },
      {
        "phrase": "Rain cats and dogs",
        "example": "It's raining cats and dogs outside; you should bring an umbrella.",
        "explanation": "To rain heavily."
      },
      {
        "phrase": "Spill the beans",
        "example": "I can't believe you spilled the beans about the surprise party!",
        "explanation": "To reveal a secret."
      },
      {
        "phrase": "Steal someone's thunder",
        "example": "I was going to announce my engagement tonight, but my sister stole my thunder by announcing hers first.",
        "explanation": "To take the attention away from someone, especially by doing something better or more exciting."
      },
      {
        "phrase": "Take a rain check",
        "example": "I can't go out for dinner tonight, but can I take a rain check and go another time?",
        "explanation": "To decline an invitation but suggest that it be accepted at a later date."
      },
      {
        "phrase": "The ball is in your court",
        "example": "I've given you all the information you need; now the ball is in your court.",
        "explanation": "It is now your responsibility to make a decision or take action."
      },
      {
        "phrase": "The devil is in the details",
        "example": "The project seemed simple at first, but the devil is in the details.",
        "explanation": "The most important or difficult part of something is only revealed when one looks closely at it."
      },
      {
        "phrase": "Throw in the towel",
        "example": "After hours of trying to fix the computer, he finally threw in the towel and called a technician.",
        "explanation": "To give up or surrender."
      },
      {
        "phrase": "Under the weather",
        "example": "I'm feeling a bit under the weather today; I think I'll stay home.",
        "explanation": "To feel unwell or sick."
      },
      {
        "phrase": "Until the cows come home",
        "example": "You can wait for him until the cows come home, but he won't change his mind.",
        "explanation": "For a very long time."
      },
      {
        "phrase": "When pigs fly",
        "example": "He'll clean his room when pigs fly; it'll never happen.",
        "explanation": "Something that will never occur or is highly unlikely."
      },
      {
        "phrase": "Wild goose chase",
        "example": "Searching for the lost keys turned into a wild goose chase.",
        "explanation": "A hopeless search for something that is hard to find or does not exist."
      },
      {
        "phrase": "You can't judge a book by its cover",
        "example": "She doesn't dress well, but you can't judge a book by its cover; she's actually very smart.",
        "explanation": "You should not form an opinion about someone or something based solely on appearance."
      },
      {
        "phrase": "Zip your lip",
        "example": "If you want to keep your job, you'd better learn to zip your lip and stop gossiping.",
        "explanation": "To be quiet or stop talking."
      },
      {
        "phrase": "Hit the sack",
        "example": "I'm exhausted; I think I'll hit the sack early tonight.",
        "explanation": "To go to bed."
      },
      {
        "phrase": "A taste of your own medicine",
        "example": "He's always teasing others, so when someone teased him, it was a taste of his own medicine.",
        "explanation": "To experience the same negative treatment that one has inflicted on others."
      },
      {
        "phrase": "Barking up the wrong tree",
        "example": "If you think I'm the one who ate your sandwich, you're barking up the wrong tree.",
        "explanation": "To pursue a mistaken or misguided course of action."
      },
      {
        "phrase": "Bite off more than you can chew",
        "example": "I agreed to take on three projects at once, but I think I've bitten off more than I can chew.",
        "explanation": "To take on a task that is too big or to handle more than one can manage."
      },
      {
        "phrase": "Break a leg",
        "example": "Break a leg on your performance tonight!",
        "explanation": "A way to wish someone good luck, especially before a performance or event."
      },
      {
        "phrase": "Burn bridges",
        "example": "She burned bridges with her former employer when she quit without notice.",
        "explanation": "To ruin relationships or opportunities, usually intentionally."
      },
      {
        "phrase": "Cost an arm and a leg",
        "example": "Buying a new car can cost an arm and a leg.",
        "explanation": "To be very expensive."
      },
      {
        "phrase": "Cry over spilled milk",
        "example": "I know you made a mistake, but there's no use crying over spilled milk.",
        "explanation": "To be upset about something that has already happened and cannot be changed."
      },
      {
        "phrase": "Cut to the chase",
        "example": "Let's cut to the chase and discuss the main points of the proposal.",
        "explanation": "To get to the main point without wasting time."
      },
      {
        "phrase": "Don't count your chickens before they hatch",
        "example": "You haven't won the tournament yet; don't count your chickens before they hatch.",
        "explanation": "Don't make plans based on something that hasn't happened yet."
      },
      {
        "phrase": "Down to the wire",
        "example": "We finished the project down to the wire, just before the deadline.",
        "explanation": "Until the last possible moment."
      },
      {
        "phrase": "Drop the ball",
        "example": "She dropped the ball by forgetting to send out the invitations.",
        "explanation": "To fail to do something correctly or to miss an opportunity."
      },
      {
        "phrase": "Face the music",
        "example": "After making a mistake, he knew he had to face the music and apologize.",
        "explanation": "To confront the consequences of one's actions."
      },
      {
        "phrase": "Fish out of water",
        "example": "She felt like a fish out of water at the fancy dinner party.",
        "explanation": "To feel uncomfortable or out of place in a particular situation."
      },
      {
        "phrase": "Go against the grain",
        "example": "His decision to become an artist went against the grain of his family's expectations.",
        "explanation": "To oppose or defy what is usual or expected."
      },
      {
        "phrase": "Have a chip on your shoulder",
        "example": "Ever since he lost the race, he's had a chip on his shoulder about his athletic abilities.",
        "explanation": "To be easily angered or feel a sense of inferiority."
      },
      {
        "phrase": "Hit the ground running",
        "example": "She hit the ground running in her new job, impressing everyone with her skills.",
        "explanation": "To start a new activity or job with energy and enthusiasm."
      },
      {
        "phrase": "In hot water",
        "example": "He found himself in hot water after missing the deadline.",
        "explanation": "In trouble or in a difficult situation."
      },
      {
        "phrase": "Jump ship",
        "example": "Several employees jumped ship when they heard about the company's financial troubles.",
        "explanation": "To abandon a job, project, or activity, especially when it is in trouble."
      },
      {
        "phrase": "Keep your eyes peeled",
        "example": "Keep your eyes peeled for any signs of trouble.",
        "explanation": "To remain watchful or alert for something."
      },
      {
        "phrase": "Let the cat out of the bag",
        "example": "I was planning a surprise party for her, but someone let the cat out of the bag.",
        "explanation": "To reveal a secret."
      },
      {
        "phrase": "Make a long story short",
        "example": "To make a long story short, we missed the train and had to take a taxi.",
        "explanation": "To summarize a lengthy explanation or story."
      },
      {
        "phrase": "Nip it in the bud",
        "example": "She decided to nip her bad habit of procrastination in the bud.",
        "explanation": "To stop something at an early stage before it can develop or grow worse."
      },
      {
        "phrase": "On the fence",
        "example": "I'm still on the fence about which car to buy; I can't decide between the two.",
        "explanation": "Undecided or neutral about something."
      },
      {
        "phrase": "Play devil's advocate",
        "example": "She played devil's advocate during the meeting, raising objections to test the strength of the proposal.",
        "explanation": "To argue against an idea or viewpoint for the sake of debate or to explore its weaknesses."
      },
      {
        "phrase": "Put all your eggs in one basket",
        "example": "Investing all your money in one stock is risky; you don't want to put all your eggs in one basket.",
        "explanation": "To risk everything on a single venture."
      },
      {
        "phrase": "Rain on someone's parade",
        "example": "I hate to rain on your parade, but I don't think your idea will work.",
        "explanation": "To spoil someone's enjoyment or plans by bringing bad news or negative comments."
      },
      {
        "phrase": "See eye to eye",
        "example": "They rarely see eye to eye on political issues.",
        "explanation": "To agree or have the same opinion as someone else."
      },
      {
        "phrase": "Spill the beans",
        "example": "I can't believe you spilled the beans about the surprise party!",
        "explanation": "To reveal a secret."
      },
      {
        "phrase": "Steal someone's thunder",
        "example": "I was going to announce my engagement tonight, but my sister stole my thunder by announcing hers first.",
        "explanation": "To take the attention away from someone, especially by doing something better or more exciting."
      },
      {
        "phrase": "Take a rain check",
        "example": "I can't go out for dinner tonight, but can I take a rain check and go another time?",
        "explanation": "To decline an invitation but suggest that it be accepted at a later date."
      },
      {
        "phrase": "The early bird catches the worm",
        "example": "She arrived at the store before it opened, knowing that the early bird catches the worm.",
        "explanation": "Success comes to those who prepare well and put in effort early."
      },
      {
        "phrase": "Throw in the towel",
        "example": "After hours of trying to fix the computer, he finally threw in the towel and called a technician.",
        "explanation": "To give up or surrender."
      },
        {
          "phrase": "a dime a dozen",
          "explanation": "Something that is very common or easily available",
          "example": "The new gadgets in the market are a dime a dozen, so I'm not impressed by them."
        },
        {
          "phrase": "a piece of cake",
          "explanation": "Something that is very easy to do",
          "example": "Passing that exam was a piece of cake for me."
        },
        {
          "phrase": "actions speak louder than words",
          "explanation": "What someone does is more important than what they say",
          "example": "Don't just tell me you'll help, show me by actually pitching in."
        },
        {
          "phrase": "add insult to injury",
          "explanation": "To make a bad situation even worse",
          "example": "Not only did I lose the game, but my teammates also made fun of me, adding insult to injury."
        },
        {
          "phrase": "all that glitters is not gold",
          "explanation": "Something that looks valuable or impressive may not be as good as it seems",
          "example": "That expensive new car may look great, but all that glitters is not gold - it's probably going to cost a fortune to maintain."
        },
        {
          "phrase": "all talk and no action",
          "explanation": "Someone who talks a lot but doesn't actually do anything",
          "example": "The CEO is all talk and no action - he promises big changes but never follows through."
        },
        {
          "phrase": "back to square one",
          "explanation": "Having to start over from the beginning",
          "example": "I thought I had the project figured out, but after the client's feedback, I'm back to square one."
        },
        {
          "phrase": "beat around the bush",
          "explanation": "To avoid discussing the main issue directly",
          "example": "If you have something to say, just say it. Don't beat around the bush."
        },
        {
          "phrase": "blessing in disguise",
          "explanation": "A seemingly bad or unfortunate event that ultimately has a positive outcome",
          "example": "Losing my job was a blessing in disguise because it led me to find a much better opportunity."
        },
        {
          "phrase": "break a leg",
          "explanation": "A phrase used to wish someone good luck, often in performing arts",
          "example": "Break a leg on your opening night performance!"
        },
        {
          "phrase": "by the skin of your teeth",
          "explanation": "Barely succeeding or escaping from a difficult situation",
          "example": "I managed to turn in my assignment on time, but only by the skin of my teeth."
        },
        {
          "phrase": "can't judge a book by its cover",
          "explanation": "You can't judge the quality or character of something by its outward appearance",
          "example": "That run-down old house may look like it's in bad shape, but you can't judge a book by its cover - it could be beautifully renovated on the inside."
        },
        {
          "phrase": "costs an arm and a leg",
          "explanation": "Something that is extremely expensive",
          "example": "The new car I want costs an arm and a leg, so I don't know if I can afford it."
        },
        {
          "phrase": "cross that bridge when you come to it",
          "explanation": "To deal with a problem when it actually arises, rather than worrying about it beforehand",
          "example": "I'm not sure how I'll pay for college yet, but I'll cross that bridge when I come to it."
        },
        {
          "phrase": "curiosity killed the cat",
          "explanation": "Being overly curious or nosy can lead to trouble or harm",
          "example": "I know you want to know what's in the package, but curiosity killed the cat, so leave it alone."
        },
        {
          "phrase": "cut corners",
          "explanation": "To do something in a cheaper or quicker way, often sacrificing quality",
          "example": "The contractor cut corners on the construction project to save money, and now the building has serious problems."
        },
        {
          "phrase": "let the cat out of the bag",
          "explanation": "To accidentally or intentionally reveal a secret or surprise",
          "example": "Oops, I let the cat out of the bag and told everyone about the surprise party."
        },
        {
          "phrase": "down the rabbit hole",
          "explanation": "To enter into a complexly bizarre or chaotic situation",
          "example": "Once I started researching conspiracy theories, I found myself going down the rabbit hole, discovering more and more outlandish ideas."
        },
        {
          "phrase": "elephant in the room",
          "explanation": "An obvious problem or issue that everyone is aware of but no one wants to address",
          "example": "We all know the company is struggling, but the elephant in the room is that the CEO refuses to make necessary changes."
        },
        {
          "phrase": "the grass is always greener",
          "explanation": "The belief that others have it better, even when that's not the case",
          "example": "She's always complaining that her neighbor has a nicer car, but the grass is always greener - I'm sure her neighbor envies something about her life too."
        },
        {
          "phrase": "ଅଙ୍କି ମାରିବା",
          "example": "ସେ ଅଙ୍କି ମାରି କାମ କରିଛି।",
          "explanation": "to do something with great skill or expertise. It suggests that the person has put in a lot of effort and attention to detail in completing the task."
        },
        {
          "phrase": "ଅଚଳ ଥିବା",
          "example": "ଏହି ପ୍ରଶ୍ନ ବିଷୟରେ ସେ ଅଚଳ ଥିଲା।",
          "explanation": "to be firm or unwavering in one's stance or opinion, despite external pressure or circumstances."
        },
        {
          "phrase": "ଅଣ୍ଡା କାପରି ଚାଲିବା",
          "example": "ଏହି ରାସ୍ତାରେ ଗାଡ଼ି ଅଣ୍ଡା କାପରି ଚାଲିଛି।",
          "explanation": "to move or progress in a cautious and hesitant manner, like an egg being carried carefully."
        },
        {
          "phrase": "ଅନ୍ଧା କଚାଟି",
          "example": "ସେ ଅନ୍ଧା କଚାଟି, କିନ୍ତୁ ତାକୁ ଅନୁସରଣ କରିବା ଠିକ୍ ନୁହେଁ।",
          "explanation": "This idiom refers to a person who is ignorant or lacks understanding, but still tries to guide or lead others."
        },
        {
          "phrase": "ଅନ୍ଧାରୁ ଆସିବା",
          "example": "ସେ ଏବେ ଅନ୍ଧାରୁ ଆସିଛି, ତାର ଶରୀର ବହୁତ ଦୁର୍ବଳ।",
          "explanation": "to emerge from a state of darkness or ignorance, often used to describe someone who has recovered from a serious illness or difficult situation."
        },
        {
          "phrase": "ଅରିଷ୍ଟ ହେବା",
          "example": "ସେ ଏବେ ଅରିଷ୍ଟ ହୋଇଛି, ସମସ୍ତ କାମ ଆପେ ଆପେ ହୋଇଯାଉଛି।",
          "explanation": "to become effortless or easy, where tasks or work are completed without any difficulty or struggle."
        },
        {
          "phrase": "ଆଉଖି ଦେଖିବା",
          "example": "ସେ କିଛି ସାହାଯ୍ୟ କରିବା ପାଇଁ ଆଉଖି ଦେଖୁଛି।",
          "explanation": "to keep a watchful eye on someone or something, to monitor or oversee their actions or behavior."
        },
        {
          "phrase": "ଆଖି କାଢ଼ିବା",
          "example": "ତୁମ୍ଭେ ଆମ୍ଭର ଆଖି କାଢ଼ି ଦେଇଛ, ଆମ୍ଭେ କିଛି ବୁଝିପାରୁ ନାହୁଁ।",
          "explanation": "to deprive someone of their means of understanding or perception, often used to suggest that someone has been misled or manipulated."
        },
        {
          "phrase": "ଆଖି କାନ୍ଧରୁ ଝରିବା",
          "example": "ସେ ଆଖି କାନ୍ଧରୁ ଝରି ବୁରୁର ଦାବି କରିଛି।",
          "explanation": "to shed tears of grief or sorrow, often used to describe someone who is deeply distressed or emotional."
        },
        {
          "phrase": "ଆଖି ଫିଟାଇବା",
          "example": "ତାର ଆଖି ଫିଟାଇବାରୁ ବୁଝିହେଲା କେତେ ବଡ଼ ଦୁଃଖରେ ଛନ୍ନଛାଡ଼ା ହେଉଛି।",
          "explanation": "to open one's eyes wide, often used to express surprise, shock, or disbelief."
        },
        {
          "phrase": "ଆଖି ବୁଜିବା",
          "example": "ସେ ନିଜ ଲାଞ୍ଚ କାରଣକୁ ଆଖି ବୁଜି ରହିଛି।",
          "explanation": "to turn a blind eye or ignore something, often used to suggest that someone is willfully ignoring or overlooking a problem or issue."
        },
        {
          "phrase": "ଆଗରେ ପିଠି ଦେଖାଇବା",
          "example": "ସେ ତାର ଆଗରେ ପିଠି ଦେଖାଇ ପଳାଇଗଲା।",
          "explanation": "to turn one's back and flee, often used to describe someone who avoids confrontation or responsibility."
        },
        {
          "phrase": "ଆଗୁଆ କରିବା",
          "example": "ସେ ଆମର ଉପର କାର୍ଯ୍ୟ ଆଗୁଆ କରି ଦେଇଛି।",
          "explanation": "to take the lead or initiative, often used to suggest that someone has taken action before others and set the tone or direction for a task or project."
        },
        {
          "phrase": "ଆଢ଼ାଣି ପଡିବା",
          "example": "ସେ ଆଢ଼ାଣି ପଡ଼ି ଖାଇଲା ଏବଂ ତାର ଶରୀର ଆହତ ହେଲା।",
          "explanation": "to fall down or collapse, often used to describe a sudden and unexpected event or incident."
        },
        {
          "phrase": "ଆତ୍ମକର୍ଣ୍ଣ କରିବା",
          "example": "ସେ ନିଜର ଆତ୍ମକର୍ଣ୍ଣ କରି ପରିସ୍ଥିତିର ସାମ୍ନା କରିଛି।",
          "explanation": "to take responsibility for one's own actions or decisions, often used to suggest that someone has taken ownership of a situation or outcome."
        },
        {
          "phrase": "ଆତ୍ମବୃତ୍ତି ଦେଖାଇବା",
          "example": "ସେ ସବୁବେଳେ ଆତ୍ମବୃତ୍ତି ଦେଖାଇ ଚାଲିଥାଏ।",
          "explanation": "to display a sense of self-importance or egoism, often used to suggest that someone is arrogant or self-centered in their behavior or attitude."
        },
        {
          "phrase": "ଆଦ୍ୟପାନ୍ତ ବୁଝିବା",
          "example": "ସେ ଏହି ବିଷୟର ଆଦ୍ୟପାନ୍ତ ବୁଝିପାରିଛି।",
          "explanation": "to have a comprehensive understanding or knowledge of a subject, from the beginning to the end."
        },
        {
          "phrase": "ଆନା ମାଡ଼ି ଖାଇବା",
          "example": "ସେ ଆନା ମାଡ଼ି ଖାଇଲା ଯାହା ତାକୁ ବହୁତ ନଷ୍ଟ କରିଦେଲା।",
          "explanation": "to suffer a severe loss or damage, often used to describe a situation where someone has experienced a significant setback or misfortune."
        },
        {
          "phrase": "ଇଚ୍ଛାମୃତ୍ୟୁ",
          "example": "ସେ ସମସ୍ତ ସମସ୍ୟା ସମାଧାନ ପାଇଁ ଇଚ୍ଛାମୃତ୍ୟୁ ମନୋଭାବ ରଖିଛି।",
          "explanation": "a willful or deliberate death, often used to suggest that someone is ready to sacrifice their life for a cause or purpose."
        },
        {
          "phrase": "ଇଟାରେ ମାରିବା",
          "example": "ସେ ଇଟାରେ ମାରି ତାକୁ ଜଖମ କରିଦେଲା।",
          "explanation": "to attack or strike someone with a brick or stone, often used to describe a violent or aggressive action."
        },
        {
          "phrase": "ଇଟି ଶୁଣିଥିବା",
          "example": "ସେ ଇଟି ଶୁଣିଥିବାରୁ କାହାରି କଥା ଶୁଣୁ ନାହିଁ।",
          "explanation": "to be stubborn or unwilling to listen to others, often used to describe someone who is set in their ways and resistant to change or new ideas."
        },
        {
          "phrase": "ଉଦ୍ରେକ କରିବା",
          "example": "ସେ ସହଜରେ ଉଦ୍ରେକ ହୋଇଯାଏ ଓ ଟିକେ ବି ଧୈର୍ଯ୍ୟ ରଖି ପାରେ ନାହିଁ।",
          "explanation": "to provoke or instigate someone, often used to describe a situation where someone's actions or words have caused another person to become agitated or upset."
        },
        {
          "phrase": "ଉନ୍ମାଦ ପଶିବା",
          "example": "ସେ ପାଗଳ ପଶିବାରୁ ଘର ଛାଡ଼ି ପଳାଇଗଲା।",
          "explanation": "to become possessed or overcome by madness or insanity, often used to describe someone who has lost control of their mental faculties."
        },
        {
          "phrase": "ଉପ୍ପରକୁ ଖସିବା",
          "example": "ସେ ଉପ୍ପରକୁ ଖସି ପଡ଼ିଲା, କିନ୍ତୁ ସାଙ୍ଗମାନେ ତାକୁ ଧରି ରଖିଥିଲେ।",
          "explanation": "to fall or slip upwards, often used to describe a situation where someone has experienced an unexpected or unusual event or occurrence."
        },
        {
          "phrase": "ଏଣେ ତେଣେ ଘୁରିବା",
          "example": "ସେ ଏଣେ ତେଣେ ଘୁରି ବୁଲୁଛି, କିନ୍ତୁ ସରକାରୀ କାର୍ଯ୍ୟ କରୁ ନାହିଁ।",
          "explanation": "to wander or roam aimlessly, often used to suggest that someone is not focused or productive in their activities."
        },
        {
          "phrase": "ଏକ ଛାଲିପୁଟିରୁ ବାହାରିବା",
          "example": "ଏହି ଦୁରାବସ୍ଥାରୁ ବାହାରିବା ପାଇଁ ତାକୁ ଏକ ଛାଲିପୁଟିରୁ ବାହାରି ଆସିବାକୁ ପଡ଼ିବ।",
          "explanation": "to emerge from a difficult or problematic situation, often used to suggest that someone has overcome a challenge or obstacle."
        },
        {
          "phrase": "ଏକାଦଶ ଗ୍ରହ",
          "example": "ସେ ନିଜକୁ ଏକାଦଶ ଗ୍ରହ ମଧ୍ୟରେ ଗଣନା କରୁଛି।",
          "explanation": "to consider oneself extraordinary or unique, often used to describe someone who has an inflated sense of their own importance or abilities."
        },
        {
          "phrase": "ଏବେ ଯାଏଁ",
          "example": "ସେ ଏବେ ଯାଏଁ କାମ କରୁଛି, କିନ୍ତୁ କାହିଁକି ବିଳମ୍ବ ହେଉଛି?",
          "explanation": "up to the present time or moment, often used to suggest that something has been ongoing or continuing for a certain period."
        }
      
    ]
  currentQuestionIndex: number = 0;


  constructor() { }

  


  nextQuestion(): void {

  }
  previousQuestion(): void {

  }



}
