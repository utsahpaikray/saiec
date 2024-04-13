import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { questions } from './question'
interface Celebration {
  top: number;
  left: number;
  active: boolean;
  emoji: unknown
}
@Component({
  selector: 'app-questionset',
  templateUrl: './questionset.page.html',
  styleUrls: ['./questionset.page.scss'],
  animations: [
    trigger('celebrate', [
      state('active', style({
        transform: 'scale(1.5)',
        opacity: 1
      })),
      transition('void => active', [
        style({
          transform: 'scale(0)',
          opacity: 0
        }),
        animate('500ms ease-out')
      ]),
      transition('active => void', [
        animate('300ms ease-in', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class QuestionsetPage implements OnInit {
  public questions: { question: string; options: string[]; answer: string; category?: string }[]= questions;
  emojis: string[] = ['🎉','🎉', '🎉','🎉','🎉','🎉','🎉','🎉','🎉','🎉','🎉','🎉','🎉','🎉','🎉','🎉','🎉','🎉'];
  celebrations: Celebration[] = [];
  celebrationState: string = 'inactive';
  questionsForm!: FormGroup;
  currentQuestionIndex: number = 0;
  totalQuestions: number = 0;
  selectedOptions: string[] = [];
  optionSelected: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.totalQuestions = this.questions.length;
    //this.shuffleOptions();
    this.initForm();
  }

  initForm(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const selectedOption = this.selectedOptions[this.currentQuestionIndex] || null;
    this.questionsForm = this.formBuilder.group({
      selectedOption: new FormControl(selectedOption, Validators.required)
    });
  }
  onOptionSelect(): void {
    this.optionSelected = true; // Set the flag when an option is selected
  }

  nextQuestion(): void {
    console.log(this.questionsForm.valid)
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.selectedOptions[this.currentQuestionIndex] = this.questionsForm.value.selectedOption;
      this.currentQuestionIndex++;
      this.initForm();
      this.optionSelected = false;
    }
  }
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.selectedOptions[this.currentQuestionIndex] = this.questionsForm.value.selectedOption;
      this.currentQuestionIndex--;
      this.initForm();
      this.optionSelected = false;
    }
  }
  getColor(option: string): string {
    if (!this.questionsForm.valid) {
      return '';
    }
    const selectedOption = this.questionsForm.value.selectedOption;
    const correctAnswer = this.questions[this.currentQuestionIndex].answer;
    return option === selectedOption && option === correctAnswer ? 'success' : 'danger';
}
isSelectedOption(option: string): boolean {
  return option === this.questionsForm.value.selectedOption;
}
shuffleOptions(): void {
  this.questions.forEach(question => {
    question.options = this.shuffleArray(question.options);
  });
}

shuffleArray(array: any[]): any[] {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

isCorrectOption(option: string): boolean {
  const selectedOption = this.questionsForm.value.selectedOption;
  const correctAnswer = this.questions[this.currentQuestionIndex].answer;
  if (option === selectedOption && option === correctAnswer) {
    this.celebrationState = 'active'; // Trigger the animation
    setTimeout(() => {
      this.celebrationState = 'inactive'; // Reset animation state after a delay
    }, 1000);
    return true;
  }
  return false;
}
addCelebration(event: MouseEvent) {
  // this.celebrations= []
  // const emojiIndex = Math.floor(Math.random() * this.emojis.length); // Select a random emoji index
  // this.emojis.forEach(element => {
  //   const celebration: Celebration = {
  //     top: Math.floor(Math.random() * event.clientY),
  //     left:Math.ceil(Math.random() * event.clientX),
  //     emoji: element,
  //     active: true
  //   };
  //   this.celebrations.push(celebration);
  //   setTimeout(() => {
  //     celebration.active = false;
  //   }, 1000); // Adjust the duration as needed
  // });
}
  submitForm(): void {
    if (this.questionsForm.valid) {
      this.selectedOptions[this.currentQuestionIndex] = this.questionsForm.value.selectedOption;
      console.log(this.selectedOptions);
      // You can add logic to check the answers here
    }
  }


}
