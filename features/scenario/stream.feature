Feature: Stream

  Scenario Outline: Check that number of rows is correct in stream file
    When Send <number> of streams
    Then The <number> of streams is the numbers of rows in the response
      Examples:
        |number|
        |10    |
        |3     |