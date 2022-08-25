import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RippleModule} from 'primeng/ripple';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [	
    AppComponent,
    ChatBotComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    BrowserModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    FormsModule,
    PanelModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
