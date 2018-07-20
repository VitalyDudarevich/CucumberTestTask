Feature: post

  Scenario Outline: Validate that parameters have been sent are returned in response
    When send additional parameter: <param> and parameter value: <paramValue> and body: <newBody> informatoin
    Then Correct data is returned in the response
      Examples:
        | param     |paramValue     | newBody         |
        |testParam |testParamValue  |{"DV1":"DVtest1"}|
        |testParam1|testParamValue1 |{"DV2":"DVtest2"}|