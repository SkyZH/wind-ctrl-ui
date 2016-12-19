import { combineReducers } from 'redux';
import { routerReducer } from 'ng2-redux-router';
import * as log from './log';
import * as command from './command';
import * as event from './event';
import * as status from './status';

export interface IAppState {
  log?: log.ILog;
  event?: event.IEvent;
  status?: status.IStatus;
  command?: command.ICommand;
};

export const rootReducer = combineReducers<IAppState>({
  log: log.logReducer,
  event: event.eventReducer,
  status: status.statusReducer,
  command: command.commandReducer
});

export function deimmutify(store) {
  return {
    log: store.log.toJS(),
    event: store.event.toJS(),
    status: store.status.toJS(),
    command: store.command.toJS()
  };
}

export function reimmutify(plain) {
  return {
    log: log.LogFactory(plain.log),
    event: event.EventFactory(plain.event),
    status: status.StatusFactory(plain.status),
    command: command.CommandFactory(plain.command)
  };
}
