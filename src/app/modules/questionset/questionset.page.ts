import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-questionset',
  templateUrl: './questionset.page.html',
  styleUrls: ['./questionset.page.scss'],
})
export class QuestionsetPage implements OnInit {
  public questions: { question: string; options: string[]; answer: string; }[]=[
    {
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Berlin", "Rome"],
      "answer": "Paris"
    },
    {
      "question": "Who wrote 'Romeo and Juliet'?",
      "options": ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
      "answer": "William Shakespeare"
    },
    {
      "question": "Which planet is known as the Red Planet?",
      "options": ["Mars", "Venus", "Jupiter", "Saturn"],
      "answer": "Mars"
    },
    {
      "question": "What is the chemical symbol for water?",
      "options": ["H2O", "CO2", "O2", "NaCl"],
      "answer": "H2O"
    },
    {
      "question": "Who painted the Mona Lisa?",
      "options": ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
      "answer": "Leonardo da Vinci"
    },
    {
      "question": "What is the tallest mountain in the world?",
      "options": ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
      "answer": "Mount Everest"
    },
    {
      "question": "Who is known as the 'Father of Computers'?",
      "options": ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
      "answer": "Charles Babbage"
    },
    {
      "question": "What is the chemical symbol for gold?",
      "options": ["Au", "Ag", "Fe", "Cu"],
      "answer": "Au"
    },
    {
      "question": "Which country is known as the Land of the Rising Sun?",
      "options": ["Japan", "China", "Korea", "Vietnam"],
      "answer": "Japan"
    },
    {
      "question": "Who discovered penicillin?",
      "options": ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Albert Einstein"],
      "answer": "Alexander Fleming"
    },
    {
      "question": "What is the currency of Japan?",
      "options": ["Yen", "Euro", "Dollar", "Pound"],
      "answer": "Yen"
    },
    {
      "question": "Who wrote 'To Kill a Mockingbird'?",
      "options": ["Harper Lee", "Mark Twain", "J.K. Rowling", "F. Scott Fitzgerald"],
      "answer": "Harper Lee"
    },
    {
      "question": "What is the chemical symbol for oxygen?",
      "options": ["O2", "H2O", "CO2", "NaCl"],
      "answer": "O2"
    },
    {
      "question": "Which planet is known as the 'Morning Star'?",
      "options": ["Venus", "Mercury", "Mars", "Jupiter"],
      "answer": "Venus"
    },
    {
      "question": "Who painted 'Starry Night'?",
      "options": ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
      "answer": "Vincent van Gogh"
    },
    {
      "question": "What is the chemical symbol for carbon dioxide?",
      "options": ["CO2", "O2", "H2O", "NaCl"],
      "answer": "CO2"
    },
    {
      "question": "Who is the Greek god of the sea?",
      "options": ["Poseidon", "Zeus", "Hades", "Ares"],
      "answer": "Poseidon"
    },
    {
      "question": "What is the tallest animal in the world?",
      "options": ["Giraffe", "Elephant", "Rhinoceros", "Hippopotamus"],
      "answer": "Giraffe"
    },
    {
      "question": "Who is known as the 'Father of Geometry'?",
      "options": ["Euclid", "Pythagoras", "Archimedes", "Aristotle"],
      "answer": "Euclid"
    },
    {
      "question": "What is the chemical symbol for sodium chloride?",
      "options": ["NaCl", "H2O", "CO2", "O2"],
      "answer": "NaCl"
    },
    {
      "question": "Which country is known as the 'Land of the Midnight Sun'?",
      "options": ["Norway", "Sweden", "Finland", "Canada"],
      "answer": "Norway"
    },
    {
      "question": "Who wrote 'The Great Gatsby'?",
      "options": ["F. Scott Fitzgerald", "Ernest Hemingway", "J.D. Salinger", "John Steinbeck"],
      "answer": "F. Scott Fitzgerald"
    },
    {
      "question": "What is the chemical symbol for silver?",
      "options": ["Ag", "Au", "Fe", "Cu"],
      "answer": "Ag"
    },
    {
      "question": "Which country is known as the 'Land of Thunder Dragon'?",
      "options": ["Bhutan", "Nepal", "Tibet", "Mongolia"],
      "answer": "Bhutan"
    },
    {
      "question": "Who invented the telephone?",
      "options": ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"],
      "answer": "Alexander Graham Bell"
    },
    {
      "question": "What is the currency of India?",
      "options": ["Rupee", "Yen", "Euro", "Dollar"],
      "answer": "Rupee"
    },
    {
      "question": "Who is known as the 'Father of Biology'?",
      "options": ["Aristotle", "Charles Darwin", "Gregor Mendel", "Louis Pasteur"],
      "answer": "Aristotle"
    },
    {
      "question": "What is the chemical symbol for iron?",
      "options": ["Fe", "Au", "Ag", "Cu"],
      "answer": "Fe"
    },
    {
      "question": "Which is the largest ocean in the world?",
      "options": ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      "answer": "Pacific Ocean"
    },
    {
      "question": "Who wrote '1984'?",
      "options": ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
      "answer": "George Orwell"
    },
    {
      "question": "What is the chemical symbol for copper?",
      "options": ["Cu", "Ag", "Au", "Fe"],
      "answer": "Cu"
    },
    {
      "question": "Who is known as the 'Father of Physics'?",
      "options": ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Nikola Tesla"],
      "answer": "Isaac Newton"
    },
    {
      "question": "What is the chemical symbol for lead?",
      "options": ["Pb", "Au", "Ag", "Fe"],
      "answer": "Pb"
    },
    {
      "question": "Which is the smallest continent in the world?",
      "options": ["Australia", "Europe", "Asia", "North America"],
      "answer": "Australia"
    },
    {
      "question": "Who wrote 'Hamlet'?",
      "options": ["William Shakespeare", "Jane Austen", "Leo Tolstoy", "Charles Dickens"],
      "answer": "William Shakespeare"
    },
    {
      "question": "What is the chemical symbol for helium?",
      "options": ["He", "H2O", "CO2", "NaCl"],
      "answer": "He"
    },
    {
      "question": "Who was the first woman to win a Nobel Prize?",
      "options": ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Mother Teresa"],
      "answer": "Marie Curie"
    },
    {
      "question": "What is the chemical symbol for nitrogen?",
      "options": ["N", "O2", "CO2", "NaCl"],
      "answer": "N"
    },
    {
      "question": "Who is known as the 'Father of Economics'?",
      "options": ["Adam Smith", "John Maynard Keynes", "Karl Marx", "Milton Friedman"],
      "answer": "Adam Smith"
    },
    {
      "question": "Which country is known as the 'Land of a Thousand Lakes'?",
      "options": ["Finland", "Sweden", "Canada", "Russia"],
      "answer": "Finland"
    },
    {
      "question": "Who painted 'The Last Supper'?",
      "options": ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
      "answer": "Leonardo da Vinci"
    },
    {
      "question": "What is the chemical symbol for potassium?",
      "options": ["K", "Au", "Ag", "Fe"],
      "answer": "K"
    },
    {
      "question": "Which is the largest bird in the world?",
      "options": ["Ostrich", "Eagle", "Albatross", "Emu"],
      "answer": "Ostrich"
    },
    {
      "question": "Who wrote 'Pride and Prejudice'?",
      "options": ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Agatha Christie"],
      "answer": "Jane Austen"
    },
    {
      "question": "What is the chemical symbol for uranium?",
      "options": ["U", "H2O", "CO2", "NaCl"],
      "answer": "U"
    },
    {
      "question": "Who was the first man to step on the moon?",
      "options": ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
      "answer": "Neil Armstrong"
    },
    {
      "question": "What is the chemical symbol for tin?",
      "options": ["Sn", "Au", "Ag", "Fe"],
      "answer": "Sn"
    }
  ];
  questionsForm!: FormGroup;
  currentQuestionIndex: number = 0;
  totalQuestions: number = 0;
  selectedOptions: string[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.totalQuestions = this.questions.length;
    this.initForm();
  }

  initForm(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const selectedOption = this.selectedOptions[this.currentQuestionIndex] || null;
    this.questionsForm = this.formBuilder.group({
      selectedOption: new FormControl(selectedOption, Validators.required)
    });
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.selectedOptions[this.currentQuestionIndex] = this.questionsForm.value.selectedOption;
      this.currentQuestionIndex++;
      this.initForm();
    }
  }
  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.selectedOptions[this.currentQuestionIndex] = this.questionsForm.value.selectedOption;
      this.currentQuestionIndex--;
      this.initForm();
    }
  }

  submitForm(): void {
    if (this.questionsForm.valid) {
      this.selectedOptions[this.currentQuestionIndex] = this.questionsForm.value.selectedOption;
      console.log(this.selectedOptions);
      // You can add logic to check the answers here
    }
  }


}
