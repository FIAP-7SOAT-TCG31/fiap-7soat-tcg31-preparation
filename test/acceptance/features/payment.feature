@Payment
Feature: Payment Checkout
  Company needs to charge customers somehow

  Scenario: 
    Given a payment was requested
    When customer executes the payment instruction
    Then the payment gets approved