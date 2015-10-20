/// <reference path='../../dts/angular/angular.d.ts' />
import * as angular from 'angular';
import {CONFIG} from './common/config';
import {ApiService} from './common/api_service';
import {ClassroomHeaderModule} from './components/header/header';
import {ClassroomWorkshopListModule} from './components/workshop_list/workshop_list';
import {ClassroomWorkshopModule} from './components/workshop/workshop';
import {ClassroomSlidedeckModule} from './components/slidedeck/slidedeck';
import {ClassroomLoginModule} from './components/login/login';

var app = angular.module('classroom', [
  'ui.router',
  ClassroomHeaderModule.name,
  ClassroomWorkshopListModule.name,
  ClassroomWorkshopModule.name,
  ClassroomSlidedeckModule.name,
  ClassroomLoginModule.name
]);

app.service('apiService', ApiService);
app.run((apiService, $state, $location, $q) => {
  apiService.setDefaultErrorHandler((response) => {
    if (response.status === 401) {
      $state.go('login', {jump_to: $location.path() });
    }
    return $q.reject(response);
  })
});
app.value('config', CONFIG);

app.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('default', {
      abstract: true,
      template: `
        <cr-header></cr-header>
        <section class="thtrm-l-main">
          <div class="thtrm-l-constraint">
            <ui-view></ui-view>
          </div>
        </section>`
    });

    $urlRouterProvider.otherwise('/dashboard');
});