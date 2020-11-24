import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { TabBar } from './TabBar';

export class RocketChatTabBar {
	constructor() {
		this.template = new ReactiveVar();
		this.id = new ReactiveVar();
		this.group = new ReactiveVar();
		this.state = new ReactiveVar();
		this.data = new ReactiveVar();
	}

	getTemplate() {
		return this.template.get();
	}

	getId() {
		return this.id.get();
	}

	setTemplate(template) {
		this.template.set(template);
	}

	currentGroup() {
		return this.group.get();
	}

	showGroup(group) {
		this.group.set(group);
	}

	extendsData(data) {
		this.data.set({ ...this.data.get(), ...data });
	}

	setData(d) {
		this.data.set(d);
	}

	getData() {
		return this.data.get();
	}

	getButtons(...args) {
		return TabBar.getButtons(...args);
	}

	getState() {
		return this.state.get();
	}

	open(button) {
		this.state.set('opened');

		const current = FlowRouter.current();
		FlowRouter.go(current.route.name, { ...current.params, tab: null, context: null });

		if (!button) {
			return;
		}
		if (typeof button !== 'object' || !button.id) {
			button = TabBar.getButton(button);
		}

		$('.flex-tab, .contextual-bar').css('width', button.width ? `${ button.width }px` : '');
		this.template.set(button.template);
		this.id.set(button.id);
		return button;
	}

	close() {
		this.state.set('');

		$('.flex-tab, .contextual-bar').css('width', '');

		this.template.set();
		this.id.set();
	}
}
