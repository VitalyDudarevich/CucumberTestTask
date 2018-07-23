Feature: Stream

  Scenario Outline: Response returns as many rows as streams have been sent
    When Send the number: <number> of streams
    Then The <number> of streams is the numbers of rows in the response
      Examples:
        |number|
        |10    |
        |3     |
        |101   |
     #   |0     |