import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from '../material.module';
import { SidenavbarComponent } from '../navigation/sidenavbar/sidenavbar.component';
import { UserNavbarComponent } from '../navigation/user-navbar/user-navbar.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { DeleteMessagesDialogComponent } from './messages/delete-message-dialog/delete-messages-dialog.component';
import { MessagesEffects } from './messages/message-store/messages.effects';
import { messagesReducer } from './messages/message-store/messages.reducers';
import { MessageComponent } from './messages/message/message.component';
import { MessagesListTopbarComponent } from './messages/messages-list/messages-list-topbar/messages-list-topbar.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { SearchMessageService } from './messages/messages-list/search-message.service';
import { MessagesSidebarComponent } from './messages/messages-sidebar/messages-sidebar.component';
import { MessagesComponent } from './messages/messages.component';
import { PostMessageDialogComponent } from './messages/post-message-dialog/post-message-dialog.component';
import { MessageService } from './messages/service/message-service';
import { UIService } from './ui/service/ui.service';
import { ActivityFeedBottomSheetComponent } from './user/activity-feed-bottom-sheet/activity-feed-bottom-sheet.component';
import { UserDetailsService } from './user/service/user-details.service';
import { UserDetailsEffects } from './user/user-store/user.effects';
import { userDetailsReducer } from './user/user-store/user.reducers';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        UserComponent,
        MessagesComponent,
        MessageComponent,
        PageNotFoundComponent,
        SidenavbarComponent,
        UserNavbarComponent,
        ActivityFeedBottomSheetComponent,
        PostMessageDialogComponent,
        DeleteMessagesDialogComponent,
        MessagesSidebarComponent,
        MessagesListComponent,
        MessagesListTopbarComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FlexLayoutModule,
        RouterModule,
        StoreModule.forFeature('messages', messagesReducer),
        StoreModule.forFeature('userDetails', userDetailsReducer),
        EffectsModule.forFeature([MessagesEffects, UserDetailsEffects]),
        FormsModule,
        ReactiveFormsModule,
        InfiniteScrollModule
    ],
    exports: [
        UserComponent,
        MessagesComponent,
        PostMessageDialogComponent,
        SidenavbarComponent,
        UserNavbarComponent
    ],
    providers: [
        MessageService,
        UIService,
        SearchMessageService,
        UserDetailsService
    ],
    entryComponents: [
        ActivityFeedBottomSheetComponent,
        PostMessageDialogComponent,
        DeleteMessagesDialogComponent
    ]
})
export class SharedModule { }