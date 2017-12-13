import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ChatService, UserService } from '../../../shared/services';
import { ChatMessage, User } from '../../../shared/models';

@Component({
	selector: "app-quick-sidebar",
	templateUrl: "./quick-sidebar.component.html",
	encapsulation: ViewEncapsulation.None,
	providers: [ChatService]
})
export class QuickSidebarComponent implements OnInit, OnDestroy {

	messages: ChatMessage[] = [];
	user: User;
	message: string;
	connection;

	constructor(private chatService: ChatService, private userService: UserService) {
		// this.chatService.getUsers().subscribe(data => {
		//     let user = data['user'];
		//     if (data['event'] === 'left') {
		//         console.log('User left: ' + user);
		//     } else {
		//         console.log('User joined: ' + user);
		//     }
		// });
	}

	sendMessage() {
		// this.chatService.sendMessage({
		//     author: this.user,
		//     message: this.message,
		//     datetime: '',
		//     type: 'message'
		// });
		// this.message = '';
	}

	getUser() {
		this.userService.getUser()
			.subscribe(
			data => {
				this.user = data;
			});
	}

	getInitialMessages() {
		// this.connection = this.chatService.getMessages().subscribe(message => {
		//     this.messages.push(message);
		// });
	}

	ngOnInit() {
		this.getUser();
		this.getInitialMessages();
	}

	ngOnDestroy() {
		// this.connection.unsubscribe();
	}
}
