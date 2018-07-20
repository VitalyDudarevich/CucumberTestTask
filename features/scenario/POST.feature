Feature: POST

  Scenario Outline:
    When send additional <param> and <paramValue> and <newBody> informatoin
    Then Correct <newBody> and <param> and <paramValue> is in responce
      Examples:
        | param     |paramValue     | newBody         |
        |testParam |testParamValue  |{"DV1":"DVtest1"}|
        |testParam1|testParamValue1 |{"DV2":"DVtest2"}|