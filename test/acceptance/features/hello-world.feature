@HelloWorld
Feature: Greetings
  Everybody starts with Hello World!

  Scenario: 
    Given I am learning BDD
    When I make an HTTP Request on the application root path
    Then it should say "Hello World!"