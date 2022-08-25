import { Injectable } from '@angular/core';
import chatsJson from '../../assets/chats.json'
import answersJson from '../../assets/answers.json'
import questionsJson from '../../assets/questions.json'
import { Chat } from '../models/chat';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public async getConversation(chatId: string)
  {

    var questionIds =  this.getChatQestionIds(chatId);

    if(questionIds)
    {
      return this.getQuestionsFromIds(questionIds);
    }

    return [];
  }

  private getQuestionsFromIds(questionIds: number[]) {
    var questions: any[] = [];
    
    questionIds.forEach(questionId => {
      questions.push(questionsJson.find((q: { qid: any; }) => q.qid == questionId));
    });

    var result : Question[] = [];

    questions.forEach(question => {
      var q = new Question;
      q.qid = question.qid;
      q.qtext = question.qtext;
      q.qtype = question.qtype;
      result.push(q)
    });

    this.addPossibleAnswer(result)
    return result;
  }

  private addPossibleAnswer(questions: Question[]) {
    questions.forEach(question => {
        var ans = answersJson.filter((a: { qids: any[]; }) => a.qids.find(q => q == question.qid)) as any[];

        if(ans.length > 0)
        {
          ans.forEach(a => {
            if(a.hasOwnProperty("atext"))
            {
              question.atext.push(a.atext.toLocaleLowerCase());
            }
            else if(a.hasOwnProperty("range"))
            {
              question.range.push(a.range.min);
              question.range.push(a.range.max);
            }       
          });
        }
    });
  }

  private getChatQestionIds(chatId: string) {
    var question = null;
    chatsJson.forEach((chat: Chat) => 
    {
      if(chat.chatID == chatId)
      {
        question = chat.questions.sort((a, b) => (a.order > b.order) ? 1 : -1).map(a => a.qid);
      }
    });
    return question;
  }

  public validateAnswer(ans:string, question: Question){
    var result = true;
    console.log(question);

    if(question.range.length > 0){

      if(!Number(ans)){
        result = false;
      }
      else
      {
        var numAns = Number(ans);
        console.log(ans);
        console.log(question.range)
        result = numAns >= question.range[0] && numAns <= question.range[1];
      }
    }
    else if(question.atext.length > 0){
      result = question.atext.includes(ans.toLocaleLowerCase());
    }
    else if(question.qtype == 2 && !Number(ans)){
        result = false;
    }
    return result;
  }

}

