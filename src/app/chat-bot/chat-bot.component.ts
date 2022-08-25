import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { Question } from '../models/question';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {

  question!: Question;
  chatquestions : Question [] = [];
  chatId:string | undefined;
  answer: string = "";
  isBotOn = false;
  private questionIndex  = 0;
  isFinish = false;
  constructor(private chatService : ChatService) { }

  ngOnInit() 
  {

  }

  onChatLoad(){
    this.chatService.getConversation(this.chatId as string).then(data => 
    {
      this.isBotOn = true;

      if(data.length > 0)
      {
        this.chatquestions = data;
        this.question = this.chatquestions[0];
      }
      else
      {
        this.isFinish = true;
      }

    });
  }

  submitAnswer(){
    if(this.answer && this.chatService.validateAnswer(this.answer, this.question))
    {
      this.nextQuestion();
    }
    this.answer = "";
  }

  nextQuestion(){
    this.questionIndex++;
    if(this.questionIndex == this.chatquestions.length)
    {
      this.isFinish = true;
    }
    else
    {
      this.question = this.chatquestions[this.questionIndex];
    }
  }

}
